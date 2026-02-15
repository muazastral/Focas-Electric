import { 
  Lightbulb, 
  Zap, 
  Cable, 
  Fan, 
  CircuitBoard, 
  Settings, 
  Cpu, 
  Home, 
  Building2, 
  Factory, 
  HardHat, 
  Hammer, 
  Landmark 
} from 'lucide-react';
import { FeatureItem, NavItem, StatItem, ServiceItem, NewsItem, UseCaseItem, User, Order, InventoryMatrixRow } from './types';
import { PDF_PAGE_PRODUCTS } from './data/pdfPageProducts';

export const NAV_ITEMS: NavItem[] = [
  { label: 'News', href: '#news' },
];

export const STATS: StatItem[] = [
  { value: '25+', label: 'Authorized Brands' },
  { value: '132', label: 'Catalog Pages' },
  { value: '6', label: 'Branch Locations' },
  { value: 'Since 1999', label: 'Industry Experience' },
];

export const INVENTORY_CATEGORIES: FeatureItem[] = [
  { title: 'Lighting & LED Solutions', icon: Lightbulb },
  { title: 'Switches & Sockets', icon: Zap },
  { title: 'Cables & Wiring', icon: Cable },
  { title: 'Fans & Ventilation', icon: Fan },
  { title: 'Distribution Boards', icon: CircuitBoard },
  { title: 'Industrial Components', icon: Settings },
  { title: 'Smart Home & Automation', icon: Cpu },
];

export const BRAND_NAMES = [
  "Panasonic", "KDK", "Schneider Electric", "Legrand", "Bosch", "SJ Lite", "Hitachi", "Philips", "Hager", "ABB", "Osram", "PNE", "VITALITE", "Mega Kabel", "DNF Cable", "Ecosparks", "Joven", "MK", "Selamat", "Taian Jaya", "Tonn Cable", "Maxguard", "Chint", "LS", "Kozuka", "Fighter", "Kyodo", "Smart"
];

export const LOCATIONS = [
  { 
    id: 'hq', 
    name: 'Head Office (Semambu)', 
    address: 'Lot 110 & 111, Jalan Industri Semambu 6, Kawasan Perindustrian Semambu, 25300 Kuantan, Pahang',
    phone: '09-560 6188'
  },
  { 
    id: 'kuantan', 
    name: 'Kuantan Branch Sales', 
    address: 'C-710, Ground Floor, Jalan Dato Lim Hoe Lek, 25200 Kuantan, Pahang',
    phone: '09-5157980'
  },
  { 
    id: 'balok', 
    name: 'Kuantan - Balok Branch', 
    address: 'A7, Ground Floor Lorong Baluk Darat 13, Perumahan Baluk Darat Balok, 26100 Kuantan, Pahang',
    phone: '-'
  },
  { 
    id: 'batu', 
    name: 'Selangor - Batu Caves', 
    address: 'No.6, Jalan SBC 9, Taman Sri Batu Caves, 68100 Batu Caves, Selangor',
    phone: '03-6188 5317'
  },
  { 
    id: 'chukai', 
    name: 'Terengganu - Chukai', 
    address: 'Lot PT 17378, Ground Floor, Jalan Persiaran Jakar, 24000 Chukai, Terengganu',
    phone: '09-858 7362'
  },
  { 
    id: 'tas', 
    name: 'Kuantan - Taman Tas', 
    address: 'B-24 & B-26, Ground Floor, Lrg Pandan Damai 2/2, Taman Pandan Permai, 25150 Kuantan, Pahang',
    phone: '09-553 6002'
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  { title: 'Project Quotation', description: 'Comprehensive bulk quotation support for large scale projects.' },
  { title: 'Product Consultation', description: 'Expert advice to select the right components for your specific needs.' },
  { title: 'Contractor Programs', description: 'Specialized supply programs for developers and contractors.' },
  { title: 'Logistics Coordination', description: 'Scheduled delivery support for contractors, developers, and project sites.' },
  { title: 'After-sales Support', description: 'Dedicated technical assistance and warranty handling.' },
  { title: 'Special Sourcing', description: 'Sourcing niche or compliance-focused products for JKR and industrial requirements.' },
];

export const USE_CASES: UseCaseItem[] = [
  { title: 'Residential Homes', icon: Home, image: 'https://picsum.photos/800/600?random=1' },
  { title: 'Commercial Buildings', icon: Building2, image: 'https://picsum.photos/800/600?random=2' },
  { title: 'Industrial Facilities', icon: Factory, image: 'https://picsum.photos/800/600?random=3' },
  { title: 'Construction Projects', icon: HardHat, image: 'https://picsum.photos/800/600?random=4' },
  { title: 'Renovation Contractors', icon: Hammer, image: 'https://picsum.photos/800/600?random=5' },
  { title: 'Property Developers', icon: Landmark, image: 'https://picsum.photos/800/600?random=6' },
];

export const NEWS_ITEMS: NewsItem[] = [
  { 
    title: 'New Industrial LED Series Arrival', 
    date: 'Oct 12, 2023', 
    category: 'Product', 
    image: 'https://picsum.photos/600/400?random=7',
    content: `We are proud to announce the arrival of our latest Industrial LED Series, designed to revolutionize energy efficiency in large-scale facilities. These new fixtures offer:

    • High Lumen Output: Up to 150lm/W efficiency, ensuring brighter workspaces with lower energy consumption.
    • Extreme Durability: IP66 rated for water and dust resistance, making them perfect for challenging environments like factories, warehouses, and processing plants.
    • Smart Control Ready: Fully compatible with DALI and 0-10V dimming systems for automated energy management.
    
    This series is available in 100W, 150W, and 200W variants to suit various ceiling heights and illumination requirements. Our team has rigorously tested these units against voltage fluctuations common in industrial areas, ensuring a long operational lifespan.
    
    Visit our showroom in Semambu to see them in action or contact our sales team for a datasheet and bulk pricing.`
  },
  { 
    title: 'Partnership with Schneider Electric', 
    date: 'Sep 28, 2023', 
    category: 'Brand', 
    image: 'https://picsum.photos/600/400?random=8',
    content: `Focus Electrical is thrilled to officially partner with Schneider Electric as an authorized distributor for the East Coast region. This strategic partnership allows us to bring you the full range of Schneider's world-class electrical protection and automation products directly.
    
    Our inventory now includes:
    • Vivace & AvatarOn Switches: Stylish and durable wiring devices for modern homes.
    • Acti9 MCBs and RCCBs: Premium circuit protection ensuring maximum safety.
    • Industrial Contactors and Overload Relays: The TeSys range for reliable motor control.
    • Easy9 Series: Affordable yet high-quality protection devices for residential distribution.
    
    "This collaboration strengthens our commitment to providing safe and reliable electrical solutions to our customers," says our Managing Director. "Schneider Electric is a global leader in energy management, and we are excited to make their products more accessible to contractors and homeowners in Pahang."
    
    Stock is now available at all our branches. Walk in today to view the latest demo units.` 
  },
  { 
    title: 'Semambu Store Expansion Complete', 
    date: 'Aug 15, 2023', 
    category: 'Store', 
    image: 'https://picsum.photos/600/400?random=9',
    content: `Our Semambu HQ expansion project is finally complete! After months of planning and renovation, we have added 2,000 sqft of warehouse space and completely renovated our walk-in retail area to serve you better.
    
    Key upgrades include:
    • Expanded Display Area: A new interactive showroom section for lighting and smart home products, allowing you to test color temperatures and smart features before buying.
    • Dedicated "Contractor's Corner": A streamlined counter for quick bulk pickups and project consultations, reducing waiting time for professionals.
    • Improved Logistics: A new loading bay area to facilitate faster loading of heavy cables and distribution boards.
    
    We thank our customers for their patience during the renovation period. Join us this weekend for our re-opening celebration, featuring special discounts on selected items and free gifts for the first 50 customers.` 
  },
  {
    title: 'Safety First: Understanding MCB Ratings',
    date: 'Jul 10, 2023',
    category: 'Technical',
    image: 'https://picsum.photos/600/400?random=20',
    content: `Choosing the right Miniature Circuit Breaker (MCB) is crucial for the safety of any electrical installation. In this technical guide, we break down the differences between Type B, C, and D curves.

    Type B: Trips between 3-5 times full load current. Ideal for domestic applications and lighting circuits where surges are low.
    
    Type C: Trips between 5-10 times full load current. Used for commercial and industrial applications with inductive loads like fluorescent lighting and small motors.
    
    Type D: Trips between 10-20 times full load current. Necessary for high inrush current devices like transformers and X-ray machines.
    
    Always consult with a certified wireman before upgrading your distribution board.`
  },
  {
    title: 'Focus Electrical Charity Run 2023',
    date: 'Jun 05, 2023',
    category: 'Community',
    image: 'https://picsum.photos/600/400?random=21',
    content: `We believe in giving back to the community that supports us. Last Sunday, the Focus Electrical team participated in the local Kuantan Charity Run.
    
    Over 50 of our staff members ran 5km and 10km distances to raise funds for local orphanages. It was a fantastic day of team bonding and community spirit.
    
    We managed to raise RM 15,000 in total! Thank you to all our partners and customers who donated to the cause.`
  },
  {
    title: 'New KDK Fan Models Now In Stock',
    date: 'May 22, 2023',
    category: 'Product',
    image: 'https://picsum.photos/600/400?random=22',
    content: `Beat the heat this season with the latest KDK ceiling fans, now available at all Focus Electrical branches.
    
    The new DC motor series offers up to 50% energy savings compared to traditional AC motor fans. They also come with advanced features like:
    • Yuragi (1/f Fluctuation) technology for natural breeze feeling.
    • 9-speed control.
    • Sleep mode with timer.
    
    Visit us today to see the new designs that complement modern interior aesthetics perfectly.`
  }
];

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  description: string;
  isNew?: boolean;
  isSale?: boolean;
  brand: string;
  availableAt: string[];
  variants?: string[];
  colors?: string[];
  sizes?: string[];
  lengths?: string[];
  types?: string[];
  choices?: string[];
  modelCodes?: string[];
  inventoryMatrix?: InventoryMatrixRow[];
}

const CORE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'LED Recessed / Surface Panel Light (HIKARI AFG)',
    category: 'Lighting',
    price: 29.90,
    originalPrice: 36.00,
    rating: 5,
    image: 'https://picsum.photos/600/600?random=101',
    description: 'SIRIM-approved LED panel lighting for office, hotel, and residential use. Available in round/square and recessed/surface variants.',
    isSale: true,
    brand: 'HIKARI',
    availableAt: ['hq', 'kuantan', 'tas', 'batu', 'chukai'],
    variants: ['Recessed Round', 'Recessed Square', 'Surface Round', 'Surface Square'],
    colors: ['Daylight 6500K', 'Cool White 4000K', 'Warm White 3000K'],
    sizes: ['4 inch', '6 inch', '8 inch', '12 inch'],
    modelCodes: ['AFG-4DLR-12L', 'AFG-6DLR-18L', 'AFG-24SR', 'AFG-24SS'],
    choices: ['Indoor Use', 'Non-Dimmable', 'Open Fitting Compatible']
  },
  {
    id: '2',
    name: 'LED Flood Light (HIKARI AFG-FL Series)',
    category: 'Lighting',
    price: 89.00,
    rating: 4,
    image: 'https://picsum.photos/600/600?random=102',
    description: 'IP66 waterproof flood light for warehouse, workshop, garden, and outdoor projects. ST & SIRIM aligned range.',
    isNew: true,
    brand: 'HIKARI',
    availableAt: ['hq', 'balok', 'batu', 'chukai', 'tas'],
    variants: ['AFG-FL-50', 'AFG-FL-100', 'AFG-FL-150', 'AFG-FL-200'],
    colors: ['Daylight', 'Warm White'],
    sizes: ['185 x 220 x 30mm', '240 x 275 x 30mm', '275 x 295 x 30mm', '335 x 350 x 30mm'],
    types: ['IP66 Outdoor Floodlight'],
    choices: ['PF 0.9', '100-240V', 'Warehouse/Outdoor Use']
  },
  {
    id: '3',
    name: 'LED T8 Tube Glass (G13 Cap)',
    category: 'Lighting',
    price: 18.00,
    originalPrice: 22.00,
    rating: 5,
    image: 'https://picsum.photos/600/600?random=103',
    description: 'Premium quality indoor LED T8 tube with multiple wattages and color temperatures. Cap/Base: G13.',
    isSale: true,
    brand: 'HIKARI',
    availableAt: ['hq', 'kuantan', 'tas', 'balok', 'batu', 'chukai'],
    variants: ['AFG-10TD', 'AFG-20TD', 'AFG-22TD', 'AFG-22TC', 'AFG-22TW', 'AFG-32TD'],
    colors: ['Daylight', 'Cool White', 'Warm White'],
    lengths: ['28 x 602mm', '28 x 1212mm'],
    types: ['G13 Glass Tube'],
    choices: ['CRI > 70', '220-240V', 'Non-Dimmable']
  },
  {
    id: '4',
    name: 'LED Stick Bulb E27',
    category: 'Lighting',
    price: 12.50,
    rating: 4,
    image: 'https://picsum.photos/600/600?random=104',
    description: 'Energy-saving LED stick lamp with E27 base. Suitable for home, office, bedroom, and hallway.',
    brand: 'HIKARI',
    availableAt: ['hq', 'kuantan', 'batu', 'chukai'],
    variants: ['AFG-1027DL', 'AFG-1027WW', 'AFG-1527DL', 'AFG-1527WW'],
    colors: ['Daylight', 'Warm White'],
    sizes: ['10W', '15W'],
    lengths: ['120 x 36.5mm', '145 x 49mm'],
    types: ['E27 Bulb']
  },
  {
    id: '5',
    name: 'LED High Bay Industrial',
    category: 'Industrial',
    price: 168.00,
    rating: 5,
    image: 'https://picsum.photos/600/600?random=105',
    description: 'Industrial high-bay LED for warehouse, factory, and hall applications. 10kV surge protection and IP66.',
    isNew: true,
    brand: 'HIKARI',
    availableAt: ['hq', 'balok', 'chukai', 'tas'],
    variants: ['AFG-HB-100', 'AFG-HB-150', 'AFG-HB-200'],
    colors: ['Daylight'],
    sizes: ['260 x 260 x 34mm', '302 x 302 x 34mm', '332 x 332 x 34mm'],
    choices: ['100W', '150W', '200W', 'PF 0.9', 'IP66']
  },
  {
    id: '6',
    name: 'PVC Connector & Fitting (PC 10A / PC 15A)',
    category: 'Switches',
    price: 6.90,
    rating: 4,
    image: 'https://picsum.photos/600/600?random=106',
    description: 'Connector and fitting set for wiring works, including screw clamp options and compatible LED fitting accessories.',
    brand: 'HIKARI',
    availableAt: ['hq', 'kuantan', 'tas'],
    variants: ['AFG-PC10A', 'AFG-PC15A', 'AFG-140AFT'],
    sizes: ['117 x 20 x 15mm', '129 x 20 x 15mm', '4ft fitting'],
    types: ['Screw Clamp', 'LED Fitting 4ft'],
    choices: ['10A', '15A', 'IP65 Option']
  },
  {
    id: '7',
    name: 'PVC Electrical Tape 5M',
    category: 'Cables',
    price: 2.20,
    originalPrice: 2.80,
    rating: 3,
    image: 'https://picsum.photos/600/600?random=107',
    description: '0.13mm PVC tape, 18mm x 5m, suitable for insulation and identification in electrical installation work.',
    isSale: true,
    brand: 'HIKARI',
    availableAt: ['hq', 'kuantan', 'balok', 'batu', 'chukai', 'tas'],
    variants: ['AFG-P-TAPE-BLK', 'AFG-P-TAPE-BLUE', 'AFG-P-TAPE-G', 'AFG-P-TAPE-R', 'AFG-P-TAPE-Y'],
    colors: ['Black', 'Blue', 'Green', 'Red', 'Yellow'],
    sizes: ['18mm x 5M'],
    types: ['PVC Tape'],
    choices: ['0.13mm Thickness', '10 pcs/pack']
  },
  {
    id: '8',
    name: 'Test Pen (Venvolta-TP)',
    category: 'Tools',
    price: 5.00,
    rating: 4,
    image: 'https://picsum.photos/600/600?random=108',
    description: 'Basic hand-tool test pen for voltage checking and maintenance work.',
    brand: 'Venvolta',
    availableAt: ['hq', 'kuantan', 'tas', 'balok'],
    variants: ['Venvolta-TP'],
    lengths: ['140mm'],
    colors: ['Grey'],
    types: ['100-500V Test Pen'],
    choices: ['3mm Tip', '70V Ignition Voltage']
  },
  {
    id: '9',
    name: 'GI Flexible Conduit (Uncoated)',
    category: 'Cables',
    price: 28.00,
    rating: 5,
    image: 'https://picsum.photos/600/600?random=109',
    description: 'Galvanised iron flexible conduit for general wiring protection, indoor and outdoor routing.',
    brand: 'AFG',
    availableAt: ['hq', 'chukai', 'batu', 'tas'],
    variants: ['AFG 3/4"', 'AFG 1"', 'TS 3/4"', 'TS 1"', 'TOYO 1-1/4"'],
    sizes: ['20mm', '25mm', '32mm'],
    lengths: ['50FT (15m)'],
    types: ['Standard Coil', 'Coil', 'Loose']
  },
   {
    id: '10',
    name: 'GI Coated / Water-Tight Flexible Conduit',
    category: 'Cables',
    price: 35.00,
    rating: 4,
    image: 'https://picsum.photos/600/600?random=110',
    description: 'G.I inner + PVC outer coated conduit for moist and harsh environments with water-tight options.',
    brand: 'PVC LINK',
    availableAt: ['hq', 'balok', 'chukai'],
    variants: ['LSE', 'MPCFC04', 'MPCFC05', 'MPCFC06', 'MPCFC10', 'MPCFC12', 'MPCFC14', 'MPCFC20', 'PBA206714'],
    sizes: ['1/2"', '5/8"', '3/4"', '1"', '1-1/4"', '1-1/2"', '2"'],
    lengths: ['15m', '20m', '30m'],
    choices: ['IP66 Water-Tight Option']
  },
  {
    id: '11',
    name: 'Regulator Ceiling Fan (JKR Certified)',
    category: 'Fans',
    price: 299.00,
    rating: 5,
    image: 'https://picsum.photos/600/600?random=111',
    description: 'JKR-certified regulator fan models for residential and light commercial use.',
    brand: 'KDK',
    availableAt: ['hq', 'kuantan', 'tas', 'batu'],
    variants: ['KDK K15VC', 'KDK K15WO-S'],
    sizes: ['48 inch', '60 inch'],
    colors: ['White', 'Brown', 'Copper Brown', 'Silver', 'Dark Grey', 'Mild Gold'],
    choices: ['3 Blades', '5 Speed Settings']
  },
  {
    id: '12',
    name: 'Exhaust Fan (JKR Certified)',
    category: 'Fans',
    price: 145.00,
    rating: 4,
    image: 'https://picsum.photos/600/600?random=112',
    description: 'Ceiling and wall mounted exhaust fan options for air circulation and ventilation.',
    brand: 'Panasonic',
    availableAt: ['hq', 'kuantan', 'chukai', 'batu'],
    variants: ['KDK 20AQM8', 'KDK 30AQM8', 'PANASONIC FV-20AUM8', 'PANASONIC FV-30AUM8', 'SELAMAT MQ-V8'],
    sizes: ['6 inch', '8 inch', '10 inch', '12 inch'],
    types: ['Ceiling Mount', 'Wall Mount']
  },
  {
    id: '13',
    name: 'Emergency Luminaire (PNE)',
    category: 'Lighting',
    price: 198.00,
    rating: 5,
    image: 'https://picsum.photos/600/600?random=113',
    description: 'Emergency light range for compliance-focused commercial and industrial safety installations.',
    brand: 'PNE',
    availableAt: ['hq', 'kuantan', 'tas', 'balok', 'batu', 'chukai'],
    variants: ['PNE-PEL18LED', 'PNE-PEL28R-LED', 'PNE-PTH100', 'PNE-PTH311', 'PNE-PTH322R', 'PNE-TEL30-LED', 'PNE-PEJ108WP'],
    sizes: ['360 x 110 x 70mm', '410 x 165 x 100mm', '100mm Dia x 73mm Height', '355 x 75 x 120mm'],
    types: ['Emergency Light', 'Ceiling Emergency', 'Weatherproof Emergency'],
    choices: ['240V', 'IP20', 'IP65']
  },
  {
    id: '14',
    name: 'Exit / Keluar Sign (PNE & VITALITE)',
    category: 'Lighting',
    price: 168.00,
    rating: 4,
    image: 'https://picsum.photos/600/600?random=114',
    description: 'Exit signage options including surface, recess, single-side, double-side, and directional arrow variants.',
    brand: 'VITALITE',
    availableAt: ['hq', 'kuantan', 'tas', 'batu', 'chukai'],
    variants: ['PNE-PEX215LED', 'PNE-PEX138LED', 'PNE-PEX138LED-R', 'PNE-PEX138LED(RA)', 'VITALITE-VKS560/B/RM', 'VITALITE-VKS555/STS/SA'],
    types: ['Surface', 'Recess', 'Single-side Arrow', 'Double-side Arrow', 'Run Direction'],
    sizes: ['556 x 52 x 155mm', '655 x 152 x 102mm', '560 x 56 x 160mm', '555 x 47 x 241mm'],
    choices: ['240V', 'IP20', 'JKR Project Ready']
  },
  {
    id: '15',
    name: 'LV Armoured / Non-Armoured Copper Cable',
    category: 'Cables',
    price: 480.00,
    rating: 5,
    image: 'https://picsum.photos/600/600?random=115',
    description: 'Project-grade LV cable range including PVC/SWA/PVC and XLPE/SWA/PVC for industrial and JKR applications.',
    brand: 'Mega Kabel',
    availableAt: ['hq', 'kuantan', 'balok', 'batu', 'chukai'],
    variants: ['PVC/SWA/PVC (PSP)', 'PVC/PVC (Non-Armoured)', 'XLPE/SWA/PVC (XSP)', 'XLPE/PVC'],
    sizes: ['1.5', '2.5', '4', '6', '10', '16', '25', '35', '50', '70', '95', '120', '150', '185', '240', '300', '500', '630'],
    choices: ['2 Core', '3 Core', '4 Core', 'JKR Certified Options', 'SIRIM Range']
  },
  {
    id: '16',
    name: 'SIRIM House Cable (90m/coil)',
    category: 'Cables',
    price: 168.00,
    rating: 4,
    image: 'https://picsum.photos/600/600?random=116',
    description: 'Single-core SIRIM-certified house wiring cable available in multiple colours and sizes.',
    brand: 'Cable Link',
    availableAt: ['hq', 'kuantan', 'tas', 'batu'],
    sizes: ['1.5mm', '2.5mm', '4mm', '6mm', '10mm', '16mm', '25mm'],
    colors: ['Black', 'Red', 'Green', 'Yellow', 'Blue', 'White'],
    choices: ['90m/coil', 'SIRIM Certified']
  },
  {
    id: '17',
    name: 'Flush Switch Series (Residential & Commercial)',
    category: 'Switches',
    price: 12.90,
    rating: 4,
    image: 'https://picsum.photos/600/600?random=117',
    description: 'Complete flush switch assortment for homes and projects including 1 to 5 gang options.',
    brand: 'Schneider Electric',
    availableAt: ['hq', 'kuantan', 'tas', 'balok', 'batu', 'chukai'],
    variants: ['1 Gang 1 Way', '1 Gang 2 Way', 'Intermediate', '2 Gang 1 Way', '2 Gang 2 Way', '3 Gang 1 Way', '3 Gang 2 Way', '4 Gang 1 Way', '4 Gang 2 Way', 'Bell Switch', 'Press Switch (Auto Gate)'],
    types: ['AvatarOn', 'Zencelo', 'Vivace', 'Pieno', 'Affle Plus', 'Metal Clad'],
    colors: ['White', 'Silver Satin', 'Silver Bronze', 'Dark Grey', 'Wine Gold', 'Matte Black', 'Light Wood', 'Dark Wood']
  },
  {
    id: '18',
    name: 'Socket Outlet & Data Outlet Series',
    category: 'Switches',
    price: 18.50,
    rating: 4,
    image: 'https://picsum.photos/600/600?random=118',
    description: 'Switch socket outlets with LED/USB options and telecom outlets for TV, RJ11, and RJ45.',
    brand: 'MK',
    availableAt: ['hq', 'kuantan', 'tas', 'batu', 'chukai'],
    variants: ['1 Gang Switch Socket', '1 Gang with LED', '1 Gang with 2 USB', 'International Socket', 'Twin Gang SP Socket'],
    types: ['TV Socket', 'RJ11 Telephone Socket', 'RJ45 CAT5e/CAT6 Data Socket', 'RJ11 + RJ45 Combo'],
    choices: ['Single Gang', 'Twin Gang', 'Surface Series Available']
  },
  {
    id: '19',
    name: 'ELCB / RCCB Protection Series',
    category: 'Distribution Boards',
    price: 135.00,
    rating: 5,
    image: 'https://picsum.photos/600/600?random=119',
    description: 'Earth leakage protection range with multiple pole, sensitivity, and type selections.',
    brand: 'Schneider Electric',
    availableAt: ['hq', 'kuantan', 'balok', 'batu', 'chukai'],
    sizes: ['25A', '40A', '63A', '100A'],
    types: ['2 Pole', '4 Pole', 'Type A', 'Type AC'],
    choices: ['10mA', '30mA', '100mA', '300mA Trip Sensitivity']
  },
  {
    id: '20',
    name: 'MCB / MCCB / Contactor & TOR Range',
    category: 'Distribution Boards',
    price: 49.90,
    rating: 5,
    image: 'https://picsum.photos/600/600?random=120',
    description: 'Comprehensive breaker and motor control lineup for residential to heavy-duty industrial systems.',
    brand: 'ABB',
    availableAt: ['hq', 'kuantan', 'balok', 'batu', 'chukai', 'tas'],
    variants: ['MCB 6A-63A', 'MCCB 32A-1600A', 'Contactor 9A-300A', 'Thermal Overload Relay'],
    types: ['Type B', 'Type C', '1P/2P/3P', '3P/4P'],
    choices: ['6kA', '10kA', '240V', '415V']
  },
  {
    id: '21',
    name: 'PVC Conduit & Accessories Kit',
    category: 'Cables',
    price: 5.80,
    rating: 4,
    image: 'https://picsum.photos/600/600?random=121',
    description: 'PVC accessories set including socket, saddles, reducers, inspection parts, and circular end boxes.',
    brand: 'Fighter',
    availableAt: ['hq', 'kuantan', 'tas', 'balok', 'batu', 'chukai'],
    variants: ['Socket', 'Bar Saddle', 'Clip Saddle', 'Reducer', 'Female Adapter', 'Inspection Tee', 'Inspection Elbow', 'Inspection Bend', 'Circular 1/2/3/4 Way Box'],
    colors: ['White', 'Orange', 'Black'],
    sizes: ['20mm', '22mm', '25mm', '32mm', '40mm', '50mm', '100mm', '150mm']
  },
  {
    id: '22',
    name: 'GI Conduit Pipe (MS61386 / BS4568)',
    category: 'Cables',
    price: 32.00,
    rating: 5,
    image: 'https://picsum.photos/600/600?random=122',
    description: 'Galvanized conduit pipes with SIRIM/JKR options for project and infrastructure installations.',
    brand: 'Kyodo',
    availableAt: ['hq', 'kuantan', 'balok', 'batu', 'chukai'],
    variants: ['Pipe GI', 'Pipe Colour', 'BS31 GI', 'BS31 Colour', 'MS61386 GI', 'MS61386 Colour', 'BS4568'],
    sizes: ['3/4" x 10ft', '1" x 10ft', '3/4" x 12.5ft', '1" x 12.5ft', '20mm x 10ft', '25mm x 10ft', '20mm x 12.5ft', '25mm x 12.5ft'],
    choices: ['SIRIM', 'JKR', 'GI', 'Colour Coated']
  },
  {
    id: '23',
    name: 'Water-Tight Flexible Conduit Heavy Gauge',
    category: 'Cables',
    price: 72.00,
    rating: 5,
    image: 'https://picsum.photos/600/600?random=123',
    description: 'Industrial water-resistant flexible conduit for pump rooms, outdoor panels, and harsh environments.',
    brand: 'PVC LINK',
    availableAt: ['hq', 'balok', 'chukai', 'batu'],
    variants: ['PBA206714', 'MPCFC04', 'MPCFC05', 'MPCFC06', 'MPCFC10', 'MPCFC12', 'MPCFC14', 'MPCFC20'],
    sizes: ['1/2"', '5/8"', '3/4"', '1"', '1-1/4"', '1-1/2"', '2"'],
    lengths: ['15m', '20m', '30m'],
    choices: ['IP66', 'Heavy Gauge', 'Industrial Grade']
  },
  {
    id: '24',
    name: 'Ceiling / Wall / Exhaust Fan Series',
    category: 'Fans',
    price: 188.00,
    rating: 4,
    image: 'https://picsum.photos/600/600?random=124',
    description: 'Ventilation range including AC/DC ceiling fans, wall fans, auto fans, and exhaust fan models.',
    brand: 'KDK',
    availableAt: ['hq', 'kuantan', 'tas', 'batu', 'chukai'],
    variants: ['Regulator Fan', 'AC Motor Fan', 'DC Motor Fan', 'Wall Fan', 'Auto Fan', 'Exhaust Fan'],
    sizes: ['42 inch', '44 inch', '46 inch', '48 inch', '52 inch', '56 inch', '60 inch', '70 inch', '80 inch', '6 inch', '8 inch', '10 inch', '12 inch'],
    colors: ['White', 'Grey', 'Dark Grey', 'Black', 'Brown', 'Copper Brown', 'Silver', 'Mild Gold'],
    choices: ['JKR Certified Options', '3 / 5 / 9 / 12 Speed Models']
  },
  {
    id: '25',
    name: 'Metal Trunking (MS IEC 61084 Type 1)',
    category: 'Industrial',
    price: 58.00,
    rating: 5,
    image: 'https://picsum.photos/600/600?random=125',
    description: 'Indoor epoxy powder-coated and outdoor hot-dipped galvanized trunking with full accessory ecosystem.',
    brand: 'Smart',
    availableAt: ['hq', 'kuantan', 'balok', 'batu', 'chukai'],
    sizes: ['2x2', '2x3', '2x4', '2x6', '2x8', '2x10', '2x12', '2x14', '3x3', '3x4', '3x6', '3x8', '3x10', '3x12', '4x4', '4x6', '4x8', '4x10', '4x12', '6x6', '6x8', '6x10', '6x12', '6x14', '6x16'],
    types: ['Epoxy Powder Coated (Class 1)', 'Hot Dipped Galvanized (Class 2)'],
    choices: ['18G', '15G', '14G', 'JKR Type 1']
  },
  {
    id: '26',
    name: 'Cable Tray (SuperDyma / HDG / Standard)',
    category: 'Industrial',
    price: 96.00,
    rating: 5,
    image: 'https://picsum.photos/600/600?random=126',
    description: 'Corrosion-resistant cable tray systems for indoor/outdoor routing with multiple widths and finishes.',
    brand: 'SuperDyma',
    availableAt: ['hq', 'kuantan', 'balok', 'batu', 'chukai'],
    variants: ['SuperDyma 18G', 'HDG 18G', 'Standard'],
    sizes: ['2in x 2.44m', '3in x 2.44m', '4in x 2.44m', '5in x 2.44m', '6in x 2.44m', '8in x 2.44m', '10in x 2.44m', '12in x 2.44m'],
    choices: ['Indoor & Outdoor', 'Low Maintenance', 'High Corrosion Resistance']
  }
];

const isPlaceholderImage = (image?: string): boolean => {
  if (!image) return true;
  return /picsum\.photos|via\.placeholder|dummy/i.test(image);
};

const normalizeText = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const resolvePdfImageForProduct = (product: Product): string => {
  if (!isPlaceholderImage(product.image)) {
    return product.image;
  }

  const productTokens = normalizeText(product.name)
    .split(' ')
    .filter(token => token.length > 2);

  const categoryCandidates = PDF_PAGE_PRODUCTS.filter(item => item.category === product.category && !!item.image);
  const scoredCandidates = categoryCandidates
    .map(candidate => {
      const candidateName = normalizeText(candidate.name);
      const score = productTokens.reduce((total, token) => {
        return total + (candidateName.includes(token) ? 1 : 0);
      }, 0);

      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score);

  if (scoredCandidates.length && scoredCandidates[0].score > 0) {
    return scoredCandidates[0].candidate.image;
  }

  if (categoryCandidates.length) {
    return categoryCandidates[0].image;
  }

  return product.image;
};

const CORE_PRODUCTS_WITH_RESOLVED_IMAGES: Product[] = CORE_PRODUCTS.map((product) => ({
  ...product,
  image: resolvePdfImageForProduct(product),
}));

export const PRODUCTS: Product[] = [...CORE_PRODUCTS_WITH_RESOLVED_IMAGES, ...PDF_PAGE_PRODUCTS];

// Mock Data for Auth & Dashboard
export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@focus.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=admin',
    phone: '012-3456789',
    address: 'Semambu HQ'
  },
  {
    id: 'u2',
    name: 'John Doe',
    email: 'user@gmail.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?u=john',
    phone: '019-8765432',
    address: 'No 123, Jalan Bukit, Kuantan'
  },
  {
    id: 'u3',
    name: 'Sarah Lee',
    email: 'sarah@yahoo.com',
    role: 'user',
    phone: '011-2345678',
    address: 'B-10, Taman Setia, KL'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    userId: 'u2',
    customerName: 'John Doe',
    date: '2023-10-15',
    total: 367.50,
    status: 'Delivered',
    items: [
      { productId: '1', productName: 'Panasonic LED Ceiling Light', quantity: 2, price: 189.00 },
    ]
  },
  {
    id: 'ORD-002',
    userId: 'u2',
    customerName: 'John Doe',
    date: '2023-11-02',
    total: 85.00,
    status: 'Processing',
    items: [
      { productId: '7', productName: 'Smart WiFi Circuit Breaker', quantity: 1, price: 85.00 }
    ]
  },
  {
    id: 'ORD-003',
    userId: 'u3',
    customerName: 'Sarah Lee',
    date: '2023-11-05',
    total: 1250.00,
    status: 'Pending',
    items: [
      { productId: '5', productName: 'Bosch Cordless Drill Driver', quantity: 2, price: 450.00 },
      { productId: '3', productName: 'KDK Ceiling Fan 5-Blade', quantity: 1, price: 345.00 }
    ]
  }
];