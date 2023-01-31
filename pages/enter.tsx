import React, { useEffect } from "react";
import { UseAuth } from "@/lib/auth";
function EnterPage() {
  const { SignInButton, user, username, SignOut, SignInWithEmail, CreateUser } =
    UseAuth();
  console.log("user inside enter:", user);
  console.log("user naem inside enter:", username);
  useEffect(() => {
    console.log("user inside enter:", user);
    console.log("user naem inside enter:", username);
  }, [user, username]);
  return (
    <>
      <main>
        {/* {user ? !username ? <UserNameForm /> : <SignOut /> : <SignInButton />} */}
        {username ? (
          <SignOut />
        ) : (
          <>
            <SignInButton />
            <SignInWithEmail />
          </>
        )}
        <h1>Create Account</h1>
        <CreateUser />
      </main>
    </>
  );
}

export default EnterPage;
