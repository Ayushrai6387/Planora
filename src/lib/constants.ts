import { College, Event } from "@/types";

export const COLLEGES: College[] = [
  { id: 'gtbit', name: 'GTBIT (Guru Tegh Bahadur Institute of Technology)', location: 'Rajouri Garden, Delhi' },
  { id: 'mait', name: 'MAIT (Maharaja Agrasen Institute of Technology)', location: 'Rohini, Delhi' },
  { id: 'msit', name: 'MSIT (Maharaja Surajmal Institute of Technology)', location: 'Janakpuri, Delhi' },
  { id: 'vips', name: 'VIPS (Vivekananda Institute of Professional Studies)', location: 'Pitampura, Delhi' },
  { id: 'adgips', name: 'ADGIPS (Dr. Akhilesh Das Gupta Institute)', location: 'Shastri Park, Delhi' },
  { id: 'other', name: 'Other / External', location: 'Various' }
];

export const DEMO_EVENTS: Event[] = [
  {
    id: 'evt_1',
    title: 'HackPlora 2024',
    description: 'The ultimate 24-hour hackathon for creative minds. Build, pitch, and win big prizes!',
    date: '2024-11-15T09:00:00Z',
    venue: 'Auditorium, GTBIT',
    collegeId: 'gtbit',
    societyId: 'soc_gtbit_acm',
    capacity: 200,
    registeredCount: 185,
    waitlistCount: 12,
    category: 'tech',
    status: 'upcoming',
    budget: 50000,
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80'
  },
  {
    id: 'evt_2',
    title: 'Cultural Fest: Anugoonj Prelims',
    description: 'Dance, music, and drama. Show your talent in the biggest cultural fest qualification round.',
    date: '2024-11-20T10:00:00Z',
    venue: 'Main Ground, GTBIT',
    collegeId: 'gtbit',
    societyId: 'soc_gtbit_cultural',
    capacity: 500,
    registeredCount: 450,
    waitlistCount: 0,
    category: 'cultural',
    status: 'upcoming',
    budget: 120000,
    imageUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80'
  },
  {
    id: 'evt_3',
    title: 'TechTalks: AI in 2025',
    description: 'Expert session on Generative AI and the future of software engineering.',
    date: '2024-11-10T14:00:00Z',
    venue: 'Seminar Hall, MAIT',
    collegeId: 'mait',
    societyId: 'soc_mait_tech',
    capacity: 100,
    registeredCount: 98,
    waitlistCount: 5,
    category: 'workshop',
    status: 'upcoming',
    budget: 5000,
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80'
  }
];
