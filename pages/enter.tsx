import { UseAuth } from "@/lib/auth";
import { forgotPassword } from "@/lib/ForgotPassword";
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

        <button onClick={forgotPassword}>Forgot password</button>
      </main>
    </>
  );
}
export default EnterPage;
