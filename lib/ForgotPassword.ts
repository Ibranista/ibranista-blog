import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";

export const forgotPassword = (email: any) => {
  return sendPasswordResetEmail(auth, "ibranista88@gmail.com");
};
