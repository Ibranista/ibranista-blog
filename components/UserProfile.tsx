import { UseAuth } from "@/lib/auth";
import React from "react";

function UserProfile() {
  const { username, user } = UseAuth();
  return (
    <>
      <div className="box-center">
        <img src={user.photoURL || "/hacker.png"} className="card-img-center" />
        <p>
          <i>@{username}</i>
        </p>
        <h1>{username || "Anonymous User"}</h1>
      </div>
    </>
  );
}

export default UserProfile;
