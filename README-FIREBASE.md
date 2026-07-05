# Firebase setup

1. Create a Firebase project in the Firebase console and enable the features you need (Auth, Firestore, Storage, etc.).
2. Add the following environment variables to a `.env.local` file at the project root (Vite exposes env vars prefixed with `VITE_`):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

3. Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

4. Example usage: see the Firebase example page at `src/pages/FirebaseExample.tsx` which demonstrates Google Sign-In and basic Firestore reads/writes.

Optional: to run Firestore/Auth emulators locally, follow Firebase CLI emulator docs and use the included `firebase.json` and `.firebaserc`.

Quick emulator steps:

```bash
# install dependencies (firebase-tools added as a dev dependency)
npm install

# start emulators
npm run emulators
```

When running emulators, point your Vite env vars to the emulator endpoints or call the SDK emulator APIs in development. Example for Firestore in code:

```ts
// Only use in development when emulators are running
if (import.meta.env.DEV) {
	import("firebase/firestore").then(({ connectFirestoreEmulator }) => {
		connectFirestoreEmulator(db, '127.0.0.1', 8080);
	});
	import("firebase/auth").then(({ connectAuthEmulator }) => {
		connectAuthEmulator(auth, 'http://127.0.0.1:9099');
	});
}
```

