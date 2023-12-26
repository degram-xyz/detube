import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";
import Navbar from "../components/navbar";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

export const ProductContext = createContext<any>(null);

const theme = extendTheme({
  colors: {
    brand: {
      500: "#4F46E5",
    }
  }
});


function MyApp({ Component, pageProps }: AppProps) {
  const products = [
    {
      _id: "647f563ca86ed102ac99509f",
      username: "apvc",
      name: "ap vc",
      logo: "/orgs/logo/06779c07-8796-402d-8966-6215fca22baa.jpg",
      wallet: "7oRuj8919tUbcncq2P2qdstKXdkDngnEDd6dDYYw7P8d",
      link: "https://fspvvh45uoiwjr3bs6akyw3kff7hj5m2pb452pzzainsxkrbp4sa.arweave.net/LJ9an52jkWTHYZeArFtqKX509Zp4ed0_OQIbK6ohfyQ",
      description: "Description",
    },
  ];
  const [prod, setProd] = useState<any[]>([]);
  return (
    <>
      <ChakraProvider theme={theme}>
        <ProductContext.Provider value={{ prod, setProd }}>
          <Navbar />
          <Component {...pageProps} products={products} />
        </ProductContext.Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
