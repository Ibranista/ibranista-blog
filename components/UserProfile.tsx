function UserProfile({ user }: { user: any }) {
  const { photoURL, username, displayName } = user;
  return (
    <>
      <div className="box-center">
        <img src={photoURL || "/useravatar.jpeg"} className="card-img-center" />
        <p>
          <i>@{username}</i>
        </p>
        <h1>{displayName || "Anonymous User"}</h1>
      </div>
    </>
  );
}

export default UserProfile;
