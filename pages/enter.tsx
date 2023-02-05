import React, { useCallback, useEffect, useState } from "react";
import { UseAuth } from "@/lib/auth";
import { forgotPassword } from "@/lib/ForgotPassword";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import { debounce } from "lodash";
function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, username } = UseAuth();

  const onChange = (e: any) => {
    const val = e.target.value.toLowerCase();
    const re = /^[a-zA-Z0-9_]+$/;

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

  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const ref = doc(firestore, "usernames", username);
        const docSnap = await getDoc(ref);
        toast.success("firestore read executed!");
        setIsValid(!docSnap.exists());

        setLoading(docSnap.exists());
      }
    }, 500),
    []
  );
  useEffect(() => {
    checkUsername(formValue);
  }, [formValue, checkUsername]);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const userDoc = doc(firestore, "users", user.uid);
    const usernameDoc = doc(firestore, "usernames", formValue);
    try {
      const batch = writeBatch(firestore);
      batch.set(userDoc, {
        username: formValue,
        photoURL: user.photoURL,
        displayName: user.displayName,
      });
      batch.set(usernameDoc, { uid: user.uid });
      await batch.commit();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  function UsernameMessage({
    username,
    isValid,
    loading,
  }: {
    username: string;
    isValid: boolean;
    loading: boolean;
  }) {
    if (loading) {
      return <p>Checking...</p>;
    } else if (isValid) {
      return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
      return <p className="text-danger">That username is taken!</p>;
    } else {
      return <p></p>;
    }
  }

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="username"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>
          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
}

function EnterPage() {
  const { SignInButton, user, username, SignOut, SignInWithEmail, CreateUser } =
    UseAuth();
  console.log("user inside enter:", user);
  console.log("user naem inside enter:", username);
  useEffect(() => {
    console.log("user inside enter:", user);
    console.log("user naem inside enter:", username);
  }, [user, username]);
  return (
    <>
      <main>
        {user ? (
          !username ? (
            <UsernameForm />
          ) : (
            <SignOut />
          )
        ) : (
          <SignInButton /> && <SignInWithEmail />
        )}

        <h1>Create Account</h1>
        <CreateUser />
        <button onClick={forgotPassword}>Forgot password</button>
      </main>
    </>
  );
}
export default EnterPage;
