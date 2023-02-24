import AuthCheck from "@/components/AutchCheck";
import PostFeed from "@/components/PostFeed";
import { UseAuth } from "@/lib/auth";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { kebabCase, orderBy } from "lodash";
import { toast } from "react-hot-toast";
import styles from "@/styles/Admin.module.css";
import React from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, firestore } from "@/lib/firebase";
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
          <PostList />
          {/* to show all posts created by user */}
          <CreateNewPost />
          {/* contains form to create a new post */}
        </AuthCheck>
      </main>
    </>
  );
}

export default AdminPostsPage;

function PostList() {
  let postRef = collection(firestore, "users", auth.currentUser.uid, "posts");
  let q = query(postRef, orderBy("createdAt", "desc"));
  let [querySnapshot] = useCollection(q);
  let title = "My Posts";
  let slug = encodeURI(kebabCase(title));
  console.log(slug);
  // let posts = querySnapshot?.docs.map((doc) => doc.data());
  let posts = useCollectionData(q)[0];
  return (
    <>
      <h1>Manage Your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = UseAuth();
  const [title, setTitle] = useState("");
  //the value user is typing into the form
  const slug = encodeURI(kebabCase(title));
  // validate length
  const isValid = title.length > 3 && title.length < 50;
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const postCollectionRef = collection(firestore, "users", uid, "posts");
    interface dataType {
      title: string;
      slug: string;
      uid: string;
      username: string;
      published: boolean;
      content: string;
      createdAt: any;
      updatedAt: any;
      heartCount: number;
    }
    const data: dataType = {
      title,
      slug,
      uid,
      username,
      published: true,
      content: "# hello world",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };
    await addDoc(postCollectionRef, data);
    toast.success("Post created!");
    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };
  return (
    <>
      <form onSubmit={createPost}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your Article Title Goes Here!"
          disabled={title.length > 50}
          className={styles.input}
        />
        <p>
          <strong>Slug:</strong> {slug}
        </p>
        <button type="submit" disabled={!isValid} className="btn-green">
          Create New Post
        </button>
      </form>
    </>
  );
}
