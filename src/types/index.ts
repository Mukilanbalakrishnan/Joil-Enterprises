export interface Specification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  subcategory?: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  specifications: Specification[];
  isFeatured?: boolean;
  isOwnProduct?: boolean;
  status: 'published' | 'draft';
  createdAt: string;
  leadTime?: string;
  minOrderQuantity?: string;
  highlightTag?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  itemCount?: number;
  featured?: boolean;
}

export interface BusinessHighlight {
  id: string;
  title: string;
  description: string;
  tag: string;
}

export interface ComboItemProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image: string;
  specs?: string;
}

export interface ComboOffer {
  id: string;
  slug?: string;
  badge: string;
  title: string;
  tagline: string;
  items: string[];
  savingsNote: string;
  tier: string;
  popular?: boolean;
  image: string;
  gallery?: string[];
  totalPieces: number;
  originalPrice: number;
  discountPercentage: number;
  comboPrice: number;
  savingsAmount: number;
  estimatedRetailValue: number;
  profitMargin: string;
  description?: string;
  includedProducts: ComboItemProduct[];
  features?: string[];
}

export interface CartItem {
  id: string;
  type: 'combo' | 'product';
  referenceId: string;
  name: string;
  sku?: string;
  price: number;
  quantity: number;
  image: string;
  badge?: string;
  totalPieces?: number;
}

export interface FounderProfile {
  name: string;
  title: string;
  credentials: string;
  quote: string;
  bio: string;
  image: string;
  milestones: { label: string; value: string }[];
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
  likes?: string;
  comments?: string;
  audio?: string;
  handle?: string;
  description: string;
  specs: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  designation: string;
  project: string;
  location: string;
  avatar: string;
  rating?: number;
  category?: string;
  margin?: string;
}

export interface ContactSubmission {
  fullName: string;
  email: string;
  phone: string;
  productInterest: string;
  message: string;
}

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  isAuthenticated: boolean;
}
