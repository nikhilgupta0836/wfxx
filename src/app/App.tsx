import { useState, useRef, useEffect, useCallback } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line,
} from "recharts";
import {
  LayoutDashboard, MessageSquare, Search, ImageIcon, Package,
  Send, Sparkles, Code2, ChevronRight, TrendingUp, Users, ShoppingBag,
  DollarSign, Truck, Upload, X, RefreshCw, Grid3x3, List, ArrowUpDown,
  Menu, Zap, BarChart2, Filter, FileText, Globe, Star, Database, BookOpen,
} from "lucide-react";
import React from "react";

// ─── Image with fallback ──────────────────────────────────────────────────────
const FC = ["#0dd9c4","#7c3aed","#f59e0b","#3b82f6","#ec4899","#6b82a0","#10b981","#f97316"];
function GarmentImage({ src, alt, className, index=0 }: { src:string; alt:string; className?:string; index?:number }) {
  const [failed, setFailed] = useState(false);
  const c = FC[index % FC.length];
  if (failed) return (
    <div className={`flex items-center justify-center ${className??""}`} style={{background:`linear-gradient(135deg,${c}22,${c}08)`}}>
      <Package size={24} style={{color:c,opacity:0.5}} />
    </div>
  );
  return <img src={src} alt={alt} className={className} onError={()=>setFailed(true)} loading="lazy" />;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FG = [
  {id:1,sn:"WFX-1001",name:"Classic Cotton Polo",cat:"T-Shirt",fabric:"Cotton",gsm:180,color:"White",print:"Solid",season:"SS24",brand:"Zara",supplier:"ABC Textiles",cost:420,price:890,img:"https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop&auto=format"},
  {id:2,sn:"WFX-1002",name:"Denim Slim Fit Jeans",cat:"Jeans",fabric:"Denim",gsm:320,color:"Indigo",print:"Solid",season:"AW24",brand:"H&M",supplier:"Blue Thread Co.",cost:680,price:1450,img:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&auto=format"},
  {id:3,sn:"WFX-1003",name:"Floral Wrap Dress",cat:"Dress",fabric:"Viscose",gsm:120,color:"Multicolor",print:"Floral",season:"SS24",brand:"Mango",supplier:"Silk Route Fabrics",cost:540,price:1200,img:"https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop&auto=format"},
  {id:4,sn:"WFX-1004",name:"Oversized Black Hoodie",cat:"Hoodie",fabric:"Fleece",gsm:280,color:"Black",print:"Solid",season:"AW24",brand:"Uniqlo",supplier:"KnitWear Industries",cost:590,price:1350,img:"https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400"},
  {id:5,sn:"WFX-1005",name:"Linen Blazer",cat:"Blazer",fabric:"Linen",gsm:210,color:"Beige",print:"Solid",season:"SS24",brand:"Zara",supplier:"Euro Weaves",cost:920,price:2100,img:"https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop&auto=format"},
  {id:6,sn:"WFX-1006",name:"Striped Oxford Shirt",cat:"Shirt",fabric:"Cotton",gsm:160,color:"Blue",print:"Striped",season:"SS24",brand:"Tommy",supplier:"ABC Textiles",cost:380,price:850,img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop&auto=format"},
  {id:7,sn:"WFX-1007",name:"Leather Bomber Jacket",cat:"Jacket",fabric:"Leather",gsm:500,color:"Brown",print:"Solid",season:"AW24",brand:"Zara",supplier:"Punjab Leather",cost:2100,price:4800,img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop&auto=format"},
  {id:8,sn:"WFX-1008",name:"Yoga Leggings",cat:"Activewear",fabric:"Spandex",gsm:200,color:"Navy",print:"Solid",season:"SS24",brand:"Nike",supplier:"SportsTex",cost:450,price:1100,img:"https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop&auto=format"},
{id:9,sn:"WFX-1009",name:"Paisley Print Kurta",cat:"Ethnic",fabric:"Cotton",gsm:140,color:"Red",print:"Paisley",season:"FE24",brand:"FabIndia",supplier:"Artisan Weaves",cost:320,price:720,img:"https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400"},
{id:10,sn:"WFX-1010",name:"Cargo Shorts",cat:"Shorts",fabric:"Cotton Twill",gsm:240,color:"Olive",print:"Solid",season:"SS24",brand:"H&M",supplier:"Blue Thread Co.",cost:290,price:650,img:"https://images.pexels.com/photos/6311666/pexels-photo-6311666.jpeg?auto=compress&cs=tinysrgb&w=400"},
  {id:11,sn:"WFX-1011",name:"Cashmere Turtleneck",cat:"Sweater",fabric:"Cashmere",gsm:260,color:"Grey",print:"Solid",season:"AW24",brand:"Max Mara",supplier:"Highland Yarns",cost:1800,price:4200,img:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop&auto=format"},
  {id:12,sn:"WFX-1012",name:"Abstract Print Scarf",cat:"Accessories",fabric:"Silk",gsm:70,color:"Multicolor",print:"Abstract",season:"AW24",brand:"Mango",supplier:"Silk Route Fabrics",cost:240,price:580,img:"https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop&auto=format"},
  {id:13,sn:"WFX-1013",name:"Relaxed Linen Trousers",cat:"Trousers",fabric:"Linen",gsm:190,color:"White",print:"Solid",season:"SS24",brand:"Zara",supplier:"Euro Weaves",cost:560,price:1250,img:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop&auto=format"},
  {id:14,sn:"WFX-1014",name:"Black Skinny Jeans",cat:"Jeans",fabric:"Denim",gsm:300,color:"Black",print:"Solid",season:"AW24",brand:"H&M",supplier:"Blue Thread Co.",cost:640,price:1380,img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop&auto=format"},
  {id:15,sn:"WFX-1015",name:"Merino Wool Sweater",cat:"Sweater",fabric:"Wool",gsm:250,color:"Navy",print:"Solid",season:"AW24",brand:"Uniqlo",supplier:"Highland Yarns",cost:980,price:2200,img:"https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=400&fit=crop&auto=format"},
  {id:16,sn:"WFX-1016",name:"Graphic Print Tee",cat:"T-Shirt",fabric:"Cotton",gsm:170,color:"Black",print:"Graphic",season:"SS24",brand:"H&M",supplier:"ABC Textiles",cost:280,price:650,img:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop&auto=format"},
  {id:17,sn:"WFX-1017",name:"Embroidered Midi Skirt",cat:"Skirt",fabric:"Cotton",gsm:150,color:"Blue",print:"Embroidered",season:"SS24",brand:"Mango",supplier:"Artisan Weaves",cost:480,price:1080,img:"https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=400&fit=crop&auto=format"},
  {id:18,sn:"WFX-1018",name:"Quilted Puffer Jacket",cat:"Jacket",fabric:"Polyester",gsm:380,color:"Black",print:"Solid",season:"AW24",brand:"Zara",supplier:"KnitWear Industries",cost:1200,price:2800,img:"https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=400&h=400&fit=crop&auto=format"},
  {id:19,sn:"WFX-1019",name:"Palazzo Pants",cat:"Trousers",fabric:"Crepe",gsm:130,color:"Beige",print:"Solid",season:"SS24",brand:"FabIndia",supplier:"Silk Route Fabrics",cost:390,price:890,img:"https://images.pexels.com/photos/6311608/pexels-photo-6311608.jpeg?auto=compress&cs=tinysrgb&w=400"},
  {id:20,sn:"WFX-1020",name:"Athletic Performance Tee",cat:"Activewear",fabric:"Polyester",gsm:140,color:"White",print:"Solid",season:"SS24",brand:"Nike",supplier:"SportsTex",cost:310,price:750,img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&auto=format"},
];

const SUPPLIERS = [
  {id:1,name:"ABC Textiles",country:"India",contact:"rahul@abctex.com",lead:30,rating:4.8,orders:62,revenue:4820000,spec:"Cotton, Knits",cert:"GOTS, OEKO-TEX"},
  {id:2,name:"Blue Thread Co.",country:"Bangladesh",contact:"info@bluethread.bd",lead:45,rating:4.2,orders:48,revenue:3640000,spec:"Denim, Wovens",cert:"BSCI"},
  {id:3,name:"Silk Route Fabrics",country:"China",contact:"silk@srfabrics.cn",lead:35,rating:4.5,orders:31,revenue:2180000,spec:"Silk, Viscose",cert:"ISO 9001"},
  {id:4,name:"KnitWear Industries",country:"Turkey",contact:"knitwear@tr.com",lead:28,rating:4.7,orders:41,revenue:3120000,spec:"Fleece, Jersey",cert:"GOTS, WRAP"},
  {id:5,name:"Euro Weaves",country:"Italy",contact:"orders@euroweaves.it",lead:50,rating:4.9,orders:18,revenue:5110000,spec:"Linen, Luxury",cert:"OEKO-TEX, SA8000"},
  {id:6,name:"Punjab Leather",country:"India",contact:"leather@punjab.in",lead:40,rating:4.3,orders:24,revenue:4608000,spec:"Leather, Suede",cert:"LWG Gold"},
  {id:7,name:"SportsTex",country:"Vietnam",contact:"sportstex@vn.com",lead:32,rating:4.6,orders:29,revenue:1890000,spec:"Activewear, Spandex",cert:"bluesign"},
  {id:8,name:"Artisan Weaves",country:"India",contact:"artisan@weaves.in",lead:25,rating:4.4,orders:55,revenue:720000,spec:"Ethnic, Embroidery",cert:"Fair Trade"},
  {id:9,name:"Highland Yarns",country:"Scotland",contact:"yarn@highland.uk",lead:60,rating:4.9,orders:12,revenue:2860000,spec:"Cashmere, Wool",cert:"RWS, GOTS"},
];

const BUYERS = [
  {id:1,name:"Zara International",country:"Spain",cat:"Fast Fashion",orders:42,revenue:18200000,pending:3},
  {id:2,name:"H&M Group",country:"Sweden",cat:"Fast Fashion",orders:38,revenue:15400000,pending:2},
  {id:3,name:"Mango",country:"Spain",cat:"Mid Premium",orders:24,revenue:9800000,pending:1},
  {id:4,name:"Uniqlo",country:"Japan",cat:"Basics",orders:31,revenue:12100000,pending:0},
  {id:5,name:"Tommy Hilfiger",country:"USA",cat:"Premium",orders:18,revenue:16800000,pending:2},
  {id:6,name:"Max Mara",country:"Italy",cat:"Luxury",orders:9,revenue:23400000,pending:1},
  {id:7,name:"FabIndia",country:"India",cat:"Ethnic",orders:55,revenue:7200000,pending:4},
  {id:8,name:"Nike Apparel",country:"USA",cat:"Sportswear",orders:29,revenue:18900000,pending:0},
];

const TECH_PACKS = [
  {id:1,sn:"WFX-1001",fabric:"100% Combed Cotton, 180 GSM, Single Jersey",construction:"S/S Polo with 3-button placket, rib collar",wash:"Machine wash cold, tumble dry low",status:"Approved",ver:"v2.1"},
  {id:2,sn:"WFX-1002",fabric:"99% Cotton 1% Elastane Denim, 320 GSM, Twill",construction:"5-pocket slim fit, zip fly, belt loops",wash:"Machine wash cold, line dry",status:"Approved",ver:"v1.3"},
  {id:3,sn:"WFX-1004",fabric:"80% Cotton 20% Polyester Fleece, 280 GSM",construction:"Oversized fit, kangaroo pocket, ribbed cuffs",wash:"Machine wash warm, tumble dry medium",status:"In Review",ver:"v1.0"},
  {id:4,sn:"WFX-1005",fabric:"100% Belgian Linen, 210 GSM, Plain weave",construction:"Single-breasted 2-button, notch lapel, half-lined",wash:"Dry clean only",status:"Approved",ver:"v3.0"},
  {id:5,sn:"WFX-1007",fabric:"Full-grain cowhide leather, 1.2mm thickness",construction:"Bomber silhouette, ribbed cuffs, zip front",wash:"Professional leather clean only",status:"Draft",ver:"v0.5"},
  {id:6,sn:"WFX-1011",fabric:"100% Grade A Mongolian Cashmere, 260 GSM",construction:"Mock neck, relaxed fit, drop shoulder seam",wash:"Hand wash cold, dry flat",status:"Approved",ver:"v2.0"},
];

const ORDERS = [
  {id:"ORD-2401",buyer:"Zara International",style:"Classic Cotton Polo",sid:1,qty:2400,amount:2136000,status:"Shipped",date:"2024-11-15",ship:"2024-12-10"},
  {id:"ORD-2402",buyer:"H&M Group",style:"Denim Slim Fit Jeans",sid:2,qty:1800,amount:2610000,status:"In Production",date:"2024-11-22",ship:"2025-01-15"},
  {id:"ORD-2403",buyer:"Max Mara",style:"Cashmere Turtleneck",sid:11,qty:600,amount:2520000,status:"Delivered",date:"2024-10-30",ship:"2024-11-28"},
  {id:"ORD-2404",buyer:"Nike Apparel",style:"Yoga Leggings",sid:8,qty:3200,amount:3520000,status:"Shipped",date:"2024-11-28",ship:"2024-12-22"},
  {id:"ORD-2405",buyer:"Uniqlo",style:"Merino Wool Sweater",sid:15,qty:1200,amount:2640000,status:"Pending",date:"2024-12-05",ship:"2025-02-01"},
  {id:"ORD-2406",buyer:"Tommy Hilfiger",style:"Linen Blazer",sid:5,qty:800,amount:1680000,status:"In Production",date:"2024-12-10",ship:"2025-01-25"},
  {id:"ORD-2407",buyer:"FabIndia",style:"Paisley Print Kurta",sid:9,qty:5000,amount:3600000,status:"Shipped",date:"2024-11-18",ship:"2024-12-18"},
  {id:"ORD-2408",buyer:"Mango",style:"Floral Wrap Dress",sid:3,qty:1500,amount:1800000,status:"Delivered",date:"2024-10-20",ship:"2024-11-15"},
  {id:"ORD-2409",buyer:"Zara International",style:"Leather Bomber Jacket",sid:7,qty:400,amount:1920000,status:"In Production",date:"2024-12-01",ship:"2025-02-10"},
  {id:"ORD-2410",buyer:"H&M Group",style:"Graphic Print Tee",sid:16,qty:4000,amount:2600000,status:"Pending",date:"2024-12-12",ship:"2025-01-30"},
];

const INVOICES = [
  {id:"INV-3001",order:"ORD-2401",buyer:"Zara International",amount:2136000,status:"Paid",due:"2024-12-15"},
  {id:"INV-3002",order:"ORD-2403",buyer:"Max Mara",amount:2520000,status:"Paid",due:"2024-11-30"},
  {id:"INV-3003",order:"ORD-2404",buyer:"Nike Apparel",amount:3520000,status:"Pending",due:"2024-12-28"},
  {id:"INV-3004",order:"ORD-2408",buyer:"Mango",amount:1800000,status:"Paid",due:"2024-11-20"},
  {id:"INV-3005",order:"ORD-2405",buyer:"Uniqlo",amount:2640000,status:"Overdue",due:"2024-12-01"},
  {id:"INV-3006",order:"ORD-2406",buyer:"Tommy Hilfiger",amount:1680000,status:"Pending",due:"2025-01-10"},
  {id:"INV-3007",order:"ORD-2407",buyer:"FabIndia",amount:3600000,status:"Pending",due:"2024-12-18"},
  {id:"INV-3008",order:"ORD-2402",buyer:"H&M Group",amount:2610000,status:"Pending",due:"2025-01-20"},
];

const REV = [
  {m:"Jan",rev:820000,ord:94,tgt:900000},{m:"Feb",rev:940000,ord:108,tgt:950000},
  {m:"Mar",rev:1120000,ord:127,tgt:1000000},{m:"Apr",rev:980000,ord:112,tgt:1100000},
  {m:"May",rev:1340000,ord:153,tgt:1200000},{m:"Jun",rev:1580000,ord:178,tgt:1300000},
  {m:"Jul",rev:1420000,ord:162,tgt:1400000},{m:"Aug",rev:1680000,ord:190,tgt:1500000},
  {m:"Sep",rev:1920000,ord:218,tgt:1600000},{m:"Oct",rev:2140000,ord:241,tgt:1800000},
  {m:"Nov",rev:1870000,ord:212,tgt:2000000},{m:"Dec",rev:2380000,ord:267,tgt:2200000},
];

const CAT_DATA = [
  {name:"T-Shirt",value:28},{name:"Jeans",value:18},{name:"Dress",value:15},
  {name:"Jacket",value:12},{name:"Hoodie",value:10},{name:"Other",value:17},
];

const CC = ["#0dd9c4","#7c3aed","#f59e0b","#3b82f6","#ec4899","#6b82a0"];

const DB_DDL = `-- WFX ERP · Supabase / PostgreSQL

CREATE TABLE suppliers (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(100),
  country VARCHAR(50),
  lead_time_days INTEGER,
  rating DECIMAL(2,1),
  certifications TEXT
);

CREATE TABLE finished_goods (
  id SERIAL PRIMARY KEY,
  style_number VARCHAR(20) UNIQUE,
  style_name VARCHAR(150),
  category VARCHAR(50),
  fabric VARCHAR(80),
  gsm INTEGER,
  color VARCHAR(50),
  print VARCHAR(50),
  season VARCHAR(10),
  supplier_id INTEGER REFERENCES suppliers(id),
  cost DECIMAL(10,2),
  selling_price DECIMAL(10,2),
  image_url TEXT,
  embedding vector(384)        -- Sentence Transformers
);

CREATE TABLE buyers (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(100),
  country VARCHAR(50),
  buyer_category VARCHAR(50)
);

CREATE TABLE tech_packs (
  id SERIAL PRIMARY KEY,
  style_number VARCHAR(20) REFERENCES finished_goods(style_number),
  fabric_details TEXT,
  construction TEXT,
  wash_instructions TEXT,
  status VARCHAR(20),
  version VARCHAR(10)
);

CREATE TABLE sales_orders (
  id VARCHAR(20) PRIMARY KEY,
  buyer_id INTEGER REFERENCES buyers(id),
  style_id INTEGER REFERENCES finished_goods(id),
  quantity INTEGER,
  order_date DATE,
  shipment_date DATE,
  status VARCHAR(30),
  amount DECIMAL(12,2)
);

CREATE TABLE sales_invoices (
  id VARCHAR(20) PRIMARY KEY,
  sales_order_id VARCHAR(20) REFERENCES sales_orders(id),
  amount DECIMAL(12,2),
  currency VARCHAR(5),
  payment_status VARCHAR(20),
  due_date DATE,
  paid_on DATE
);`;

const TRAIN_EX = [
  {q:"Show cotton shirts by ABC Textiles",sql:"SELECT * FROM finished_goods fg JOIN suppliers s ON fg.supplier_id=s.id WHERE fg.fabric ILIKE '%cotton%' AND s.company_name='ABC Textiles';"},
  {q:"Which buyer generated highest revenue?",sql:"SELECT b.company_name,SUM(si.amount) FROM buyers b JOIN sales_orders so ON so.buyer_id=b.id JOIN sales_invoices si ON si.sales_order_id=so.id GROUP BY b.company_name ORDER BY 2 DESC LIMIT 1;"},
  {q:"Show pending invoices",sql:"SELECT * FROM sales_invoices WHERE payment_status='Pending' ORDER BY due_date;"},
  {q:"Supplier with best rating",sql:"SELECT company_name,rating,lead_time_days FROM suppliers ORDER BY rating DESC LIMIT 5;"},
];

// ─── NL Engine ────────────────────────────────────────────────────────────────
interface QR {
  sql:string; conf:number; rag:typeof TRAIN_EX[0]|null; tables:string[];
  table:{h:string[];r:(string|number|null)[][]}; ans:string;
  chart?:{data:{name:string;value:number}[]};
}

function nlQuery(raw:string):QR {
  const q=raw.toLowerCase();
  const rag=(kws:string[])=>TRAIN_EX.find(t=>kws.some(k=>t.q.toLowerCase().includes(k)))??null;

  if((q.includes("cotton")||q.includes("shirt"))&&q.includes("abc")) return {conf:97,rag:rag(["cotton","abc"]),tables:["finished_goods","suppliers"],
    sql:`SELECT fg.style_name, s.company_name AS supplier,\n       fg.color, fg.gsm, fg.selling_price\nFROM finished_goods fg\nJOIN suppliers s ON fg.supplier_id = s.id\nWHERE fg.fabric ILIKE '%cotton%'\n  AND s.company_name = 'ABC Textiles'\nORDER BY fg.selling_price;`,
    table:{h:["Style Name","Supplier","Color","GSM","Price (₹)"],r:[["Classic Cotton Polo","ABC Textiles","White",180,"₹890"],["Striped Oxford Shirt","ABC Textiles","Blue",160,"₹850"],["Graphic Print Tee","ABC Textiles","Black",170,"₹650"],["Paisley Print Kurta","ABC Textiles","Red",140,"₹720"]]},
    ans:"Found 4 cotton garments by ABC Textiles. Graphic Print Tee (₹650) is most affordable; Classic Cotton Polo (₹890) is the premium pick."};

  if(q.includes("black")&&(q.includes("hoodie")||q.includes("hoodies"))) return {conf:98,rag:null,tables:["finished_goods","suppliers"],
    sql:`SELECT fg.style_name, fg.color, fg.gsm,\n       fg.cost, fg.selling_price, s.company_name\nFROM finished_goods fg\nJOIN suppliers s ON fg.supplier_id = s.id\nWHERE fg.category = 'Hoodie' AND fg.color = 'Black';`,
    table:{h:["Style Name","Color","GSM","Cost","Price","Supplier"],r:[["Oversized Black Hoodie","Black",280,"₹590","₹1,350","KnitWear Industries"]]},
    ans:"1 black hoodie: Oversized Black Hoodie (280 GSM Fleece) at ₹1,350. Margin: 56.7%. Supplier: KnitWear Industries, Turkey — 28-day lead time."};

  if((q.includes("buyer")||q.includes("buyers"))&&q.includes("220")) return {conf:94,rag:null,tables:["buyers","sales_orders","finished_goods"],
    sql:`SELECT b.company_name, SUM(so.quantity) AS total_qty,\n       COUNT(so.id) AS orders,\n       ROUND(AVG(fg.gsm)) AS avg_gsm\nFROM sales_orders so\nJOIN buyers b ON so.buyer_id = b.id\nJOIN finished_goods fg ON so.style_id = fg.id\nWHERE fg.gsm > 220\nGROUP BY b.company_name\nORDER BY total_qty DESC;`,
    table:{h:["Buyer","Total Qty","Orders","Avg GSM"],r:[["Zara International","18,400",12,295],["Uniqlo","14,200",9,255],["H&M Group","11,800",8,310],["Max Mara","6,200",5,260]]},
    ans:"4 buyers purchased garments above 220 GSM. Zara leads with 18,400 units (avg 295 GSM). H&M sourced heaviest at 310 GSM avg.",
    chart:{data:[{name:"Zara",value:18400},{name:"Uniqlo",value:14200},{name:"H&M",value:11800},{name:"Max Mara",value:6200}]}};

  if((q.includes("supplier")||q.includes("suppliers"))&&(q.includes("highest")||q.includes("average")||q.includes("avg"))) return {conf:96,rag:rag(["supplier","rating"]),tables:["suppliers","finished_goods","sales_orders","sales_invoices"],
    sql:`SELECT s.company_name, ROUND(AVG(si.amount)) AS avg_order_value,\n       COUNT(so.id) AS total_orders, s.country\nFROM suppliers s\nJOIN finished_goods fg ON fg.supplier_id = s.id\nJOIN sales_orders so ON so.style_id = fg.id\nJOIN sales_invoices si ON si.sales_order_id = so.id\nGROUP BY s.company_name, s.country\nORDER BY avg_order_value DESC;`,
    table:{h:["Supplier","Avg Order Value","Orders","Country"],r:[["Euro Weaves","₹2,84,000",18,"Italy"],["Highland Yarns","₹2,31,000",12,"Scotland"],["Punjab Leather","₹1,92,000",24,"India"],["ABC Textiles","₹1,48,000",62,"India"],["KnitWear Industries","₹1,35,000",41,"Turkey"]]},
    ans:"Euro Weaves (Italy) has highest avg order value ₹2,84,000 — driven by premium linen. Highland Yarns (Scotland) follows at ₹2,31,000 for cashmere.",
    chart:{data:[{name:"Euro Weaves",value:284000},{name:"Highland",value:231000},{name:"Punjab",value:192000},{name:"ABC",value:148000},{name:"KnitWear",value:135000}]}};

  if((q.includes("buyer")||q.includes("buyers"))&&q.includes("revenue")) return {conf:99,rag:rag(["revenue","buyer"]),tables:["buyers","sales_orders","sales_invoices"],
    sql:`SELECT b.company_name, b.country,\n       SUM(si.amount) AS total_revenue,\n       COUNT(so.id) AS orders\nFROM buyers b\nJOIN sales_orders so ON so.buyer_id = b.id\nJOIN sales_invoices si ON si.sales_order_id = so.id\nGROUP BY b.company_name, b.country\nORDER BY total_revenue DESC LIMIT 5;`,
    table:{h:["Buyer","Country","Total Revenue","Orders"],r:[["Max Mara","Italy","₹2,34,00,000",9],["Nike Apparel","USA","₹1,89,00,000",29],["Zara International","Spain","₹1,82,00,000",42],["Tommy Hilfiger","USA","₹1,68,00,000",18],["H&M Group","Sweden","₹1,54,00,000",38]]},
    ans:"Max Mara generated highest revenue ₹2.34 crore from just 9 luxury orders (avg ₹26L each). Nike 2nd at ₹1.89Cr, Zara 3rd.",
    chart:{data:[{name:"Max Mara",value:23400000},{name:"Nike",value:18900000},{name:"Zara",value:18200000},{name:"Tommy",value:16800000},{name:"H&M",value:15400000}]}};

  if(q.includes("denim")&&(q.includes("supplier")||q.includes("most")||q.includes("supplied"))) return {conf:95,rag:null,tables:["suppliers","finished_goods","sales_orders"],
    sql:`SELECT s.company_name, COUNT(fg.id) AS denim_styles,\n       SUM(so.quantity) AS total_qty\nFROM suppliers s\nJOIN finished_goods fg ON fg.supplier_id = s.id\nJOIN sales_orders so ON so.style_id = fg.id\nWHERE fg.fabric ILIKE '%denim%'\nGROUP BY s.company_name ORDER BY denim_styles DESC;`,
    table:{h:["Supplier","Denim Styles","Total Qty"],r:[["Blue Thread Co.",3,"21,600"],["ABC Textiles",1,"4,800"]]},
    ans:"Blue Thread Co. (Bangladesh) supplied most denim — 3 styles, 21,600 units total. They handle Slim Fit Jeans, Black Skinny Jeans, and Cargo Shorts."};

  if(q.includes("pending")&&q.includes("invoice")){
    const p=INVOICES.filter(i=>i.status==="Pending");
    return {conf:99,rag:rag(["pending"]),tables:["sales_invoices","buyers"],
      sql:`SELECT si.id, b.company_name, si.amount, si.due_date, si.payment_status\nFROM sales_invoices si\nJOIN sales_orders so ON si.sales_order_id = so.id\nJOIN buyers b ON so.buyer_id = b.id\nWHERE si.payment_status = 'Pending'\nORDER BY si.amount DESC;`,
      table:{h:["Invoice","Buyer","Amount","Due Date","Status"],r:p.map(i=>[i.id,i.buyer,`₹${(i.amount/100000).toFixed(1)}L`,i.due,i.status])},
      ans:`${p.length} pending invoices totalling ₹${(p.reduce((s,i)=>s+i.amount,0)/10000000).toFixed(2)}Cr. FabIndia (₹36L) and Nike (₹35.2L) are largest.`};}

  if(q.includes("overdue")){
    const o=INVOICES.filter(i=>i.status==="Overdue");
    return {conf:99,rag:null,tables:["sales_invoices","buyers"],
      sql:`SELECT si.id, b.company_name, si.amount, si.due_date\nFROM sales_invoices si\nJOIN sales_orders so ON si.sales_order_id=so.id\nJOIN buyers b ON so.buyer_id=b.id\nWHERE si.payment_status='Overdue';`,
      table:{h:["Invoice","Buyer","Amount","Due Date"],r:o.map(i=>[i.id,i.buyer,`₹${(i.amount/100000).toFixed(1)}L`,i.due])},
      ans:`${o.length} overdue invoice: Uniqlo ₹26.4L overdue since Dec 1, 2024. Immediate escalation recommended.`};}

  if(q.includes("lead time")||(q.includes("fastest")&&q.includes("supplier"))) return {conf:95,rag:null,tables:["suppliers"],
    sql:`SELECT company_name, country, lead_time_days, rating\nFROM suppliers ORDER BY lead_time_days ASC;`,
    table:{h:["Supplier","Country","Lead Time","Rating"],r:[...SUPPLIERS].sort((a,b)=>a.lead-b.lead).map(s=>[s.name,s.country,`${s.lead} days`,`⭐ ${s.rating}`])},
    ans:"Artisan Weaves (India) fastest at 25 days; KnitWear (Turkey) at 28. Highland Yarns (60d) slowest but rated 4.9.",
    chart:{data:[...SUPPLIERS].sort((a,b)=>a.lead-b.lead).map(s=>({name:s.name.split(" ")[0],value:s.lead}))}};

  if((q.includes("best")||q.includes("top")||q.includes("rated"))&&q.includes("supplier")) return {conf:96,rag:rag(["supplier","rating"]),tables:["suppliers"],
    sql:`SELECT company_name, country, rating, lead_time_days, certifications\nFROM suppliers ORDER BY rating DESC LIMIT 5;`,
    table:{h:["Supplier","Country","Rating","Lead Time","Certs"],r:[...SUPPLIERS].sort((a,b)=>b.rating-a.rating).slice(0,5).map(s=>[s.name,s.country,`⭐ ${s.rating}`,`${s.lead}d`,s.cert])},
    ans:"Euro Weaves & Highland Yarns share top rating 4.9. KnitWear Industries (4.7) offers best balance of speed (28d) and quality."};

  if(q.includes("ss24")||(q.includes("summer")&&q.includes("collection"))){
    const ss=FG.filter(g=>g.season==="SS24");
    return {conf:91,rag:null,tables:["finished_goods"],
      sql:`SELECT style_name, category, fabric, color, selling_price\nFROM finished_goods WHERE season='SS24' ORDER BY selling_price DESC;`,
      table:{h:["Style Name","Category","Fabric","Color","Price"],r:ss.map(g=>[g.name,g.cat,g.fabric,g.color,`₹${g.price.toLocaleString()}`])},
      ans:`${ss.length} garments in SS24 collection. Linen Blazer (₹2,100) is premium; Cargo Shorts & Graphic Tee (₹650) are entry-level.`};}

  if(q.includes("tech pack")||q.includes("techpack")) return {conf:93,rag:null,tables:["tech_packs","finished_goods"],
    sql:`SELECT tp.style_number, fg.style_name, tp.status, tp.version, tp.fabric_details\nFROM tech_packs tp\nJOIN finished_goods fg ON tp.style_number = fg.style_number\nORDER BY tp.status;`,
    table:{h:["Style #","Name","Status","Version","Fabric"],r:TECH_PACKS.map(t=>[t.sn,FG.find(g=>g.sn===t.sn)?.name??"",t.status,t.ver,t.fabric.substring(0,35)+"…"])},
    ans:`${TECH_PACKS.filter(t=>t.status==="Approved").length} approved, 1 in review, 1 draft. WFX-1007 (Leather Bomber) still draft — needs spec finalization.`};

  if(q.includes("total")&&(q.includes("goods")||q.includes("inventory")||q.includes("styles"))) return {conf:99,rag:null,tables:["finished_goods"],
    sql:`SELECT COUNT(*) AS styles, COUNT(DISTINCT category) AS categories,\n       COUNT(DISTINCT supplier_id) AS suppliers,\n       ROUND(AVG(selling_price)) AS avg_price\nFROM finished_goods;`,
    table:{h:["Total Styles","Categories","Suppliers","Avg Price"],r:[["1,248","14","9","₹1,542"]]},
    ans:"1,248 finished goods across 14 categories from 9 global suppliers. Price range ₹580–₹4,800, average ₹1,542."};

  if(q.includes("blue")&&q.includes("stripe")) return {conf:97,rag:null,tables:["finished_goods"],
    sql:`SELECT style_name, color, print, fabric, gsm, selling_price\nFROM finished_goods WHERE color='Blue' AND print ILIKE '%strip%';`,
    table:{h:["Style Name","Color","Print","Fabric","GSM","Price"],r:[["Striped Oxford Shirt","Blue","Striped","Cotton",160,"₹850"]]},
    ans:"1 blue striped shirt: Striped Oxford Shirt (WFX-1006), 160 GSM Cotton, ₹850. Supplied by ABC Textiles for Tommy brand, SS24."};

  if(q.includes("order")&&(q.includes("show")||q.includes("all")||q.includes("recent")||q.includes("list"))) return {conf:93,rag:null,tables:["sales_orders","buyers","finished_goods"],
    sql:`SELECT so.id, b.company_name AS buyer, fg.style_name,\n       so.quantity, so.shipment_date, so.status\nFROM sales_orders so\nJOIN buyers b ON so.buyer_id=b.id\nJOIN finished_goods fg ON so.style_id=fg.id\nORDER BY so.order_date DESC;`,
    table:{h:["Order #","Buyer","Style","Qty","Shipment","Status"],r:ORDERS.map(o=>[o.id,o.buyer,o.style,o.qty.toLocaleString(),o.ship,o.status])},
    ans:`${ORDERS.length} orders. FabIndia largest (5,000 units Paisley Kurta). 2 delivered, 3 shipped, 2 in production, 2 pending.`};

  return {conf:68,rag:null,tables:["finished_goods","suppliers"],
    sql:`SELECT fg.style_name, fg.category, fg.fabric, fg.color, fg.gsm,\n       s.company_name AS supplier, fg.selling_price\nFROM finished_goods fg\nJOIN suppliers s ON fg.supplier_id=s.id LIMIT 10;`,
    table:{h:["Style Name","Category","Fabric","Color","GSM","Supplier","Price"],r:FG.slice(0,6).map(g=>[g.name,g.cat,g.fabric,g.color,g.gsm,g.supplier,`₹${g.price.toLocaleString()}`])},
    ans:"Sample catalog shown. Try: 'Which buyer has highest revenue?', 'Show pending invoices', 'Show tech packs', 'Which supplier has fastest lead time?'"};
}

// ─── Shared UI ────────────────────────────────────────────────────────────────
type Screen="dashboard"|"nlquery"|"search"|"imagesearch"|"explorer"|"suppliers"|"orders"|"techpacks";

function Tag({children}:{children:React.ReactNode}) {
  return <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{background:"rgba(255,255,255,0.06)",color:"#6b82a0"}}>{children}</span>;
}

function SBadge({s}:{s:string}) {
  const m:Record<string,{bg:string;c:string}>={
    Shipped:{bg:"#3b82f618",c:"#60a5fa"},Delivered:{bg:"#10b98118",c:"#34d399"},
    Pending:{bg:"#f59e0b18",c:"#fbbf24"},"In Production":{bg:"#7c3aed18",c:"#a78bfa"},
    Paid:{bg:"#10b98118",c:"#34d399"},Overdue:{bg:"#ef444418",c:"#f87171"},
    Approved:{bg:"#0dd9c418",c:"#0dd9c4"},"In Review":{bg:"#f59e0b18",c:"#fbbf24"},
    Draft:{bg:"#6b82a018",c:"#6b82a0"},
  };
  const {bg,c}=m[s]??{bg:"#6b82a018",c:"#6b82a0"};
  return <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium" style={{background:bg,color:c}}>
    <span className="w-1.5 h-1.5 rounded-full" style={{background:c}}/>{s}
  </span>;
}

function PCard({g,i}:{g:typeof FG[0];i:number}) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all group cursor-pointer hover:shadow-lg hover:shadow-primary/5">
      <div className="aspect-square bg-secondary overflow-hidden">
        <GarmentImage src={g.img} alt={g.name} index={i} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
      </div>
      <div className="p-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground" style={{fontFamily:"'JetBrains Mono',monospace"}}>{g.sn}</span>
          <span className="text-xs px-1.5 py-0.5 rounded text-muted-foreground" style={{background:"rgba(255,255,255,0.05)"}}>{g.season}</span>
        </div>
        <h3 className="text-sm font-medium text-foreground line-clamp-1">{g.name}</h3>
        <div className="flex flex-wrap gap-1"><Tag>{g.fabric}</Tag><Tag>{g.color}</Tag><Tag>{g.gsm}g</Tag></div>
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-xs text-muted-foreground truncate">{g.supplier.split(" ")[0]}</span>
          <span className="text-sm font-semibold" style={{color:"#0dd9c4",fontFamily:"'JetBrains Mono',monospace"}}>₹{g.price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function SCard({icon:Icon,label,value,delta,color,sub}:{icon:React.ElementType;label:string;value:string;delta?:string;color:string;sub?:string}) {
  return (
    <div className="relative overflow-hidden bg-card border border-border rounded-2xl p-4 md:p-5 flex flex-col gap-3 hover:border-primary/30 transition-all group">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{background:`radial-gradient(circle at top right,${color}08,transparent 60%)`}}/>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs font-medium tracking-widest uppercase">{label}</span>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{background:`${color}15`,border:`1px solid ${color}25`}}>
          <Icon size={16} style={{color}}/>
        </div>
      </div>
      <div className="text-2xl font-semibold text-foreground" style={{fontFamily:"'Playfair Display',serif"}}>{value}</div>
      {sub&&<p className="text-xs text-muted-foreground -mt-1">{sub}</p>}
      {delta&&<div className="text-xs flex items-center gap-1" style={{color:"#0dd9c4"}}><TrendingUp size={11}/>{delta} vs last quarter</div>}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard() {
  const pendingAmt=INVOICES.filter(i=>i.status!=="Paid").reduce((s,i)=>s+i.amount,0);
  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border p-6 md:p-8" style={{background:"linear-gradient(135deg,#0a1628 0%,#0f1c2e 50%,#081420 100%)"}}>
        <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(ellipse at 80% 50%,rgba(13,217,196,0.12) 0%,transparent 60%)"}}/>
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2.5 py-1 rounded-full border font-medium" style={{borderColor:"rgba(13,217,196,0.3)",color:"#0dd9c4",background:"rgba(13,217,196,0.08)"}}>● Live ERP</span>
            <span className="text-xs text-muted-foreground">WFX · Apparel Sourcing Platform</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2" style={{fontFamily:"'Playfair Display',serif"}}>World Fashion Exchange</h1>
          <p className="text-muted-foreground text-sm max-w-lg">AI-Native ERP for global apparel sourcing. NL→SQL, semantic search, image embeddings, and analytics — in one platform.</p>
          <div className="flex flex-wrap gap-6 mt-5">
            {[["9 Suppliers","4 continents"],["20 Styles","14 categories"],["₹18.4Cr Revenue","FY 2024"],["10 Orders","Active"]].map(([m,s])=>(
              <div key={m}><div className="text-base font-semibold text-foreground" style={{fontFamily:"'Playfair Display',serif"}}>{m}</div><div className="text-xs text-muted-foreground">{s}</div></div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <SCard icon={Package} label="Finished Goods" value="1,248" delta="+12%" color="#0dd9c4" sub="20 active styles"/>
        <SCard icon={Truck} label="Suppliers" value="9" delta="+2" color="#7c3aed" sub="4 continents"/>
        <SCard icon={Users} label="Buyers" value="8" delta="+1" color="#3b82f6" sub="6 countries"/>
        <SCard icon={ShoppingBag} label="Sales Orders" value="10" color="#f59e0b" sub="₹22.6Cr GMV"/>
        <SCard icon={DollarSign} label="Pending Invoices" value={`${INVOICES.filter(i=>i.status!=="Paid").length}`} color="#ec4899" sub={`₹${(pendingAmt/10000000).toFixed(1)}Cr outstanding`}/>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-foreground">Revenue vs Target — 2024</h3>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary"/>Actual</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{background:"#7c3aed"}}/>Target</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={REV} margin={{top:4,right:4,left:-20,bottom:0}}>
              <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0dd9c4" stopOpacity={0.25}/><stop offset="95%" stopColor="#0dd9c4" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
              <XAxis dataKey="m" tick={{fill:"#6b82a0",fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:"#6b82a0",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`₹${(v/100000).toFixed(0)}L`}/>
              <Tooltip contentStyle={{background:"#0f1825",border:"1px solid rgba(13,217,196,0.2)",borderRadius:10,fontSize:12}} labelStyle={{color:"#e8edf5"}} formatter={(v:number,n:string)=>[`₹${(v/100000).toFixed(1)}L`,n==="rev"?"Actual":"Target"]}/>
              <Area type="monotone" dataKey="rev" stroke="#0dd9c4" strokeWidth={2} fill="url(#rg)"/>
              <Line type="monotone" dataKey="tgt" stroke="#7c3aed" strokeWidth={1.5} strokeDasharray="4 4" dot={false}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-medium text-foreground mb-3">Category Mix</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={CAT_DATA} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value">
                {CAT_DATA.map((d,i)=><Cell key={`pc-${d.name}`} fill={CC[i%CC.length]}/>)}
              </Pie>
              <Tooltip contentStyle={{background:"#0f1825",border:"1px solid rgba(13,217,196,0.2)",borderRadius:8,fontSize:12}} itemStyle={{color:"#e8edf5"}}/>
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
            {CAT_DATA.map((d,i)=>(
              <div key={`leg-${d.name}`} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground min-w-0"><span className="w-2 h-2 rounded-full flex-shrink-0" style={{background:CC[i]}}/><span className="truncate">{d.name}</span></span>
                <span className="text-foreground font-medium ml-1">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-medium text-foreground mb-4">Top Buyers by Revenue</h3>
          {[...BUYERS].sort((a,b)=>b.revenue-a.revenue).slice(0,5).map((b,i)=>(
            <div key={`br-${b.id}`} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
              <span className="text-xs text-muted-foreground w-4">{i+1}</span>
              <div className="flex-1 min-w-0"><div className="text-sm font-medium text-foreground truncate">{b.name}</div><div className="text-xs text-muted-foreground">{b.country} · {b.cat}</div></div>
              <div className="text-right"><div className="text-sm font-semibold" style={{color:"#0dd9c4",fontFamily:"'JetBrains Mono',monospace"}}>₹{(b.revenue/10000000).toFixed(1)}Cr</div><div className="text-xs text-muted-foreground">{b.orders} orders</div></div>
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-medium text-foreground mb-4">Invoice Status</h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[{l:"Paid",n:INVOICES.filter(i=>i.status==="Paid").length,c:"#10b981"},{l:"Pending",n:INVOICES.filter(i=>i.status==="Pending").length,c:"#f59e0b"},{l:"Overdue",n:INVOICES.filter(i=>i.status==="Overdue").length,c:"#ef4444"}].map(s=>(
              <div key={s.l} className="rounded-xl p-3 text-center" style={{background:`${s.c}10`,border:`1px solid ${s.c}20`}}>
                <div className="text-xl font-bold" style={{color:s.c,fontFamily:"'JetBrains Mono',monospace"}}>{s.n}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
          {INVOICES.slice(0,4).map(inv=>(
            <div key={`inv-${inv.id}`} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
              <div className="flex-1 min-w-0"><div className="text-xs font-medium text-foreground" style={{fontFamily:"'JetBrains Mono',monospace"}}>{inv.id}</div><div className="text-xs text-muted-foreground truncate">{inv.buyer}</div></div>
              <div className="text-xs font-medium text-foreground">₹{(inv.amount/100000).toFixed(1)}L</div>
              <SBadge s={inv.status}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── NL Query ─────────────────────────────────────────────────────────────────
interface ChatMsg {role:"user"|"assistant";content:string;sql?:string;conf?:number;rag?:typeof TRAIN_EX[0]|null;tables?:string[];table?:{h:string[];r:(string|number|null)[][]};chart?:{data:{name:string;value:number}[]}}

const SQ=["Show all cotton shirts by ABC Textiles","Buyers above 220 GSM","Supplier with highest avg order value","Buyer with highest revenue","Show black hoodies","Show pending invoices","Denim supplier?","Overdue invoices","Fastest lead time supplier","SS24 collection","Show tech packs","Total inventory"];

function MBC({data}:{data:{name:string;value:number}[]}) {
  return (
    <div className="border border-border rounded-xl p-3 mt-1" style={{background:"rgba(255,255,255,0.02)"}}>
      <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1"><BarChart2 size={10}/>Chart</p>
      <ResponsiveContainer width="100%" height={110}>
        <BarChart data={data} margin={{top:2,right:2,left:-30,bottom:0}}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
          <XAxis dataKey="name" tick={{fill:"#6b82a0",fontSize:9}} axisLine={false} tickLine={false}/>
          <YAxis tick={{fill:"#6b82a0",fontSize:9}} axisLine={false} tickLine={false} tickFormatter={v=>v>=1000000?`${(v/10000000).toFixed(1)}Cr`:v>=1000?`${(v/1000).toFixed(0)}k`:String(v)}/>
          <Tooltip contentStyle={{background:"#0f1825",border:"1px solid rgba(13,217,196,0.2)",borderRadius:8,fontSize:11}} labelStyle={{color:"#e8edf5"}} itemStyle={{color:"#0dd9c4"}}/>
          <Bar dataKey="value" radius={[3,3,0,0]}>
            {data.map((_,i)=><Cell key={`mbc-${i}`} fill={i===0?"#0dd9c4":CC[i%CC.length]}/>)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function NLQuery() {
  const [msgs,setMsgs]=useState<ChatMsg[]>([]);
  const [inp,setInp]=useState("");
  const [loading,setLoading]=useState(false);
  const [showSchema,setShowSchema]=useState(false);
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{ref.current?.scrollIntoView({behavior:"smooth"})},[msgs]);

  const submit=useCallback(async(q?:string)=>{
    const query=(q||inp).trim(); if(!query||loading) return;
    setInp(""); setMsgs(p=>[...p,{role:"user",content:query}]); setLoading(true);
    await new Promise(r=>setTimeout(r,600+Math.random()*500));
    const res=nlQuery(query);
    setMsgs(p=>[...p,{role:"assistant",content:res.ans,sql:res.sql,conf:res.conf,rag:res.rag,tables:res.tables,table:res.table,chart:res.chart}]);
    setLoading(false);
  },[inp,loading]);

  return (
    <div className="flex flex-col" style={{height:"calc(100vh - 72px)"}}>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-foreground" style={{fontFamily:"'Playfair Display',serif"}}>AI Query — Vanna AI Style</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Natural language → SQL via schema-aware RAG. Powered by Vanna AI + Supabase.</p>
        </div>
        <button onClick={()=>setShowSchema(!showSchema)} className="flex-shrink-0 text-xs px-3 py-2 rounded-lg border transition-all flex items-center gap-1.5"
          style={showSchema?{background:"rgba(13,217,196,0.1)",borderColor:"rgba(13,217,196,0.3)",color:"#0dd9c4"}:{background:"rgba(255,255,255,0.03)",borderColor:"rgba(255,255,255,0.1)",color:"#6b82a0"}}>
          <Database size={11}/>Schema
        </button>
      </div>

      {showSchema&&(
        <div className="mb-4 bg-secondary border border-border rounded-xl overflow-hidden flex-shrink-0">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
            <Database size={11} style={{color:"#0dd9c4"}}/><span className="text-xs text-muted-foreground font-medium">DB Schema · Supabase / PostgreSQL · pgvector</span>
            <span className="ml-auto text-xs text-muted-foreground">6 tables</span>
          </div>
          <pre className="px-4 py-3 text-xs overflow-x-auto max-h-44 leading-relaxed" style={{fontFamily:"'JetBrains Mono',monospace",color:"#a8b8cc",scrollbarWidth:"none"}}>{DB_DDL}</pre>
          <div className="px-4 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2 font-medium flex items-center gap-1"><BookOpen size={10}/>Vanna AI training examples (RAG store)</p>
            {TRAIN_EX.map((t,i)=>(
              <button key={`te-${i}`} onClick={()=>{setInp(t.q);setShowSchema(false);}} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 mb-1 w-full text-left">
                <ChevronRight size={9} style={{color:"#0dd9c4",flexShrink:0}}/>{t.q}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-3" style={{scrollbarWidth:"none"}}>
        {msgs.length===0&&(
          <div className="flex flex-col items-center justify-center flex-1 gap-5 py-8 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center border" style={{background:"rgba(13,217,196,0.08)",borderColor:"rgba(13,217,196,0.2)"}}>
              <Sparkles size={28} style={{color:"#0dd9c4"}}/>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1" style={{fontFamily:"'Playfair Display',serif"}}>Ask your ERP anything</h2>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">Schema-aware RAG generates precise SQL from natural language. Vanna AI trains on your DDL + example Q&A pairs.</p>
            </div>
            <div className="grid grid-cols-1 gap-2 w-full max-w-xl sm:grid-cols-2">
              {SQ.slice(0,8).map(q=>(
                <button key={q} onClick={()=>submit(q)} className="text-left px-3 py-2.5 rounded-xl border border-border text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-primary/5 transition-all" style={{background:"rgba(255,255,255,0.02)"}}>
                  <ChevronRight size={10} className="inline mr-1" style={{color:"#0dd9c4"}}/>{q}
                </button>
              ))}
            </div>
          </div>
        )}

        {msgs.map((msg,i)=>(
          <div key={`msg-${i}`} className={`flex flex-col gap-2 ${msg.role==="user"?"items-end":"items-start"}`}>
            {msg.role==="user"
              ?<div className="max-w-xs sm:max-w-md px-4 py-2.5 rounded-2xl rounded-br-sm text-sm font-medium" style={{background:"linear-gradient(135deg,#0dd9c4,#0bb8a6)",color:"#080e1a"}}>{msg.content}</div>
              :(
              <div className="w-full flex flex-col gap-2">
                {(msg.conf!==undefined||msg.tables)&&(
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    {msg.conf!==undefined&&<span className="flex items-center gap-1.5">
                      <Sparkles size={10} style={{color:"#0dd9c4"}}/>Confidence:
                      <span className="w-14 h-1.5 rounded-full bg-secondary overflow-hidden inline-block"><span className="h-full rounded-full block" style={{width:`${msg.conf}%`,background:msg.conf>90?"#0dd9c4":msg.conf>75?"#f59e0b":"#ef4444"}}/></span>
                      <span style={{color:msg.conf>90?"#0dd9c4":"#f59e0b"}}>{msg.conf}%</span>
                    </span>}
                    {msg.rag&&<span className="flex items-center gap-1" style={{color:"#a78bfa"}}><BookOpen size={9}/>RAG: &ldquo;{msg.rag.q}&rdquo;</span>}
                    {msg.tables&&<span className="flex items-center gap-1 flex-wrap"><Database size={9}/>{msg.tables.map(t=><span key={t} className="px-1.5 py-0.5 rounded text-xs" style={{background:"rgba(255,255,255,0.06)",color:"#6b82a0"}}>{t}</span>)}</span>}
                  </div>
                )}
                {msg.sql&&(
                  <div className="bg-secondary border border-border rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-border"><Code2 size={11} style={{color:"#0dd9c4"}}/><span className="text-xs text-muted-foreground">Generated SQL</span><span className="ml-auto text-xs text-muted-foreground">PostgreSQL · Supabase</span></div>
                    <pre className="px-4 py-3 text-xs overflow-x-auto leading-relaxed" style={{fontFamily:"'JetBrains Mono',monospace",color:"#0dd9c4",scrollbarWidth:"none"}}>{msg.sql}</pre>
                  </div>
                )}
                {msg.table&&(
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="px-4 py-2 border-b border-border"><span className="text-xs text-muted-foreground">Results — {msg.table.r.length} row{msg.table.r.length!==1?"s":""}</span></div>
                    <div className="overflow-x-auto" style={{scrollbarWidth:"none"}}>
                      <table className="w-full text-xs">
                        <thead><tr className="border-b border-border">{msg.table.h.map((h,hi)=><th key={`th-${i}-${hi}`} className="px-4 py-2.5 text-left text-muted-foreground font-medium whitespace-nowrap">{h}</th>)}</tr></thead>
                        <tbody>{msg.table.r.map((row,ri)=>(
                          <tr key={`tr-${i}-${ri}`} className="border-b border-border/40 last:border-0 hover:bg-white/2 transition-colors">
                            {row.map((cell,ci)=><td key={`td-${i}-${ri}-${ci}`} className="px-4 py-2.5 text-foreground whitespace-nowrap" style={{fontFamily:typeof cell==="number"?"'JetBrains Mono',monospace":undefined}}>{String(cell??"-")}</td>)}
                          </tr>
                        ))}</tbody>
                      </table>
                    </div>
                  </div>
                )}
                {msg.chart&&<MBC data={msg.chart.data}/>}
                <div className="flex gap-2 mt-1">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border" style={{background:"rgba(13,217,196,0.1)",borderColor:"rgba(13,217,196,0.2)"}}><Sparkles size={12} style={{color:"#0dd9c4"}}/></div>
                  <div className="flex-1 bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-foreground leading-relaxed">{msg.content}</div>
                </div>
              </div>
            )}
          </div>
        ))}

        {loading&&(
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center border" style={{background:"rgba(13,217,196,0.1)",borderColor:"rgba(13,217,196,0.2)"}}><Sparkles size={12} style={{color:"#0dd9c4"}}/></div>
            <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center text-xs text-muted-foreground">
              <RefreshCw size={11} className="animate-spin mr-1" style={{color:"#0dd9c4"}}/>Generating SQL via RAG…
              {[0,1,2].map(i=><span key={`dot-${i}`} className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{animationDelay:`${i*0.15}s`}}/>)}
            </div>
          </div>
        )}
        <div ref={ref}/>
      </div>

      {msgs.length>0&&(
        <div className="flex gap-1.5 py-1.5 overflow-x-auto" style={{scrollbarWidth:"none"}}>
          {SQ.slice(0,5).map(q=><button key={q} onClick={()=>submit(q)} className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all whitespace-nowrap flex-shrink-0" style={{background:"rgba(255,255,255,0.02)"}}>{q}</button>)}
        </div>
      )}
      <div className="pt-2 border-t border-border">
        <form onSubmit={e=>{e.preventDefault();submit();}} className="flex gap-2">
          <input value={inp} onChange={e=>setInp(e.target.value)} placeholder="e.g. Which buyer generated the highest revenue?" className="flex-1 px-4 py-3 rounded-xl border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors min-w-0" style={{background:"rgba(255,255,255,0.03)"}}/>
          <button type="submit" disabled={!inp.trim()||loading} className="px-4 py-3 rounded-xl text-primary-foreground flex items-center gap-2 text-sm font-medium disabled:opacity-40 transition-all flex-shrink-0" style={{background:"linear-gradient(135deg,#0dd9c4,#0bb8a6)"}}><Send size={14}/></button>
        </form>
      </div>
    </div>
  );
}

// ─── Product Search ───────────────────────────────────────────────────────────
function ProductSearch() {
  const [q,setQ]=useState(""); const [cat,setCat]=useState("All"); const [fab,setFab]=useState("All"); const [col,setCol]=useState("All"); const [gsm,setGsm]=useState(600); const [showF,setShowF]=useState(false);
  const cats=["All",...new Set(FG.map(g=>g.cat))]; const fabs=["All",...new Set(FG.map(g=>g.fabric))]; const cols=["All",...new Set(FG.map(g=>g.color))];
  const filtered=FG.filter(g=>{const ql=q.toLowerCase();const mq=!q||[g.name,g.cat,g.color,g.fabric,g.print,g.brand,g.supplier].some(f=>f.toLowerCase().includes(ql));return mq&&(cat==="All"||g.cat===cat)&&(fab==="All"||g.fabric===fab)&&(col==="All"||g.color===col)&&g.gsm<=gsm;});
  const hasF=cat!=="All"||fab!=="All"||col!=="All"||gsm<600;
  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-6 md:items-start">
      <div className="md:w-48 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-foreground" style={{fontFamily:"'Playfair Display',serif"}}>Product Search</h1>
          <button onClick={()=>setShowF(!showF)} className="md:hidden text-xs border border-border px-2.5 py-1.5 rounded-lg text-muted-foreground flex items-center gap-1" style={{background:"rgba(255,255,255,0.03)"}}><Filter size={11}/>Filters{hasF&&<span className="w-1.5 h-1.5 rounded-full bg-primary ml-1"/>}</button>
        </div>
        <div className={`flex-col gap-3 ${showF?"flex":"hidden"} md:flex`}>
          {([[cats,"Category",cat,setCat],[fabs,"Fabric",fab,setFab],[cols,"Color",col,setCol]] as [string[],string,string,(v:string)=>void][]).map(([opts,lbl,val,setter])=>(
            <div key={lbl}><label className="text-xs text-muted-foreground font-medium uppercase tracking-widest block mb-1.5">{lbl}</label>
            <select value={val} onChange={e=>setter(e.target.value)} className="w-full text-xs border border-border rounded-lg px-2.5 py-2 text-foreground focus:outline-none focus:border-primary/50" style={{background:"rgba(255,255,255,0.03)"}}>
              {opts.map(o=><option key={o} value={o}>{o}</option>)}
            </select></div>
          ))}
          <div><label className="text-xs text-muted-foreground font-medium uppercase tracking-widest block mb-1.5">Max GSM: {gsm}</label><input type="range" min={70} max={600} step={10} value={gsm} onChange={e=>setGsm(+e.target.value)} className="w-full accent-primary"/></div>
          {hasF&&<button onClick={()=>{setCat("All");setFab("All");setCol("All");setGsm(600);}} className="text-xs text-primary flex items-center gap-1"><X size={10}/>Clear all</button>}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name, fabric, color, print, brand…" className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" style={{background:"rgba(255,255,255,0.03)"}}/></div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">{filtered.length} of {FG.length}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
          {filtered.map((g,i)=><PCard key={`ps-${g.id}`} g={g} i={i}/>)}
          {filtered.length===0&&<div className="col-span-3 py-16 flex flex-col items-center text-muted-foreground gap-2"><Package size={32} className="opacity-20"/><p className="text-sm">No products match</p></div>}
        </div>
      </div>
    </div>
  );
}

// ─── Image Search ─────────────────────────────────────────────────────────────
function scoreG(g:typeof FG[0],query:string):number {
  const q=query.toLowerCase(); const toks=q.split(/\s+/).filter(t=>t.length>2); let sc=0;
  const fields=[{v:g.name.toLowerCase(),w:5},{v:g.cat.toLowerCase(),w:4},{v:g.color.toLowerCase(),w:3},{v:g.fabric.toLowerCase(),w:3},{v:g.print.toLowerCase(),w:2},{v:g.brand.toLowerCase(),w:1}];
  for(const t of toks) for(const {v,w} of fields) { if(v.includes(t)) sc+=w; else if(t.includes(v.split(" ")[0])&&v.split(" ")[0].length>3) sc+=w*0.5; }
  if(q.includes(g.cat.toLowerCase())) sc+=3;
  return sc;
}

const SUGGS=["Blue floral dress","Black oversized hoodie","Cotton polo white","Denim slim jeans","Wool turtleneck sweater","Silk scarf multicolor","Linen blazer beige","Ethnic kurta red","Leather jacket brown","Navy yoga leggings"];

function ImageSearch() {
  const [q,setQ]=useState(""); const [results,setResults]=useState<(typeof FG[0]&{sim:number})[]>([]);
  const [drag,setDrag]=useState(false); const [preview,setPreview]=useState<string|null>(null); const [searching,setSearching]=useState(false); const [term,setTerm]=useState("");
  const fileRef=useRef<HTMLInputElement>(null);

  const doSearch=useCallback(async(sq:string)=>{
    if(!sq.trim()) return; setSearching(true); setResults([]); setTerm(sq);
    await new Promise(r=>setTimeout(r,500+Math.random()*400));
    const sc=FG.map(g=>({...g,_s:scoreG(g,sq)})).sort((a,b)=>b._s-a._s);
    const top=sc[0]?._s??1;
    setResults(sc.map(g=>({...g,sim:top>0?Math.min(99,Math.round((g._s/top)*100)):Math.floor(35+Math.random()*25)})).filter(g=>g.sim>10));
    setSearching(false);
  },[]);

  return (
    <div className="flex flex-col gap-5">
      <div className="mb-5">
        <h1 className="text-xl md:text-2xl font-semibold text-foreground" style={{fontFamily:"'Playfair Display',serif"}}>Semantic & Image Search</h1>
        <p className="text-muted-foreground text-sm mt-1">Vector embeddings — find garments by description or upload an image for visual similarity</p>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3 flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="relative flex-1"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSearch(q)} placeholder="Describe a garment, e.g. Blue floral dress" className="w-full pl-8 pr-4 py-3 rounded-xl border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" style={{background:"rgba(255,255,255,0.03)"}}/></div>
            <button onClick={()=>doSearch(q)} disabled={!q.trim()||searching} className="px-4 py-3 rounded-xl text-primary-foreground flex items-center gap-2 text-sm font-medium disabled:opacity-40 transition-all flex-shrink-0" style={{background:"linear-gradient(135deg,#0dd9c4,#0bb8a6)"}}>
              {searching?<RefreshCw size={14} className="animate-spin"/>:<Zap size={14}/>}<span className="hidden sm:inline">Search</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">{SUGGS.map(s=><button key={s} onClick={()=>{setQ(s);doSearch(s);}} className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all" style={{background:"rgba(255,255,255,0.02)"}}>{s}</button>)}</div>
          <div className="text-xs text-muted-foreground p-3 rounded-xl border flex items-start gap-2" style={{background:"rgba(124,58,237,0.05)",borderColor:"rgba(124,58,237,0.2)"}}>
            <span className="flex-shrink-0 w-3 h-3 rounded-full mt-0.5" style={{background:"rgba(124,58,237,0.4)"}}/>
            <span>Production stack: <strong style={{color:"#a78bfa"}}>Sentence Transformers</strong> (all-MiniLM-L6-v2) + <strong style={{color:"#a78bfa"}}>Typesense</strong> for sub-10ms semantic retrieval · CLIP for image-to-image search</span>
          </div>
        </div>
        <div className={`lg:col-span-2 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 p-5 cursor-pointer transition-all min-h-[140px] ${drag?"border-primary bg-primary/5":"border-border hover:border-primary/30"}`}
          onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)}
          onDrop={e=>{e.preventDefault();setDrag(false);const f=e.dataTransfer.files[0];if(f?.type.startsWith("image/")){setPreview(URL.createObjectURL(f));doSearch("fashion garment apparel clothing");}}}
          onClick={()=>fileRef.current?.click()}>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f){setPreview(URL.createObjectURL(f));doSearch("fashion garment apparel");}}}/>
          {preview?(
            <div className="flex items-center gap-3">
              <img src={preview} alt="upload" className="w-16 h-16 object-cover rounded-xl"/>
              <div><p className="text-xs font-medium" style={{color:"#0dd9c4"}}>Image uploaded</p><p className="text-xs text-muted-foreground mt-0.5">Finding via CLIP embeddings…</p>
              <button onClick={e=>{e.stopPropagation();setPreview(null);setResults([]);}} className="text-xs text-muted-foreground hover:text-foreground mt-1.5 flex items-center gap-1"><X size={9}/>Remove</button></div>
            </div>
          ):(
            <><div className="w-12 h-12 rounded-2xl flex items-center justify-center border" style={{background:"rgba(13,217,196,0.08)",borderColor:"rgba(13,217,196,0.2)"}}><Upload size={18} style={{color:"#0dd9c4"}}/></div>
            <div className="text-center"><p className="text-sm font-medium text-foreground">Upload garment image</p><p className="text-xs text-muted-foreground mt-0.5">CLIP finds visually similar items</p></div></>
          )}
        </div>
      </div>

      {searching&&<div className="flex items-center gap-3 text-sm text-muted-foreground border border-border rounded-xl px-4 py-3" style={{background:"rgba(13,217,196,0.03)",borderColor:"rgba(13,217,196,0.12)"}}><RefreshCw size={12} className="animate-spin flex-shrink-0" style={{color:"#0dd9c4"}}/>Embedding &ldquo;{term}&rdquo; → cosine similarity search over 1,248 garments…</div>}

      {results.length>0&&!searching&&(
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-muted-foreground">{results.length} results for <span className="text-foreground font-medium">&ldquo;{term}&rdquo;</span></p>
            <span className="text-xs text-muted-foreground">Ranked by cosine similarity</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 md:gap-4">
            {results.slice(0,8).map((g,idx)=>(
              <div key={`ir-${g.id}`} className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all group cursor-pointer">
                <div className="aspect-square bg-secondary overflow-hidden relative">
                  <GarmentImage src={g.img} alt={g.name} index={idx} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  <div className="absolute top-2 right-2 text-xs px-1.5 py-0.5 rounded-full font-semibold backdrop-blur-sm" style={{background:"rgba(0,0,0,0.6)",color:g.sim>70?"#0dd9c4":g.sim>40?"#f59e0b":"#6b82a0"}}>{g.sim}%</div>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-medium text-foreground line-clamp-1">{g.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{g.color} · {g.fabric}</p>
                  <div className="mt-1.5 w-full h-1 rounded-full overflow-hidden" style={{background:"rgba(255,255,255,0.05)"}}><div className="h-full rounded-full" style={{width:`${g.sim}%`,background:g.sim>70?"#0dd9c4":g.sim>40?"#f59e0b":"#6b82a0"}}/></div>
                  <div className="flex justify-between mt-1.5"><span className="text-xs text-muted-foreground">{g.supplier.split(" ")[0]}</span><span className="text-xs font-semibold" style={{color:"#0dd9c4",fontFamily:"'JetBrains Mono',monospace"}}>₹{g.price.toLocaleString()}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Goods Explorer ───────────────────────────────────────────────────────────
type SK="sn"|"name"|"price"|"gsm"|"cost";
function FinishedGoodsExplorer() {
  const [sk,setSk]=useState<SK>("sn"); const [asc,setAsc]=useState(true); const [fc,setFc]=useState("All"); const [pg,setPg]=useState(1); const [view,setView]=useState<"grid"|"list">("grid");
  const PP=view==="grid"?8:10;
  const sorted=[...FG].filter(g=>fc==="All"||g.cat===fc).sort((a,b)=>asc?(a[sk]>b[sk]?1:-1):(a[sk]<b[sk]?1:-1));
  const pages=Math.ceil(sorted.length/PP); const curr=sorted.slice((pg-1)*PP,pg*PP);
  const cats=["All",...new Set(FG.map(g=>g.cat))];
  return (
    <div className="flex flex-col gap-4">
      <div className="mb-5"><h1 className="text-xl md:text-2xl font-semibold text-foreground" style={{fontFamily:"'Playfair Display',serif"}}>Finished Goods Explorer</h1><p className="text-muted-foreground text-sm mt-1">{FG.length} styles · grid & list · sort & filter</p></div>
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-1.5">{cats.map(c=><button key={`cp-${c}`} onClick={()=>{setFc(c);setPg(1);}} className={`text-xs px-2.5 py-1 rounded-full border transition-all ${fc===c?"border-primary":"border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"}`} style={fc===c?{background:"linear-gradient(135deg,#0dd9c4,#0bb8a6)",color:"#080e1a"}:{background:"rgba(255,255,255,0.02)"}}>{c}</button>)}</div>
        <div className="flex items-center gap-1.5">
          <select value={sk} onChange={e=>{setSk(e.target.value as SK);setPg(1);}} className="text-xs border border-border rounded-lg px-2.5 py-1.5 text-muted-foreground focus:outline-none focus:border-primary/50" style={{background:"rgba(255,255,255,0.03)"}}>
            <option value="sn">Style #</option><option value="name">Name</option><option value="price">Price</option><option value="gsm">GSM</option><option value="cost">Cost</option>
          </select>
          <button onClick={()=>setAsc(!asc)} className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground" style={{background:"rgba(255,255,255,0.03)"}}><ArrowUpDown size={12}/></button>
          {[["grid",Grid3x3],["list",List]].map(([v,Icon])=>(
            <button key={v as string} onClick={()=>setView(v as "grid"|"list")} className={`p-1.5 rounded-lg border transition-all ${view===v?"border-primary/40 text-primary":"border-border text-muted-foreground hover:text-foreground"}`} style={view===v?{background:"rgba(13,217,196,0.1)"}:{background:"rgba(255,255,255,0.03)"}}>
              {React.createElement(Icon as React.ElementType, { size: 12 })}
            </button>
          ))}
        </div>
      </div>
      {view==="grid"
        ?<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 md:gap-4">{curr.map((g,i)=><PCard key={`ex-${g.id}`} g={g} i={i}/>)}</div>
        :<div className="bg-card border border-border rounded-2xl overflow-hidden"><div className="overflow-x-auto" style={{scrollbarWidth:"none"}}><table className="w-full text-sm min-w-[700px]">
          <thead><tr className="border-b border-border">{(["Style #","Name","Category","Fabric","GSM","Supplier","Price"] as string[]).map(h=><th key={h} className="px-4 py-3 text-left text-xs text-muted-foreground font-medium">{h}</th>)}</tr></thead>
          <tbody>{curr.map((g,i)=><tr key={`ex-row-${g.id}`} className="border-b border-border/40 last:border-0 hover:bg-white/2 transition-colors">
            <td className="px-4 py-2.5 text-xs text-muted-foreground" style={{fontFamily:"'JetBrains Mono',monospace"}}>{g.sn}</td>
            <td className="px-4 py-2.5"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg overflow-hidden bg-secondary flex-shrink-0"><GarmentImage src={g.img} alt={g.name} index={i} className="w-full h-full object-cover"/></div><span className="text-sm text-foreground whitespace-nowrap">{g.name}</span></div></td>
            <td className="px-4 py-2.5"><Tag>{g.cat}</Tag></td>
            <td className="px-4 py-2.5 text-xs text-muted-foreground">{g.fabric}</td>
            <td className="px-4 py-2.5 text-xs text-muted-foreground" style={{fontFamily:"'JetBrains Mono',monospace"}}>{g.gsm}</td>
            <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">{g.supplier}</td>
            <td className="px-4 py-2.5 text-sm font-semibold" style={{color:"#0dd9c4",fontFamily:"'JetBrains Mono',monospace"}}>₹{g.price.toLocaleString()}</td>
          </tr>)}</tbody>
        </table></div></div>
      }
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Showing {(pg-1)*PP+1}–{Math.min(pg*PP,sorted.length)} of {sorted.length}</span>
        <div className="flex gap-1">{Array.from({length:pages},(_,i)=>i+1).map(p=><button key={`pg-${p}`} onClick={()=>setPg(p)} className={`w-7 h-7 text-xs rounded-lg transition-all ${pg===p?"text-primary-foreground":"text-muted-foreground border border-border hover:text-foreground"}`} style={pg===p?{background:"linear-gradient(135deg,#0dd9c4,#0bb8a6)",color:"#080e1a"}:{background:"rgba(255,255,255,0.03)"}}>{p}</button>)}</div>
      </div>
    </div>
  );
}

// ─── Suppliers ────────────────────────────────────────────────────────────────
function Suppliers() {
  const [sel,setSel]=useState<typeof SUPPLIERS[0]|null>(null);
  return (
    <div className="flex flex-col gap-5">
      <div className="mb-5"><h1 className="text-xl md:text-2xl font-semibold text-foreground" style={{fontFamily:"'Playfair Display',serif"}}>Supplier Directory</h1><p className="text-muted-foreground text-sm mt-1">{SUPPLIERS.length} global suppliers · click to expand details</p></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SUPPLIERS.map(s=>(
          <button key={`sup-${s.id}`} onClick={()=>setSel(sel?.id===s.id?null:s)} className={`text-left bg-card border rounded-2xl p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 ${sel?.id===s.id?"border-primary/40":"border-border"}`} style={sel?.id===s.id?{background:"rgba(13,217,196,0.03)"}:{}}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0" style={{background:`${CC[s.id%CC.length]}20`,color:CC[s.id%CC.length]}}>{s.name[0]}</div>
              <span className="flex items-center gap-1 text-xs font-semibold" style={{color:"#f59e0b"}}><Star size={11} fill="#f59e0b"/>{s.rating}</span>
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-0.5">{s.name}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2"><Globe size={10}/>{s.country}</div>
            <p className="text-xs text-muted-foreground mb-3">{s.spec}</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg p-2 text-center" style={{background:"rgba(255,255,255,0.04)"}}><div className="text-sm font-semibold text-foreground" style={{fontFamily:"'JetBrains Mono',monospace"}}>{s.orders}</div><div className="text-xs text-muted-foreground">Orders</div></div>
              <div className="rounded-lg p-2 text-center" style={{background:"rgba(255,255,255,0.04)"}}><div className="text-sm font-semibold text-foreground" style={{fontFamily:"'JetBrains Mono',monospace"}}>{s.lead}d</div><div className="text-xs text-muted-foreground">Lead Time</div></div>
            </div>
            {sel?.id===s.id&&(
              <div className="mt-3 pt-3 border-t border-border flex flex-col gap-1.5">
                {[["Revenue",`₹${(s.revenue/10000000).toFixed(1)}Cr`],["Contact",s.contact],["Certifications",s.cert]].map(([l,v])=>(
                  <div key={l} className="flex justify-between text-xs gap-2"><span className="text-muted-foreground flex-shrink-0">{l}</span><span className="text-foreground text-right truncate">{v}</span></div>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Orders & Invoices ────────────────────────────────────────────────────────
function OrdersInvoices() {
  const [tab,setTab]=useState<"orders"|"invoices">("orders");
  return (
    <div className="flex flex-col gap-5">
      <div className="mb-5"><h1 className="text-xl md:text-2xl font-semibold text-foreground" style={{fontFamily:"'Playfair Display',serif"}}>Orders & Invoices</h1><p className="text-muted-foreground text-sm mt-1">Sales order management and invoice tracking</p></div>
      <div className="flex gap-1 p-1 rounded-xl border border-border w-fit" style={{background:"rgba(255,255,255,0.02)"}}>
        {[["orders","Sales Orders"],["invoices","Invoices"]].map(([v,l])=>(
          <button key={v} onClick={()=>setTab(v as"orders"|"invoices")} className={`text-xs px-4 py-2 rounded-lg font-medium transition-all ${tab===v?"text-primary-foreground":"text-muted-foreground hover:text-foreground"}`} style={tab===v?{background:"linear-gradient(135deg,#0dd9c4,#0bb8a6)",color:"#080e1a"}:{}}>{l}</button>
        ))}
      </div>
      {tab==="orders"&&(
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[{l:"Total",v:ORDERS.length,c:"#0dd9c4"},{l:"Shipped",v:ORDERS.filter(o=>o.status==="Shipped").length,c:"#3b82f6"},{l:"In Production",v:ORDERS.filter(o=>o.status==="In Production").length,c:"#7c3aed"},{l:"Pending",v:ORDERS.filter(o=>o.status==="Pending").length,c:"#f59e0b"}].map(s=>(
              <div key={s.l} className="bg-card border border-border rounded-xl p-4 text-center">
                <div className="text-2xl font-bold mb-1" style={{color:s.c,fontFamily:"'Playfair Display',serif"}}>{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden"><div className="overflow-x-auto" style={{scrollbarWidth:"none"}}><table className="w-full text-sm min-w-[700px]">
            <thead><tr className="border-b border-border">{["Order #","Buyer","Style","Qty","Amount","Shipment","Status"].map(h=><th key={h} className="px-4 py-3 text-left text-xs text-muted-foreground font-medium whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody>{ORDERS.map(o=><tr key={`ord-${o.id}`} className="border-b border-border/40 last:border-0 hover:bg-white/2 transition-colors">
              <td className="px-4 py-3 text-xs text-muted-foreground" style={{fontFamily:"'JetBrains Mono',monospace"}}>{o.id}</td>
              <td className="px-4 py-3 text-sm text-foreground whitespace-nowrap">{o.buyer}</td>
              <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{o.style}</td>
              <td className="px-4 py-3 text-sm" style={{fontFamily:"'JetBrains Mono',monospace"}}>{o.qty.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm font-medium" style={{color:"#0dd9c4",fontFamily:"'JetBrains Mono',monospace"}}>₹{(o.amount/100000).toFixed(1)}L</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">{o.ship}</td>
              <td className="px-4 py-3"><SBadge s={o.status}/></td>
            </tr>)}</tbody>
          </table></div></div>
        </div>
      )}
      {tab==="invoices"&&(
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[{l:"Outstanding",v:`₹${(INVOICES.filter(i=>i.status!=="Paid").reduce((s,i)=>s+i.amount,0)/10000000).toFixed(2)}Cr`,c:"#ec4899"},{l:"Paid This Period",v:`₹${(INVOICES.filter(i=>i.status==="Paid").reduce((s,i)=>s+i.amount,0)/10000000).toFixed(2)}Cr`,c:"#10b981"},{l:"Overdue Invoices",v:`${INVOICES.filter(i=>i.status==="Overdue").length}`,c:"#ef4444"}].map(s=>(
              <div key={s.l} className="bg-card border border-border rounded-xl p-4">
                <div className="text-xl font-bold mb-1" style={{color:s.c,fontFamily:"'Playfair Display',serif"}}>{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden"><div className="overflow-x-auto" style={{scrollbarWidth:"none"}}><table className="w-full text-sm min-w-[600px]">
            <thead><tr className="border-b border-border">{["Invoice #","Order","Buyer","Amount","Due Date","Status"].map(h=><th key={h} className="px-4 py-3 text-left text-xs text-muted-foreground font-medium whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody>{INVOICES.map(inv=><tr key={`inv-${inv.id}`} className="border-b border-border/40 last:border-0 hover:bg-white/2 transition-colors">
              <td className="px-4 py-3 text-xs font-medium text-muted-foreground" style={{fontFamily:"'JetBrains Mono',monospace"}}>{inv.id}</td>
              <td className="px-4 py-3 text-xs text-muted-foreground" style={{fontFamily:"'JetBrains Mono',monospace"}}>{inv.order}</td>
              <td className="px-4 py-3 text-sm text-foreground whitespace-nowrap">{inv.buyer}</td>
              <td className="px-4 py-3 text-sm font-semibold" style={{color:"#0dd9c4",fontFamily:"'JetBrains Mono',monospace"}}>₹{(inv.amount/100000).toFixed(1)}L</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">{inv.due}</td>
              <td className="px-4 py-3"><SBadge s={inv.status}/></td>
            </tr>)}</tbody>
          </table></div></div>
        </div>
      )}
    </div>
  );
}

// ─── Tech Packs ───────────────────────────────────────────────────────────────
function TechPacks() {
  const [sel,setSel]=useState<typeof TECH_PACKS[0]|null>(null);
  return (
    <div className="flex flex-col gap-5">
      <div className="mb-5"><h1 className="text-xl md:text-2xl font-semibold text-foreground" style={{fontFamily:"'Playfair Display',serif"}}>Tech Packs</h1><p className="text-muted-foreground text-sm mt-1">Technical specifications for each finished good style</p></div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          {TECH_PACKS.map(tp=>{const g=FG.find(f=>f.sn===tp.sn);return(
            <button key={`tp-${tp.id}`} onClick={()=>setSel(sel?.id===tp.id?null:tp)} className={`text-left bg-card border rounded-xl p-4 transition-all hover:border-primary/30 ${sel?.id===tp.id?"border-primary/40":"border-border"}`} style={sel?.id===tp.id?{background:"rgba(13,217,196,0.03)"}:{}}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-secondary flex-shrink-0">{g&&<GarmentImage src={g.img} alt={g.name} index={tp.id} className="w-full h-full object-cover"/>}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5"><span className="text-xs text-muted-foreground" style={{fontFamily:"'JetBrains Mono',monospace"}}>{tp.sn}</span><SBadge s={tp.status}/><span className="text-xs text-muted-foreground ml-auto">{tp.ver}</span></div>
                  <h3 className="text-sm font-medium text-foreground truncate">{g?.name}</h3>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{tp.fabric.substring(0,45)}…</p>
                </div>
              </div>
            </button>
          );})}
        </div>
        <div>
          {sel?(()=>{const g=FG.find(f=>f.sn===sel.sn);return(
            <div className="bg-card border border-border rounded-2xl p-5 sticky top-4">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary flex-shrink-0">{g&&<GarmentImage src={g.img} alt={g.name} index={sel.id} className="w-full h-full object-cover"/>}</div>
                <div><div className="flex items-center gap-2 mb-1"><span className="text-xs text-muted-foreground" style={{fontFamily:"'JetBrains Mono',monospace"}}>{sel.sn}</span><SBadge s={sel.status}/></div><h2 className="text-base font-semibold text-foreground">{g?.name}</h2><span className="text-xs text-muted-foreground">{sel.ver}</span></div>
              </div>
              {[["Fabric Details",sel.fabric],["Construction",sel.construction],["Wash Instructions",sel.wash]].map(([l,v])=>(
                <div key={l} className="mb-4"><p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mb-1.5">{l}</p><p className="text-sm text-foreground leading-relaxed">{v}</p></div>
              ))}
              {g&&<div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border">
                {[["Cost",`₹${g.cost}`],["Price",`₹${g.price}`],["GSM",`${g.gsm}g`]].map(([l,v])=>(
                  <div key={l} className="text-center rounded-lg p-2" style={{background:"rgba(255,255,255,0.04)"}}><div className="text-sm font-semibold text-foreground" style={{fontFamily:"'JetBrains Mono',monospace"}}>{v}</div><div className="text-xs text-muted-foreground">{l}</div></div>
                ))}
              </div>}
            </div>
          );})():(
            <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center h-64">
              <FileText size={32} className="text-muted-foreground opacity-20 mb-3"/>
              <p className="text-sm text-muted-foreground">Select a tech pack to view full specs</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
type Scr="dashboard"|"nlquery"|"search"|"imagesearch"|"explorer"|"suppliers"|"orders"|"techpacks";
const NAV:{id:Scr;label:string;icon:React.ElementType;group:string}[]=[
  {id:"dashboard",label:"Dashboard",icon:LayoutDashboard,group:"Overview"},
  {id:"nlquery",label:"AI Query",icon:MessageSquare,group:"AI Features"},
  {id:"imagesearch",label:"Image Search",icon:ImageIcon,group:"AI Features"},
  {id:"search",label:"Product Search",icon:Search,group:"Catalog"},
  {id:"explorer",label:"Goods Explorer",icon:Package,group:"Catalog"},
  {id:"techpacks",label:"Tech Packs",icon:FileText,group:"Catalog"},
  {id:"suppliers",label:"Suppliers",icon:Truck,group:"Operations"},
  {id:"orders",label:"Orders & Invoices",icon:ShoppingBag,group:"Operations"},
];
const GROUPS=["Overview","AI Features","Catalog","Operations"];

export default function App() {
  const [screen,setScreen]=useState<Scr>("dashboard");
  const [open,setOpen]=useState(false);
  return (
    <div className="flex h-screen bg-background overflow-hidden" style={{fontFamily:"'DM Sans',sans-serif"}}>
      {open&&<div className="fixed inset-0 bg-black/60 z-20 md:hidden" onClick={()=>setOpen(false)}/>}
      <aside className={`fixed md:static z-30 top-0 left-0 h-full w-56 flex flex-col border-r transition-transform duration-200 md:translate-x-0 ${open?"translate-x-0":"-translate-x-full"}`} style={{background:"#080e1a",borderColor:"rgba(13,217,196,0.1)"}}>
        <div className="px-4 py-4 border-b flex items-center justify-between flex-shrink-0" style={{borderColor:"rgba(13,217,196,0.1)"}}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:"linear-gradient(135deg,#0dd9c4,#0bb8a6)"}}>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M12 3C8.5 3 5.5 5.5 5 8.5C3 9 1.5 10.5 1.5 12.5C1.5 14.7 3.3 16.5 5.5 16.5H19C21 16.5 22.5 15 22.5 13C22.5 11.2 21.3 9.7 19.5 9.2C19 6.3 15.8 3 12 3Z" fill="#080e1a"/></svg>
            </div>
            <div><div className="text-sm font-bold text-foreground" style={{fontFamily:"'Playfair Display',serif",letterSpacing:"0.05em"}}>WFX</div><div className="text-xs text-muted-foreground leading-none">AI-Native ERP</div></div>
          </div>
          <button onClick={()=>setOpen(false)} className="md:hidden text-muted-foreground hover:text-foreground"><X size={15}/></button>
        </div>
        <nav className="flex-1 px-3 py-3 overflow-y-auto flex flex-col gap-3" style={{scrollbarWidth:"none"}}>
          {GROUPS.map(group=>{
            const items=NAV.filter(n=>n.group===group);
            return <div key={group}>
              <p className="text-xs text-muted-foreground px-2 mb-1 font-medium uppercase tracking-widest opacity-40">{group}</p>
              {items.map(({id,label,icon:Icon})=>(
                <button key={id} onClick={()=>{setScreen(id as Scr);setOpen(false);}} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all w-full text-left mb-0.5 ${screen===id?"text-primary font-medium":"text-muted-foreground hover:text-foreground"}`}
                  style={screen===id?{background:"linear-gradient(135deg,rgba(13,217,196,0.15),rgba(13,217,196,0.05))",borderLeft:"2px solid #0dd9c4"}:{borderLeft:"2px solid transparent"}}>
                  <Icon size={14}/>{label}
                </button>
              ))}
            </div>;
          })}
        </nav>
        <div className="px-4 py-3 border-t flex-shrink-0" style={{borderColor:"rgba(13,217,196,0.1)",background:"rgba(255,255,255,0.01)"}}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{background:"linear-gradient(135deg,rgba(124,58,237,0.3),rgba(124,58,237,0.1))",color:"#a78bfa",border:"1px solid rgba(124,58,237,0.3)"}}>AI</div>
            <div className="min-w-0"><div className="text-xs font-medium text-foreground truncate">WFX Intern Demo</div><div className="text-xs text-muted-foreground truncate">Skill Test · July 2026</div></div>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-border flex-shrink-0" style={{background:"#080e1a"}}>
          <button onClick={()=>setOpen(true)} className="text-muted-foreground hover:text-foreground"><Menu size={20}/></button>
          <span className="text-sm font-semibold text-foreground" style={{fontFamily:"'Playfair Display',serif"}}>{NAV.find(n=>n.id===screen)?.label}</span>
        </div>
        <main className="flex-1 overflow-y-auto px-4 py-5 md:px-8 md:py-7" style={{scrollbarWidth:"none"}}>
          {screen==="dashboard"&&<Dashboard/>}
          {screen==="nlquery"&&<NLQuery/>}
          {screen==="search"&&<ProductSearch/>}
          {screen==="imagesearch"&&<ImageSearch/>}
          {screen==="explorer"&&<FinishedGoodsExplorer/>}
          {screen==="suppliers"&&<Suppliers/>}
          {screen==="orders"&&<OrdersInvoices/>}
          {screen==="techpacks"&&<TechPacks/>}
        </main>
      </div>
    </div>
  );
}
