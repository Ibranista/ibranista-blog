import { async } from "@firebase/util";
import SignINOut from "@/auth/SignInOut";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as userSignOut,
} from "firebase/auth";
import { auth } from "./firebase";
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
// import components
import CreateUser from "./CreateUser";
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

  const SignInWithEmail = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const signInWithEmail = async (e: any) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        toast.success("signedin");
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
      <>
        <h1>Sign In With Email & Password</h1>
        <form action="">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <br />
          <button type="submit" onClick={signInWithEmail}>
            Sign In
          </button>
        </form>
      </>
    );
  };

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
