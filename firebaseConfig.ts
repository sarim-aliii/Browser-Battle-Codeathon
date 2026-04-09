// Helper to safely check Node.js process.env without crashing the browser
const getEnv = (key: string) => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  return undefined;
};

// We use optional chaining (?.) so Node.js doesn't crash, 
// but Vite can still statically inject the variables in the browser.
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY') ?? (import.meta as any).env?.VITE_FIREBASE_API_KEY,
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN') ?? (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID') ?? (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID,
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET') ?? (import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID') ?? (import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: getEnv('VITE_FIREBASE_APP_ID') ?? (import.meta as any).env?.VITE_FIREBASE_APP_ID,
  measurementId: getEnv('VITE_FIREBASE_MEASUREMENT_ID') ?? (import.meta as any).env?.VITE_FIREBASE_MEASUREMENT_ID,
};

export default firebaseConfig;