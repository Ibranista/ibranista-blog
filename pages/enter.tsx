import React from "react";
import { UseAuth } from "@/lib/auth";
function EnterPage() {
  const { SignInButton, user, username, SignOut } = UseAuth();
  console.log("user:", user);
  return (
    <>
      <main>
        {/* {user ? !username ? <UserNameForm /> : <SignOut /> : <SignInButton />} */}
        {username ? <SignOut /> : <SignInButton />}
      </main>
    </>
  );
}

export default EnterPage;
