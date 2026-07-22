import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAirJdEJ4PkIz0L_uJ6w9UvZLgWKmAaNZ0",
  authDomain: "pethaven-d9b75.firebaseapp.com",
  projectId: "pethaven-d9b75",
  storageBucket: "pethaven-d9b75.firebasestorage.app",
  messagingSenderId: "704954629657",
  appId: "1:704954629657:web:208141be7dbc72c477488"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;