import SignINOut from "@/auth/SignInOut";
import { auth } from "./firebase";
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
export const UserContext = createContext<any>({ user: null, username: "" });
export default function Authentication() {
  let [user] = useAuthState(auth);
  const [username, setUsername] = useState<SetStateAction<any>>(null);
  const { SignInButton, SignOut } = SignINOut();
  useEffect(() => {
    setTimeout(() => {
      setUsername(user?.displayName);
    }, 1000);
  }, [user, username]);

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
