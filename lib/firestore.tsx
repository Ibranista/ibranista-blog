import { updateCurrentUser } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
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
  return (
    <div>
      <button onClick={addData}>Add Data</button>
      <button onClick={addchildData}>Add Child Data</button>
    </div>
  );
}
