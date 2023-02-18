import { getUserWithUsername } from "@/helpers/getUserWithUsername";
import { firestore, PostToJSON } from "@/lib/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import React from "react";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);
  // returns array of objects containing user properties
  let post;
  let path;
  if (userDoc) {
    const postRef = doc(firestore, userDoc.ref.path, "posts", slug);
    const post = PostToJSON(await getDoc(postRef));
    const path = postRef.path;
  }
  return {
    props: { post, path },
    revalidate: 5000, //milliseconds
  };
}

function PostPage() {
  return (
    <>
      <div>PostPage</div>
    </>
  );
}

export default PostPage;
