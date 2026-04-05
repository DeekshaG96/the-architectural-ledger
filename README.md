<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# The Architectural Ledger

Firebase-hosted employee management portal for workforce, payroll, and announcements.

## Stack

- Vite + React + TypeScript
- Firebase Authentication
- Cloud Firestore
- Firebase Hosting for the SPA
- Optional Gemini assistant in the dashboard

## Local Setup

**Prerequisites:** Node.js and a Firebase project

1. Install dependencies:
   `npm install`
2. Create [.env.local](.env.local) from [.env.example](.env.example) and set `VITE_GEMINI_API_KEY` if you want the AI assistant.
3. Confirm [firebase-config.json](firebase-config.json) points at your Firebase project.
4. Run the app:
   `npm run dev`

## Firebase Setup

1. Enable Email/Password authentication in Firebase.
2. Create a Cloud Firestore database.
3. Review [firestore.rules](firestore.rules) before opening the app to other users.
4. If you deploy to a different project, update [firebase-config.json](firebase-config.json) and [.firebaserc](.firebaserc).

## Build and Deploy

1. Build the app:
   `npm run build`
2. Install the Firebase CLI if needed:
   `npm install -g firebase-tools`
3. Log in and select your project:
   `firebase login`
4. Deploy:
   `npm run deploy`
