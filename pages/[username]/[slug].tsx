import { getUserWithUsername } from "@/helpers/getUserWithUsername";
import { firestore, PostToJSON } from "@/lib/firebase";
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React from "react";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);
  // returns array of objects containing user properties
  console.log("getStaticProps: ", userDoc);
  let post;
  let path;
  if (userDoc) {
    const postRef = doc(firestore, userDoc.ref.path, "posts", slug);
    post = PostToJSON(await getDoc(postRef));
    path = postRef.path;
  }
  return {
    props: { post, path },
    revalidate: 5000, //milliseconds
  };
}

export async function getStaticPaths() {
  const postSnapshot = await getDocs(collectionGroup(firestore, "posts"));
  const paths = postSnapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return { paths, fallback: "blocking" };
  //fall back to regular serverside rendering
}

function PostPage(props) {
  return (
    <>
      <div>PostPage</div>
    </>
  );
}

export default PostPage;
