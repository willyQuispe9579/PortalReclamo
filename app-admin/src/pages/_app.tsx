import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import react, { useState, useEffect } from "react";
import Template from "@/components/layout/Template";
import { pdfjs } from "react-pdf";

import "@/styles/globals.css";
import Login from "@/components/funcional/Login";
import { useUser } from "@/store/hooks";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function App({ Component, pageProps }: AppProps) {
  const [isUser, setIsUser] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user.id !== "") {
      setIsUser(true);
    }
  }, [user]);

  return isUser ? (
    <Template>
      <Component {...pageProps} />
    </Template>
  ) : (
    <Login />
  );
}
