import React from "react";
import { UseAuth } from "@/lib/auth";
function EnterPage() {
  const { SignInButton, user, username, SignOut } = UseAuth();
  console.log("user inside enter:", user);
  console.log("user naem inside enter:", username)
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
