export type SevaCategory =
  | 'vidya' // Education & Literacy
  | 'annapoorna' // Food & Hunger Relief
  | 'prakriti' // Environment & Green Drives
  | 'aarogya' // Healthcare & Blood Donation
  | 'jeev' // Animal Welfare
  | 'samaj' // Elder Care & Community Support
  | 'aapaatkaal'; // Emergency & Disaster Relief

export interface NGO {
  id: string;
  name: string;
  darpanId?: string;
  isVerified: boolean;
  city: string;
  rating: number;
  totalDrives: number;
  contactPerson: string;
  phone: string;
  email: string;
  logoUrl?: string;
}

export interface SevaDrive {
  id: string;
  title: string;
  ngoId: string;
  ngoName: string;
  ngoVerified: boolean;
  category: SevaCategory;
  shortDescription: string;
  fullDescription: string;
  city: string;
  locality: string;
  address: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "08:00 AM - 12:00 PM"
  durationHours: number;
  volunteersRequired: number;
  volunteersRegistered: number;
  skillsRequired: string[];
  perks: string[]; // e.g., ["Certificate of Appreciation", "Breakfast & Chai", "NSS Credit Eligible"]
  isUrgent?: boolean;
  imageUrl: string;
  contactNumber: string;
  registeredUserIds: string[]; // volunteer IDs who signed up
  createdAt: string;
}

export interface UrgentNeed {
  id: string;
  title: string;
  category: 'blood' | 'disaster' | 'food_emergency' | 'elderly_urgent';
  location: string;
  city: string;
  urgencyLevel: 'critical' | 'high' | 'moderate';
  deadline: string;
  description: string;
  contactNumber: string;
  volunteersNeeded: number;
  volunteersJoined: number;
  isResolved: boolean;
}

export interface VolunteerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  joinedDate: string;
  totalHours: number;
  drivesCompleted: number;
  skills: string[];
  badges: string[];
  enrolledDriveIds: string[];
}

export interface SevaBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  unlocked: boolean;
  dateEarned?: string;
}

export interface CommunityStory {
  id: string;
  authorName: string;
  authorRole: string;
  ngoName?: string;
  title: string;
  content: string;
  category: SevaCategory;
  city: string;
  date: string;
  imageUrl?: string;
  applauseCount: number;
  hasApplauded?: boolean;
}

export interface SurplusDonation {
  id: string;
  donorName: string;
  donorPhone: string;
  itemType: 'cooked_food' | 'packaged_ration' | 'books_study' | 'clothes' | 'medical_supplies';
  quantityDesc: string; // e.g. "50 meal packs from reception"
  city: string;
  address: string;
  bestBefore: string;
  status: 'available' | 'claimed' | 'completed';
  claimedByNGO?: string;
  createdAt: string;
}
