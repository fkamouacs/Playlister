import "@/styles/globals.css";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  if (router.asPath == "/login" || router.asPath == "/signup") {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
