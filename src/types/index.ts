export type UserRole = 'host' | 'participant' | 'guest';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  collegeId?: string; // For participants
  societyId?: string; // For hosts
}

export interface College {
  id: string;
  name: string;
  location: string;
}

export interface Society {
  id: string; // unique ID auto-generated
  collegeId: string;
  name: string;
  adminId: string; // The Host user ID
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string
  venue: string;
  collegeId: string;
  societyId: string;
  capacity: number;
  registeredCount: number;
  waitlistCount: number;
  category: 'tech' | 'cultural' | 'sports' | 'workshop' | 'other';
  imageUrl?: string;
  budget?: number;
  status: 'upcoming' | 'live' | 'ended';
}

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled' | 'attended';
  timestamp: number; // Date.now()
  qrCodeData: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
  read: boolean;
}
