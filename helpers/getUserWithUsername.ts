import { firestore } from "@/lib/firebase";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  Query,
  query,
  where,
} from "firebase/firestore";

async function getUserWithUsername(username: string) {
  const usersRef = collection(firestore, "users");
  const querys: Query<DocumentData> = query(
    usersRef,
    where("username", "==", username),
    limit(1)
  );
  const userDoc = await getDocs(querys);
  return userDoc;
}

export default getUserWithUsername;
