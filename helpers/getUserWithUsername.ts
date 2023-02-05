import { firestore } from "@/lib/firebase";
import {
  collection,
  getDocs,
  limit,
  query as Query,
  where,
} from "firebase/firestore";

export async function getUserWithUsername(username: object) {
  const usersRef = collection(firestore, "users");
  const q = Query(usersRef, where("username", "==", username), limit(1));
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}

export function postToJSON(doc: any) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
