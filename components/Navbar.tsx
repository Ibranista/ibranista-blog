import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  const user: boolean = true;
  const username: boolean = true;
  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <Link href="/">
              <button className="btn-logo">FEED</button>
            </Link>
          </li>

          {username && (
            <>
              <li className="push-left">
                <Link href="/admin">
                  <button className="btn-blue">Write Posts</button>
                </Link>
              </li>
              <li>
                <Link href={`/${username}`}>
                  <Image src={"/user?.photoURL"} width={45} height={45} alt="user profile" />
                </Link>
              </li>
            </>
          )}

          {!username && (
            <li>
              <Link href="/enter">
                <button className="btn-blue">Log in</button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
