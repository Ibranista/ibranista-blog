import React, { useCallback, useEffect, useState } from "react";
import { UseAuth } from "@/lib/auth";
import { forgotPassword } from "@/lib/ForgotPassword";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { toast } from "react-hot-toast";
function EnterPage() {
  const { SignInButton, user, username, SignOut, SignInWithEmail, CreateUser } =
    UseAuth();
  console.log("user inside enter:", user);
  console.log("user naem inside enter:", username);
  useEffect(() => {
    console.log("user inside enter:", user);
    console.log("user naem inside enter:", username);
  }, [user, username]);
  function UserNameForm() {
    const [formValue, setFormValue] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const { username, user } = UseAuth();

    useEffect(() => {
      checkUsername(formValue);
    }, [formValue]);

    const onChange = (e) => {
      const val = e.target.value.toLowerCase();
      const re = /^[a-zA-Z0-9]+$/;

      if (val.length < 3) {
        setFormValue(val);
        setIsValid(false);
        setLoading(false);
      }
      if (re.test(val)) {
        setFormValue(val);
        setLoading(true);
        setIsValid(false);
      }
    };
    // return (
    //   !username && (
    //     <section>
    //       <h3>Choose Username</h3>
    //       <form onSubmit={onSubmit}>
    //         <input
    //           name="username"
    //           placeholder="username"
    //           value={formValue}
    //           onChange={onChange}
    //         />
    //         <button type="submit" className="btn-green" disabled={!isValid}>
    //           Choose
    //         </button>

    //         <h3>Debug State</h3>
    //         <div>
    //           username:{formValue} <br />
    //           Loading: {loading.toString()}
    //           <br />
    //           Username Valid: {isValid.toString()}
    //         </div>
    //       </form>
    //     </section>
    //   )
    // );
  }
  const checkUsername = useCallback (debounce(async(username:string) => {
    if (username.length >= 3) {
      const ref = doc(firestore,`usernames/${username}`);
      const { exists } = await getDoc(ref);
      toast.success('firestore read executed!')
      setIsValid(!exists);
    }
  return (
    <>
      <main>
        {/* {user ? !username ? <UserNameForm /> : <SignOut /> : <SignInButton />} */}
        {username ? (
          <SignOut />
        ) : (
          <>
            <SignInButton />
            <SignInWithEmail />
          </>
        )}
        <h1>Create Account</h1>
        <CreateUser />
        <button onClick={forgotPassword}>Forgot password</button>
      </main>
    </>
  );
},500),[])

export default EnterPage;