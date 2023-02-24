import PostFeed from "@/components/PostFeed";
import PostContent from "@/components/PostContent";
import styles from "@/styles/Post.module.css";
import { getUserWithUsername } from "@/helpers/getUserWithUsername";
import { firestore, PostToJSON } from "@/lib/firebase";
import {
  collection,
  collectionGroup,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
export async function getStaticProps({
  params,
}: {
  params: { username: string; slug: string };
}): Promise<{
  props: { post: object | undefined; path: string | undefined };
  revalidate: number;
}> {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);
  // returns array of objects containing user properties
  //  { photoURL: null, displayName: 'Ibrahim', username: 'ibranista' }
  let post: object | undefined;
  let path: string | undefined;
  if (userDoc) {
    const postRef = doc(firestore, userDoc.ref.path, "posts", slug);
    //users/9yV1QOCzy6DJs5TqeLvEQ4GJf67q
    post = PostToJSON(await getDoc(postRef));
    // {
    //   uid: '9yV1QOCzy6DJs5TqeLvEQ4GJf67q',
    //   createdAt: 1676384978380,
    //   published: true,
    //   title: 'some-title',
    //   heartCount: 0,
    //   content: 'anycontent',
    //   updatedAt: 1676703028154,
    //   username: 'ibranista',
    //   slug: 'XJmRM0KTikeLy7xJvqbc'
    // }
    path = postRef.path;
    // users/9yV1QOCzy6DJs5TqeLvEQ4GJf67q/posts/XJmRM0KTikeLy7xJvqbc
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

function PostPage(props: {
  path: CollectionReference<unknown>;
  post: {
    uid: string;
    createdAt: number;
    published: boolean;
    title: string;
    heartCount: number;
    content: string;
    updatedAt: number;
    username: string;
    slug: string;
  };
}) {
  const postRef = doc(firestore, props.path);
  const [realtimePost] = useDocumentData(postRef);
  const post = realtimePost || props.post;
  return (
    <>
      {/* <PostFeed posts={[props.post]} admin={true} /> */}
      {/* <h1>Slug</h1> */}
      <main className={styles.container}>
        <section>
          <PostContent post={post} />
        </section>
        <aside className="card">
          <p>
            <strong>
              {post.heartCount || 0}
              🤍
            </strong>
          </p>
        </aside>
      </main>
    </>
  );
}

export default PostPage;
