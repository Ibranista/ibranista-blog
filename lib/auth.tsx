import { async } from "@firebase/util";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as userSignOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { Toast, toast } from "react-hot-toast";
import { createContext, useContext, useState } from "react";

export const UserContext = createContext<any>({ user: null, username: null });
export default function Authentication() {
  const [user, setUser] = useState<object | null>({});
  const [username, setUsername] = useState<string | null>("");
  const SignInButton = () => {
    const signInWithGoogle = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);
        console.log("returned:", user.user);
        let userName = user.user?.displayName;
        setUsername(userName);
        !userName && toast.error("No username found");
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

  const SignOut = () => {
    const signOut = async () => {
      try {
        await userSignOut(auth).then(() => {
          setUser(null);
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
  };
}

export function UserProvider({ children }: any) {
  const values = Authentication();
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export const UseAuth = () => useContext(UserContext);
