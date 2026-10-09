import cv2, os
import numpy as np

items = [
    ("wardrobe_10k_1", "frontend/public/furniture_dataset/wardrobe/budget_10k_to_budget_30k/wardrobe1.jpg"),
    ("wardrobe_10k_2", "frontend/public/furniture_dataset/wardrobe/budget_10k_to_budget_30k/wardrobe2.jpg"),
    ("wardrobe_10k_3", "frontend/public/furniture_dataset/wardrobe/budget_10k_to_budget_30k/wardrobe6.jpeg"),
    ("wardrobe_10k_4", "frontend/public/furniture_dataset/wardrobe/budget_10k_to_budget_30k/wardrobe7.jpg"),
    ("wardrobe_10k_5", "frontend/public/furniture_dataset/wardrobe/budget_10k_to_budget_30k/wardrobe9.jpeg"),
    ("wardrobe_10k_6", "frontend/public/furniture_dataset/wardrobe/budget_10k_to_budget_30k/wardrobe19.webp"),
    ("wardrobe_30k_1", "frontend/public/furniture_dataset/wardrobe/budget_30k_to_budget_50k/wardrobe3.jpg"),
    ("wardrobe_30k_2", "frontend/public/furniture_dataset/wardrobe/budget_30k_to_budget_50k/wardrobe4.webp"),
    ("wardrobe_30k_3", "frontend/public/furniture_dataset/wardrobe/budget_30k_to_budget_50k/wardrobe5.jpeg"),
    ("wardrobe_30k_4", "frontend/public/furniture_dataset/wardrobe/budget_30k_to_budget_50k/wardrobe10.jpeg"),
    ("wardrobe_30k_5", "frontend/public/furniture_dataset/wardrobe/budget_30k_to_budget_50k/wardrobe11.jpeg"),
    ("wardrobe_30k_6", "frontend/public/furniture_dataset/wardrobe/budget_30k_to_budget_50k/wardrobe15.jpg"),
    ("wardrobe_50k_1", "frontend/public/furniture_dataset/wardrobe/budget_50k_to_budget_70k/wardrobe6.jpeg"),
    ("wardrobe_50k_2", "frontend/public/furniture_dataset/wardrobe/budget_50k_to_budget_70k/wardrobe7.webp"),
    ("wardrobe_50k_3", "frontend/public/furniture_dataset/wardrobe/budget_50k_to_budget_70k/wardrobe12.jpeg"),
    ("wardrobe_50k_4", "frontend/public/furniture_dataset/wardrobe/budget_50k_to_budget_70k/wardrobe16.jpeg"),
    ("wardrobe_50k_5", "frontend/public/furniture_dataset/wardrobe/budget_50k_to_budget_70k/wardrobe20.jpg"),
]

for item_id, path in items:
    orig = cv2.imread(path)
    h, w = orig.shape[:2]
    norm_name = "extracted_" + os.path.dirname(path).split("/")[-1] + "_" + os.path.basename(path).replace(".", "_") + ".png"
    ext_file = os.path.join("frontend/public/furniture_dataset/extracted_wardrobes", norm_name)
    ext = cv2.imread(ext_file, cv2.IMREAD_UNCHANGED)
    alpha = ext[:, :, 3]
    ys, xs = np.where(alpha > 0)
    ymin, ymax, xmin, xmax = ys.min(), ys.max(), xs.min(), xs.max()
    
    # Let's inspect the boundary lines of orig:
    # Row ymin-1 (background just above wardrobe) vs row ymin (top of wardrobe)
    # Row ymax+1 (background just below wardrobe) vs row ymax (bottom of wardrobe)
    # Col xmin-1 (background just left of wardrobe) vs col xmin (left of wardrobe)
    # Col xmax+1 (background just right of wardrobe) vs col xmax (right of wardrobe)
    
    diff_top = np.mean(np.abs(orig[max(0, ymin-2)].astype(float) - orig[ymin].astype(float))) if ymin > 0 else 0
    diff_bot = np.mean(np.abs(orig[min(h-1, ymax+2)].astype(float) - orig[ymax].astype(float))) if ymax < h-1 else 0
    diff_left = np.mean(np.abs(orig[:, max(0, xmin-2)].astype(float) - orig[:, xmin].astype(float))) if xmin > 0 else 0
    diff_right = np.mean(np.abs(orig[:, min(w-1, xmax+2)].astype(float) - orig[:, xmax].astype(float))) if xmax < w-1 else 0
    
    print(f"{item_id}: bbox=({ymin}:{ymax}, {xmin}:{xmax}) | diffs: T={diff_top:.1f}, B={diff_bot:.1f}, L={diff_left:.1f}, R={diff_right:.1f}")
