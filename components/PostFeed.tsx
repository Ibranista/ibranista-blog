import Link from "next/link";
import React from "react";

export default function PostFeed({
  posts,
  admin,
}: {
  posts: Array<object>;
  admin: boolean;
}) {
  console.log("hello posts: ", posts);
  return posts ? (
    posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />)
  ) : (
    <h1>no posts yet!</h1>
  );
}

function PostItem({ post, admin = false }) {
  const wordCount = (post?.content || "").trim().split(/\s+/g).length;
  console.log("word count: ", wordCount);
  const minutesToRead = Math.ceil(wordCount / 100);
  return (
    <div className="card">
      <Link href={`/${post.username}`}>
        <strong>By @{post.username}</strong>
      </Link>
      <Link href={`/${post.username}/${post.slug}`}>
        <h2>{post.title}</h2>
      </Link>
      <p>{post.content}</p>
      <footer>
        <span>
          {wordCount} words. {minutesToRead} {wordCount > 150 ? "min" : "sec"}{" "}
          read
        </span>
        <span>❤️ {post.heartCount || 0} Hearts</span>
      </footer>
    </div>
  );
}
