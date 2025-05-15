import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD5HtfrJKWYbJ-nvNfZ-pVnsv84bKlBuK4",
  authDomain: "foodstore-d02b8.firebaseapp.com",
  databaseURL:
    "https://foodstore-d02b8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "foodstore-d02b8",
  storageBucket: "foodstore-d02b8.firebasestorage.app",
  messagingSenderId: "735554363592",
  appId: "1:735554363592:web:28b63cc2d3c4500d7985fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const auth = getAuth(app);
export default app;
export { database };
