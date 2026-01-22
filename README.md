# Planora - Event Management Platform

## Overview
Planora is a multi-college event management system built with Next.js 14, Firebase, and Tailwind CSS.

## Features
- **Role-Based Access**: Host, Participant, Guest.
- **College Isolation**: Events are scoped to colleges (GTBIT, MAIT, etc.).
- **Smart Registration**: Atomic transactions prevent overbooking.
- **Analytics**: Visualization of attendance and budget.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000).

## Environment Variables
Create a `.env.local` file for real Firebase connection (Optional for Demo):
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
```
*If these are missing, the app automatically switches to **Mock/Demo Mode**.*
