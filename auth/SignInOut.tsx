import { auth } from "@/lib/firebase";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as userSignOut,
} from "firebase/auth";
export default function SignINOut() {
  const [isClicked, setIsClicked] = useState(false);

  const SignInButton = () => {
    const signInWithGoogle = async () => {
      if (navigator.onLine) {
        try {
          const provider = new GoogleAuthProvider();
          setIsClicked(true);
          await signInWithPopup(auth, provider);
          // console.log "operation canceled" when pop up is closed
          if (auth.currentUser) {
            toast.success("successfully signed in!");
          }
        } catch (error: any) {
          setIsClicked(false);
          if (error.code === "auth/popup-closed-by-user") {
            toast.success("Operation cancelled");
          }
        }
      } else {
        toast.error("check your internet connection and try again!");
        setIsClicked(false);
      }
    };
    return (
      <button
        className="btn-google"
        onClick={signInWithGoogle}
        disabled={isClicked}
      >
        <Image src="/google.jpeg" width={40} height={35} alt="Google Logo" />
        Sign in with Google
      </button>
    );
  };
  const SignOut = () => {
    const signOut = async () => {
      try {
        setIsClicked(false);
        await userSignOut(auth);
      } catch (error: any) {
        toast.error(error);
      }
    };
    return <button onClick={signOut}>Sign Out</button>;
  };
  return { SignInButton, SignOut };
}
