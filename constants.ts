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
import { FeatureItem, NavItem, StatItem, ServiceItem, NewsItem, UseCaseItem, User, Order } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'News', href: '#news' },
];

export const STATS: StatItem[] = [
  { value: '20+', label: 'Authorized Brands' },
  { value: '10,000+', label: 'Products Available' },
  { value: '99%', label: 'Order Accuracy' },
  { value: 'Fast', label: 'Local Delivery' },
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
  "Panasonic", "KDK", "Schneider Electric", "Legrand", "Bosch", "SJ Lite", "Hitachi", "Philips", "Hager", "ABB"
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
  { title: 'Logistics Coordination', description: 'Scheduled delivery to keep your workflow uninterrupted.' },
  { title: 'After-sales Support', description: 'Dedicated technical assistance and warranty handling.' },
  { title: 'Special Sourcing', description: 'Finding rare or specific stock requirements for unique jobs.' },
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
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Panasonic LED Ceiling Light',
    category: 'Lighting',
    price: 189.00,
    originalPrice: 220.00,
    rating: 5,
    image: 'https://picsum.photos/600/600?random=101',
    description: 'Energy-saving LED ceiling light with adjustable brightness and color temperature. Perfect for living rooms and bedrooms.',
    isSale: true,
    brand: 'Panasonic',
    availableAt: ['hq', 'kuantan', 'tas']
  },
  {
    id: '2',
    name: 'Schneider Electric Vivace Switch',
    category: 'Switches',
    price: 18.50,
    rating: 4,
    image: 'https://picsum.photos/600/600?random=102',
    description: 'Modern minimalistic design switch socket. Durable polycarbonate material with high-quality finish.',
    isNew: true,
    brand: 'Schneider Electric',
    availableAt: ['hq', 'batu', 'chukai']
  },
  {
    id: '3',
    name: 'KDK Ceiling Fan 5-Blade',
    category: 'Fans',
    price: 345.00,
    originalPrice: 380.00,
    rating: 5,
    image: 'https://picsum.photos/600/600?random=103',
    description: 'High-performance 5-blade ceiling fan with remote control. Silent operation and energy efficient.',
    isSale: true,
    brand: 'KDK',
    availableAt: ['hq', 'balok', 'tas', 'batu']
  },
  {
    id: '4',
    name: 'Industrial Cable Reel 50m',
    category: 'Cables',
    price: 120.00,
    rating: 4,
    image: 'https://picsum.photos/600/600?random=104',
    description: 'Heavy-duty cable reel extension with thermal cut-out protection. Suitable for construction sites.',
    brand: 'Hager',
    availableAt: ['hq', 'chukai']
  },
  {
    id: '5',
    name: 'Bosch Cordless Drill Driver',
    category: 'Tools',
    price: 450.00,
    rating: 5,
    image: 'https://picsum.photos/600/600?random=105',
    description: 'Professional grade cordless drill. Compact design with powerful torque for drilling and screwdriving.',
    isNew: true,
    brand: 'Bosch',
    availableAt: ['hq', 'kuantan', 'batu', 'chukai', 'tas', 'balok']
  },
  {
    id: '6',
    name: 'Legrand Mallia Socket',
    category: 'Switches',
    price: 22.00,
    rating: 4,
    image: 'https://picsum.photos/600/600?random=106',
    description: 'Elegant socket outlet with child safety protection. Available in multiple colors to match interior.',
    brand: 'Legrand',
    availableAt: ['hq', 'kuantan']
  },
  {
    id: '7',
    name: 'Smart WiFi Circuit Breaker',
    category: 'Smart Home',
    price: 85.00,
    originalPrice: 110.00,
    rating: 3,
    image: 'https://picsum.photos/600/600?random=107',
    description: 'Control your home circuits remotely via smartphone app. Compatible with Google Home and Alexa.',
    isSale: true,
    brand: 'SJ Lite',
    availableAt: ['hq', 'batu']
  },
  {
    id: '8',
    name: 'Philips Downlight 12W',
    category: 'Lighting',
    price: 25.00,
    rating: 4,
    image: 'https://picsum.photos/600/600?random=108',
    description: 'Recessed LED downlight offering bright, even illumination. Long lifespan and low power consumption.',
    brand: 'Philips',
    availableAt: ['hq', 'kuantan', 'tas', 'balok', 'batu', 'chukai']
  },
  {
    id: '9',
    name: 'Hager Distribution Box 12-Way',
    category: 'Distribution Boards',
    price: 95.00,
    rating: 5,
    image: 'https://picsum.photos/600/600?random=109',
    description: 'Robust surface mounted distribution box. Fire-retardant material with ample space for wiring.',
    brand: 'Hager',
    availableAt: ['hq', 'chukai', 'batu']
  },
   {
    id: '10',
    name: 'Safety Vest High Vis',
    category: 'Industrial',
    price: 15.00,
    rating: 4,
    image: 'https://picsum.photos/600/600?random=110',
    description: 'Industrial grade high visibility safety vest with reflective strips. Essential for site safety.',
    brand: 'Bosch',
    availableAt: ['hq', 'balok']
  }
];

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