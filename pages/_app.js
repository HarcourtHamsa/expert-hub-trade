import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../context/auth";
import Loading from "../components/Loading";

import * as emailjs from '@emailjs/browser'


function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  emailjs.init('user_UY5jAYAIQkC14wSid54aB')

  useEffect(() => {
    const handleStart = (url) => setLoading(true);
    const handleComplete = (url) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  });
  return (
    <AuthProvider>
      <ChakraProvider>
        {loading ? <Loading loading={loading} /> : <Component {...pageProps} />}
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
