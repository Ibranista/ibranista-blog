import { UseAuth } from "@/lib/auth";
import React from "react";

function UserProfile({ user }) {
  const { photoURL, username, displayName } = user;
  return (
    <>
      <div className="box-center">
        <img src={photoURL || "/hacker.png"} className="card-img-center" />
        <p>
          <i>@{username}</i>
        </p>
        <h1>{displayName || "Anonymous User"}</h1>
      </div>
    </>
  );
}

export default UserProfile;