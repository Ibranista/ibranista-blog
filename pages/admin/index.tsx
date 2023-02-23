import AuthCheck from "@/components/AutchCheck";
import React from "react";
function AdminPostsPage(props) {
  return (
    <>
      <main>
        <AuthCheck>
          <h1>Hello mate Welcome</h1>
        </AuthCheck>
      </main>
    </>
  );
}

export default AdminPostsPage;
