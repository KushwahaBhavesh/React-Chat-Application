import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnCs_x7ZXEmnCKyWTW8Xhv2ic4AazyOuU",
  authDomain: "react-webchat-e90fa.firebaseapp.com",
  projectId: "react-webchat-e90fa",
  storageBucket: "react-webchat-e90fa.appspot.com",
  messagingSenderId: "308988799361",
  appId: "1:308988799361:web:518aa8f551fd2d04d92080",
  measurementId: "G-N1KGQNMX4Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
