import PostFeed from "@/components/PostFeed";
import UserProfile from "@/components/UserProfile";
import { getUserWithUsername, postToJSON } from "@/helpers/getUserWithUsername";
import { firestore } from "@/lib/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query as Query,
  where,
} from "firebase/firestore";
import React from "react";
export async function getServerSideProps({ query }: { query: any }) {
  const { username } = query;
  const userDoc = await getUserWithUsername(username);
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = Query(
      collection(firestore, "posts"),
      where("author.uid", "==", userDoc.id),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  }

  return {
    props: { user: "ibrahim", posts: { name: "Ibrahim" } },
  };
}

function UserProfilePage({ user }: { user: string }) {
  return (
    <>
      <main>
        <h1>Hello</h1>
        {user}
      </main>
    </>
  );
}

export default UserProfilePage;
