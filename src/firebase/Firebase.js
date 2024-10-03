import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyAJvntEhyFLfJHHyF_j-Hd-RtuAAxncabI",
  authDomain: "ecommerce-react-63e45.firebaseapp.com",
  projectId: "ecommerce-react-63e45",
  storageBucket: "ecommerce-react-63e45.appspot.com",
  messagingSenderId: "790146585726",
  appId: "1:790146585726:web:5c6abbe7276e961843b42f",
  measurementId: "G-KN7G23RHTM"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app); 
