import { async } from "@firebase/util";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { Toast, toast } from "react-hot-toast";

export const SignInButton = () => {
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src="/google.jpeg" alt="Google Logo" />
      Sign in with Google
    </button>
  );
};

export const SignOut = () => {
  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error: any) {
      toast.error(error);
    }
  };
  return <button onClick={signOut}>Sign Out</button>;
};
