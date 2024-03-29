import Link from "next/link";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function PostContent({ post }) {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();
  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Written by
        <Link href={`/${post.username}/`}>@{post.username}</Link>
        on{createdAt.toISOString()}
      </span>
      <ReactMarkDown remarkPlugins={[remarkGfm]}>{post?.content}</ReactMarkDown>
    </div>
  );
}
