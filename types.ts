import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
  subLabel?: string;
}

export interface FeatureItem {
  title: string;
  icon: LucideIcon;
  description?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface NewsItem {
  id?: string;
  title: string;
  date: string;
  category: string;
  image: string;
  content: string;
}

export interface UseCaseItem {
  title: string;
  icon: LucideIcon;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  phone?: string;
  address?: string;
  avatar?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  date: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface InventoryMatrixRow {
  sku?: string;
  variant?: string;
  color?: string;
  size?: string;
  length?: string;
  weight?: string;
  stock: number;
  details?: string;
}

export interface MediaAsset {
  id: string;
  filename: string;
  original_name: string;
  mime_type: string;
  size_bytes: number;
  disk: string;
  path: string;
  url: string;
  alt_text?: string;
}

export interface CmsPage {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  sections: any[];
  updated_at?: string;
}