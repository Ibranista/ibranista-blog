import { async } from "@firebase/util";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as userSignOut,
} from "firebase/auth";
import { auth, firestore } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Toast, toast } from "react-hot-toast";
import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { WriteDailySpecial } from "./firestore";
export const UserContext = createContext<any>({ user: null, username: "" });
export default function Authentication() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState<SetStateAction<any>>(null);
  const [isClicked, setIsClicked] = useState(false);
  console.log("the user: ", user?.displayName);
  useEffect(() => {
    setUsername(user?.displayName);
  }, [user, username]);
  const SignInButton = () => {
    const signInWithGoogle = async () => {
      if (navigator.onLine) {
        try {
          const provider = new GoogleAuthProvider();
          setIsClicked(true);
          await signInWithPopup(auth, provider);
        } catch (error: any) {
          toast.error(error);
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
        await userSignOut(auth).then(() => {
          setUsername(null);
        });
      } catch (error: any) {
        toast.error(error);
      }
    };
    return <button onClick={signOut}>Sign Out</button>;
  };

  return {
    SignInButton,
    SignOut,
    user,
    username,
    WriteDailySpecial,
  };
}

export function UserProvider({ children }: any) {
  const values = Authentication();
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export const UseAuth = () => useContext(UserContext);
