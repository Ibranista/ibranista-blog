import { async } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as userSignOut,
  updateProfile,
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
import { MethodDeclaration } from "typescript";

export const UserContext = createContext<any>({ user: null, username: "" });
export default function Authentication() {
  let [user] = useAuthState(auth);
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

  const SignInWithEmail = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const signInWithEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        toast.success("signedin");
      } catch (error: any) {
        toast.error(error);
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

  function CreateUser() {
    const [formData, setFormData] = useState({
      displayName: "",
      email: "",
      password: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // createUserWithEmailAndPassword
    const createAccount = async (e: any) => {
      e.preventDefault();
      try {
        let users = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        updateProfile(users.user, {
          displayName: formData.displayName,
        });
        toast.success("user successfully created!");

        console.log("the created one: ", users);
      } catch (e) {
        toast.error(e.message);
      }
    };
    return (
      <>
        <form action="">
          <label htmlFor="displayName">
            Display Name (this will be your username):
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
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
          <button type="submit" onClick={createAccount}>
            Create Account
          </button>
        </form>
      </>
    );
  }

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
