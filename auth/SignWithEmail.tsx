import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function SignInWithEmail() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const signInWithEmail = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
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
}
