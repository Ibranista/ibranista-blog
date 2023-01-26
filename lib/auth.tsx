import { async } from "@firebase/util";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { Toast, toast } from "react-hot-toast";
export default function SignInButton() {
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
}
