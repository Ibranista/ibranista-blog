import PostFeed from "@/components/PostFeed";
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
  console.log("server side");
  return {
    props: { user: "ibrahim", posts: { name: "Ibrahim" } },
  };
}

function UserProfilePage({ user, posts }) {
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
