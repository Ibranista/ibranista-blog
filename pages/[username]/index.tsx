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

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    let theRef = userDoc.ref.path;
    // this is the document id of the current user
    // inside this documentId  there's a posts collection with different posts
    const postsQuery = Query(
      collection(firestore, theRef, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  }
  return {
    props: { user, posts },
  };
}

function UserProfilePage({ user, posts }: { user: string; posts: any }) {
  console.log("user: ", user);
  return (
    <>
      <main>
        <UserProfile user={user} />
        <PostFeed posts={posts} />
      </main>
    </>
  );
}

export default UserProfilePage;
