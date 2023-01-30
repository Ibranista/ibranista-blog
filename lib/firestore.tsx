import { updateCurrentUser } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { firestore } from "./firebase";

// create document reference

const specialOfTheDay = doc(firestore, "specials/2021-12-22");
const child = doc(specialOfTheDay, "items/1234");

export function WriteDailySpecial() {
  interface Special {
    name: string;
    description: string;
    price: number;
  }
  const docData: Special = {
    name: "Tacos",
    description: "Tacos are delicious",
    price: 2.99,
  };
  const addData = () => {
    setDoc(specialOfTheDay, docData);
    toast.success("Data added");
  };

  const addchildData = async () => {
    const docData = {
      name: "child",
      description: "child is delicious",
      price: 2.99,
    };
    setDoc(child, docData);
    toast.success("Child Data added");
    await setDoc(specialOfTheDay, docData, { merge: true });
    // updateDoc(specialOfTheDay, docData);
  };

  const ordersCollection = collection(firestore, "orders");
  // orders/[auto-generated-id]
  async function addAddnewDocument() {
    if (navigator.onLine) {
      const newDoc = await addDoc(ordersCollection, {
        customer: "Ibranista",
        price: (100 + Math.floor(Math.random() * 400)) / 100,
      });
      toast.success(`created at ${newDoc.path} with an id of ${newDoc.id}`);
    } else {
      toast.error(`no internet connection!`);
    }
  }
  const readDoc = async () => {
    const querySnapshot = await getDocs(collection(firestore, "orders"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.exists() && JSON.stringify(doc.data())}`);
    });
  };

  async function readDocument() {
    const mySnapShot = await getDoc(specialOfTheDay);
    mySnapShot.exists() && console.log("parent document: ", mySnapShot.data());
    // read the from child document
    const childSnapShot = await getDoc(child);
    childSnapShot.exists() &&
      console.log("child document: ", childSnapShot.data());
  }

  async function updateChildDocument() {
    await updateDoc(child, {
      name: "updated child realtime",
    });
  }
  let specialUnsubscribe: () => void;
  function listenRealTime() {
    onSnapshot(child, (docSnapshot) => {
      if (docSnapshot.exists()) {
        console.log("real time data: ", docSnapshot.data());
      }
    });
  }
  listenRealTime();
  function unsubscribe() {
    specialUnsubscribe();
  }

  return (
    <div>
      <button onClick={addData}>Add Data</button>
      <button onClick={addchildData}>Add Child Data</button>
      <button onClick={addAddnewDocument}>Add New Document</button>
      <button onClick={readDocument}>Read document</button>
      <button onClick={updateChildDocument}>Update Child Document</button>
      <button onClick={readDoc}>Read Doc</button>
    </div>
  );
}
