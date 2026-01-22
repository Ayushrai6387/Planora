import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { generateId } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    if (!adminDb) {
      return NextResponse.json({ success: false, message: 'Server Database not configured (Demo Mode)' }, { status: 503 });
    }

    const { userId, eventId } = await request.json();

    if (!userId || !eventId) {
      return NextResponse.json({ success: false, message: 'Missing parameters' }, { status: 400 });
    }

    // Reference to documents
    const eventRef = adminDb.collection('events').doc(eventId);
    const regRef = adminDb.collection('registrations').doc(`${userId}_${eventId}`);

    // Atomic Transaction
    const result = await adminDb.runTransaction(async (t) => {
      const eventDoc = await t.get(eventRef);
      const regDoc = await t.get(regRef);

      if (!eventDoc.exists) throw "Event not found";
      if (regDoc.exists) throw "Already registered";

      const eventData = eventDoc.data();
      if (eventData?.registeredCount >= eventData?.capacity) {
        throw "Event Full";
      }

      // Perform updates
      t.update(eventRef, {
        registeredCount: (eventData?.registeredCount || 0) + 1
      });

      t.set(regRef, {
        id: generateId(),
        userId,
        eventId,
        status: 'confirmed',
        timestamp: Date.now(),
        qrCodeData: `PLANORA-${eventId}-${userId}`
      });

      return "Success";
    });

    return NextResponse.json({ success: true, message: 'Registered successfully', transactionResult: result });

  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ success: false, message: error.toString() }, { status: 500 });
  }
}
