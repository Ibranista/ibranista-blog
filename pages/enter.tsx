import { UseAuth } from "@/lib/auth";
import UsernameForm from "@/components/UserNameForm";

function EnterPage() {
  const { SignInButton, user, username, SignOut, SignInWithEmail, CreateUser } =
    UseAuth();
  console.log("hey: ", user);
  return (
    <>
      <main>
        {user ? (
          !username ? (
            <UsernameForm />
          ) : (
            <SignOut />
          )
        ) : (
          <>
            <SignInButton />
            <SignInWithEmail />
            Or
            <h1>Create Account</h1>
            <CreateUser />
          </>
        )}
      </main>
    </>
  );
}
export default EnterPage;
