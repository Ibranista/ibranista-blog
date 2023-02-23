import AuthCheck from "@/components/AutchCheck";
import React from "react";
function AdminPostsPage(props) {
  return (
    <>
      <main>
        <AuthCheck></AuthCheck>
      </main>
    </>
  );
}

export default AdminPostsPage;
