import api, { API_BASE } from "./api";

export interface DatasetFurnitureItem {
  id: string;
  category: string;
  name: string;
  label: string;
  budgetBracket: "buget_10k" | "buget_10k_to_20k" | "buget_20k_to_30k" | "buget_30k_to_40k" | "budget_10k_to_budget_30k" | "budget_30k_to_budget_50k" | "budget_50k_to_budget_70k" | string;
  budgetLabel: string;
  price: number;
  image_url: string;
  extracted_image_url?: string;
  dimensions: {
    length_ft: number;
    width_ft: number;
    height_ft?: number;
  };
  material?: string;
  description?: string;
}

export interface FurnitureCategory {
  key: string;
  label: string;
  icon: string;
  suggestedPlacements: string[];
  description: string;
}

export const DATASET_CATEGORIES: FurnitureCategory[] = [
  {
    key: "bed",
    label: "Bed",
    icon: "🛏️",
    suggestedPlacements: ["Center Wall", "Master Bedroom Focus"],
    description: "Solid wood, platform, and upholstered designer beds from the dataset",
  },
  {
    key: "study_table",
    label: "Study Table",
    icon: "💻",
    suggestedPlacements: ["Study Corner", "Window Wall", "Work Nook"],
    description: "Ergonomic study tables, desks, and workstations with transparent background",
  },
  {
    key: "lamp",
    label: "Night Lamp",
    icon: "💡",
    suggestedPlacements: ["Bedside Corner", "Reading Corner"],
    description: "Warm ambient and bedside lighting fixtures",
  },
  {
    key: "side_table",
    label: "Side Table",
    icon: "🪵",
    suggestedPlacements: ["Left Bedside", "Right Bedside", "Lounge Side"],
    description: "Solid wood, marble, and contemporary bedside & accent tables",
  },
  {
    key: "chair",
    label: "Accent Chair",
    icon: "🪑",
    suggestedPlacements: ["Accent Corner", "Desk Seating", "Reading Area"],
    description: "Ergonomic, accent, and lounge chairs from the dataset",
  },
];

export const BUDGET_TIERS = [
  { key: "buget_10k", label: "Under ₹10,000", min: 0, max: 10000, desc: "Budget Friendly" },
  { key: "buget_10k_to_20k", label: "₹10,000 - ₹20,000", min: 10000, max: 20000, desc: "Popular Essential" },
  { key: "buget_20k_to_30k", label: "₹20,000 - ₹30,000", min: 20000, max: 30000, desc: "Premium Comfort" },
  { key: "buget_30k_to_40k", label: "₹30,000 - ₹40,000+", min: 30000, max: 1000000, desc: "Luxury Suite" },
];

export const TABLE_BUDGET_TIERS = [
  { key: "buget_10k", label: "₹1–₹10,000", min: 1, max: 10000, desc: "table/budget_10k/" },
  { key: "buget_10k_to_20k", label: "₹10,000–₹20,000", min: 10000, max: 20000, desc: "table/budget_10k_to_20k/" },
  { key: "buget_20k_to_30k", label: "₹20,000–₹30,000", min: 20000, max: 30000, desc: "table/budget_20k_to_30k/" },
];

export const WARDROBE_BUDGET_TIERS = [
  { key: "budget_10k_to_budget_30k", label: "₹10,000–₹30,000", min: 10000, max: 30000, desc: "wardrobe/budget_10k_to_budget_30k/" },
  { key: "budget_30k_to_budget_50k", label: "₹30,000–₹50,000", min: 30000, max: 50000, desc: "wardrobe/budget_30k_to_budget_50k/" },
  { key: "budget_50k_to_budget_70k", label: "₹50,000–₹70,000", min: 50000, max: 70000, desc: "wardrobe/budget_50k_to_budget_70k/" },
];

export function getBudgetTiersForCategory(category?: string) {
  const norm = (category || "").toLowerCase().trim();
  if (norm === "table") {
    return TABLE_BUDGET_TIERS;
  }
  if (norm === "wardrobe") {
    return WARDROBE_BUDGET_TIERS;
  }
  return BUDGET_TIERS;
}

export const REAL_FURNITURE_DATASET: DatasetFurnitureItem[] = [
  // ==========================================
  // BEDS - FROM furniture_dataset/bed/buget_10k
  // ==========================================
  {
    id: "bed_10k_1",
    category: "bed",
    name: "bed",
    label: "Minimalist Modern Platform Bed",
    budgetBracket: "buget_10k",
    budgetLabel: "Under ₹10,000",
    price: 8500,
    image_url: "/furniture_dataset/bed/buget_10k/bed1.jpeg",
    dimensions: { length_ft: 6.5, width_ft: 5.0, height_ft: 2.8 },
    material: "Engineered Wood & Teak Finish",
    description: "Sleek low-profile platform bed with minimalist aesthetic and sturdy reinforced frame.",
  },
  {
    id: "bed_10k_2",
    category: "bed",
    name: "bed",
    label: "Contemporary Oak Single / Double Bed",
    budgetBracket: "buget_10k",
    budgetLabel: "Under ₹10,000",
    price: 9200,
    image_url: "/furniture_dataset/bed/buget_10k/bed2.jpg",
    dimensions: { length_ft: 6.5, width_ft: 4.5, height_ft: 3.0 },
    material: "Natural Wood Grain Finish",
    description: "Compact, durable bed designed for space-conscious modern bedrooms.",
  },
  {
    id: "bed_10k_3",
    category: "bed",
    name: "bed",
    label: "Urban Compact Solid Bed",
    budgetBracket: "buget_10k",
    budgetLabel: "Under ₹10,000",
    price: 9800,
    image_url: "/furniture_dataset/bed/buget_10k/bed3.jpg",
    dimensions: { length_ft: 6.5, width_ft: 5.0, height_ft: 3.2 },
    material: "Solid Pine & Veneer",
    description: "Balanced proportions with warm natural wooden headboard and slat support.",
  },
  {
    id: "bed_10k_4",
    category: "bed",
    name: "bed",
    label: "Low-Profile Studio Bed",
    budgetBracket: "buget_10k",
    budgetLabel: "Under ₹10,000",
    price: 9999,
    image_url: "/furniture_dataset/bed/buget_10k/bed4.jpg",
    dimensions: { length_ft: 6.5, width_ft: 5.0, height_ft: 2.9 },
    material: "High-Grade Engineered Core",
    description: "Streamlined low platform bed ideal for studio apartments and guest bedrooms.",
  },

  // ==================================================
  // BEDS - FROM furniture_dataset/bed/buget_10k_to_20k
  // ==================================================
  {
    id: "bed_20k_1",
    category: "bed",
    name: "bed",
    label: "Nordic Upholstered Queen Bed",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000 - ₹20,000",
    price: 14500,
    image_url: "/furniture_dataset/bed/buget_10k_to_20k/bed3.jpg",
    dimensions: { length_ft: 6.5, width_ft: 5.5, height_ft: 3.4 },
    material: "Soft Grey Linen Fabric",
    description: "Padded headboard queen bed offering relaxed ergonomic comfort and modern style.",
  },
  {
    id: "bed_20k_2",
    category: "bed",
    name: "bed",
    label: "Urban Loft Designer Bed",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000 - ₹20,000",
    price: 16900,
    image_url: "/furniture_dataset/bed/buget_10k_to_20k/bed4.jpg",
    dimensions: { length_ft: 6.6, width_ft: 5.5, height_ft: 3.5 },
    material: "Solid Teak & Engineered Wood",
    description: "Clean geometric profile with enhanced durability and natural warm wood finish.",
  },
  {
    id: "bed_20k_3",
    category: "bed",
    name: "bed",
    label: "Classic Walnut Slatted Bed",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000 - ₹20,000",
    price: 18200,
    image_url: "/furniture_dataset/bed/buget_10k_to_20k/bed5.jpg",
    dimensions: { length_ft: 6.6, width_ft: 5.5, height_ft: 3.6 },
    material: "Walnut Wood Finish",
    description: "Elegant headboard slats with balanced proportions for serene bedroom spaces.",
  },
  {
    id: "bed_20k_4",
    category: "bed",
    name: "bed",
    label: "Scandinavian Comfort King Bed",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000 - ₹20,000",
    price: 19500,
    image_url: "/furniture_dataset/bed/buget_10k_to_20k/bed6.jpg",
    dimensions: { length_ft: 6.8, width_ft: 6.0, height_ft: 3.6 },
    material: "Solid Hardwood",
    description: "Spacious Scandinavian king bed frame crafted for luxurious resting space.",
  },

  // ==================================================
  // BEDS - FROM furniture_dataset/bed/buget_20k_to_30k
  // ==================================================
  {
    id: "bed_30k_1",
    category: "bed",
    name: "bed",
    label: "Deluxe Tufted Fabric Queen Bed",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000 - ₹30,000",
    price: 22000,
    image_url: "/furniture_dataset/bed/buget_20k_to_30k/bed3.jpg",
    dimensions: { length_ft: 6.6, width_ft: 5.5, height_ft: 3.8 },
    material: "Premium Velvet Upholstery",
    description: "High-density cushioned headboard with premium tailored stitching.",
  },
  {
    id: "bed_30k_2",
    category: "bed",
    name: "bed",
    label: "Elegance Natural Oak Storage Bed",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000 - ₹30,000",
    price: 24500,
    image_url: "/furniture_dataset/bed/buget_20k_to_30k/bed4.jpg",
    dimensions: { length_ft: 6.6, width_ft: 5.8, height_ft: 3.8 },
    material: "Oak & Hydraulic Storage Lift",
    description: "Ample under-bed hydraulic storage with seamless wooden craftsmanship.",
  },
  {
    id: "bed_30k_3",
    category: "bed",
    name: "bed",
    label: "Executive Headboard Suite Bed",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000 - ₹30,000",
    price: 27000,
    image_url: "/furniture_dataset/bed/buget_20k_to_30k/bed5.jpg",
    dimensions: { length_ft: 6.8, width_ft: 6.0, height_ft: 4.0 },
    material: "Solid Walnut & Fabric Inlay",
    description: "Architectural tall headboard suite providing regal presence in master bedrooms.",
  },
  {
    id: "bed_30k_4",
    category: "bed",
    name: "bed",
    label: "Modern Silhouette King Bed",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000 - ₹30,000",
    price: 28500,
    image_url: "/furniture_dataset/bed/buget_20k_to_30k/bed6.jpg",
    dimensions: { length_ft: 6.8, width_ft: 6.2, height_ft: 4.0 },
    material: "High Density Wood Core",
    description: "Refined linear aesthetics paired with reinforced heavy-duty mattress support.",
  },
  {
    id: "bed_30k_5",
    category: "bed",
    name: "bed",
    label: "Wingback Premium Master Bed",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000 - ₹30,000",
    price: 29900,
    image_url: "/furniture_dataset/bed/buget_20k_to_30k/bed7.jpg",
    dimensions: { length_ft: 6.8, width_ft: 6.2, height_ft: 4.2 },
    material: "Wingback Upholstered Velvet",
    description: "Iconic wingback side profile creating an inviting luxury haven.",
  },

  // ==================================================
  // BEDS - FROM furniture_dataset/bed/buget_30k_to_40k
  // ==================================================
  {
    id: "bed_40k_1",
    category: "bed",
    name: "bed",
    label: "Signature Imperial King Suite Bed",
    budgetBracket: "buget_30k_to_40k",
    budgetLabel: "₹30,000 - ₹40,000+",
    price: 32500,
    image_url: "/furniture_dataset/bed/buget_30k_to_40k/bed8.png",
    dimensions: { length_ft: 7.0, width_ft: 6.4, height_ft: 4.4 },
    material: "Solid Sheesham & Suede Velvet",
    description: "High-end designer bed with floating base illusion and ambient warmth.",
  },
  {
    id: "bed_40k_2",
    category: "bed",
    name: "bed",
    label: "Royal Velvet Curved Headboard Bed",
    budgetBracket: "buget_30k_to_40k",
    budgetLabel: "₹30,000 - ₹40,000+",
    price: 34800,
    image_url: "/furniture_dataset/bed/buget_30k_to_40k/bed9.jpg",
    dimensions: { length_ft: 7.0, width_ft: 6.4, height_ft: 4.5 },
    material: "Italian Velvet & Brass Accents",
    description: "Sculptural curved headboard with opulent hand-tufted finish.",
  },
  {
    id: "bed_40k_3",
    category: "bed",
    name: "bed",
    label: "Grand Masterclass Storage King Bed",
    budgetBracket: "buget_30k_to_40k",
    budgetLabel: "₹30,000 - ₹40,000+",
    price: 36900,
    image_url: "/furniture_dataset/bed/buget_30k_to_40k/bed10.jpg",
    dimensions: { length_ft: 7.0, width_ft: 6.5, height_ft: 4.5 },
    material: "Solid Teak & Quilted Leatherette",
    description: "Integrated soft-close storage drawers with whisper-quiet hydraulic mechanism.",
  },
  {
    id: "bed_40k_4",
    category: "bed",
    name: "bed",
    label: "Milano Leatherette Luxury Bed",
    budgetBracket: "buget_30k_to_40k",
    budgetLabel: "₹30,000 - ₹40,000+",
    price: 38500,
    image_url: "/furniture_dataset/bed/buget_30k_to_40k/bed11.jpg",
    dimensions: { length_ft: 7.0, width_ft: 6.5, height_ft: 4.6 },
    material: "Top-Grain Eco-Leather",
    description: "Ultra-luxurious Italian-inspired minimalist silhouette with plush cushioning.",
  },
  {
    id: "bed_40k_5",
    category: "bed",
    name: "bed",
    label: "Architectural Sovereign King Bed",
    budgetBracket: "buget_30k_to_40k",
    budgetLabel: "₹30,000 - ₹40,000+",
    price: 39999,
    image_url: "/furniture_dataset/bed/buget_30k_to_40k/bed12.jpg",
    dimensions: { length_ft: 7.2, width_ft: 6.6, height_ft: 4.8 },
    material: "Solid Hardwood & Brushed Champagne Accents",
    description: "Masterpiece centerpiece bed designed for expansive luxury bedrooms.",
  },

  // ========================================================
  // TABLES - FROM furniture_dataset/table/
  // ========================================================
  // Range 1: ₹1–₹10,000 → table/budget_10k/
  {
    id: "table_10k_1",
    category: "table",
    name: "table",
    label: "Scandinavian Floating Oak Table",
    budgetBracket: "buget_10k",
    budgetLabel: "₹1–₹10,000",
    price: 3400,
    image_url: "/furniture_dataset/table/buget_10k/table1.jpg",
    extracted_image_url: "/furniture_dataset/extracted_tables/extracted_buget_10k_table1_jpg.png",
    dimensions: { length_ft: 2.2, width_ft: 1.8, height_ft: 1.6 },
    material: "Natural Oak & Smooth Glide Drawer",
    description: "Space-efficient table with soft-close drawer and lower storage shelf.",
  },
  {
    id: "table_10k_2",
    category: "table",
    name: "table",
    label: "Contemporary Walnut Low Table",
    budgetBracket: "buget_10k",
    budgetLabel: "₹1–₹10,000",
    price: 4800,
    image_url: "/furniture_dataset/table/buget_10k/table2.jpg",
    extracted_image_url: "/furniture_dataset/extracted_tables/extracted_buget_10k_table2_jpg.png",
    dimensions: { length_ft: 2.4, width_ft: 2.0, height_ft: 1.8 },
    material: "Solid Walnut & Brass Handle",
    description: "Refined low accent table with dual drawers for streamlined organization.",
  },
  {
    id: "table_10k_3",
    category: "table",
    name: "table",
    label: "Minimalist Dual-Shelf Lounge Table",
    budgetBracket: "buget_10k",
    budgetLabel: "₹1–₹10,000",
    price: 6500,
    image_url: "/furniture_dataset/table/buget_10k/table4.jpg",
    extracted_image_url: "/furniture_dataset/extracted_tables/extracted_buget_10k_table4_jpg.png",
    dimensions: { length_ft: 2.5, width_ft: 2.0, height_ft: 1.8 },
    material: "Matte Lacquer & Engineered Core",
    description: "Clean modern table offering dual open storage compartments.",
  },
  {
    id: "table_10k_4",
    category: "table",
    name: "table",
    label: "Solid Teakwood Handcrafted Table",
    budgetBracket: "buget_10k",
    budgetLabel: "₹1–₹10,000",
    price: 7800,
    image_url: "/furniture_dataset/table/buget_10k/table5.jpeg",
    extracted_image_url: "/furniture_dataset/extracted_tables/extracted_buget_10k_table5_jpeg.png",
    dimensions: { length_ft: 2.6, width_ft: 2.2, height_ft: 1.9 },
    material: "Handcrafted Solid Teak Wood",
    description: "Sturdy handcrafted teak table with rich natural grain finish.",
  },
  {
    id: "table_10k_5",
    category: "table",
    name: "table",
    label: "Modern Wooden Accent Table",
    budgetBracket: "buget_10k",
    budgetLabel: "₹1–₹10,000",
    price: 8500,
    image_url: "/furniture_dataset/table/buget_10k/table7.jpeg",
    extracted_image_url: "/furniture_dataset/extracted_tables/extracted_buget_10k_table7_jpeg.png",
    dimensions: { length_ft: 2.8, width_ft: 2.2, height_ft: 1.8 },
    material: "Hardwood & Brass Trim",
    description: "Warm-toned wooden accent table fitting smoothly into bedroom and lounge areas.",
  },
  {
    id: "table_10k_6",
    category: "table",
    name: "table",
    label: "Streamlined Storage Center Table",
    budgetBracket: "buget_10k",
    budgetLabel: "₹1–₹10,000",
    price: 9200,
    image_url: "/furniture_dataset/table/buget_10k/table8.jpeg",
    extracted_image_url: "/furniture_dataset/extracted_tables/extracted_buget_10k_table8_jpeg.png",
    dimensions: { length_ft: 3.0, width_ft: 2.0, height_ft: 1.8 },
    material: "Engineered Wood with Oak Veneer",
    description: "Multi-compartment storage table with seamless magnetic drawer latch.",
  },

  // Range 2: ₹10,000–₹20,000 → table/budget_10k_to_20k/
  {
    id: "table_20k_1",
    category: "table",
    name: "table",
    label: "Luxury Carrara Marble Center Table",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000–₹20,000",
    price: 12500,
    image_url: "/furniture_dataset/table/buget_10k_to_20k/table5.jpeg",
    extracted_image_url: "/furniture_dataset/extracted_tables/extracted_buget_10k_to_20k_table5_jpeg.png",
    dimensions: { length_ft: 3.2, width_ft: 2.2, height_ft: 1.7 },
    material: "White Carrara Marble & Gold Steel",
    description: "Premium natural stone table adding instant luxury and elegance to room.",
  },
  {
    id: "table_20k_2",
    category: "table",
    name: "table",
    label: "Mid-Century Modern Sculpted Table",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000–₹20,000",
    price: 14200,
    image_url: "/furniture_dataset/table/buget_10k_to_20k/table6.jpg",
    extracted_image_url: "/furniture_dataset/extracted_tables/extracted_buget_10k_to_20k_table6_jpg.png",
    dimensions: { length_ft: 3.4, width_ft: 2.2, height_ft: 1.8 },
    material: "American Walnut & Tapered Legs",
    description: "Iconic mid-century silhouette featuring deep drawer and angled solid legs.",
  },
  {
    id: "table_20k_3",
    category: "table",
    name: "table",
    label: "Nordic Dual-Tier Architectural Table",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000–₹20,000",
    price: 16500,
    image_url: "/furniture_dataset/table/buget_10k_to_20k/table7.jpg",
    extracted_image_url: "/furniture_dataset/extracted_tables/extracted_buget_10k_to_20k_table7_jpg.png",
    dimensions: { length_ft: 3.5, width_ft: 2.4, height_ft: 1.8 },
    material: "Solid Bleached Oak & Smoked Glass",
    description: "Architectural two-tier piece with hidden cable routing and sleek profile.",
  },
  {
    id: "table_20k_4",
    category: "table",
    name: "table",
    label: "Artisan Solid Cane & Oak Table",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000–₹20,000",
    price: 18500,
    image_url: "/furniture_dataset/table/buget_10k_to_20k/table 10.jpg",
    extracted_image_url: "/furniture_dataset/extracted_tables/extracted_buget_10k_to_20k_table_10_jpg.png",
    dimensions: { length_ft: 3.3, width_ft: 2.2, height_ft: 1.8 },
    material: "Woven Natural Cane & Solid Oak",
    description: "Artisan woven cane drawer front bringing organic texture and warmth.",
  },

  // Range 3: ₹20,000–₹30,000 → table/budget_20k_to_30k/
  {
    id: "table_30k_1",
    category: "table",
    name: "table",
    label: "Executive Brushed Gold & Fluted Walnut Table",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000–₹30,000",
    price: 22000,
    image_url: "/furniture_dataset/table/buget_20k_to_30k/table10.jpeg",
    extracted_image_url: "/furniture_dataset/extracted_tables/extracted_buget_20k_to_30k_table10_jpeg.png",
    dimensions: { length_ft: 3.6, width_ft: 2.4, height_ft: 1.8 },
    material: "Solid Dark Walnut & Satin Brass Base",
    description: "High-end bespoke table with satin brass base and velvet-lined drawer.",
  },
  {
    id: "table_30k_2",
    category: "table",
    name: "table",
    label: "Sculptural Italian Travertine Statement Table",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000–₹30,000",
    price: 25500,
    image_url: "/furniture_dataset/table/buget_20k_to_30k/table13.jpeg",
    extracted_image_url: "/furniture_dataset/extracted_tables/extracted_buget_20k_to_30k_table13_jpeg.png",
    dimensions: { length_ft: 3.8, width_ft: 2.5, height_ft: 1.7 },
    material: "Natural Honed Travertine Stone",
    description: "Monolithic architectural statement table cut from natural travertine stone.",
  },
  {
    id: "table_30k_3",
    category: "table",
    name: "table",
    label: "Luxury Quartz & Champagne Bronze Center Table",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000–₹30,000",
    price: 28500,
    image_url: "/furniture_dataset/table/buget_20k_to_30k/table 14.jpg",
    extracted_image_url: "/furniture_dataset/extracted_tables/extracted_buget_20k_to_30k_table_14_jpg.png",
    dimensions: { length_ft: 4.0, width_ft: 2.6, height_ft: 1.8 },
    material: "Engineered Calacatta Quartz & Bronze",
    description: "Stain-resistant quartz top paired with architectural champagne bronze pillars.",
  },

  // ========================================================
  // STUDY TABLES (100% TRANSPARENT BACKGROUND - NO ARTIFACTS)
  // ========================================================
  // Tier 1: Under ₹10,000 (buget_10k)
  {
    id: "study_table_10k_1",
    category: "study_table",
    name: "study_table",
    label: "Minimalist Solid Oak Study Desk",
    budgetBracket: "buget_10k",
    budgetLabel: "Under ₹10,000",
    price: 4800,
    image_url: "/furniture_dataset/study_table/study_table_1.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_1.png",
    dimensions: { length_ft: 3.8, width_ft: 2.0, height_ft: 2.5 },
    material: "Solid Oak & Smooth-Glide Drawer",
    description: "Sleek ergonomic study desk with integrated drawer, tapered solid oak legs, and clean writing surface.",
  },
  {
    id: "study_table_10k_2",
    category: "study_table",
    name: "study_table",
    label: "Compact Multi-Tier Bookshelf Study Table",
    budgetBracket: "buget_10k",
    budgetLabel: "Under ₹10,000",
    price: 6500,
    image_url: "/furniture_dataset/study_table/study_table_compact_shelf.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_compact_shelf.png",
    dimensions: { length_ft: 4.0, width_ft: 1.8, height_ft: 3.8 },
    material: "Engineered Wood & White Powder-Coated Metal",
    description: "Multi-functional study station featuring integrated vertical bookshelf racks and bottom organizer tray.",
  },
  {
    id: "study_table_10k_3",
    category: "study_table",
    name: "study_table",
    label: "Industrial Matte Frame Study Table",
    budgetBracket: "buget_10k",
    budgetLabel: "Under ₹10,000",
    price: 7200,
    image_url: "/furniture_dataset/study_table/study_table_industrial.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_industrial.png",
    dimensions: { length_ft: 4.2, width_ft: 2.0, height_ft: 2.5 },
    material: "Reinforced Alloy Steel & Rustic Oak Top",
    description: "Robust industrial study table with double book storage tiers and reinforced heavy-duty metal chassis.",
  },
  {
    id: "study_table_10k_4",
    category: "study_table",
    name: "study_table",
    label: "Modern Dual-Drawer White Study Desk",
    budgetBracket: "buget_10k",
    budgetLabel: "Under ₹10,000",
    price: 8400,
    image_url: "/furniture_dataset/study_table/study_table_white_drawers.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_white_drawers.png",
    dimensions: { length_ft: 4.0, width_ft: 2.0, height_ft: 2.5 },
    material: "Matte White Lacquer & Beech Wood Legs",
    description: "Contemporary Scandinavian white study desk with brass edge pulls and two smooth organizer drawers.",
  },
  {
    id: "study_table_10k_5",
    category: "study_table",
    name: "study_table",
    label: "Space-Saving Wall-Mounted Floating Study Desk",
    budgetBracket: "buget_10k",
    budgetLabel: "Under ₹10,000",
    price: 5900,
    image_url: "/furniture_dataset/study_table/study_table_floating.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_floating.png",
    dimensions: { length_ft: 3.2, width_ft: 1.6, height_ft: 1.8 },
    material: "Natural Oak Veneer & Heavy-Duty Wall Anchors",
    description: "Foldaway floating wall study desk with interior stationery dividers and drop-down work surface.",
  },
  {
    id: "study_table_10k_6",
    category: "study_table",
    name: "study_table",
    label: "Natural Bleached Oak Compact Study Desk",
    budgetBracket: "buget_10k",
    budgetLabel: "Under ₹10,000",
    price: 9200,
    image_url: "/furniture_dataset/study_table/study_table_bleached_oak.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_bleached_oak.png",
    dimensions: { length_ft: 3.8, width_ft: 2.0, height_ft: 2.5 },
    material: "Solid Bleached Oak Hardwood",
    description: "Clean architectural study table crafted with minimalist wooden joinery and scratch-resistant satin top.",
  },

  // Tier 2: ₹10,000 - ₹20,000 (buget_10k_to_20k)
  {
    id: "study_table_20k_1",
    category: "study_table",
    name: "study_table",
    label: "Handcrafted Solid Sheesham Study Desk with Drawers",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000 - ₹20,000",
    price: 13500,
    image_url: "/furniture_dataset/study_table/study_table_sheesham.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_sheesham.png",
    dimensions: { length_ft: 4.2, width_ft: 2.2, height_ft: 2.6 },
    material: "Solid Sheesham Wood & Antique Brass Handles",
    description: "Authentic handcrafted Indian Rosewood study table with three spacious storage drawers and natural grain finish.",
  },
  {
    id: "study_table_20k_2",
    category: "study_table",
    name: "study_table",
    label: "Artisan Teak Study Table with Brass Cup Handles",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000 - ₹20,000",
    price: 15800,
    image_url: "/furniture_dataset/study_table/study_table_antique_brass_teak.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_antique_brass_teak.png",
    dimensions: { length_ft: 4.4, width_ft: 2.2, height_ft: 2.6 },
    material: "Solid Teakwood & Antique Brass Hardware",
    description: "Heritage solid wood study workstation featuring side pedestal storage and smooth dovetail drawer construction.",
  },
  {
    id: "study_table_20k_3",
    category: "study_table",
    name: "study_table",
    label: "Nordic Amber Birch Ergonomic Workstation",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000 - ₹20,000",
    price: 12900,
    image_url: "/furniture_dataset/study_table/study_table_nordic_amber.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_nordic_amber.png",
    dimensions: { length_ft: 4.2, width_ft: 2.2, height_ft: 2.5 },
    material: "Natural Amber Birch Wood & Hidden Wire Channel",
    description: "Ergonomic study desk designed with subtle curved front edge, integrated cord management, and warm lacquer.",
  },
  {
    id: "study_table_20k_4",
    category: "study_table",
    name: "study_table",
    label: "Scandinavian Beech Bookshelf Tower Study Table",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000 - ₹20,000",
    price: 14200,
    image_url: "/furniture_dataset/study_table/study_table_scandi_beech_shelf.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_scandi_beech_shelf.png",
    dimensions: { length_ft: 4.5, width_ft: 2.0, height_ft: 4.0 },
    material: "Solid Beech & High-Density Core",
    description: "Modern workstation with tall vertical bookshelf tower, stationery shelf, and wide writing desk.",
  },
  {
    id: "study_table_20k_5",
    category: "study_table",
    name: "study_table",
    label: "Rustic Graphite Timber Study Workstation",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000 - ₹20,000",
    price: 16500,
    image_url: "/furniture_dataset/study_table/study_table_rustic_graphite.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_rustic_graphite.png",
    dimensions: { length_ft: 4.5, width_ft: 2.2, height_ft: 2.6 },
    material: "Smoked Oak & Graphite Steel Chassis",
    description: "Contemporary urban study table featuring dual open shelves for books, laptop, and stationery.",
  },
  {
    id: "study_table_20k_6",
    category: "study_table",
    name: "study_table",
    label: "Classic Oak Writing & Computer Study Table",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000 - ₹20,000",
    price: 18400,
    image_url: "/furniture_dataset/study_table/study_table_oak_minimal.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_oak_minimal.png",
    dimensions: { length_ft: 4.6, width_ft: 2.2, height_ft: 2.5 },
    material: "Kiln-Dried American Oak",
    description: "Premium wide-top study table crafted with reinforced apron and water-resistant protective lacquer.",
  },

  // Tier 3: ₹20,000 - ₹30,000 (buget_20k_to_30k)
  {
    id: "study_table_30k_1",
    category: "study_table",
    name: "study_table",
    label: "Executive Espresso Walnut Study Desk",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000 - ₹30,000",
    price: 22500,
    image_url: "/furniture_dataset/study_table/study_table_espresso_walnut.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_espresso_walnut.png",
    dimensions: { length_ft: 4.8, width_ft: 2.4, height_ft: 2.6 },
    material: "American Walnut & Brushed Brass Accent",
    description: "Executive study desk with rich espresso finish, concealed cable management, and velvet-lined drawer.",
  },
  {
    id: "study_table_30k_2",
    category: "study_table",
    name: "study_table",
    label: "Rosewood Artisan 3-Drawer Executive Study Table",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000 - ₹30,000",
    price: 24800,
    image_url: "/furniture_dataset/study_table/study_table_rosewood_artisan.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_rosewood_artisan.png",
    dimensions: { length_ft: 4.8, width_ft: 2.4, height_ft: 2.6 },
    material: "Solid Natural Rosewood & Antiqued Brass Handles",
    description: "Heirloom-grade solid rosewood study table with 3 deep storage drawers and hand-rubbed oil finish.",
  },
  {
    id: "study_table_30k_3",
    category: "study_table",
    name: "study_table",
    label: "Matte Black Dual-Drawer Architect Study Desk",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000 - ₹30,000",
    price: 26500,
    image_url: "/furniture_dataset/study_table/study_table_matte_black_drawers.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_matte_black_drawers.png",
    dimensions: { length_ft: 5.0, width_ft: 2.4, height_ft: 2.6 },
    material: "Satin Matte Black Lacquer & Gold Accents",
    description: "Architectural study desk offering sleek geometric silhouette, soft-close hardware, and satin brass pulls.",
  },
  {
    id: "study_table_30k_4",
    category: "study_table",
    name: "study_table",
    label: "Vintage Mahogany Writing & Study Desk",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000 - ₹30,000",
    price: 28200,
    image_url: "/furniture_dataset/study_table/study_table_vintage_mahogany.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_vintage_mahogany.png",
    dimensions: { length_ft: 4.8, width_ft: 2.4, height_ft: 2.6 },
    material: "Solid Mahogany Hardwood",
    description: "Refined vintage study desk featuring classical turned legs and spacious surface for multi-monitor setups.",
  },
  {
    id: "study_table_30k_5",
    category: "study_table",
    name: "study_table",
    label: "Warm Natural Teak Professional Study Table",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000 - ₹30,000",
    price: 23900,
    image_url: "/furniture_dataset/study_table/study_table_warm_teak.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_warm_teak.png",
    dimensions: { length_ft: 4.6, width_ft: 2.4, height_ft: 2.6 },
    material: "Selected Grade-A Teakwood",
    description: "Premium study table boasting rich warm golden-brown teak grain, ergonomic rounded edges, and heavy solid build.",
  },
  {
    id: "study_table_30k_6",
    category: "study_table",
    name: "study_table",
    label: "Floating Dark Oak Minimalist Executive Desk",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000 - ₹30,000",
    price: 21900,
    image_url: "/furniture_dataset/study_table/study_table_floating_dark_oak.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_floating_dark_oak.png",
    dimensions: { length_ft: 4.0, width_ft: 1.8, height_ft: 1.8 },
    material: "Smoked Dark Oak & Concealed Heavy Brackets",
    description: "Contemporary floating executive study desk with hidden push-to-open organizer cubbies and clean floor clearance.",
  },

  // Tier 4: ₹30,000 - ₹40,000+ (buget_30k_to_40k)
  {
    id: "study_table_40k_1",
    category: "study_table",
    name: "study_table",
    label: "Executive Charcoal Walnut Presidential Study Desk",
    budgetBracket: "buget_30k_to_40k",
    budgetLabel: "₹30,000 - ₹40,000+",
    price: 34500,
    image_url: "/furniture_dataset/study_table/study_table_executive_charcoal.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_executive_charcoal.png",
    dimensions: { length_ft: 5.5, width_ft: 2.6, height_ft: 2.6 },
    material: "Charcoal Stained Walnut & Matte Black Steel",
    description: "Presidential executive study workstation with wide workspace, cable grommets, and dual storage bays.",
  },
  {
    id: "study_table_40k_2",
    category: "study_table",
    name: "study_table",
    label: "Raw Steel & Timber Architectural Study Battlestation",
    budgetBracket: "buget_30k_to_40k",
    budgetLabel: "₹30,000 - ₹40,000+",
    price: 32800,
    image_url: "/furniture_dataset/study_table/study_table_raw_steel_timber.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_raw_steel_timber.png",
    dimensions: { length_ft: 5.4, width_ft: 2.6, height_ft: 2.6 },
    material: "Hand-Welded Steel & Solid Reclaimed Hardwood",
    description: "Architectural study battlestation with expansive desk area, lower reference bookshelf, and industrial aesthetic.",
  },
  {
    id: "study_table_40k_3",
    category: "study_table",
    name: "study_table",
    label: "Nordic Heritage Solid Wood Master Study Desk",
    budgetBracket: "buget_30k_to_40k",
    budgetLabel: "₹30,000 - ₹40,000+",
    price: 36900,
    image_url: "/furniture_dataset/study_table/study_table_nordic_wood.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_nordic_wood.png",
    dimensions: { length_ft: 5.2, width_ft: 2.6, height_ft: 2.6 },
    material: "Solid Scandinavian Hardwood & Satin Lacquer",
    description: "Master study desk featuring traditional mortise and tenon joinery, expansive writing depth, and refined durability.",
  },
  {
    id: "study_table_40k_4",
    category: "study_table",
    name: "study_table",
    label: "Soft Grey Atelier Designer Study Desk",
    budgetBracket: "buget_30k_to_40k",
    budgetLabel: "₹30,000 - ₹40,000+",
    price: 35200,
    image_url: "/furniture_dataset/study_table/study_table_soft_grey_minimal.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_soft_grey_minimal.png",
    dimensions: { length_ft: 5.0, width_ft: 2.5, height_ft: 2.6 },
    material: "Custom Atelier Grey Finish & Brushed Brass",
    description: "Designer study desk with dual quiet-glide storage compartments, wireless charging cutout, and champagne brass legs.",
  },
  {
    id: "study_table_40k_5",
    category: "study_table",
    name: "study_table",
    label: "Dark Walnut Deluxe Writing & Study Desk",
    budgetBracket: "buget_30k_to_40k",
    budgetLabel: "₹30,000 - ₹40,000+",
    price: 38500,
    image_url: "/furniture_dataset/study_table/study_table_dark_walnut.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_dark_walnut.png",
    dimensions: { length_ft: 5.6, width_ft: 2.6, height_ft: 2.6 },
    material: "Prime Dark Walnut & Hand-Polished Wax Finish",
    description: "Opulent executive study table offering luxury proportions, deep rich walnut grain, and dual organizers.",
  },
  {
    id: "study_table_40k_6",
    category: "study_table",
    name: "study_table",
    label: "Bespoke Classic Writing & Study Station",
    budgetBracket: "buget_30k_to_40k",
    budgetLabel: "₹30,000 - ₹40,000+",
    price: 39900,
    image_url: "/furniture_dataset/study_table/study_table_classic_writing.png",
    extracted_image_url: "/furniture_dataset/study_table/study_table_classic_writing.png",
    dimensions: { length_ft: 5.5, width_ft: 2.6, height_ft: 2.6 },
    material: "Solid Hardwood with Fluted Legs",
    description: "Flagship luxury study station custom-built for high-productivity workspaces and executive home offices.",
  },

  // ==========================================
  // LAMPS - FROM furniture_dataset/lamp/
  // ==========================================
  // Tier 1: Under ₹10,000
  {
    id: "lamp_10k_1",
    category: "lamp",
    name: "lamp",
    label: "Nordic Minimalist Ceramic Bedside Lamp",
    budgetBracket: "buget_10k",
    budgetLabel: "Under ₹10,000",
    price: 1850,
    image_url: "/furniture_dataset/lamp/buget_10k/lamp1.jpg",
    dimensions: { length_ft: 1.0, width_ft: 1.0, height_ft: 1.6 },
    material: "Ceramic & Linen Shade",
    description: "Warm 2700K ambient bedside glow with natural textured fabric shade.",
  },
  {
    id: "lamp_10k_2",
    category: "lamp",
    name: "lamp",
    label: "Modern Brass Tripod Ambient Lamp",
    budgetBracket: "buget_10k",
    budgetLabel: "Under ₹10,000",
    price: 3200,
    image_url: "/furniture_dataset/lamp/buget_10k/lamp2.jpg",
    dimensions: { length_ft: 1.2, width_ft: 1.2, height_ft: 2.2 },
    material: "Brushed Brass & Frosted Glass",
    description: "Sculptural brass accent light ideal for corner or bedside illumination.",
  },
  {
    id: "lamp_10k_3",
    category: "lamp",
    name: "lamp",
    label: "Warm Globe Bedside Nightstand Light",
    budgetBracket: "buget_10k",
    budgetLabel: "Under ₹10,000",
    price: 4500,
    image_url: "/furniture_dataset/lamp/buget_10k/lamp3.jpg",
    dimensions: { length_ft: 1.1, width_ft: 1.1, height_ft: 1.8 },
    material: "Opal Glass & Matte Base",
    description: "Soft diffuse globe emitting calming ambient light for peaceful sleep.",
  },
  {
    id: "lamp_10k_4",
    category: "lamp",
    name: "lamp",
    label: "Japanese Paper Lantern Table Lamp",
    budgetBracket: "buget_10k",
    budgetLabel: "Under ₹10,000",
    price: 6800,
    image_url: "/furniture_dataset/lamp/buget_10k/lamp4.png",
    dimensions: { length_ft: 1.2, width_ft: 1.2, height_ft: 2.0 },
    material: "Washi Paper & Bamboo Frame",
    description: "Traditional zen-inspired paper lantern light creating soothing mood warmth.",
  },

  // Tier 2: ₹10,000 - ₹20,000
  {
    id: "lamp_20k_1",
    category: "lamp",
    name: "lamp",
    label: "Designer Sculptural Floor Lamp",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000 - ₹20,000",
    price: 11500,
    image_url: "/furniture_dataset/lamp/buget_10k_to_20k/lamp5.jpg",
    dimensions: { length_ft: 1.5, width_ft: 1.5, height_ft: 5.2 },
    material: "Matte Black Steel & Smoked Glass",
    description: "Statement architectural floor lighting for elevated bedroom corners.",
  },
  {
    id: "lamp_20k_2",
    category: "lamp",
    name: "lamp",
    label: "Smoked Glass Ambient Bedside Fixture",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000 - ₹20,000",
    price: 13800,
    image_url: "/furniture_dataset/lamp/buget_10k_to_20k/lamp7.jpg",
    dimensions: { length_ft: 1.3, width_ft: 1.3, height_ft: 2.4 },
    material: "Smoked Grey Glass & Gold Core",
    description: "Refined geometric bedside fixture with three-step touch dimming.",
  },
  {
    id: "lamp_20k_3",
    category: "lamp",
    name: "lamp",
    label: "Mid-Century Opal Pendant Night Lamp",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000 - ₹20,000",
    price: 15900,
    image_url: "/furniture_dataset/lamp/buget_10k_to_20k/lamp8.jpg",
    dimensions: { length_ft: 1.4, width_ft: 1.4, height_ft: 2.8 },
    material: "Hand-Blown Opaline Glass",
    description: "Mid-century classic night fixture with brushed walnut finial.",
  },

  // Tier 3: ₹20,000 - ₹30,000
  {
    id: "lamp_30k_1",
    category: "lamp",
    name: "lamp",
    label: "Artisan Travertine Cylinder Lamp",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000 - ₹30,000",
    price: 21500,
    image_url: "/furniture_dataset/lamp/buget_20k_to_30k/lamp9.jpg",
    dimensions: { length_ft: 1.4, width_ft: 1.4, height_ft: 2.6 },
    material: "Solid Travertine & Heavy Linen",
    description: "Hand-carved travertine stone base with textured woven linen cylinder shade.",
  },
  {
    id: "lamp_30k_2",
    category: "lamp",
    name: "lamp",
    label: "Contemporary Linear LED Bedside Bar",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000 - ₹30,000",
    price: 24000,
    image_url: "/furniture_dataset/lamp/buget_20k_to_30k/lamp10.jpg",
    dimensions: { length_ft: 1.2, width_ft: 1.2, height_ft: 3.2 },
    material: "Anodized Aerospace Aluminum",
    description: "Minimalist ultra-slim vertical light column with 360-degree ambient diffusion.",
  },
  {
    id: "lamp_30k_3",
    category: "lamp",
    name: "lamp",
    label: "Brushed Bronze Architectural Lamp",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000 - ₹30,000",
    price: 26500,
    image_url: "/furniture_dataset/lamp/buget_20k_to_30k/lamp11.jpg",
    dimensions: { length_ft: 1.5, width_ft: 1.5, height_ft: 3.5 },
    material: "Cast Bronze & Silk Shade",
    description: "Heirloom-quality cast bronze bedside sculpture with raw silk shade.",
  },
  {
    id: "lamp_30k_4",
    category: "lamp",
    name: "lamp",
    label: "Italian Hand-blown Murano Glass Lamp",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000 - ₹30,000",
    price: 28900,
    image_url: "/furniture_dataset/lamp/buget_20k_to_30k/lamp12.jpg",
    dimensions: { length_ft: 1.6, width_ft: 1.6, height_ft: 2.8 },
    material: "Murano Swirl Glass & Brass",
    description: "Authentic Murano glass swirl craftsmanship with warm ambient filament illumination.",
  },

  // Tier 4: ₹30,000 - ₹40,000+
  {
    id: "lamp_40k_1",
    category: "lamp",
    name: "lamp",
    label: "Sovereign Crystal & Gold Chandelier Lamp",
    budgetBracket: "buget_30k_to_40k",
    budgetLabel: "₹30,000 - ₹40,000+",
    price: 32500,
    image_url: "/furniture_dataset/lamp/buget_30k_to_40k/lamp10.png",
    dimensions: { length_ft: 1.8, width_ft: 1.8, height_ft: 3.8 },
    material: "K9 Precision Crystal & 24K Gold Finish",
    description: "Dazzling crystal facet bedside statement piece casting refractive light patterns.",
  },
  {
    id: "lamp_40k_2",
    category: "lamp",
    name: "lamp",
    label: "Sculptural Bronzed Floor Tower Lamp",
    budgetBracket: "buget_30k_to_40k",
    budgetLabel: "₹30,000 - ₹40,000+",
    price: 35000,
    image_url: "/furniture_dataset/lamp/buget_30k_to_40k/lamp12.jpeg",
    dimensions: { length_ft: 1.8, width_ft: 1.8, height_ft: 6.0 },
    material: "Hand-Hammered Bronzed Steel",
    description: "Grand architectural column floor lamp providing master suite focal glow.",
  },
  {
    id: "lamp_40k_3",
    category: "lamp",
    name: "lamp",
    label: "Imperial Marble Base Floor Arc Light",
    budgetBracket: "buget_30k_to_40k",
    budgetLabel: "₹30,000 - ₹40,000+",
    price: 37500,
    image_url: "/furniture_dataset/lamp/buget_30k_to_40k/lamp13.jpg",
    dimensions: { length_ft: 2.2, width_ft: 1.8, height_ft: 6.2 },
    material: "Solid Nero Marquina Marble & Brass Arc",
    description: "Iconic sweeping arc lamp rooted in an 80lb Nero Marquina black marble block.",
  },
  {
    id: "lamp_40k_4",
    category: "lamp",
    name: "lamp",
    label: "Luxury Luminary Atelier Masterpiece",
    budgetBracket: "buget_30k_to_40k",
    budgetLabel: "₹30,000 - ₹40,000+",
    price: 39999,
    image_url: "/furniture_dataset/lamp/buget_30k_to_40k/lamp16.jpg",
    dimensions: { length_ft: 2.0, width_ft: 2.0, height_ft: 5.8 },
    material: "Curved Hand-Finished Brass & Calacatta Marble",
    description: "Limited-edition luxury gallery lighting installation designed for elite penthouses.",
  },

  // ==========================================
  // CHAIRS - FROM furniture_dataset/chair/
  // ==========================================
  // Tier 1: Under ₹10,000
  {
    id: "chair_10k_1",
    category: "chair",
    name: "chair",
    label: "Ergonomic High-Back Study Chair",
    budgetBracket: "buget_10k",
    budgetLabel: "Under ₹10,000",
    price: 6499,
    image_url: "/furniture_dataset/study_chair/study_chair_10k.png",
    extracted_image_url: "/furniture_dataset/study_chair/study_chair_10k.png",
    dimensions: { length_ft: 2.0, width_ft: 2.0, height_ft: 3.8 },
    material: "Breathable Mesh & Heavy-Duty Base",
    description: "High-back ergonomic computer desk chair with lumbar support and smooth casters.",
  },
  {
    id: "chair_10k_2",
    category: "chair",
    name: "chair",
    label: "Velvet Luxury Accent Armchair",
    budgetBracket: "buget_10k",
    budgetLabel: "Under ₹10,000",
    price: 8499,
    image_url: "/furniture_dataset/chair/buget_10k/chair2.jpg",
    dimensions: { length_ft: 2.4, width_ft: 2.4, height_ft: 3.0 },
    material: "Plush Velvet & Gold-Toned Steel",
    description: "Curved barrel back armchair with soft velvet upholstery and tapered brass legs.",
  },
  {
    id: "chair_10k_3",
    category: "chair",
    name: "chair",
    label: "Nordic Minimalist Wooden Stool Chair",
    budgetBracket: "buget_10k",
    budgetLabel: "Under ₹10,000",
    price: 4500,
    image_url: "/furniture_dataset/study_chair/study_chair_10k_nordic.png",
    extracted_image_url: "/furniture_dataset/study_chair/study_chair_10k_nordic.png",
    dimensions: { length_ft: 1.8, width_ft: 1.8, height_ft: 2.6 },
    material: "Solid Natural Ashwood",
    description: "Minimalist Scandinavian wooden chair crafted for bedrooms and vanity spaces.",
  },

  // Tier 2: ₹10,000 - ₹20,000
  {
    id: "chair_20k_1",
    category: "chair",
    name: "chair",
    label: "Pro Ergonomic Gaming & Work Chair",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000 - ₹20,000",
    price: 16990,
    image_url: "/furniture_dataset/study_chair/study_chair_20k.png",
    extracted_image_url: "/furniture_dataset/study_chair/study_chair_20k.png",
    dimensions: { length_ft: 2.2, width_ft: 2.2, height_ft: 4.2 },
    material: "Spandex Fabric & Steel Frame",
    description: "Premium breathable fabric chair with 4D armrests, magnetic neck cushion, and reclining back.",
  },
  {
    id: "chair_20k_2",
    category: "chair",
    name: "chair",
    label: "Plush Comfort Recliner Armchair",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000 - ₹20,000",
    price: 14999,
    image_url: "/furniture_dataset/chair/buget_10k_to_20k/chair5.jpg",
    dimensions: { length_ft: 3.0, width_ft: 2.8, height_ft: 3.3 },
    material: "Pocket Spring & Microfiber",
    description: "Multi-stage manual recliner armchair with padded lumbar support and footrest extension.",
  },
  {
    id: "chair_20k_3",
    category: "chair",
    name: "chair",
    label: "Scandinavian Modern Lounge Chair",
    budgetBracket: "buget_10k_to_20k",
    budgetLabel: "₹10,000 - ₹20,000",
    price: 18500,
    image_url: "/furniture_dataset/chair/buget_10k_to_20k/chair6.jpg",
    dimensions: { length_ft: 2.5, width_ft: 2.5, height_ft: 3.2 },
    material: "Solid Oak & Textured Wool",
    description: "Architectural low-profile lounge chair tailored for relaxed bedroom reading corners.",
  },

  // Tier 3: ₹20,000 - ₹30,000
  {
    id: "chair_30k_1",
    category: "chair",
    name: "chair",
    label: "Mid-Century Artisan Walnut Armchair",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000 - ₹30,000",
    price: 24500,
    image_url: "/furniture_dataset/study_chair/study_chair_30k.png",
    extracted_image_url: "/furniture_dataset/study_chair/study_chair_30k.png",
    dimensions: { length_ft: 2.6, width_ft: 2.6, height_ft: 3.4 },
    material: "Solid Dark Walnut & Top-Grain Leather",
    description: "Sculptural wooden frame with hand-stitched leather seat for master bedrooms and executive study areas.",
  },
  {
    id: "chair_30k_2",
    category: "chair",
    name: "chair",
    label: "Designer Bouclé Lounge Club Chair",
    budgetBracket: "buget_20k_to_30k",
    budgetLabel: "₹20,000 - ₹30,000",
    price: 27900,
    image_url: "/furniture_dataset/chair/buget_20k_to_30k/chair8.jpg",
    dimensions: { length_ft: 2.8, width_ft: 2.8, height_ft: 3.2 },
    material: "Cream Bouclé & Brass Base",
    description: "Ultra-cozy rounded club chair upholstered in cloud-soft textured bouclé fabric.",
  },

  // Tier 4: ₹30,000 - ₹40,000+
  {
    id: "chair_40k_1",
    category: "chair",
    name: "chair",
    label: "Executive Italian Leather Armchair",
    budgetBracket: "buget_30k_to_40k",
    budgetLabel: "₹30,000 - ₹40,000+",
    price: 34500,
    image_url: "/furniture_dataset/study_chair/study_chair_40k.png",
    extracted_image_url: "/furniture_dataset/study_chair/study_chair_40k.png",
    dimensions: { length_ft: 2.8, width_ft: 2.8, height_ft: 3.5 },
    material: "Italian Semi-Aniline Leather",
    description: "Handcrafted masterclass study and lounge chair with deep ergonomic comfort cushioning.",
  },
  {
    id: "chair_40k_2",
    category: "chair",
    name: "chair",
    label: "Imperial Velvet Statement Chair",
    budgetBracket: "buget_30k_to_40k",
    budgetLabel: "₹30,000 - ₹40,000+",
    price: 38900,
    image_url: "/furniture_dataset/chair/buget_30k_to_40k/chair10.jpg",
    dimensions: { length_ft: 3.0, width_ft: 3.0, height_ft: 3.6 },
    material: "Royal Velvet & Hand-Carved Frame",
    description: "Opulent statement wingback chair designed for luxury suites and grand master bedrooms.",
  },

  // ==========================================
  // WARDROBES - FROM furniture_dataset/wardrobe/
  // ==========================================

  // Tier 1: ₹10,000–₹30,000 (wardrobe/budget_10k_to_budget_30k/)
  {
    id: "wardrobe_10k_1",
    category: "wardrobe",
    name: "wardrobe",
    label: "Contemporary 2-Door Engineered Wood Wardrobe",
    budgetBracket: "budget_10k_to_budget_30k",
    budgetLabel: "₹10,000–₹30,000",
    price: 14999,
    image_url: "/furniture_dataset/wardrobe/budget_10k_to_budget_30k/wardrobe1.jpg",
    extracted_image_url: "/furniture_dataset/extracted_wardrobes/extracted_budget_10k_to_budget_30k_wardrobe1_jpg.png",
    dimensions: { length_ft: 3.0, width_ft: 1.8, height_ft: 6.5 },
    material: "Engineered Wood with Walnut Finish",
    description: "Sleek two-door wardrobe featuring internal shelving, hanging rail, and brushed metal handles.",
  },
  {
    id: "wardrobe_10k_2",
    category: "wardrobe",
    name: "wardrobe",
    label: "Nordic Minimalist Dual-Tone Wardrobe",
    budgetBracket: "budget_10k_to_budget_30k",
    budgetLabel: "₹10,000–₹30,000",
    price: 18500,
    image_url: "/furniture_dataset/wardrobe/budget_10k_to_budget_30k/wardrobe2.jpg",
    extracted_image_url: "/furniture_dataset/extracted_wardrobes/extracted_budget_10k_to_budget_30k_wardrobe2_jpg.png",
    dimensions: { length_ft: 3.2, width_ft: 1.9, height_ft: 6.5 },
    material: "Melamine Faced Chipboard & Solid Wood Legs",
    description: "Clean Scandinavian design with spacious compartments, clothes hanger bar, and bottom shoe rack.",
  },
  {
    id: "wardrobe_10k_3",
    category: "wardrobe",
    name: "wardrobe",
    label: "Urban Space-Saver 2-Door Wardrobe",
    budgetBracket: "budget_10k_to_budget_30k",
    budgetLabel: "₹10,000–₹30,000",
    price: 12999,
    image_url: "/furniture_dataset/wardrobe/budget_10k_to_budget_30k/wardrobe6.jpeg",
    extracted_image_url: "/furniture_dataset/extracted_wardrobes/extracted_budget_10k_to_budget_30k_wardrobe6_jpeg.png",
    dimensions: { length_ft: 2.8, width_ft: 1.8, height_ft: 6.2 },
    material: "High-Density Fiberboard (HDF)",
    description: "Compact bedroom wardrobe engineered for smart storage with lockable drawer and double hanging rails.",
  },
  {
    id: "wardrobe_10k_4",
    category: "wardrobe",
    name: "wardrobe",
    label: "Modern Loft 2-Door Wardrobe with Drawer",
    budgetBracket: "budget_10k_to_budget_30k",
    budgetLabel: "₹10,000–₹30,000",
    price: 21999,
    image_url: "/furniture_dataset/wardrobe/budget_10k_to_budget_30k/wardrobe7.jpg",
    extracted_image_url: "/furniture_dataset/extracted_wardrobes/extracted_budget_10k_to_budget_30k_wardrobe7_jpg.png",
    dimensions: { length_ft: 3.3, width_ft: 1.9, height_ft: 6.6 },
    material: "Commercial Grade Particle Board & Oak Veneer",
    description: "Mid-sized two-door wardrobe with pull-out base drawers and adjustable interior shelves.",
  },
  {
    id: "wardrobe_10k_5",
    category: "wardrobe",
    name: "wardrobe",
    label: "Classic Teak Finish Single-Bay Wardrobe",
    budgetBracket: "budget_10k_to_budget_30k",
    budgetLabel: "₹10,000–₹30,000",
    price: 16400,
    image_url: "/furniture_dataset/wardrobe/budget_10k_to_budget_30k/wardrobe9.jpeg",
    extracted_image_url: "/furniture_dataset/extracted_wardrobes/extracted_budget_10k_to_budget_30k_wardrobe9_jpeg.png",
    dimensions: { length_ft: 2.9, width_ft: 1.8, height_ft: 6.3 },
    material: "Treated Engineered Wood & Matte Teak Laminate",
    description: "Warm textured wood finish with smooth soft-close hinges and generous vertical hanging room.",
  },
  {
    id: "wardrobe_10k_6",
    category: "wardrobe",
    name: "wardrobe",
    label: "Studio Modernist Slimline Wardrobe",
    budgetBracket: "budget_10k_to_budget_30k",
    budgetLabel: "₹10,000–₹30,000",
    price: 26500,
    image_url: "/furniture_dataset/wardrobe/budget_10k_to_budget_30k/wardrobe19.webp",
    extracted_image_url: "/furniture_dataset/extracted_wardrobes/extracted_budget_10k_to_budget_30k_wardrobe19_webp.png",
    dimensions: { length_ft: 3.1, width_ft: 1.8, height_ft: 6.5 },
    material: "Laminated MDF & Powder-Coated Metal Trim",
    description: "Refined minimalist profile ideal for guest rooms and contemporary master bedrooms.",
  },

  // Tier 2: ₹30,000–₹50,000 (wardrobe/budget_30k_to_budget_50k/)
  {
    id: "wardrobe_30k_1",
    category: "wardrobe",
    name: "wardrobe",
    label: "Artisan 3-Door Solid Wood Accent Wardrobe",
    budgetBracket: "budget_30k_to_budget_50k",
    budgetLabel: "₹30,000–₹50,000",
    price: 34900,
    image_url: "/furniture_dataset/wardrobe/budget_30k_to_budget_50k/wardrobe3.jpg",
    extracted_image_url: "/furniture_dataset/extracted_wardrobes/extracted_budget_30k_to_budget_50k_wardrobe3_jpg.png",
    dimensions: { length_ft: 4.2, width_ft: 2.0, height_ft: 6.8 },
    material: "Solid Sheesham Wood & Matte Brass Hardware",
    description: "Substantial 3-door wardrobe with rich natural grain patterns, interior dressing mirror, and dual locker compartments.",
  },
  {
    id: "wardrobe_30k_2",
    category: "wardrobe",
    name: "wardrobe",
    label: "Sleek Sliding-Door Master Wardrobe",
    budgetBracket: "budget_30k_to_budget_50k",
    budgetLabel: "₹30,000–₹50,000",
    price: 42500,
    image_url: "/furniture_dataset/wardrobe/budget_30k_to_budget_50k/wardrobe4.webp",
    extracted_image_url: "/furniture_dataset/extracted_wardrobes/extracted_budget_30k_to_budget_50k_wardrobe4_webp.png",
    dimensions: { length_ft: 4.5, width_ft: 2.1, height_ft: 7.0 },
    material: "High-Gloss MDF with Heavy-Duty Aluminum Tracks",
    description: "Space-saving twin sliding door design with anti-jump rollers, full-length compartments, and interior lighting provisions.",
  },
  {
    id: "wardrobe_30k_3",
    category: "wardrobe",
    name: "wardrobe",
    label: "Heritage 3-Door Teak Wardrobe",
    budgetBracket: "budget_30k_to_budget_50k",
    budgetLabel: "₹30,000–₹50,000",
    price: 38000,
    image_url: "/furniture_dataset/wardrobe/budget_30k_to_budget_50k/wardrobe5.jpeg",
    extracted_image_url: "/furniture_dataset/extracted_wardrobes/extracted_budget_30k_to_budget_50k_wardrobe5_jpeg.png",
    dimensions: { length_ft: 4.3, width_ft: 2.0, height_ft: 6.9 },
    material: "Solid Teak Wood & Natural Oil Finish",
    description: "Traditional handcrafted bedroom armoire with three carved doors, lockable vault, and deep accessory drawers.",
  },
  {
    id: "wardrobe_30k_4",
    category: "wardrobe",
    name: "wardrobe",
    label: "Modern Scandinavian 3-Door Wardrobe",
    budgetBracket: "budget_30k_to_budget_50k",
    budgetLabel: "₹30,000–₹50,000",
    price: 36500,
    image_url: "/furniture_dataset/wardrobe/budget_30k_to_budget_50k/wardrobe10.jpeg",
    extracted_image_url: "/furniture_dataset/extracted_wardrobes/extracted_budget_30k_to_budget_50k_wardrobe10_jpeg.png",
    dimensions: { length_ft: 4.1, width_ft: 2.0, height_ft: 6.7 },
    material: "Solid Oak & Matte White Lacquered Fronts",
    description: "Balanced natural oak frame with crisp white facades, soft-closing doors, and ample hanger height.",
  },
  {
    id: "wardrobe_30k_5",
    category: "wardrobe",
    name: "wardrobe",
    label: "Grand Mirrored 3-Door Closet",
    budgetBracket: "budget_30k_to_budget_50k",
    budgetLabel: "₹30,000–₹50,000",
    price: 45999,
    image_url: "/furniture_dataset/wardrobe/budget_30k_to_budget_50k/wardrobe11.jpeg",
    extracted_image_url: "/furniture_dataset/extracted_wardrobes/extracted_budget_30k_to_budget_50k_wardrobe11_jpeg.png",
    dimensions: { length_ft: 4.6, width_ft: 2.1, height_ft: 7.0 },
    material: "Engineered Wood with Full-Length Beveled Mirror",
    description: "Premium mirrored wardrobe reflecting natural bedroom light while providing multi-tier organization.",
  },
  {
    id: "wardrobe_30k_6",
    category: "wardrobe",
    name: "wardrobe",
    label: "Contemporary Charcoal Dual Sliding Wardrobe",
    budgetBracket: "budget_30k_to_budget_50k",
    budgetLabel: "₹30,000–₹50,000",
    price: 48000,
    image_url: "/furniture_dataset/wardrobe/budget_30k_to_budget_50k/wardrobe15.jpg",
    extracted_image_url: "/furniture_dataset/extracted_wardrobes/extracted_budget_30k_to_budget_50k_wardrobe15_jpg.png",
    dimensions: { length_ft: 4.4, width_ft: 2.1, height_ft: 6.9 },
    material: "Textured Charcoal Melamine & Brushed Nickel Trim",
    description: "Modern sliding wardrobe featuring dust-proof brush seals and deep modular storage shelves.",
  },

  // Tier 3: ₹50,000–₹70,000 (wardrobe/budget_50k_to_budget_70k/)
  {
    id: "wardrobe_50k_1",
    category: "wardrobe",
    name: "wardrobe",
    label: "Luxury 4-Door Architectural Wardrobe",
    budgetBracket: "budget_50k_to_budget_70k",
    budgetLabel: "₹50,000–₹70,000",
    price: 54000,
    image_url: "/furniture_dataset/wardrobe/budget_50k_to_budget_70k/wardrobe6.jpeg",
    extracted_image_url: "/furniture_dataset/extracted_wardrobes/extracted_budget_50k_to_budget_70k_wardrobe6_jpeg.png",
    dimensions: { length_ft: 5.5, width_ft: 2.2, height_ft: 7.2 },
    material: "Solid American Walnut & Fluted Glass Accents",
    description: "Expansive 4-door wardrobe featuring architectural fluted profiles, integrated drawer units, and satin brass pulls.",
  },
  {
    id: "wardrobe_50k_2",
    category: "wardrobe",
    name: "wardrobe",
    label: "Designer Glass-Front Walk-in Wardrobe Suite",
    budgetBracket: "budget_50k_to_budget_70k",
    budgetLabel: "₹50,000–₹70,000",
    price: 62500,
    image_url: "/furniture_dataset/wardrobe/budget_50k_to_budget_70k/wardrobe7.webp",
    extracted_image_url: "/furniture_dataset/extracted_wardrobes/extracted_budget_50k_to_budget_70k_wardrobe7_webp.png",
    dimensions: { length_ft: 5.8, width_ft: 2.2, height_ft: 7.4 },
    material: "Smoked Tempered Glass & Dark Anthracite Aluminum",
    description: "Haute couture boutique wardrobe with tinted display doors, LED profile channels, and premium velour jewelry drawers.",
  },
  {
    id: "wardrobe_50k_3",
    category: "wardrobe",
    name: "wardrobe",
    label: "Opulent Rosewood Master Almirah",
    budgetBracket: "budget_50k_to_budget_70k",
    budgetLabel: "₹50,000–₹70,000",
    price: 58000,
    image_url: "/furniture_dataset/wardrobe/budget_50k_to_budget_70k/wardrobe12.jpeg",
    extracted_image_url: "/furniture_dataset/extracted_wardrobes/extracted_budget_50k_to_budget_70k_wardrobe12_jpeg.png",
    dimensions: { length_ft: 5.2, width_ft: 2.2, height_ft: 7.3 },
    material: "Premium Indian Rosewood (Sheesham) & Hand-Carved Cornice",
    description: "Regal artisan-carved master almirah with velvet-lined lockboxes, heavy brass hardware, and lifetime durability.",
  },
  {
    id: "wardrobe_50k_4",
    category: "wardrobe",
    name: "wardrobe",
    label: "Executive Floor-to-Ceiling Modular Closet",
    budgetBracket: "budget_50k_to_budget_70k",
    budgetLabel: "₹50,000–₹70,000",
    price: 66900,
    image_url: "/furniture_dataset/wardrobe/budget_50k_to_budget_70k/wardrobe16.jpeg",
    extracted_image_url: "/furniture_dataset/extracted_wardrobes/extracted_budget_50k_to_budget_70k_wardrobe16_jpeg.png",
    dimensions: { length_ft: 6.0, width_ft: 2.3, height_ft: 7.5 },
    material: "Anti-Scratch Polyurethane Lacquer & Champagne Gold Accents",
    description: "Grand modular closet installation with quadruple soft-touch push doors and customizable wardrobe dividers.",
  },
  {
    id: "wardrobe_50k_5",
    category: "wardrobe",
    name: "wardrobe",
    label: "Imperial High-Gloss White & Gold Master Wardrobe",
    budgetBracket: "budget_50k_to_budget_70k",
    budgetLabel: "₹50,000–₹70,000",
    price: 69500,
    image_url: "/furniture_dataset/wardrobe/budget_50k_to_budget_70k/wardrobe20.jpg",
    extracted_image_url: "/furniture_dataset/extracted_wardrobes/extracted_budget_50k_to_budget_70k_wardrobe20_jpg.png",
    dimensions: { length_ft: 5.6, width_ft: 2.2, height_ft: 7.2 },
    material: "Italian High-Gloss Acrylic, Moisture-Resistant Marine Ply & Brushed Gold",
    description: "Magnificent luxury master suite wardrobe with reflective mirror finish, dual trouser racks, and concealed security safe.",
  },
];

/**
 * Calculates the realistic displayed width percentage on the room canvas
 * based on the uploaded room's real dimensions (feet).
 * Bed -> ~36% in a 14ft room (~5.5ft)
 * Table -> ~13% in a 14ft room (~1.8ft)
 * Lamp -> ~8% in a 14ft room (~1.1ft)
 * Wardrobe -> ~30% in a 14ft room (~4.2ft)
 */
export function calculateRealisticFurnitureWidthPct(
  item: { category?: string; name?: string; dimensions?: { width_ft?: number; length_ft?: number } },
  roomWidthFt: number = 14
): number {
  const cat = (item.category || item.name || "").toLowerCase();
  const roomW = Math.max(8, Math.min(30, Number(roomWidthFt) || 14));

  let physicalWidthFt = 4.0;
  if (cat.includes("wardrobe") || cat.includes("almirah") || cat.includes("closet")) {
    physicalWidthFt = item.dimensions?.length_ft || 4.2;
  } else if (item.dimensions?.width_ft && item.dimensions.width_ft > 0) {
    physicalWidthFt = item.dimensions.width_ft;
  } else if (cat.includes("bed") && !cat.includes("table") && !cat.includes("side")) {
    physicalWidthFt = 5.5; // Standard queen/king bed width ~5.5 ft
  } else if (cat.includes("table") || cat.includes("nightstand") || cat.includes("bedside")) {
    physicalWidthFt = 1.8; // Nightstand / table width ~1.8 ft
  } else if (cat.includes("lamp") || cat.includes("light")) {
    physicalWidthFt = 1.1; // Lamp width ~1.1 ft
  } else if (cat.includes("chair")) {
    physicalWidthFt = 2.5;
  } else if (cat.includes("desk")) {
    physicalWidthFt = 3.8;
  } else if (cat.includes("sofa")) {
    physicalWidthFt = 6.0;
  }

  const widthPct = (physicalWidthFt / roomW) * 100;
  return Math.max(6, Math.min(65, widthPct));
}

/**
 * Determine the budget bracket key from an arbitrary numeric budget
 */
export function getBudgetBracketKey(amount: number, category?: string): string {
  const normCat = (category || "").toLowerCase();
  if (normCat.includes("wardrobe") || normCat.includes("almirah") || normCat.includes("closet")) {
    if (amount <= 30000) return "budget_10k_to_budget_30k";
    if (amount <= 50000) return "budget_30k_to_budget_50k";
    return "budget_50k_to_budget_70k";
  }
  if (amount <= 10000) return "buget_10k";
  if (amount <= 20000) return "buget_10k_to_20k";
  if (amount <= 30000) return "buget_20k_to_30k";
  return "buget_30k_to_40k";
}

/**
 * Parse budget from text input (e.g. "25000", "₹25,000", "30k", "20000 to 30000")
 */
export function parseBudgetFromInput(input: string): number | null {
  if (!input) return null;
  const clean = input.toLowerCase().replace(/,/g, "").trim();

  // e.g. "25k" or "30 k"
  const kMatch = clean.match(/(\d+(?:\.\d+)?)\s*k/);
  if (kMatch) {
    return Math.round(parseFloat(kMatch[1]) * 1000);
  }

  // e.g. "25000" or "₹25000"
  const numMatch = clean.match(/\d[\d\.]*/g);
  if (numMatch && numMatch.length > 0) {
    const parsed = parseFloat(numMatch[numMatch.length - 1]);
    if (!isNaN(parsed) && parsed > 500) {
      return parsed;
    }
  }
  return null;
}

/**
 * Recommend a suitable Study Chair according to user's selected budget bracket or numeric budget.
 * Keeps both Study Table and Study Chair within the selected budget.
 */
export function getRecommendedStudyChairForBudget(bracketKey?: string, userBudget?: number): DatasetFurnitureItem {
  let bracket = bracketKey;
  if (!bracket && userBudget !== undefined) {
    if (userBudget <= 10000) bracket = "buget_10k";
    else if (userBudget <= 20000) bracket = "buget_10k_to_20k";
    else if (userBudget <= 30000) bracket = "buget_20k_to_30k";
    else bracket = "buget_30k_to_40k";
  }
  const normBracket = (bracket || "buget_10k").replace("budget_", "buget_");

  const studyChairs = REAL_FURNITURE_DATASET.filter(
    (it) =>
      it.category === "chair" &&
      (it.id.startsWith("chair_study_") ||
        it.label.toLowerCase().includes("study") ||
        it.label.toLowerCase().includes("work") ||
        it.description?.toLowerCase().includes("study") ||
        it.description?.toLowerCase().includes("desk")) &&
      it.budgetBracket === normBracket
  );

  if (studyChairs.length > 0) return studyChairs[0];

  const anyUnderBudget = REAL_FURNITURE_DATASET.find(
    (it) => it.category === "chair" && it.budgetBracket === normBracket
  );
  if (anyUnderBudget) return anyUnderBudget;

  return REAL_FURNITURE_DATASET.find((it) => it.id === "chair_10k_1")!;
}

/**
 * Filter real dataset items by category and user's budget
 */
export function getDatasetItems(category: string, userBudget?: number, bracketKey?: string): DatasetFurnitureItem[] {
  const normCat = (category || "").toLowerCase().trim().replace(/[\s_-]+/g, "");

  let items = REAL_FURNITURE_DATASET.filter((it) => {
    if (normCat === "all") return true;
    const itCat = (it.category || "").toLowerCase().replace(/[\s_-]+/g, "");
    const itName = (it.name || "").toLowerCase().replace(/[\s_-]+/g, "");
    const itLabel = (it.label || "").toLowerCase();

    // 1. STUDY TABLE: STRICTLY return ONLY Study Table items.
    // DO NOT show Bed, Lamp, Side Table, Sofa, Couch, Vase, Plant, or any unrelated furniture.
    if (
      normCat === "studytable" ||
      normCat === "study_table" ||
      normCat === "studydesk" ||
      normCat === "study" ||
      normCat === "desk"
    ) {
      return (
        (itCat === "study_table" || itCat === "studytable" || itName === "study_table") &&
        !itCat.includes("bed") &&
        !itCat.includes("lamp") &&
        !itCat.includes("side") &&
        !itCat.includes("chair") &&
        !itCat.includes("sofa") &&
        !itCat.includes("couch") &&
        !itLabel.includes("nightstand") &&
        !itLabel.includes("side table") &&
        !itLabel.includes("bed") &&
        !itLabel.includes("lamp")
      );
    }

    if (normCat.includes("wardrobe") || normCat.includes("almirah") || normCat.includes("closet")) {
      return (
        itCat.includes("wardrobe") ||
        itCat.includes("almirah") ||
        itCat.includes("closet") ||
        itName.includes("wardrobe") ||
        itLabel.includes("wardrobe") ||
        itLabel.includes("almirah") ||
        itLabel.includes("closet")
      );
    }
    if (normCat.includes("chair") || normCat.includes("seat") || normCat.includes("recliner")) {
      return itCat.includes("chair") || itName.includes("chair") || itLabel.includes("chair");
    }
    if (normCat.includes("sidetable") || normCat.includes("side_table") || normCat.includes("nightstand") || normCat.includes("bedside")) {
      return (
        itCat.includes("side_table") ||
        itCat.includes("table") ||
        itCat.includes("nightstand") ||
        itCat.includes("bedside") ||
        itName.includes("table") ||
        itLabel.includes("bedside") ||
        itLabel.includes("side table") ||
        itLabel.includes("nightstand")
      );
    }
    if (normCat === "table") {
      return itCat === "table";
    }
    if (normCat.includes("table")) {
      return (
        (itCat.includes("table") || itCat.includes("side_table") || itName.includes("table") || itLabel.includes("table")) &&
        itCat !== "study_table" &&
        itName !== "study_table" &&
        !itLabel.toLowerCase().includes("study desk") &&
        !itLabel.toLowerCase().includes("study table")
      );
    }
    if (normCat.includes("lamp") || normCat.includes("light")) {
      return itCat.includes("lamp") || itCat.includes("light") || itName.includes("lamp") || itName.includes("light");
    }
    if (normCat.includes("bed") && !normCat.includes("table") && !normCat.includes("side")) {
      return (itCat === "bed" || itName === "bed") && !itCat.includes("table") && !itName.includes("table");
    }

    return itCat === normCat || itName === normCat || itCat.includes(normCat) || normCat.includes(itCat);
  });

  if (bracketKey && bracketKey !== "all") {
    const normBracket = bracketKey.replace("budget_", "buget_");
    items = items.filter(
      (it) =>
        it.budgetBracket === bracketKey ||
        it.budgetBracket === normBracket ||
        (it.budgetBracket && it.budgetBracket.replace("budget_", "buget_") === normBracket)
    );
  } else if (userBudget !== undefined && userBudget > 0) {
    const bracket = getBudgetBracketKey(userBudget, category);
    const bracketItems = items.filter((it) => it.budgetBracket === bracket);
    if (bracketItems.length > 0) {
      items = bracketItems;
    } else {
      const priceFiltered = items.filter((it) => it.price <= userBudget * 1.15);
      if (priceFiltered.length > 0) items = priceFiltered;
    }
  }

  return items;
}

/**
 * Get individual item by ID
 */
export function getDatasetItemById(id: string): DatasetFurnitureItem | undefined {
  return REAL_FURNITURE_DATASET.find((it) => it.id === id);
}

const extractionCache = new Map<string, string>();

/**
 * Programmatically extract and segment ONLY the furniture object with transparent background at runtime.
 */
export async function getOrExtractItemImageUrl(item: DatasetFurnitureItem): Promise<string> {
  if (item.extracted_image_url) return item.extracted_image_url;
  const key = `${item.id}_${item.category}_${item.image_url}`;
  if (extractionCache.has(key)) {
    const cached = extractionCache.get(key)!;
    item.extracted_image_url = cached;
    return cached;
  }

  try {
    const res = await api.post("/furniture/extract", {
      image_url: item.image_url,
      category: item.category || item.name,
      item_id: item.id,
    });
    if (res.data?.success && res.data.extracted_image_url) {
      let url = res.data.extracted_image_url as string;
      if (url.startsWith("/")) {
        url = `${API_BASE}${url}`;
      }
      extractionCache.set(key, url);
      item.extracted_image_url = url;
      return url;
    }
  } catch (err) {
    console.warn("Could not extract furniture object:", err);
  }

  return item.image_url;
}

/**
 * Background pre-extraction for currently visible items
 */
export function prefetchCategoryExtractions(items: DatasetFurnitureItem[], onUpdated?: (updatedItems: DatasetFurnitureItem[]) => void) {
  let changed = false;
  items.forEach((it) => {
    if (!it.extracted_image_url) {
      getOrExtractItemImageUrl(it).then((extractedUrl) => {
        if (extractedUrl && extractedUrl !== it.image_url) {
          it.extracted_image_url = extractedUrl;
          changed = true;
          if (onUpdated) {
            onUpdated([...items]);
          }
        }
      });
    }
  });
}
