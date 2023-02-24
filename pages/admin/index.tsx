import AuthCheck from "@/components/AutchCheck";
import PostFeed from "@/components/PostFeed";
import { UseAuth } from "@/lib/auth";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { kebabCase, orderBy } from "lodash";
import { toast } from "react-hot-toast";
import React from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { auth, firestore } from "@/lib/firebase";
import { updateCurrentUser } from "firebase/auth";
import {
  useCollection,
  useCollectionData,
  useDocument,
} from "react-firebase-hooks/firestore";
function AdminPostsPage(props) {
  return (
    <>
      <main>
        <AuthCheck>
          {/* <PostList /> */}
          {/* to show all posts created by user */}
          {/* <CreateNewPost /> */}
          {/* contains form to create a new post */}
        </AuthCheck>
      </main>
      <PostList />
    </>
  );
}

export default AdminPostsPage;

function PostList() {
  let postRef = collection(firestore, "users", auth.currentUser.uid, "posts");
  let q = query(postRef, orderBy("createdAt", "desc"));
  let [querySnapshot] = useCollection(q);
  // let posts = querySnapshot?.docs.map((doc) => doc.data());
  let posts = useCollectionData(q)[0];
  return (
    <>
      <h1>Manage Your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}
