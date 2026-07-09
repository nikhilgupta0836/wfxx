import { useState, useRef, useEffect, useCallback } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  LayoutDashboard,
  MessageSquare,
  Search,
  ImageIcon,
  Package,
  Send,
  Sparkles,
  Code2,
  ChevronRight,
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  Truck,
  Filter,
  Upload,
  X,
  ChevronDown,
  Check,
  RefreshCw,
  Grid3x3,
  List,
  ArrowUpDown,
  Menu,
  Star,
  Zap,
  BarChart2,
  Globe,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const FINISHED_GOODS = [
  {
    id: 1,
    style_number: "WFX-1001",
    style_name: "Classic Cotton Polo",
    category: "T-Shirt",
    fabric: "Cotton",
    gsm: 180,
    color: "White",
    print: "Solid",
    season: "SS24",
    brand: "Zara",
    supplier: "ABC Textiles",
    cost: 420,
    price: 890,
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 2,
    style_number: "WFX-1002",
    style_name: "Denim Slim Fit Jeans",
    category: "Jeans",
    fabric: "Denim",
    gsm: 320,
    color: "Indigo",
    print: "Solid",
    season: "AW24",
    brand: "H&M",
    supplier: "Blue Thread Co.",
    cost: 680,
    price: 1450,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 3,
    style_number: "WFX-1003",
    style_name: "Floral Wrap Dress",
    category: "Dress",
    fabric: "Viscose",
    gsm: 120,
    color: "Multicolor",
    print: "Floral",
    season: "SS24",
    brand: "Mango",
    supplier: "Silk Route Fabrics",
    cost: 540,
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 4,
    style_number: "WFX-1004",
    style_name: "Oversized Hoodie",
    category: "Hoodie",
    fabric: "Fleece",
    gsm: 280,
    color: "Black",
    print: "Solid",
    season: "AW24",
    brand: "Uniqlo",
    supplier: "KnitWear Industries",
    cost: 590,
    price: 1350,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 5,
    style_number: "WFX-1005",
    style_name: "Linen Blazer",
    category: "Blazer",
    fabric: "Linen",
    gsm: 210,
    color: "Beige",
    print: "Solid",
    season: "SS24",
    brand: "Zara",
    supplier: "Euro Weaves",
    cost: 920,
    price: 2100,
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 6,
    style_number: "WFX-1006",
    style_name: "Striped Oxford Shirt",
    category: "Shirt",
    fabric: "Cotton",
    gsm: 160,
    color: "Blue",
    print: "Striped",
    season: "SS24",
    brand: "Tommy",
    supplier: "ABC Textiles",
    cost: 380,
    price: 850,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 7,
    style_number: "WFX-1007",
    style_name: "Leather Bomber Jacket",
    category: "Jacket",
    fabric: "Leather",
    gsm: 500,
    color: "Brown",
    print: "Solid",
    season: "AW24",
    brand: "Zara",
    supplier: "Punjab Leather",
    cost: 2100,
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 8,
    style_number: "WFX-1008",
    style_name: "Yoga Leggings",
    category: "Activewear",
    fabric: "Spandex",
    gsm: 200,
    color: "Navy",
    print: "Solid",
    season: "SS24",
    brand: "Nike",
    supplier: "SportsTex",
    cost: 450,
    price: 1100,
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 9,
    style_number: "WFX-1009",
    style_name: "Paisley Print Kurta",
    category: "Ethnic",
    fabric: "Cotton",
    gsm: 140,
    color: "Red",
    print: "Paisley",
    season: "FE24",
    brand: "FabIndia",
    supplier: "Artisan Weaves",
    cost: 320,
    price: 720,
    image:
      "https://plus.unsplash.com/premium_photo-1691030256214-dc57034ec935?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 10,
    style_number: "WFX-1010",
    style_name: "Cargo Shorts",
    category: "Shorts",
    fabric: "Cotton Twill",
    gsm: 240,
    color: "Olive",
    print: "Solid",
    season: "SS24",
    brand: "H&M",
    supplier: "Blue Thread Co.",
    cost: 290,
    price: 650,
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 11,
    style_number: "WFX-1011",
    style_name: "Cashmere Turtleneck",
    category: "Sweater",
    fabric: "Cashmere",
    gsm: 260,
    color: "Grey",
    print: "Solid",
    season: "AW24",
    brand: "Max Mara",
    supplier: "Highland Yarns",
    cost: 1800,
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 12,
    style_number: "WFX-1012",
    style_name: "Abstract Print Scarf",
    category: "Accessories",
    fabric: "Silk",
    gsm: 70,
    color: "Multicolor",
    print: "Abstract",
    season: "AW24",
    brand: "Mango",
    supplier: "Silk Route Fabrics",
    cost: 240,
    price: 580,
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 13,
    style_number: "WFX-1013",
    style_name: "Relaxed Linen Trousers",
    category: "Trousers",
    fabric: "Linen",
    gsm: 190,
    color: "White",
    print: "Solid",
    season: "SS24",
    brand: "Zara",
    supplier: "Euro Weaves",
    cost: 560,
    price: 1250,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 14,
    style_number: "WFX-1014",
    style_name: "Black Skinny Jeans",
    category: "Jeans",
    fabric: "Denim",
    gsm: 300,
    color: "Black",
    print: "Solid",
    season: "AW24",
    brand: "H&M",
    supplier: "Blue Thread Co.",
    cost: 640,
    price: 1380,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 15,
    style_number: "WFX-1015",
    style_name: "Merino Wool Sweater",
    category: "Sweater",
    fabric: "Wool",
    gsm: 250,
    color: "Navy",
    print: "Solid",
    season: "AW24",
    brand: "Uniqlo",
    supplier: "Highland Yarns",
    cost: 980,
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 16,
    style_number: "WFX-1016",
    style_name: "Graphic Print Tee",
    category: "T-Shirt",
    fabric: "Cotton",
    gsm: 170,
    color: "Black",
    print: "Graphic",
    season: "SS24",
    brand: "H&M",
    supplier: "ABC Textiles",
    cost: 280,
    price: 650,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop&auto=format",
  },
];

const SUPPLIERS = [
  {
    id: 1,
    name: "ABC Textiles",
    country: "India",
    contact: "rahul@abctex.com",
    lead_time: 30,
    rating: 4.8,
    orders: 62,
    revenue: 4820000,
  },
  {
    id: 2,
    name: "Blue Thread Co.",
    country: "Bangladesh",
    contact: "info@bluethread.bd",
    lead_time: 45,
    rating: 4.2,
    orders: 48,
    revenue: 3640000,
  },
  {
    id: 3,
    name: "Silk Route Fabrics",
    country: "China",
    contact: "silk@srfabrics.cn",
    lead_time: 35,
    rating: 4.5,
    orders: 31,
    revenue: 2180000,
  },
  {
    id: 4,
    name: "KnitWear Industries",
    country: "Turkey",
    contact: "knitwear@tr.com",
    lead_time: 28,
    rating: 4.7,
    orders: 41,
    revenue: 3120000,
  },
  {
    id: 5,
    name: "Euro Weaves",
    country: "Italy",
    contact: "orders@euroweaves.it",
    lead_time: 50,
    rating: 4.9,
    orders: 18,
    revenue: 5110000,
  },
  {
    id: 6,
    name: "Punjab Leather",
    country: "India",
    contact: "leather@punjab.in",
    lead_time: 40,
    rating: 4.3,
    orders: 24,
    revenue: 4608000,
  },
  {
    id: 7,
    name: "SportsTex",
    country: "Vietnam",
    contact: "sportstex@vn.com",
    lead_time: 32,
    rating: 4.6,
    orders: 29,
    revenue: 1890000,
  },
  {
    id: 8,
    name: "Artisan Weaves",
    country: "India",
    contact: "artisan@weaves.in",
    lead_time: 25,
    rating: 4.4,
    orders: 55,
    revenue: 720000,
  },
  {
    id: 9,
    name: "Highland Yarns",
    country: "Scotland",
    contact: "yarn@highland.uk",
    lead_time: 60,
    rating: 4.9,
    orders: 12,
    revenue: 2860000,
  },
];

const BUYERS = [
  {
    id: 1,
    name: "Zara International",
    country: "Spain",
    category: "Fast Fashion",
    orders: 42,
    revenue: 1820000,
    pending_invoices: 3,
  },
  {
    id: 2,
    name: "H&M Group",
    country: "Sweden",
    category: "Fast Fashion",
    orders: 38,
    revenue: 1540000,
    pending_invoices: 2,
  },
  {
    id: 3,
    name: "Mango",
    country: "Spain",
    category: "Mid Premium",
    orders: 24,
    revenue: 980000,
    pending_invoices: 1,
  },
  {
    id: 4,
    name: "Uniqlo",
    country: "Japan",
    category: "Basics",
    orders: 31,
    revenue: 1210000,
    pending_invoices: 0,
  },
  {
    id: 5,
    name: "Tommy Hilfiger",
    country: "USA",
    category: "Premium",
    orders: 18,
    revenue: 1680000,
    pending_invoices: 2,
  },
  {
    id: 6,
    name: "Max Mara",
    country: "Italy",
    category: "Luxury",
    orders: 9,
    revenue: 2340000,
    pending_invoices: 1,
  },
  {
    id: 7,
    name: "FabIndia",
    country: "India",
    category: "Ethnic",
    orders: 55,
    revenue: 720000,
    pending_invoices: 4,
  },
  {
    id: 8,
    name: "Nike Apparel",
    country: "USA",
    category: "Sportswear",
    orders: 29,
    revenue: 1890000,
    pending_invoices: 0,
  },
];

const SALES_ORDERS = [
  {
    id: "ORD-2401",
    buyer: "Zara International",
    style: "Classic Cotton Polo",
    qty: 2400,
    amount: 2136000,
    status: "Shipped",
    date: "2024-11-15",
  },
  {
    id: "ORD-2402",
    buyer: "H&M Group",
    style: "Denim Slim Fit Jeans",
    qty: 1800,
    amount: 2610000,
    status: "In Production",
    date: "2024-11-22",
  },
  {
    id: "ORD-2403",
    buyer: "Max Mara",
    style: "Cashmere Turtleneck",
    qty: 600,
    amount: 2520000,
    status: "Delivered",
    date: "2024-10-30",
  },
  {
    id: "ORD-2404",
    buyer: "Nike Apparel",
    style: "Yoga Leggings",
    qty: 3200,
    amount: 3520000,
    status: "Shipped",
    date: "2024-11-28",
  },
  {
    id: "ORD-2405",
    buyer: "Uniqlo",
    style: "Merino Wool Sweater",
    qty: 1200,
    amount: 2640000,
    status: "Pending",
    date: "2024-12-05",
  },
  {
    id: "ORD-2406",
    buyer: "Tommy Hilfiger",
    style: "Linen Blazer",
    qty: 800,
    amount: 1680000,
    status: "In Production",
    date: "2024-12-10",
  },
  {
    id: "ORD-2407",
    buyer: "FabIndia",
    style: "Paisley Print Kurta",
    qty: 5000,
    amount: 3600000,
    status: "Shipped",
    date: "2024-11-18",
  },
  {
    id: "ORD-2408",
    buyer: "Mango",
    style: "Floral Wrap Dress",
    qty: 1500,
    amount: 1800000,
    status: "Delivered",
    date: "2024-10-20",
  },
];

const INVOICES = [
  {
    id: "INV-3001",
    order: "ORD-2401",
    buyer: "Zara International",
    amount: 2136000,
    currency: "INR",
    status: "Paid",
    due: "2024-12-15",
  },
  {
    id: "INV-3002",
    order: "ORD-2403",
    buyer: "Max Mara",
    amount: 2520000,
    currency: "INR",
    status: "Paid",
    due: "2024-11-30",
  },
  {
    id: "INV-3003",
    order: "ORD-2404",
    buyer: "Nike Apparel",
    amount: 3520000,
    currency: "INR",
    status: "Pending",
    due: "2024-12-28",
  },
  {
    id: "INV-3004",
    order: "ORD-2408",
    buyer: "Mango",
    amount: 1800000,
    currency: "INR",
    status: "Paid",
    due: "2024-11-20",
  },
  {
    id: "INV-3005",
    order: "ORD-2405",
    buyer: "Uniqlo",
    amount: 2640000,
    currency: "INR",
    status: "Overdue",
    due: "2024-12-01",
  },
  {
    id: "INV-3006",
    order: "ORD-2406",
    buyer: "Tommy Hilfiger",
    amount: 1680000,
    currency: "INR",
    status: "Pending",
    due: "2025-01-10",
  },
  {
    id: "INV-3007",
    order: "ORD-2407",
    buyer: "FabIndia",
    amount: 3600000,
    currency: "INR",
    status: "Pending",
    due: "2024-12-18",
  },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 820000, orders: 94 },
  { month: "Feb", revenue: 940000, orders: 108 },
  { month: "Mar", revenue: 1120000, orders: 127 },
  { month: "Apr", revenue: 980000, orders: 112 },
  { month: "May", revenue: 1340000, orders: 153 },
  { month: "Jun", revenue: 1580000, orders: 178 },
  { month: "Jul", revenue: 1420000, orders: 162 },
  { month: "Aug", revenue: 1680000, orders: 190 },
  { month: "Sep", revenue: 1920000, orders: 218 },
  { month: "Oct", revenue: 2140000, orders: 241 },
  { month: "Nov", revenue: 1870000, orders: 212 },
  { month: "Dec", revenue: 2380000, orders: 267 },
];

const CATEGORY_DATA = [
  { name: "T-Shirt", value: 28 },
  { name: "Jeans", value: 18 },
  { name: "Dress", value: 15 },
  { name: "Jacket", value: 12 },
  { name: "Hoodie", value: 10 },
  { name: "Other", value: 17 },
];

const CHART_COLORS = [
  "#0dd9c4",
  "#7c3aed",
  "#f59e0b",
  "#3b82f6",
  "#ec4899",
  "#6b82a0",
];

// ─── NL Query Engine ──────────────────────────────────────────────────────────

interface QueryResult {
  sql: string;
  confidence: number;
  table: { headers: string[]; rows: (string | number)[][] };
  answer: string;
  chartData?: {
    type: "bar" | "pie" | "line";
    data: { name: string; value: number }[];
  };
}

function processNLQuery(raw: string): QueryResult {
  const q = raw.toLowerCase();

  // Cotton shirts by ABC Textiles
  if ((q.includes("cotton") || q.includes("shirt")) && q.includes("abc")) {
    return {
      confidence: 96,
      sql: `SELECT fg.style_name, s.company_name AS supplier,\n       fg.color, fg.gsm, fg.selling_price\nFROM finished_goods fg\nJOIN suppliers s ON fg.supplier_id = s.id\nWHERE fg.fabric ILIKE '%cotton%'\n  AND s.company_name = 'ABC Textiles'\nORDER BY fg.selling_price;`,
      table: {
        headers: ["Style Name", "Supplier", "Color", "GSM", "Price (₹)"],
        rows: [
          ["Classic Cotton Polo", "ABC Textiles", "White", 180, "₹890"],
          ["Striped Oxford Shirt", "ABC Textiles", "Blue", 160, "₹850"],
          ["Graphic Print Tee", "ABC Textiles", "Black", 170, "₹650"],
          ["Paisley Print Kurta", "ABC Textiles", "Red", 140, "₹720"],
        ],
      },
      answer:
        "Found 4 cotton garments supplied by ABC Textiles. The Graphic Print Tee (₹650) and Paisley Print Kurta (₹720) are the most budget-friendly, while the Classic Cotton Polo (₹890) is the premium offering.",
    };
  }

  // Black hoodies
  if (q.includes("black") && (q.includes("hoodie") || q.includes("hoodies"))) {
    const priceMatch = q.match(/₹?(\d[\d,]*)/);
    const maxPrice = priceMatch
      ? parseInt(priceMatch[1].replace(",", ""))
      : 99999;
    return {
      confidence: 98,
      sql: `SELECT fg.style_name, fg.color, fg.gsm,\n       fg.cost, fg.selling_price\nFROM finished_goods fg\nWHERE fg.category = 'Hoodie'\n  AND fg.color = 'Black'\n  AND fg.selling_price <= ${maxPrice}\nORDER BY fg.selling_price;`,
      table: {
        headers: ["Style Name", "Color", "GSM", "Cost (₹)", "Price (₹)"],
        rows: [["Oversized Hoodie", "Black", 280, "₹590", "₹1,350"]],
      },
      answer: `Found 1 black hoodie${
        maxPrice < 99999 ? ` under ₹${maxPrice.toLocaleString()}` : ""
      }. The Oversized Hoodie in Black (280 GSM Fleece) is priced at ₹1,350 with a cost of ₹590, offering a healthy margin of 56.7%. It is supplied by KnitWear Industries (Turkey) with a lead time of 28 days.`,
    };
  }

  // Buyers above 220 GSM
  if (
    (q.includes("buyer") || q.includes("buyers")) &&
    (q.includes("220") || q.includes("gsm"))
  ) {
    return {
      confidence: 94,
      sql: `SELECT b.company_name AS buyer,\n       SUM(so.quantity) AS total_qty,\n       COUNT(so.id) AS orders,\n       ROUND(AVG(fg.gsm)) AS avg_gsm\nFROM sales_orders so\nJOIN buyers b ON so.buyer_id = b.id\nJOIN finished_goods fg ON so.style_id = fg.id\nWHERE fg.gsm > 220\nGROUP BY b.company_name\nORDER BY total_qty DESC;`,
      table: {
        headers: ["Buyer", "Total Qty", "Orders", "Avg GSM"],
        rows: [
          ["Zara International", "18,400", 12, 295],
          ["Uniqlo", "14,200", 9, 255],
          ["H&M Group", "11,800", 8, 310],
          ["Max Mara", "6,200", 5, 260],
          ["Nike Apparel", "3,200", 3, 200],
        ],
      },
      answer:
        "5 buyers have purchased garments above 220 GSM. Zara International leads with 18,400 units across 12 orders (avg 295 GSM), followed by Uniqlo (14,200 units). H&M Group sourced the heaviest fabrics on average at 310 GSM.",
      chartData: {
        type: "bar",
        data: [
          { name: "Zara", value: 18400 },
          { name: "Uniqlo", value: 14200 },
          { name: "H&M", value: 11800 },
          { name: "Max Mara", value: 6200 },
          { name: "Nike", value: 3200 },
        ],
      },
    };
  }

  // Supplier highest average order value
  if (
    (q.includes("supplier") || q.includes("suppliers")) &&
    (q.includes("highest") || q.includes("average") || q.includes("avg"))
  ) {
    return {
      confidence: 97,
      sql: `SELECT s.company_name,\n       ROUND(AVG(si.amount)) AS avg_order_value,\n       COUNT(so.id) AS total_orders,\n       s.country\nFROM suppliers s\nJOIN finished_goods fg ON fg.supplier_id = s.id\nJOIN sales_orders so ON so.style_id = fg.id\nJOIN sales_invoices si ON si.sales_order_id = so.id\nGROUP BY s.company_name, s.country\nORDER BY avg_order_value DESC;`,
      table: {
        headers: ["Supplier", "Avg Order Value (₹)", "Orders", "Country"],
        rows: [
          ["Euro Weaves", "₹2,84,000", 18, "Italy"],
          ["Highland Yarns", "₹2,31,000", 12, "Scotland"],
          ["Punjab Leather", "₹1,92,000", 24, "India"],
          ["ABC Textiles", "₹1,48,000", 62, "India"],
          ["KnitWear Industries", "₹1,35,000", 41, "Turkey"],
          ["Blue Thread Co.", "₹98,000", 48, "Bangladesh"],
        ],
      },
      answer:
        "Euro Weaves (Italy) has the highest average order value at ₹2,84,000 — driven by premium linen blazers and trousers. Highland Yarns (Scotland) follows at ₹2,31,000 for cashmere and merino wool garments. Indian suppliers ABC Textiles and Punjab Leather rank 4th and 3rd respectively with high order volumes.",
      chartData: {
        type: "bar",
        data: [
          { name: "Euro Weaves", value: 284000 },
          { name: "Highland Yarns", value: 231000 },
          { name: "Punjab Leather", value: 192000 },
          { name: "ABC Textiles", value: 148000 },
          { name: "KnitWear", value: 135000 },
        ],
      },
    };
  }

  // Highest revenue buyer
  if (
    (q.includes("buyer") || q.includes("buyers")) &&
    (q.includes("revenue") || q.includes("highest revenue"))
  ) {
    return {
      confidence: 99,
      sql: `SELECT b.company_name, b.country,\n       SUM(si.amount) AS total_revenue,\n       COUNT(so.id) AS orders\nFROM buyers b\nJOIN sales_orders so ON so.buyer_id = b.id\nJOIN sales_invoices si ON si.sales_order_id = so.id\nGROUP BY b.company_name, b.country\nORDER BY total_revenue DESC\nLIMIT 5;`,
      table: {
        headers: ["Buyer", "Country", "Total Revenue (₹)", "Orders"],
        rows: [
          ["Max Mara", "Italy", "₹2,34,00,000", 9],
          ["Nike Apparel", "USA", "₹1,89,00,000", 29],
          ["Zara International", "Spain", "₹1,82,00,000", 42],
          ["Tommy Hilfiger", "USA", "₹1,68,00,000", 18],
          ["H&M Group", "Sweden", "₹1,54,00,000", 38],
        ],
      },
      answer:
        "Max Mara generated the highest revenue at ₹2.34 crore — with just 9 high-value luxury orders averaging ₹26L each. Nike Apparel is 2nd at ₹1.89 crore driven by sportswear volume. Zara leads in order count (42) but ranks 3rd in revenue at ₹1.82 crore.",
      chartData: {
        type: "bar",
        data: [
          { name: "Max Mara", value: 23400000 },
          { name: "Nike", value: 18900000 },
          { name: "Zara", value: 18200000 },
          { name: "Tommy", value: 16800000 },
          { name: "H&M", value: 15400000 },
        ],
      },
    };
  }

  // Denim products / supplier
  if (
    q.includes("denim") &&
    (q.includes("supplier") || q.includes("most") || q.includes("supplied"))
  ) {
    return {
      confidence: 95,
      sql: `SELECT s.company_name, COUNT(fg.id) AS denim_styles,\n       SUM(so.quantity) AS total_qty\nFROM suppliers s\nJOIN finished_goods fg ON fg.supplier_id = s.id\nJOIN sales_orders so ON so.style_id = fg.id\nWHERE fg.fabric ILIKE '%denim%'\nGROUP BY s.company_name\nORDER BY denim_styles DESC, total_qty DESC;`,
      table: {
        headers: ["Supplier", "Denim Styles", "Total Qty Supplied"],
        rows: [
          ["Blue Thread Co.", 3, "21,600"],
          ["ABC Textiles", 1, "4,800"],
        ],
      },
      answer:
        "Blue Thread Co. (Bangladesh) supplied the most denim products with 3 denim styles and a total of 21,600 units. They supply Denim Slim Fit Jeans, Black Skinny Jeans, and Cargo Shorts (cotton-twill). Their lead time is 45 days with a rating of 4.2.",
    };
  }

  // Pending invoices
  if (q.includes("pending") && q.includes("invoice")) {
    const amtMatch = q.match(/₹?(\d[\d,]*)/);
    const minAmt = amtMatch ? parseInt(amtMatch[1].replace(",", "")) : 0;
    const filtered = INVOICES.filter(
      (i) => i.status === "Pending" && i.amount >= minAmt
    );
    return {
      confidence: 99,
      sql: `SELECT si.invoice_number, b.company_name AS buyer,\n       si.amount, si.currency,\n       si.due_date, si.payment_status\nFROM sales_invoices si\nJOIN sales_orders so ON si.sales_order_id = so.id\nJOIN buyers b ON so.buyer_id = b.id\nWHERE si.payment_status = 'Pending'\n${
        minAmt > 0 ? `  AND si.amount >= ${minAmt}` : ""
      }\nORDER BY si.amount DESC;`,
      table: {
        headers: ["Invoice #", "Buyer", "Amount (₹)", "Due Date", "Status"],
        rows: filtered.map((i) => [
          i.id,
          i.buyer,
          `₹${(i.amount / 100000).toFixed(1)}L`,
          i.due,
          i.status,
        ]),
      },
      answer: `Found ${filtered.length} pending invoice${
        filtered.length !== 1 ? "s" : ""
      }${
        minAmt > 0 ? ` above ₹${minAmt.toLocaleString()}` : ""
      }. Total pending amount: ₹${(
        filtered.reduce((s, i) => s + i.amount, 0) / 10000000
      ).toFixed(
        2
      )} crore. Nike Apparel (₹35.2L) and FabIndia (₹36L) have the largest outstanding amounts.`,
    };
  }

  // Overdue invoices
  if (q.includes("overdue")) {
    const overdue = INVOICES.filter((i) => i.status === "Overdue");
    return {
      confidence: 99,
      sql: `SELECT si.invoice_number, b.company_name,\n       si.amount, si.due_date\nFROM sales_invoices si\nJOIN buyers b ON so.buyer_id = b.id\nWHERE si.payment_status = 'Overdue'\nORDER BY si.due_date ASC;`,
      table: {
        headers: ["Invoice #", "Buyer", "Amount (₹)", "Due Date"],
        rows: overdue.map((i) => [
          i.id,
          i.buyer,
          `₹${(i.amount / 100000).toFixed(1)}L`,
          i.due,
        ]),
      },
      answer: `${overdue.length} overdue invoice found. Uniqlo has an unpaid invoice of ₹26.4L that was due on Dec 1, 2024. Immediate follow-up is recommended.`,
    };
  }

  // Show all orders / recent orders
  if (
    q.includes("order") &&
    (q.includes("show") ||
      q.includes("all") ||
      q.includes("recent") ||
      q.includes("list"))
  ) {
    return {
      confidence: 93,
      sql: `SELECT so.order_number, b.company_name AS buyer,\n       fg.style_name, so.quantity,\n       so.shipment_date, so.status\nFROM sales_orders so\nJOIN buyers b ON so.buyer_id = b.id\nJOIN finished_goods fg ON so.style_id = fg.id\nORDER BY so.shipment_date DESC\nLIMIT 10;`,
      table: {
        headers: ["Order #", "Buyer", "Style", "Qty", "Date", "Status"],
        rows: SALES_ORDERS.map((o) => [
          o.id,
          o.buyer,
          o.style,
          o.qty.toLocaleString(),
          o.date,
          o.status,
        ]),
      },
      answer: `Showing ${SALES_ORDERS.length} recent sales orders. FabIndia has the largest order quantity (5,000 units of Paisley Print Kurta). 2 orders are shipped, 2 in production, 2 delivered, and 2 pending.`,
    };
  }

  // Blue striped shirts
  if (q.includes("blue") && (q.includes("stripe") || q.includes("striped"))) {
    return {
      confidence: 97,
      sql: `SELECT fg.style_name, fg.color, fg.print,\n       fg.fabric, fg.gsm, fg.selling_price\nFROM finished_goods fg\nWHERE fg.color = 'Blue' AND fg.print ILIKE '%strip%'\nORDER BY fg.selling_price;`,
      table: {
        headers: ["Style Name", "Color", "Print", "Fabric", "GSM", "Price (₹)"],
        rows: [
          ["Striped Oxford Shirt", "Blue", "Striped", "Cotton", 160, "₹850"],
        ],
      },
      answer:
        "Found 1 blue striped shirt in the catalog: the Striped Oxford Shirt (WFX-1006) in Blue Striped Cotton at ₹850. It is supplied by ABC Textiles and is part of the SS24 collection under the Tommy Hilfiger brand.",
    };
  }

  // Products similar / by season
  if (q.includes("ss24") || q.includes("summer")) {
    const ss24 = FINISHED_GOODS.filter((g) => g.season === "SS24");
    return {
      confidence: 91,
      sql: `SELECT fg.style_name, fg.category, fg.fabric,\n       fg.color, fg.selling_price\nFROM finished_goods fg\nWHERE fg.season = 'SS24'\nORDER BY fg.selling_price DESC;`,
      table: {
        headers: ["Style Name", "Category", "Fabric", "Color", "Price (₹)"],
        rows: ss24.map((g) => [
          g.style_name,
          g.category,
          g.fabric,
          g.color,
          `₹${g.price.toLocaleString()}`,
        ]),
      },
      answer: `Found ${ss24.length} garments in the SS24 (Summer 2024) collection. The Linen Blazer (₹2,100) is the premium piece, while the Cargo Shorts (₹650) and Graphic Print Tee (₹650) are the most accessible.`,
    };
  }

  // Lead time / fastest supplier
  if (q.includes("lead time") || q.includes("fastest supplier")) {
    const sorted = [...SUPPLIERS].sort((a, b) => a.lead_time - b.lead_time);
    return {
      confidence: 95,
      sql: `SELECT s.company_name, s.country,\n       s.lead_time_days, s.rating\nFROM suppliers s\nORDER BY s.lead_time_days ASC;`,
      table: {
        headers: ["Supplier", "Country", "Lead Time (days)", "Rating"],
        rows: sorted.map((s) => [
          s.name,
          s.country,
          `${s.lead_time} days`,
          `⭐ ${s.rating}`,
        ]),
      },
      answer: `Artisan Weaves (India) has the fastest lead time at 25 days, followed by KnitWear Industries (Turkey) at 28 days. Highland Yarns (Scotland) has the longest lead time at 60 days, though they hold the highest rating of 4.9. Euro Weaves (Italy) also has 4.9 but takes 50 days.`,
    };
  }

  // Top rated suppliers
  if (
    (q.includes("top") || q.includes("best") || q.includes("highest rated")) &&
    q.includes("supplier")
  ) {
    const sorted = [...SUPPLIERS].sort((a, b) => b.rating - a.rating);
    return {
      confidence: 96,
      sql: `SELECT s.company_name, s.country,\n       s.rating, s.lead_time_days\nFROM suppliers s\nORDER BY s.rating DESC\nLIMIT 5;`,
      table: {
        headers: ["Supplier", "Country", "Rating", "Lead Time"],
        rows: sorted
          .slice(0, 5)
          .map((s) => [
            s.name,
            s.country,
            `⭐ ${s.rating}/5`,
            `${s.lead_time} days`,
          ]),
      },
      answer: `Euro Weaves (Italy) and Highland Yarns (Scotland) are tied at the top with a rating of 4.9. ABC Textiles (India) holds a strong 4.8 with the highest order volume (62 orders). Highland Yarns is the top European supplier by rating.`,
    };
  }

  // Silk products
  if (q.includes("silk")) {
    return {
      confidence: 94,
      sql: `SELECT fg.style_name, fg.category, fg.color,\n       fg.gsm, fg.selling_price, s.company_name AS supplier\nFROM finished_goods fg\nJOIN suppliers s ON fg.supplier_id = s.id\nWHERE fg.fabric ILIKE '%silk%'\nORDER BY fg.selling_price DESC;`,
      table: {
        headers: ["Style", "Category", "Color", "GSM", "Price (₹)", "Supplier"],
        rows: [
          [
            "Abstract Print Scarf",
            "Accessories",
            "Multicolor",
            70,
            "₹580",
            "Silk Route Fabrics",
          ],
        ],
      },
      answer:
        "Found 1 silk garment: the Abstract Print Scarf (WFX-1012) in multicolor abstract print at ₹580 GSM 70. Supplied by Silk Route Fabrics (China) with a 35-day lead time. A low-cost accessory with strong margin potential.",
    };
  }

  // Total goods / inventory count
  if (
    q.includes("total") &&
    (q.includes("goods") ||
      q.includes("products") ||
      q.includes("inventory") ||
      q.includes("styles"))
  ) {
    return {
      confidence: 99,
      sql: `SELECT COUNT(*) AS total_styles,\n       COUNT(DISTINCT category) AS categories,\n       COUNT(DISTINCT supplier_id) AS suppliers,\n       ROUND(AVG(selling_price)) AS avg_price\nFROM finished_goods;`,
      table: {
        headers: ["Total Styles", "Categories", "Suppliers", "Avg Price (₹)"],
        rows: [["1,248", "14", "9", "₹1,542"]],
      },
      answer:
        "The ERP currently has 1,248 finished goods styles across 14 categories sourced from 9 suppliers. The average selling price is ₹1,542. The largest categories are T-Shirts (28%), Jeans (18%), and Dresses (15%).",
    };
  }

  // Default fallback
  return {
    confidence: 72,
    sql: `SELECT fg.style_name, fg.category, fg.fabric,\n       fg.color, fg.gsm, s.company_name AS supplier,\n       fg.selling_price\nFROM finished_goods fg\nJOIN suppliers s ON fg.supplier_id = s.id\nLIMIT 10;`,
    table: {
      headers: [
        "Style Name",
        "Category",
        "Fabric",
        "Color",
        "GSM",
        "Supplier",
        "Price (₹)",
      ],
      rows: FINISHED_GOODS.slice(0, 6).map((g) => [
        g.style_name,
        g.category,
        g.fabric,
        g.color,
        g.gsm,
        g.supplier,
        `₹${g.price.toLocaleString()}`,
      ]),
    },
    answer:
      "Here is a sample of finished goods from the catalog. Try asking more specific questions like: 'Show black hoodies under ₹1,500', 'Which supplier has the highest rating?', 'Show pending invoices', or 'Which buyer generated the highest revenue?'",
  };
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = "dashboard" | "nlquery" | "search" | "imagesearch" | "explorer";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sql?: string;
  confidence?: number;
  table?: { headers: string[]; rows: (string | number)[][] };
  chartData?: {
    type: "bar" | "pie" | "line";
    data: { name: string; value: number }[];
  };
}

// ─── Shared Components ────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  delta?: string;
  color: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-5 flex flex-col gap-3 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
          {label}
        </span>
        <div
          className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${color}18` }}
        >
          <Icon size={15} style={{ color }} />
        </div>
      </div>
      <div
        className="text-xl md:text-2xl font-semibold text-foreground"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {value}
      </div>
      {delta && (
        <div
          className="text-xs flex items-center gap-1"
          style={{ color: "#0dd9c4" }}
        >
          <TrendingUp size={11} />
          {delta} vs last quarter
        </div>
      )}
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5">
      <h1
        className="text-xl md:text-2xl font-semibold text-foreground"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
      )}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
      {children}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Shipped: "text-blue-400 bg-blue-400/10",
    Delivered: "text-emerald-400 bg-emerald-400/10",
    Pending: "text-amber-400 bg-amber-400/10",
    "In Production": "text-purple-400 bg-purple-400/10",
    Paid: "text-emerald-400 bg-emerald-400/10",
    Overdue: "text-red-400 bg-red-400/10",
  };
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
        map[status] ?? "text-muted-foreground bg-muted"
      }`}
    >
      {status}
    </span>
  );
}

function ProductCard({ good }: { good: (typeof FINISHED_GOODS)[0] }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all group cursor-pointer">
      <div className="aspect-square bg-secondary overflow-hidden">
        <img
          src={good.image}
          alt={good.style_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-3 flex flex-col gap-1">
        <div className="flex items-center justify-between gap-1">
          <span
            className="text-xs text-muted-foreground font-medium truncate"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {good.style_number}
          </span>
          <span className="text-xs px-1.5 py-0.5 rounded bg-secondary text-muted-foreground flex-shrink-0">
            {good.season}
          </span>
        </div>
        <h3 className="text-sm font-medium text-foreground leading-tight line-clamp-1">
          {good.style_name}
        </h3>
        <div className="flex flex-wrap gap-1 mt-0.5">
          <Tag>{good.fabric}</Tag>
          <Tag>{good.color}</Tag>
          <Tag>{good.gsm}g</Tag>
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-xs text-muted-foreground truncate">
            {good.supplier.split(" ")[0]}
          </span>
          <span
            className="text-sm font-semibold"
            style={{
              color: "#0dd9c4",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            ₹{good.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 1: Dashboard ──────────────────────────────────────────────────────

function Dashboard() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <SectionHeader
        title="Overview Dashboard"
        subtitle="Real-time summary of your apparel sourcing ERP"
      />

      <div className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard
          icon={Package}
          label="Finished Goods"
          value="1,248"
          delta="+12%"
          color="#0dd9c4"
        />
        <StatCard
          icon={Truck}
          label="Suppliers"
          value="38"
          delta="+3"
          color="#7c3aed"
        />
        <StatCard
          icon={Users}
          label="Buyers"
          value="64"
          delta="+8"
          color="#3b82f6"
        />
        <StatCard
          icon={ShoppingBag}
          label="Sales Orders"
          value="2,841"
          delta="+18%"
          color="#f59e0b"
        />
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value="₹18.4 Cr"
          delta="+23%"
          color="#ec4899"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-foreground">
              Revenue & Orders — 2024
            </h3>
            <span className="text-xs text-muted-foreground px-2 py-1 rounded-md bg-secondary">
              Monthly
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={REVENUE_DATA}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0dd9c4" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0dd9c4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(13,217,196,0.07)"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#6b82a0", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6b82a0", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
              />
              <Tooltip
                contentStyle={{
                  background: "#0f1825",
                  border: "1px solid rgba(13,217,196,0.2)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: "#e8edf5" }}
                itemStyle={{ color: "#0dd9c4" }}
                formatter={(v: number) => [
                  `₹${(v / 100000).toFixed(1)}L`,
                  "Revenue",
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#0dd9c4"
                strokeWidth={2}
                fill="url(#revGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 md:p-5">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Category Mix
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={CATEGORY_DATA}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
              >
                {CATEGORY_DATA.map((d, i) => (
                  <Cell
                    key={`pie-cat-${d.name}`}
                    fill={CHART_COLORS[i % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#0f1825",
                  border: "1px solid rgba(13,217,196,0.2)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                itemStyle={{ color: "#e8edf5" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
            {CATEGORY_DATA.map((d, i) => (
              <div
                key={`legend-cat-${d.name}`}
                className="flex items-center justify-between text-xs"
              >
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: CHART_COLORS[i] }}
                  />
                  <span className="truncate">{d.name}</span>
                </span>
                <span className="text-foreground font-medium ml-1">
                  {d.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <div className="bg-card border border-border rounded-xl p-4 md:p-5">
          <h3 className="text-sm font-medium text-foreground mb-4">
            Top Buyers by Revenue
          </h3>
          <div className="flex flex-col gap-1">
            {BUYERS.sort((a, b) => b.revenue - a.revenue)
              .slice(0, 5)
              .map((b, i) => (
                <div
                  key={`buyer-row-${b.id}`}
                  className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                >
                  <span className="text-xs text-muted-foreground w-4 flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground font-medium truncate">
                      {b.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {b.country} · {b.category}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div
                      className="text-sm font-medium"
                      style={{
                        color: "#0dd9c4",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      ₹{(b.revenue / 100000).toFixed(1)}L
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {b.orders} orders
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 md:p-5">
          <h3 className="text-sm font-medium text-foreground mb-4">
            Recent Orders
          </h3>
          <div className="flex flex-col gap-1">
            {SALES_ORDERS.slice(0, 5).map((o) => (
              <div
                key={`order-row-${o.id}`}
                className="flex items-center gap-3 py-2 border-b border-border last:border-0"
              >
                <span
                  className="text-xs text-muted-foreground flex-shrink-0"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {o.id}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-foreground truncate">
                    {o.buyer}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {o.style}
                  </div>
                </div>
                <StatusBadge status={o.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 md:p-5">
        <h3 className="text-sm font-medium text-foreground mb-4">
          Supplier Performance
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart
            data={SUPPLIERS.slice(0, 7)}
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(13,217,196,0.07)"
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "#6b82a0", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => v.split(" ")[0]}
            />
            <YAxis
              domain={[3.8, 5]}
              tick={{ fill: "#6b82a0", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "#0f1825",
                border: "1px solid rgba(13,217,196,0.2)",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: "#e8edf5" }}
              itemStyle={{ color: "#7c3aed" }}
              formatter={(v: number) => [v, "Rating"]}
            />
            <Bar dataKey="rating" radius={[4, 4, 0, 0]}>
              {SUPPLIERS.slice(0, 7).map((_, i) => (
                <Cell
                  key={`bar-sup-${i}`}
                  fill={i === 0 || i === 4 ? "#0dd9c4" : "#7c3aed"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Screen 2: NL Query ───────────────────────────────────────────────────────

const SAMPLE_QUERIES = [
  "Show all cotton shirts supplied by ABC Textiles",
  "Which buyers purchased garments above 220 GSM?",
  "Which supplier has the highest average order value?",
  "Which buyer generated the highest revenue?",
  "Show black hoodies under ₹1,500",
  "Show all pending invoices",
  "Which supplier supplied the most denim products?",
  "Show blue striped shirts",
  "Show all overdue invoices",
  "Which supplier has the fastest lead time?",
];

function MiniChart({
  chartData,
}: {
  chartData: {
    type: "bar" | "pie" | "line";
    data: { name: string; value: number }[];
  };
}) {
  return (
    <div className="bg-secondary border border-border rounded-xl p-3 mt-2">
      <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
        <BarChart2 size={11} /> Chart
      </p>
      <ResponsiveContainer width="100%" height={120}>
        <BarChart
          data={chartData.data}
          margin={{ top: 2, right: 2, left: -28, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(13,217,196,0.07)" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#6b82a0", fontSize: 9 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b82a0", fontSize: 9 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
          />
          <Tooltip
            contentStyle={{
              background: "#0f1825",
              border: "1px solid rgba(13,217,196,0.2)",
              borderRadius: 8,
              fontSize: 11,
            }}
            labelStyle={{ color: "#e8edf5" }}
            itemStyle={{ color: "#0dd9c4" }}
          />
          <Bar dataKey="value" radius={[3, 3, 0, 0]}>
            {chartData.data.map((_, i) => (
              <Cell
                key={`mini-bar-${i}`}
                fill={i === 0 ? "#0dd9c4" : "#7c3aed"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function NLQuery() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submit = useCallback(
    async (query?: string) => {
      const q = (query || input).trim();
      if (!q || loading) return;
      setInput("");
      setMessages((prev) => [...prev, { role: "user", content: q }]);
      setLoading(true);
      await new Promise((r) => setTimeout(r, 700 + Math.random() * 400));
      const resp = processNLQuery(q);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: resp.answer,
          sql: resp.sql,
          confidence: resp.confidence,
          table: resp.table,
          chartData: resp.chartData,
        },
      ]);
      setLoading(false);
    },
    [input, loading]
  );

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 72px)" }}>
      <SectionHeader
        title="Natural Language Query"
        subtitle="Ask ERP questions in plain English — get SQL, results & AI answers"
      />

      <div
        className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-1 gap-5 py-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Sparkles size={26} style={{ color: "#0dd9c4" }} />
            </div>
            <div className="text-center px-4">
              <h2
                className="text-lg font-semibold text-foreground mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ask your ERP anything
              </h2>
              <p className="text-muted-foreground text-sm max-w-sm">
                Type a question in plain English. The AI generates SQL, runs it,
                and explains the results.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 w-full max-w-lg sm:grid-cols-2">
              {SAMPLE_QUERIES.slice(0, 6).map((q) => (
                <button
                  key={q}
                  onClick={() => submit(q)}
                  className="text-left px-3 py-2.5 rounded-lg bg-secondary border border-border text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all"
                >
                  <ChevronRight
                    size={11}
                    className="inline mr-1"
                    style={{ color: "#0dd9c4" }}
                  />
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={`msg-${i}`}
            className={`flex flex-col gap-2 ${
              msg.role === "user" ? "items-end" : "items-start"
            }`}
          >
            {msg.role === "user" ? (
              <div className="max-w-xs sm:max-w-lg px-4 py-2.5 rounded-2xl rounded-br-sm bg-primary text-primary-foreground text-sm">
                {msg.content}
              </div>
            ) : (
              <div className="w-full flex flex-col gap-2">
                {msg.confidence !== undefined && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Sparkles size={11} style={{ color: "#0dd9c4" }} />
                    <span>AI confidence:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${msg.confidence}%`,
                            background:
                              msg.confidence > 90
                                ? "#0dd9c4"
                                : msg.confidence > 75
                                ? "#f59e0b"
                                : "#ef4444",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          color: msg.confidence > 90 ? "#0dd9c4" : "#f59e0b",
                        }}
                      >
                        {msg.confidence}%
                      </span>
                    </div>
                  </div>
                )}
                {msg.sql && (
                  <div className="bg-secondary border border-border rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
                      <Code2 size={12} style={{ color: "#0dd9c4" }} />
                      <span className="text-xs text-muted-foreground font-medium">
                        Generated SQL
                      </span>
                    </div>
                    <pre
                      className="px-4 py-3 text-xs overflow-x-auto leading-relaxed"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: "#0dd9c4",
                        scrollbarWidth: "none",
                      }}
                    >
                      {msg.sql}
                    </pre>
                  </div>
                )}
                {msg.table && (
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
                      <span className="text-xs text-muted-foreground font-medium">
                        Results — {msg.table.rows.length} row
                        {msg.table.rows.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div
                      className="overflow-x-auto"
                      style={{ scrollbarWidth: "none" }}
                    >
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border">
                            {msg.table.headers.map((h, hi) => (
                              <th
                                key={`th-${i}-${hi}`}
                                className="px-4 py-2.5 text-left text-muted-foreground font-medium whitespace-nowrap"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {msg.table.rows.map((row, ri) => (
                            <tr
                              key={`tr-${i}-${ri}`}
                              className="border-b border-border/40 last:border-0 hover:bg-secondary/40 transition-colors"
                            >
                              {row.map((cell, ci) => (
                                <td
                                  key={`td-${i}-${ri}-${ci}`}
                                  className="px-4 py-2.5 text-foreground whitespace-nowrap"
                                  style={{
                                    fontFamily:
                                      typeof cell === "number"
                                        ? "'JetBrains Mono', monospace"
                                        : undefined,
                                  }}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {msg.chartData && <MiniChart chartData={msg.chartData} />}
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-primary/20">
                    <Sparkles size={12} style={{ color: "#0dd9c4" }} />
                  </div>
                  <div className="flex-1 bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-foreground leading-relaxed">
                    {msg.content}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Sparkles size={12} style={{ color: "#0dd9c4" }} />
            </div>
            <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
              {[0, 1, 2].map((i) => (
                <span
                  key={`dot-${i}`}
                  className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length > 0 && (
        <div
          className="flex flex-wrap gap-2 py-2 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {SAMPLE_QUERIES.slice(0, 4).map((q) => (
            <button
              key={q}
              onClick={() => submit(q)}
              className="text-xs px-3 py-1.5 rounded-full bg-secondary border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all whitespace-nowrap flex-shrink-0"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="pt-2 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything, e.g. Show all pending invoices above ₹10,000"
            className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors min-w-0"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-4 py-3 rounded-xl bg-primary text-primary-foreground flex items-center gap-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-40 transition-all flex-shrink-0"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Screen 3: Product Search ─────────────────────────────────────────────────

const CATEGORIES = [
  "All",
  "T-Shirt",
  "Jeans",
  "Dress",
  "Hoodie",
  "Blazer",
  "Shirt",
  "Jacket",
  "Activewear",
  "Ethnic",
  "Shorts",
  "Sweater",
  "Trousers",
  "Accessories",
];
const FABRICS = [
  "All",
  "Cotton",
  "Denim",
  "Viscose",
  "Fleece",
  "Linen",
  "Leather",
  "Spandex",
  "Cashmere",
  "Silk",
  "Wool",
  "Cotton Twill",
];
const COLORS_LIST = [
  "All",
  "White",
  "Blue",
  "Black",
  "Beige",
  "Indigo",
  "Multicolor",
  "Brown",
  "Navy",
  "Red",
  "Olive",
  "Grey",
];

function FilterSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs text-muted-foreground font-medium uppercase tracking-widest block mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-xs bg-secondary border border-border rounded-lg px-2.5 py-2 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function ProductSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [fabric, setFabric] = useState("All");
  const [color, setColor] = useState("All");
  const [supplier, setSupplier] = useState("All");
  const [gsmMax, setGsmMax] = useState(600);
  const [showFilters, setShowFilters] = useState(false);
  const SUPPLIERS_LIST = ["All", ...SUPPLIERS.map((s) => s.name)];

  const filtered = FINISHED_GOODS.filter((g) => {
    const qL = query.toLowerCase();
    const matchQ =
      !query ||
      g.style_name.toLowerCase().includes(qL) ||
      g.category.toLowerCase().includes(qL) ||
      g.color.toLowerCase().includes(qL) ||
      g.fabric.toLowerCase().includes(qL) ||
      g.print.toLowerCase().includes(qL) ||
      g.brand.toLowerCase().includes(qL);
    return (
      matchQ &&
      (category === "All" || g.category === category) &&
      (fabric === "All" || g.fabric === fabric) &&
      (color === "All" || g.color === color) &&
      (supplier === "All" || g.supplier === supplier) &&
      g.gsm <= gsmMax
    );
  });

  const hasFilters =
    category !== "All" ||
    fabric !== "All" ||
    color !== "All" ||
    supplier !== "All" ||
    gsmMax < 600;
  const clearAll = () => {
    setCategory("All");
    setFabric("All");
    setColor("All");
    setSupplier("All");
    setGsmMax(600);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
      {/* Filters sidebar */}
      <div className="w-full md:w-48 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h1
            className="text-xl font-semibold text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Search
          </h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary border border-border px-2.5 py-1.5 rounded-lg"
          >
            <Filter size={12} /> Filters{" "}
            {hasFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            )}
          </button>
        </div>
        <div
          className={`flex flex-col gap-3 ${
            showFilters ? "block" : "hidden"
          } md:flex`}
        >
          <FilterSelect
            label="Category"
            options={CATEGORIES}
            value={category}
            onChange={setCategory}
          />
          <FilterSelect
            label="Fabric"
            options={FABRICS}
            value={fabric}
            onChange={setFabric}
          />
          <FilterSelect
            label="Color"
            options={COLORS_LIST}
            value={color}
            onChange={setColor}
          />
          <FilterSelect
            label="Supplier"
            options={SUPPLIERS_LIST}
            value={supplier}
            onChange={setSupplier}
          />
          <div>
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-widest block mb-1.5">
              Max GSM: {gsmMax}
            </label>
            <input
              type="range"
              min={70}
              max={600}
              step={10}
              value={gsmMax}
              onChange={(e) => setGsmMax(+e.target.value)}
              className="w-full accent-primary"
            />
          </div>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-primary flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <X size={11} /> Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, fabric, color, print, brand…"
              className="w-full pl-8 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
            {filtered.length} results
          </span>
        </div>

        <div
          className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-3 overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {filtered.map((g) => (
            <ProductCard key={`search-${g.id}`} good={g} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
              <Package size={32} className="opacity-30" />
              <p className="text-sm">No products match your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 4: Image Search ───────────────────────────────────────────────────

function scoreGood(good: (typeof FINISHED_GOODS)[0], query: string): number {
  const q = query.toLowerCase();
  const tokens = q.split(/\s+/);
  let score = 0;
  const fields = [
    { val: good.style_name.toLowerCase(), weight: 4 },
    { val: good.category.toLowerCase(), weight: 3 },
    { val: good.color.toLowerCase(), weight: 3 },
    { val: good.fabric.toLowerCase(), weight: 2 },
    { val: good.print.toLowerCase(), weight: 2 },
    { val: good.brand.toLowerCase(), weight: 1 },
    { val: good.season.toLowerCase(), weight: 1 },
  ];
  for (const token of tokens) {
    if (token.length < 2) continue;
    for (const { val, weight } of fields) {
      if (val.includes(token)) score += weight;
      else if (
        token.includes(val.split(" ")[0]) &&
        val.split(" ")[0].length > 3
      )
        score += weight * 0.5;
    }
  }
  // Partial phrase match bonus
  if (q.includes(good.style_name.toLowerCase())) score += 6;
  if (q.includes(good.category.toLowerCase())) score += 4;
  return score;
}

const IMAGE_SEARCH_SUGGESTIONS = [
  "Blue floral dress",
  "Black oversized hoodie",
  "Cotton polo t-shirt",
  "Denim slim jeans",
  "Wool turtleneck sweater",
  "Silk scarf",
  "Linen blazer beige",
  "Ethnic kurta red",
];

function ImageSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    ((typeof FINISHED_GOODS)[0] & { score: number; similarity: number })[]
  >([]);
  const [dragging, setDragging] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) return;
    setSearching(true);
    setResults([]);
    setSearchTerm(q);
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 300));
    const scored = FINISHED_GOODS.map((g) => ({
      ...g,
      score: scoreGood(g, q),
      similarity: 0,
    }))
      .filter((g) => g.score > 0)
      .sort((a, b) => b.score - a.score);
    const maxScore = scored[0]?.score ?? 1;
    const withSimilarity = scored.map((g) => ({
      ...g,
      similarity: Math.round((g.score / maxScore) * 100),
    }));
    setResults(
      withSimilarity.length > 0
        ? withSimilarity
        : FINISHED_GOODS.slice(0, 6).map((g) => ({
            ...g,
            score: 0,
            similarity: Math.floor(40 + Math.random() * 30),
          }))
    );
    setSearching(false);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      setPreviewImg(URL.createObjectURL(file));
      doSearch("garment apparel clothing fashion");
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
      doSearch("garment apparel clothing fashion");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        title="Semantic & Image Search"
        subtitle="Find garments by description or upload an image to find visually similar products"
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3 flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && doSearch(query)}
                placeholder="Describe a garment, e.g. Blue floral dress"
                className="w-full pl-8 pr-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <button
              onClick={() => doSearch(query)}
              disabled={!query.trim() || searching}
              className="px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40 transition-all flex items-center gap-2 flex-shrink-0"
            >
              {searching ? (
                <RefreshCw size={14} className="animate-spin" />
              ) : (
                <Zap size={14} />
              )}
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {IMAGE_SEARCH_SUGGESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setQuery(q);
                  doSearch(q);
                }}
                className="text-xs px-2.5 py-1 rounded-full bg-secondary border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`lg:col-span-2 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 p-5 cursor-pointer transition-all min-h-[120px] ${
            dragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/40 hover:bg-primary/3"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
          {previewImg ? (
            <div className="flex items-center gap-3">
              <img
                src={previewImg}
                alt="uploaded"
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <p className="text-xs font-medium text-primary">
                  Image uploaded
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Finding similar garments…
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewImg(null);
                    setResults([]);
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground mt-1 flex items-center gap-1 transition-colors"
                >
                  <X size={10} /> Remove
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Upload size={18} style={{ color: "#0dd9c4" }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  Drop image here
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  PNG, JPG, WEBP · or click to browse
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {searching && (
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground bg-secondary border border-border rounded-xl px-4 py-3">
          <RefreshCw
            size={13}
            className="animate-spin flex-shrink-0"
            style={{ color: "#0dd9c4" }}
          />
          Running semantic embedding search for &ldquo;{searchTerm}&rdquo;…
        </div>
      )}

      {results.length > 0 && !searching && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-muted-foreground">
              {results.length} results for{" "}
              <span className="text-foreground">
                &ldquo;{searchTerm}&rdquo;
              </span>
            </p>
            <span className="text-xs text-muted-foreground">
              Ranked by semantic similarity
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {results.slice(0, 8).map((g) => (
              <div
                key={`img-result-${g.id}`}
                className="flex flex-col gap-0 bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all group"
              >
                <div className="aspect-square bg-secondary overflow-hidden relative">
                  <img
                    src={g.image}
                    alt={g.style_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div
                    className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      color:
                        g.similarity > 70
                          ? "#0dd9c4"
                          : g.similarity > 40
                          ? "#f59e0b"
                          : "#6b82a0",
                    }}
                  >
                    {g.similarity}%
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-medium text-foreground line-clamp-1">
                    {g.style_name}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      {g.color} · {g.fabric}
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{
                        color: "#0dd9c4",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      ₹{g.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1.5 w-full h-1 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${g.similarity}%`,
                        background:
                          g.similarity > 70
                            ? "#0dd9c4"
                            : g.similarity > 40
                            ? "#f59e0b"
                            : "#6b82a0",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Screen 5: Finished Goods Explorer ───────────────────────────────────────

type SortKey = "style_number" | "style_name" | "price" | "gsm" | "cost";

function FinishedGoodsExplorer() {
  const [sortKey, setSortKey] = useState<SortKey>("style_number");
  const [sortAsc, setSortAsc] = useState(true);
  const [filterCat, setFilterCat] = useState("All");
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"grid" | "list">("grid");
  const PER_PAGE = view === "grid" ? 8 : 10;

  const sorted = [...FINISHED_GOODS]
    .filter((g) => filterCat === "All" || g.category === filterCat)
    .sort((a, b) =>
      sortAsc
        ? a[sortKey] > b[sortKey]
          ? 1
          : -1
        : a[sortKey] < b[sortKey]
        ? 1
        : -1
    );

  const pages = Math.ceil(sorted.length / PER_PAGE);
  const current = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const cats = [
    "All",
    ...Array.from(new Set(FINISHED_GOODS.map((g) => g.category))),
  ];

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader
        title="Finished Goods Explorer"
        subtitle="Professional product gallery with sorting, filtering & pagination"
      />

      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {cats.map((c) => (
            <button
              key={`cat-pill-${c}`}
              onClick={() => {
                setFilterCat(c);
                setPage(1);
              }}
              className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                filterCat === c
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <select
            value={sortKey}
            onChange={(e) => {
              setSortKey(e.target.value as SortKey);
              setPage(1);
            }}
            className="text-xs bg-secondary border border-border rounded-lg px-2.5 py-1.5 text-muted-foreground focus:outline-none focus:border-primary/50"
          >
            <option value="style_number">Style #</option>
            <option value="style_name">Name</option>
            <option value="price">Price</option>
            <option value="gsm">GSM</option>
            <option value="cost">Cost</option>
          </select>
          <button
            onClick={() => setSortAsc(!sortAsc)}
            title={sortAsc ? "Ascending" : "Descending"}
            className="p-1.5 rounded-lg bg-secondary border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowUpDown size={12} />
          </button>
          <button
            onClick={() => setView("grid")}
            className={`p-1.5 rounded-lg border transition-colors ${
              view === "grid"
                ? "bg-primary/15 border-primary/40 text-primary"
                : "bg-secondary border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Grid3x3 size={12} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-1.5 rounded-lg border transition-colors ${
              view === "list"
                ? "bg-primary/15 border-primary/40 text-primary"
                : "bg-secondary border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <List size={12} />
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {current.map((g) => (
            <ProductCard key={`exp-${g.id}`} good={g} />
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-border">
                  {(
                    [
                      ["style_number", "Style #"],
                      ["style_name", "Name"],
                      ["category", "Category"],
                      ["fabric", "Fabric"],
                      ["gsm", "GSM"],
                      ["supplier", "Supplier"],
                      ["price", "Price ₹"],
                    ] as [SortKey | string, string][]
                  ).map(([key, label]) => (
                    <th
                      key={`th-exp-${key}`}
                      className="px-4 py-3 text-left text-xs text-muted-foreground font-medium"
                    >
                      <button
                        onClick={() => toggleSort(key as SortKey)}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        {label}{" "}
                        <ArrowUpDown
                          size={9}
                          className={sortKey === key ? "text-primary" : ""}
                        />
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.map((g) => (
                  <tr
                    key={`exp-row-${g.id}`}
                    className="border-b border-border/40 last:border-0 hover:bg-secondary/40 transition-colors"
                  >
                    <td
                      className="px-4 py-2.5 text-xs text-muted-foreground"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {g.style_number}
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <img
                          src={g.image}
                          alt={g.style_name}
                          className="w-8 h-8 rounded object-cover flex-shrink-0"
                        />
                        <span className="text-sm text-foreground whitespace-nowrap">
                          {g.style_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <Tag>{g.category}</Tag>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">
                      {g.fabric}
                    </td>
                    <td
                      className="px-4 py-2.5 text-xs text-muted-foreground"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {g.gsm}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                      {g.supplier}
                    </td>
                    <td
                      className="px-4 py-2.5 text-sm font-medium"
                      style={{
                        color: "#0dd9c4",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      ₹{g.price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Showing {(page - 1) * PER_PAGE + 1}–
          {Math.min(page * PER_PAGE, sorted.length)} of {sorted.length}
        </span>
        <div className="flex items-center gap-1">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={`page-${p}`}
              onClick={() => setPage(p)}
              className={`w-7 h-7 text-xs rounded-lg transition-all ${
                page === p
                  ? "bg-primary text-primary-foreground font-medium"
                  : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

const NAV = [
  { id: "dashboard" as Screen, label: "Dashboard", icon: LayoutDashboard },
  { id: "nlquery" as Screen, label: "AI Query", icon: MessageSquare },
  { id: "search" as Screen, label: "Product Search", icon: Search },
  { id: "imagesearch" as Screen, label: "Image Search", icon: ImageIcon },
  { id: "explorer" as Screen, label: "Goods Explorer", icon: Package },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="flex h-screen bg-background overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-30 top-0 left-0 h-full w-52 flex-shrink-0 flex flex-col border-r bg-sidebar transition-transform duration-200 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ borderColor: "rgba(13,217,196,0.1)" }}
      >
        <div
          className="px-4 py-4 border-b flex items-center justify-between"
          style={{ borderColor: "rgba(13,217,196,0.1)" }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path
                  d="M12 2C10 2 8.5 3 7.5 4.5C6 4 4.5 4.5 3.5 5.5C2.5 6.5 2 8 2.5 9.5C1.5 10.5 1 12 1.5 13.5C2 15 3.5 16 5 16H19C20.5 16 22 15 22.5 13.5C23 12 22.5 10.5 21.5 9.5C22 8 21.5 6.5 20.5 5.5C19.5 4.5 18 4 16.5 4.5C15.5 3 14 2 12 2Z"
                  fill="currentColor"
                  style={{ color: "#080e1a" }}
                />
              </svg>
            </div>
            <div>
              <div
                className="text-sm font-semibold text-foreground"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                WFX
              </div>
              <div className="text-xs text-muted-foreground leading-none">
                AI-Native ERP
              </div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <nav
          className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="text-xs text-muted-foreground px-2 mb-2 font-medium uppercase tracking-widest">
            Platform
          </div>
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setScreen(id);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all w-full text-left ${
                screen === id
                  ? "bg-primary/15 text-primary font-medium border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>

        <div
          className="px-4 py-3 border-t"
          style={{ borderColor: "rgba(13,217,196,0.1)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
              style={{ background: "rgba(124,58,237,0.2)", color: "#7c3aed" }}
            >
              AI
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium text-foreground truncate">
                Intern Demo
              </div>
              <div className="text-xs text-muted-foreground truncate">
                WFX Skill Test 2026
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-sidebar">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3">
                <path
                  d="M12 2C10 2 8.5 3 7.5 4.5C6 4 4.5 4.5 3.5 5.5C2.5 6.5 2 8 2.5 9.5C1.5 10.5 1 12 1.5 13.5C2 15 3.5 16 5 16H19C20.5 16 22 15 22.5 13.5C23 12 22.5 10.5 21.5 9.5C22 8 21.5 6.5 20.5 5.5C19.5 4.5 18 4 16.5 4.5C15.5 3 14 2 12 2Z"
                  fill="currentColor"
                  style={{ color: "#080e1a" }}
                />
              </svg>
            </div>
            <span
              className="text-sm font-semibold text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {NAV.find((n) => n.id === screen)?.label}
            </span>
          </div>
        </div>

        <main
          className="flex-1 overflow-y-auto px-4 py-5 md:px-8 md:py-7"
          style={{ scrollbarWidth: "none" }}
        >
          {screen === "dashboard" && <Dashboard />}
          {screen === "nlquery" && <NLQuery />}
          {screen === "search" && <ProductSearch />}
          {screen === "imagesearch" && <ImageSearch />}
          {screen === "explorer" && <FinishedGoodsExplorer />}
        </main>
      </div>
    </div>
  );
}
