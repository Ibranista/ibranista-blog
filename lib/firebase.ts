import firebase, { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyACAB8L2OEo3U6qEIKaD1ioC9k-fPZzD2g",
  authDomain: "ibranista-blog.firebaseapp.com",
  projectId: "ibranista-blog",
  storageBucket: "ibranista-blog.appspot.com",
  messagingSenderId: "282092037222",
  appId: "1:282092037222:web:7f4650366f24bee8abf9a7",
  measurementId: "G-BLEGVJHX9D",
};

if (!firebase.getApps.length) {
  const app = initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const firestore = getFirestore();
export const storage = getStorage();
