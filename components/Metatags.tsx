import Head from "next/head";

export default function MetaTags({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: any;
}) {
  return (
    <Head>
      <title>{title}</title>
      {/* add some meta tags for sharing content over twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ibranista" />
      <meta name="twitter:creator" content="@ibranista" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {/* add some meta properties */}
      <meta property="og:url" content="https://ibranista.com" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={image} />
    </Head>
  );
}
