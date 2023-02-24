import React, { useState } from "react";
import MetaTags from "@/components/Metatags";
import AuthCheck from "@/components/AutchCheck";
import {
  useDocumentData,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { collection } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import styles from "@/styles/Admin.module.css";
function AdminPostEdit() {
  return (
    <>
      <main>
        <MetaTags title="Edit Page" description="edit page" image={undefined} />
        <AuthCheck>
          <h1>You&apos;re signed in mate!</h1>
          <PostManager />
        </AuthCheck>
      </main>
    </>
  );
}

export default AdminPostEdit;

// fetch document from firestore
// it'll also will delete the document
function PostManager() {
  const [preview, setPreview] = useState(false);
  let router = useRouter();
  let { slug } = router.query;

  let postRef = collection("users", auth.currentUser?.uid, "posts", slug);
  let [post] = useDocumentDataOnce(postRef);
  // this will fetch the document once
  return (
    <>
      <main className={styles.container}>
        {post && (
          <>
            <section>
              <h1>{post.title}</h1>
              <p>ID: {post.slug}</p>
              <PostForm
                postRef={postRef}
                defaultValues={post}
                preview={preview}
              />
            </section>
          </>
        )}
      </main>
    </>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const {} = useForm({ defaultValues, mode: "onChange" });
}
