import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5p3muQJBQfpj2AsUaMnDJIY1IQ3ry7js",
  authDomain: "video-7abfa.firebaseapp.com",
  projectId: "video-7abfa",
  storageBucket: "video-7abfa.appspot.com",
  messagingSenderId: "191058226074",
  appId: "1:191058226074:web:7d05472e6b1133a2c86823",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
