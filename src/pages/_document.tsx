import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head />
      <link href="https://fonts.googleapis.com/css2?family=TAN+Pearl&display=swap" rel="stylesheet" />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
