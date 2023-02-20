import firebase, { getApp, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
// import "firebase/firestore";
import {
  connectFirestoreEmulator,
  DocumentSnapshot,
  getFirestore,
} from "firebase/firestore";
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

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

// let app: any;
// if (!firebase) {
// so, it will not be initialized if already initialized.

// }
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9099");
if (!firestore._settingsFrozen) {
  connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
}
// connectFirestoreEmulator(firestore, "localhost", 8080);
/**
 * Convert a Firestore document to JSON
 * because the post doc has a time stamp on it
 * in order to pass them through the ss as json we need to convert it into number
 * @param {DocumentSnapshot} doc
 */

export function PostToJSON(doc: DocumentSnapshot): {
  createdAt: any;
  updatedAt: any;
} {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
