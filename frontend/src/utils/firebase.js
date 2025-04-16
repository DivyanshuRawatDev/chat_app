// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'auth-a73ed.firebaseapp.com',
  projectId: 'auth-a73ed',
  storageBucket: 'auth-a73ed.firebasestorage.app',
  messagingSenderId: '360795016536',
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: 'G-F773C3FTJW',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const idToken = await user.getIdToken();
    console.log(user);
    return idToken;
  } catch (error) {
    console.log(error);
  }
};
