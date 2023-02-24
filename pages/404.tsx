import Link from "next/link";
import Head from "next/head";
export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <main>
        <Link href={"/"}>
          <button className="btn-blue">Go back to homepage</button>
        </Link>
        <iframe
          src="https://miro.medium.com/max/1400/1*zBFBJktPD3_z0S_35kO5Hg.gif"
          //   add width and height of full screen
          width={"900vw"}
          height={"600vh"}
          allowFullScreen
          frameborder="0"
        ></iframe>
      </main>
    </>
  );
}
