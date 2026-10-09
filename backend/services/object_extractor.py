import os
import hashlib
import cv2
import numpy as np
import urllib.request
from ultralytics import YOLO

# Resolved paths
BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
ROOT_DIR = os.path.abspath(os.path.join(BASE_DIR, ".."))
UPLOAD_FOLDER = os.path.join(ROOT_DIR, "uploads")
if not os.path.exists(UPLOAD_FOLDER):
    UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

EXTRACTED_FOLDER = os.path.join(UPLOAD_FOLDER, "extracted_objects")
os.makedirs(EXTRACTED_FOLDER, exist_ok=True)

from services.model_loader import get_yolo_seg_model, safe_yolo_predict


def get_seg_model():
    return get_yolo_seg_model()


CATEGORY_SYNONYMS = {
    "bed": ["bed"],
    "chair": ["chair", "couch", "bench"],
    "sofa": ["couch", "sofa", "chair"],
    "couch": ["couch", "sofa", "chair"],
    "table": ["dining table", "table", "desk"],
    "side table": ["dining table", "table", "desk"],
    "bedside_table": ["dining table", "table", "desk"],
    "bedside table": ["dining table", "table", "desk"],
    "nightstand": ["dining table", "table", "desk"],
    "desk": ["dining table", "desk", "table", "laptop"],
    "lamp": ["lamp", "vase", "clock", "potted plant", "traffic light"],
    "night lamp": ["lamp", "vase", "clock", "potted plant", "traffic light"],
    "bedside lamp": ["lamp", "vase", "clock", "potted plant", "traffic light"],
    "wardrobe": ["refrigerator", "bed", "wardrobe"],
    "tv": ["tv", "monitor", "laptop"],
}


def _resolve_image(source_path_or_url):
    """Load image from local path or remote URL into OpenCV BGR numpy array."""
    if not source_path_or_url:
        return None

    src = str(source_path_or_url).strip()

    # Remote URL
    if src.startswith("http://") or src.startswith("https://"):
        try:
            req = urllib.request.Request(
                src,
                headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
            )
            with urllib.request.urlopen(req, timeout=8) as resp:
                arr = np.asarray(bytearray(resp.read()), dtype=np.uint8)
                img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
                if img is not None:
                    return img
        except Exception as e:
            print(f"Warning: Failed to fetch remote image {src}: {e}")

    # Local Path resolving
    possible_paths = []
    
    # Clean leading slash
    rel_src = src.lstrip("/\\")

    # 1. Direct path
    possible_paths.append(src)
    # 2. Relative to ROOT_DIR
    possible_paths.append(os.path.join(ROOT_DIR, rel_src))
    # 3. Relative to BASE_DIR
    possible_paths.append(os.path.join(BASE_DIR, rel_src))
    # 4. If path starts with furniture_dataset
    if "furniture_dataset" in rel_src:
        sub = rel_src[rel_src.find("furniture_dataset"):].replace("/", os.sep).replace("\\", os.sep)
        variants = [sub, sub.replace("budget_", "buget_"), sub.replace("buget_", "budget_")]
        for var in variants:
            possible_paths.append(os.path.join(ROOT_DIR, var))
            possible_paths.append(os.path.join(ROOT_DIR, "frontend", "public", var))
            possible_paths.append(os.path.join(BASE_DIR, "frontend", "public", var))
    # 5. If path starts with uploads
    if "uploads" in rel_src:
        sub = rel_src[rel_src.find("uploads"):].replace("/", os.sep).replace("\\", os.sep)
        possible_paths.append(os.path.join(ROOT_DIR, sub))
        possible_paths.append(os.path.join(BASE_DIR, sub))
        possible_paths.append(os.path.join(UPLOAD_FOLDER, sub.replace("uploads" + os.sep, "")))
    # 6. If path is in assets
    possible_paths.append(os.path.join(BASE_DIR, "assets", os.path.basename(src)))

    for p in possible_paths:
        if os.path.exists(p) and os.path.isfile(p):
            try:
                img = cv2.imread(p, cv2.IMREAD_COLOR)
                if img is not None:
                    return img
            except Exception as e:
                print(f"Warning: Failed to read local image {p}: {e}")

    # 7. Fallback to production frontend / local frontend if relative dataset path not found locally
    if "furniture_dataset" in rel_src or "uploads" in rel_src:
        remote_fallbacks = [
            f"https://render-ai-tau.vercel.app/{rel_src}",
            f"http://localhost:3000/{rel_src}",
        ]
        for f_url in remote_fallbacks:
            try:
                req = urllib.request.Request(
                    f_url,
                    headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
                )
                with urllib.request.urlopen(req, timeout=5) as resp:
                    arr = np.asarray(bytearray(resp.read()), dtype=np.uint8)
                    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
                    if img is not None:
                        return img
            except Exception:
                pass

    return None


_table_seg_session = None

def _get_table_seg_session():
    global _table_seg_session
    if _table_seg_session is None:
        import rembg
        try:
            _table_seg_session = rembg.new_session("isnet-general-use")
        except Exception:
            _table_seg_session = rembg.new_session("u2net")
    return _table_seg_session


def extract_and_segment_object(image_source, category="bed", force_refresh=False):
    """
    Extract ONLY the requested furniture object (e.g. Bed, Lamp, Chair, Sofa) from the source image.
    Returns the web URL path of the transparent RGBA PNG in /uploads/extracted_objects/.
    """
    if not image_source:
        return None

    cat_clean = (category or "bed").lower().strip()

    # Generate deterministic cache filename
    hash_key = hashlib.md5(f"{image_source}::{cat_clean}".encode("utf-8")).hexdigest()
    cache_filename = f"extracted_{cat_clean}_{hash_key[:12]}.png"
    cache_path = os.path.join(EXTRACTED_FOLDER, cache_filename)
    web_path = f"/uploads/extracted_objects/{cache_filename}"

    if not force_refresh and os.path.exists(cache_path) and os.path.getsize(cache_path) > 100:
        return web_path

    img = _resolve_image(image_source)
    if img is None:
        return image_source  # Fallback to original if cannot load


    # =========================================================================
    # TABLE CATEGORY: TRUE ALPHA TRANSPARENCY SEGMENTATION
    # PRESERVES 100% ORIGINAL PIXELS, ONLY REMOVES BACKGROUND VIA ALPHA CHANNEL
    # =========================================================================
    if cat_clean == "table":
        try:
            import rembg
            from PIL import Image
            session = _get_table_seg_session()
            h, w = img.shape[:2]
            pil_img = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

            # 1. Obtain pure segmentation mask only
            raw_mask = rembg.remove(pil_img, session=session, only_mask=True)
            mask = np.array(raw_mask, dtype=np.uint8)

            # 2. Preserve table pixels where uncertain:
            # Table/object = alpha 255, background (< 5) = alpha 0
            # Smooth feathered ramp between 5 and 15
            alpha = np.zeros_like(mask, dtype=np.float32)
            alpha[mask >= 15] = 255.0
            ramp = (mask >= 5) & (mask < 15)
            alpha[ramp] = (mask[ramp] - 5.0) * (255.0 / 10.0)
            alpha = np.clip(alpha, 0, 255).astype(np.uint8)

            # 3. Fill interior holes in table (solid wood, marble reflections)
            contours, hierarchy = cv2.findContours((alpha > 128).astype(np.uint8), cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
            if hierarchy is not None:
                for i, h_info in enumerate(hierarchy[0]):
                    if h_info[3] != -1:
                        area = cv2.contourArea(contours[i])
                        if area < 0.25 * (h * w):
                            cv2.drawContours(alpha, contours, i, 255, -1)

            # 4. Small morphological close to preserve delicate table legs/supports
            kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
            alpha = cv2.morphologyEx(alpha, cv2.MORPH_CLOSE, kernel)

            # 5. Output RGBA using 100% UNTOUCHED ORIGINAL RGB PIXELS
            rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
            rgba[:, :, 3] = alpha

            os.makedirs(os.path.dirname(cache_path), exist_ok=True)
            cv2.imwrite(cache_path, rgba)
            return web_path
        except Exception as e:
            print(f"Table segmentation error: {e}")
            try:
                # Fallback preserving table pixels with full opacity if segmentation model fails
                rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
                rgba[:, :, 3] = 255
                os.makedirs(os.path.dirname(cache_path), exist_ok=True)
                cv2.imwrite(cache_path, rgba)
                return web_path
            except Exception:
                return image_source

    # =========================================================================
    # WARDROBE CATEGORY: TRUE ALPHA TRANSPARENCY SEGMENTATION
    # PRESERVES 100% ORIGINAL PIXELS, ONLY REMOVES BACKGROUND VIA ALPHA CHANNEL
    # NEVER USES WHITE COLOR REMOVAL, RGB THRESHOLDING, OR BRIGHTNESS THRESHOLDING
    # TREATS WARDROBE AS ONE COMPLETE OBJECT (DOORS, DRAWERS, HANDLES, SHELVES)
    # =========================================================================
    if cat_clean == "wardrobe":
        try:
            # Check if there is an existing matching pre-extracted file in frontend/public/furniture_dataset/extracted_wardrobes
            possible_pre_extracted = []
            if "wardrobe" in str(image_source):
                basename = os.path.basename(image_source)
                for root_dir_cand in [ROOT_DIR, BASE_DIR]:
                    ext_cand_dir = os.path.join(root_dir_cand, "frontend", "public", "furniture_dataset", "extracted_wardrobes")
                    if os.path.exists(ext_cand_dir):
                        for f in os.listdir(ext_cand_dir):
                            if basename.replace(".", "_") in f:
                                possible_pre_extracted.append(os.path.join(ext_cand_dir, f))
            
            for pre_p in possible_pre_extracted:
                if os.path.exists(pre_p):
                    pre_img = cv2.imread(pre_p, cv2.IMREAD_UNCHANGED)
                    if pre_img is not None and pre_img.shape[2] == 4:
                        os.makedirs(os.path.dirname(cache_path), exist_ok=True)
                        cv2.imwrite(cache_path, pre_img)
                        return web_path

            h, w = img.shape[:2]
            # Detect outer boundary of wardrobe from edges/contrast against outer border
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            blurred = cv2.GaussianBlur(gray, (5, 5), 0)
            edges = cv2.Canny(blurred, 25, 80)
            
            x_proj = np.sum(edges > 0, axis=0)
            y_proj = np.sum(edges > 0, axis=1)
            
            x_nz = np.where(x_proj > 2)[0]
            y_nz = np.where(y_proj > 2)[0]
            
            xmin = int(x_nz[0]) if len(x_nz) else 0
            xmax = int(x_nz[-1]) if len(x_nz) else w - 1
            ymin = int(y_nz[0]) if len(y_nz) else 0
            ymax = int(y_nz[-1]) if len(y_nz) else h - 1

            # Build alpha mask: complete wardrobe = 255, outside background = 0
            alpha = np.zeros((h, w), dtype=np.uint8)
            alpha[ymin:ymax+1, xmin:xmax+1] = 255

            # Output RGBA using 100% UNTOUCHED ORIGINAL RGB PIXELS
            rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
            rgba[:, :, 3] = alpha

            os.makedirs(os.path.dirname(cache_path), exist_ok=True)
            cv2.imwrite(cache_path, rgba)
            return web_path
        except Exception as e:
            print(f"Wardrobe segmentation error: {e}")
            try:
                rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
                rgba[:, :, 3] = 255
                os.makedirs(os.path.dirname(cache_path), exist_ok=True)
                cv2.imwrite(cache_path, rgba)
                return web_path
            except Exception:
                return image_source

    # =========================================================================
    # 1. BED CATEGORY: 100% UNCHANGED EXISTING WORKING IMPLEMENTATION
    # =========================================================================
    if cat_clean == "bed":
        h, w = img.shape[:2]
        model = get_seg_model()
        target_synonyms = CATEGORY_SYNONYMS.get(cat_clean, [cat_clean])
        best_idx = None
        best_conf = 0.0
        res = None

        if model is not None:
            try:
                results = safe_yolo_predict(model, img, conf=0.10, imgsz=640)
                if results and len(results) > 0:
                    res = results[0]
            except Exception as e:
                print(f"Detection inference error: {e}")

        # 1. Search for matching category among detections
        if res is not None and res.boxes is not None and len(res.boxes) > 0:
            for i, box in enumerate(res.boxes):
                cls_id = int(box.cls[0])
                cls_name = model.names.get(cls_id, "").lower() if hasattr(model, "names") else ""
                conf = float(box.conf[0])
                if any(s in cls_name or cls_name in s for s in target_synonyms):
                    if conf > best_conf:
                        best_conf = conf
                        best_idx = i

        # 2. If no exact category match, choose largest salient object
        if best_idx is None and res is not None and res.boxes is not None and len(res.boxes) > 0:
            areas = []
            for i, box in enumerate(res.boxes):
                xyxy = box.xyxy[0].cpu().numpy()
                area = (xyxy[2] - xyxy[0]) * (xyxy[3] - xyxy[1])
                areas.append((area, float(box.conf[0]), i))
            areas.sort(reverse=True)
            best_idx = areas[0][2]

        rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

        # 3. Apply Segmentation Mask if available
        if best_idx is not None and res is not None and getattr(res, "masks", None) is not None and len(res.masks) > best_idx:
            try:
                mask_raw = res.masks.data[best_idx].cpu().numpy()
                mask_resized = cv2.resize(mask_raw, (w, h), interpolation=cv2.INTER_LINEAR)
                alpha = (mask_resized > 0.35).astype(np.uint8) * 255
                
                # Smooth mask edges for natural feathering
                alpha = cv2.GaussianBlur(alpha, (5, 5), 0)
                rgba[:, :, 3] = alpha

                box = res.boxes[best_idx].xyxy[0].cpu().numpy().astype(int)
                pad = 8
                x1, y1 = max(0, box[0] - pad), max(0, box[1] - pad)
                x2, y2 = min(w, box[2] + pad), min(h, box[3] + pad)
                cropped = rgba[y1:y2, x1:x2]
            except Exception as e:
                print(f"Mask application error: {e}")
                cropped = None
        else:
            cropped = None

        # 4. Fallback: Bounding box GrabCut segmentation
        if cropped is None and best_idx is not None and res is not None and res.boxes is not None:
            try:
                box = res.boxes[best_idx].xyxy[0].cpu().numpy().astype(int)
                x1, y1 = max(0, box[0]), max(0, box[1])
                x2, y2 = min(w, box[2]), min(h, box[3])
                bw, bh = max(10, x2 - x1), max(10, y2 - y1)

                rect = (x1, y1, bw, bh)
                bgd_model = np.zeros((1, 65), np.float64)
                fgd_model = np.zeros((1, 65), np.float64)
                mask = np.zeros(img.shape[:2], np.uint8)
                cv2.grabCut(img, mask, rect, bgd_model, fgd_model, 3, cv2.GC_INIT_WITH_RECT)
                alpha = np.where((mask == 2) | (mask == 0), 0, 255).astype("uint8")
                alpha = cv2.GaussianBlur(alpha, (5, 5), 0)
                rgba[:, :, 3] = alpha

                pad = 8
                x1c, y1c = max(0, x1 - pad), max(0, y1 - pad)
                x2c, y2c = min(w, x2 + pad), min(h, y2 + pad)
                cropped = rgba[y1c:y2c, x1c:x2c]
            except Exception as e:
                print(f"GrabCut bbox error: {e}")
                cropped = None

        # 5. Last Fallback: Center salient GrabCut
        if cropped is None:
            try:
                margin_x, margin_y = int(w * 0.05), int(h * 0.05)
                rect = (margin_x, margin_y, w - 2 * margin_x, h - 2 * margin_y)
                bgd_model = np.zeros((1, 65), np.float64)
                fgd_model = np.zeros((1, 65), np.float64)
                mask = np.zeros(img.shape[:2], np.uint8)
                cv2.grabCut(img, mask, rect, bgd_model, fgd_model, 3, cv2.GC_INIT_WITH_RECT)
                alpha = np.where((mask == 2) | (mask == 0), 0, 255).astype("uint8")
                rgba[:, :, 3] = alpha
                cropped = rgba
            except Exception as e:
                print(f"GrabCut fallback error: {e}")
                cropped = rgba

        if cropped is None or getattr(cropped, "size", 0) == 0:
            cropped = rgba

        try:
            os.makedirs(os.path.dirname(cache_path), exist_ok=True)
            cv2.imwrite(cache_path, cropped)
            return web_path
        except Exception as e:
            print(f"Error saving extracted image {cache_path}: {e}")
            return image_source

    # =========================================================================
    # 2. OTHER FURNITURE (Chair, Table, Side table, Lamp, etc.):
    #    CLEAN ISOLATION, BACKGROUND REMOVAL, TIGHT BOUNDING-BOX CROPPING
    # =========================================================================
    h, w = img.shape[:2]
    model = get_seg_model()
    target_synonyms = CATEGORY_SYNONYMS.get(cat_clean, [cat_clean])

    best_idx = None
    best_conf = 0.0
    res = None

    if model is not None:
        try:
            results = safe_yolo_predict(model, img, conf=0.08, imgsz=640)
            if results and len(results) > 0:
                res = results[0]
        except Exception as e:
            print(f"Detection inference error for {cat_clean}: {e}")

    # 1. Search for matching category in YOLO detections
    if res is not None and res.boxes is not None and len(res.boxes) > 0:
        for i, box in enumerate(res.boxes):
            cls_id = int(box.cls[0])
            cls_name = model.names.get(cls_id, "").lower() if hasattr(model, "names") else ""
            conf = float(box.conf[0])
            if any(s in cls_name or cls_name in s for s in target_synonyms):
                if conf > best_conf:
                    best_conf = conf
                    best_idx = i

    rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    cropped = None

    # 2. If YOLO has matching segmentation mask with reasonable size (>3% of image area)
    if best_idx is not None and res is not None and getattr(res, "masks", None) is not None and len(res.masks) > best_idx:
        try:
            mask_raw = res.masks.data[best_idx].cpu().numpy()
            mask_resized = cv2.resize(mask_raw, (w, h), interpolation=cv2.INTER_LINEAR)
            alpha = (mask_resized > 0.30).astype(np.uint8) * 255
            
            nz = np.where(alpha > 20)
            if len(nz[0]) > (w * h * 0.03):
                # Clean and smooth mask
                k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
                alpha = cv2.morphologyEx(alpha, cv2.MORPH_CLOSE, k)
                alpha = cv2.GaussianBlur(alpha, (5, 5), 0)
                rgba[:, :, 3] = alpha

                ymin, ymax = np.min(nz[0]), np.max(nz[0])
                xmin, xmax = np.min(nz[1]), np.max(nz[1])
                pad = 8
                x1, y1 = max(0, xmin - pad), max(0, ymin - pad)
                x2, y2 = min(w, xmax + pad + 1), min(h, ymax + pad + 1)
                cropped = rgba[y1:y2, x1:x2]
        except Exception as e:
            print(f"YOLO mask error for {cat_clean}: {e}")
            cropped = None

    # 3. High-Quality Adaptive Studio Background Removal & GrabCut Segmentation
    if cropped is None:
        try:
            max_dim = 400
            scale = min(1.0, max_dim / max(h, w))
            sw, sh = max(10, int(w * scale)), max(10, int(h * scale))
            small_img = cv2.resize(img, (sw, sh), interpolation=cv2.INTER_AREA)

            margin_x, margin_y = max(2, int(sw * 0.04)), max(2, int(sh * 0.04))
            rect = (margin_x, margin_y, sw - 2 * margin_x, sh - 2 * margin_y)

            bgd_model = np.zeros((1, 65), np.float64)
            fgd_model = np.zeros((1, 65), np.float64)
            mask = np.zeros((sh, sw), np.uint8)

            c1 = small_img[:margin_y, :].reshape(-1, 3)
            c2 = small_img[-margin_y:, :].reshape(-1, 3)
            c3 = small_img[:, :margin_x].reshape(-1, 3)
            c4 = small_img[:, -margin_x:].reshape(-1, 3)
            corners = np.vstack([c1, c2, c3, c4])
            avg_bg = np.mean(corners, axis=0)
            diff = np.linalg.norm(small_img.astype(float) - avg_bg, axis=2)

            mask[diff < 22] = cv2.GC_BGD
            mask[int(sh * 0.12):int(sh * 0.88), int(sw * 0.12):int(sw * 0.88)] = cv2.GC_PR_FGD

            try:
                cv2.grabCut(small_img, mask, rect, bgd_model, fgd_model, 2, cv2.GC_INIT_WITH_MASK)
                small_alpha = np.where((mask == 2) | (mask == 0), 0, 255).astype("uint8")
            except Exception:
                mask = np.zeros((sh, sw), np.uint8)
                cv2.grabCut(small_img, mask, rect, bgd_model, fgd_model, 2, cv2.GC_INIT_WITH_RECT)
                small_alpha = np.where((mask == 2) | (mask == 0), 0, 255).astype("uint8")

            # Morphological close to keep solid furniture structure
            k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
            small_alpha = cv2.morphologyEx(small_alpha, cv2.MORPH_CLOSE, k)

            alpha = cv2.resize(small_alpha, (w, h), interpolation=cv2.INTER_LINEAR)
            alpha = cv2.GaussianBlur(alpha, (5, 5), 0)
            rgba[:, :, 3] = alpha

            nz = np.where(alpha > 20)
            if len(nz[0]) > 0:
                ymin, ymax = np.min(nz[0]), np.max(nz[0])
                xmin, xmax = np.min(nz[1]), np.max(nz[1])
                pad = 8
                x1, y1 = max(0, xmin - pad), max(0, ymin - pad)
                x2, y2 = min(w, xmax + pad + 1), min(h, ymax + pad + 1)
                cropped = rgba[y1:y2, x1:x2]
            else:
                cropped = rgba
        except Exception as e:
            print(f"Adaptive segmentation error for {cat_clean}: {e}")
            cropped = rgba

    if cropped is None or getattr(cropped, "size", 0) == 0:
        cropped = rgba

    try:
        os.makedirs(os.path.dirname(cache_path), exist_ok=True)
        cv2.imwrite(cache_path, cropped)
        return web_path
    except Exception as e:
        print(f"Error saving extracted image {cache_path}: {e}")
        return image_source
