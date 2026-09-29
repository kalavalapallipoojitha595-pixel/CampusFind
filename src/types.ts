export type ItemType = 'lost' | 'found';

export type ItemCategory =
  | 'Electronics'
  | 'ID & Cards'
  | 'Bags & Backpacks'
  | 'Keys'
  | 'Books & Notes'
  | 'Clothing & Accessories'
  | 'Personal Essentials'
  | 'Other';

export interface CampusItem {
  id: string;
  type: ItemType;
  title: string;
  category: ItemCategory;
  location: string;
  date: string; // YYYY-MM-DD
  description: string;
  imageUrl?: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  status: 'active' | 'resolved'; // 'active' or 'resolved' (reunited)
  createdAt: string;
}

export type PageView = 'home' | 'lost' | 'found' | 'report' | 'search' | 'how-it-works';
