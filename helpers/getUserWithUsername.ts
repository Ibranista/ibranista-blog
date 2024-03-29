import { firestore } from "@/lib/firebase";
import {
  collection,
  getDocs,
  limit,
  query as Query,
  where,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

export async function getUserWithUsername(username: string) {
  const usersRef = collection(firestore, "users");
  const q = Query(usersRef, where("username", "==", username), limit(1));
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}

export function postToJSON(doc: any) {
  let data = doc.data();
  const createdAt = data.createdAt.toMillis();
  const updatedAt = data.updatedAt.toMillis();
  return {
    ...data,
    createdAt,
    updatedAt,
  };
}
