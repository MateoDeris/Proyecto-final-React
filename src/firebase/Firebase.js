// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Importa Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJvntEhyFLfJHHyF_j-Hd-RtuAAxncabI",
  authDomain: "ecommerce-react-63e45.firebaseapp.com",
  projectId: "ecommerce-react-63e45",
  storageBucket: "ecommerce-react-63e45.appspot.com",
  messagingSenderId: "790146585726",
  appId: "1:790146585726:web:5c6abbe7276e961843b42f",
  measurementId: "G-KN7G23RHTM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app); // Exporta la instancia de Firestore
