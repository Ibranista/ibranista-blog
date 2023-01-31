import UserProfile from "@/components/UserProfile";
import getUserWithUsername from "@/helpers/getUserWithUsername";
import { firestore } from "@/lib/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React from "react";

export async function getServerSideProps({ query }: any) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // JSON Sserializable data means that the data does not contain functions or Date objects
  let user = null;
  let posts: object = {};

  if (userDoc) {
    user = userDoc.docs;
    const postsQuery = query(
      collection(firestore, "posts"),
      where("username", "==", "ibranista"),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    posts = (await getDocs(postsQuery)).docs.map  ;
  }
  return {
    props: { user, posts },
  };
}

function UserProfilePage() {
  return (
    <>
      <main>
        <UserProfile />
      </main>
    </>
  );
}

export default UserProfilePage;
