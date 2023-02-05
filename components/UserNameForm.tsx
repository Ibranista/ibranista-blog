import { doc, getDoc, writeBatch } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { UseAuth } from "@/lib/auth";
import UsernameMessage from "./UserNameMessage";

export default function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = UseAuth();

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
