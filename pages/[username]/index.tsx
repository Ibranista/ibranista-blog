import UserProfile from "@/components/UserProfile";
import React from "react";

export async function getServerSideProps({ query }) {
  const { username } = query;


  return {
    props: { user, posts },
  };
}

function UserProfilePage() {
  return (
    <>
      <main>
        <UserProfile />
      </main>
    </>
  );
}

export default UserProfilePage;
