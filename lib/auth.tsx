import SignINOut from "@/auth/SignInOut";
import { auth, firestore } from "./firebase";
import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import components
import CreateUser from "./CreateUser";
import SignInWithEmail from "@/auth/SignWithEmail";
import { doc, onSnapshot } from "firebase/firestore";
export const UserContext = createContext<any>({ user: null, username: "" });
export default function Authentication() {
  let [user] = useAuthState(auth);
  const [username, setUsername] = useState<SetStateAction<any>>(null);
  const { SignInButton, SignOut } = SignINOut();

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = doc(firestore, "users", user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return {
    SignInButton,
    SignOut,
    user,
    username,
    SignInWithEmail,
    CreateUser,
  };
}

export function UserProvider({ children }: any) {
  const values = Authentication();
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export const UseAuth = () => useContext(UserContext);
