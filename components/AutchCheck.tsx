import Link from "next/link";
import { UseAuth } from "@/lib/auth";

export default function AuthCheck(props: { children: any; fallback: any }) {
  const { username } = UseAuth();
  return username
    ? props.children
    : props.fallback || <Link href="/enter">You must be signed in</Link>;
}
