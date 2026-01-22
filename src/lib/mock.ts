import { DEMO_EVENTS, COLLEGES } from "./constants";
import { User, Event, Registration } from "@/types";
import { generateId } from "./utils";

// In-memory store for demo session
let mockUsers: User[] = [
  { uid: 'host_1', email: 'host@gtbit.ac.in', displayName: 'Tech Society Lead', role: 'host', societyId: 'soc_gtbit_acm', collegeId: 'gtbit' },
  { uid: 'student_1', email: 'student@gtbit.ac.in', displayName: 'Rohan Sharma', role: 'participant', collegeId: 'gtbit' }
];

let mockEvents = [...DEMO_EVENTS];
let mockRegistrations: Registration[] = [];

export const MockService = {
  login: async (role: 'host' | 'participant' | 'guest'): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate latency

    if (role === 'guest') {
      return { uid: 'guest_1', email: null, displayName: 'Guest Judge', role: 'guest' };
    }
    if (role === 'host') {
      return mockUsers.find(u => u.role === 'host')!;
    }
    return mockUsers.find(u => u.role === 'participant')!;
  },

  getEvents: async (collegeId?: string): Promise<Event[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (collegeId && collegeId !== 'all') {
      return mockEvents.filter(e => e.collegeId === collegeId);
    }
    return mockEvents;
  },

  registerEvent: async (userId: string, eventId: string): Promise<{ success: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 600));

    const event = mockEvents.find(e => e.id === eventId);
    if (!event) return { success: false, message: 'Event not found' };

    const existing = mockRegistrations.find(r => r.userId === userId && r.eventId === eventId);
    if (existing) return { success: false, message: 'Already registered' };

    if (event.registeredCount >= event.capacity) {
      // Add to waitlist logic would go here
      return { success: false, message: 'Event full' };
    }

    // Atomic update simulation
    event.registeredCount++;
    mockRegistrations.push({
      id: generateId(),
      userId,
      eventId,
      status: 'confirmed',
      timestamp: Date.now(),
      qrCodeData: `PLANORA-${eventId}-${userId}`
    });

    return { success: true, message: 'Registration successful!' };
  },

  getRegistrations: async (userId: string): Promise<Registration[]> => {
    return mockRegistrations.filter(r => r.userId === userId);
  }
};
