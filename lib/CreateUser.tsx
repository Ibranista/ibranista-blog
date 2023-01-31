import {
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  updateProfile
} from "firebase/auth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { actionCodeSettings } from "./authLink";
import { auth } from "./firebase";

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
      await sendSignInLinkToEmail(auth, formData.email, actionCodeSettings);
      toast.success("Email sent! Please check your email to complete sign up.");
      window.localStorage.setItem("emailForSignIn", formData.email);
      let users = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(users.user, {
        displayName: formData.displayName,
      });
      toast.success("user successfully created!");
      console.log("the created one: ", users);
    } catch (e: any) {
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

export default CreateUser;
