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
  const { username } = query;
  return {
    props: { user: "ibrahim", posts: { name: "Ibrahim" } },
  };
}

function UserProfilePage({ user, query }: { user: string }) {
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
