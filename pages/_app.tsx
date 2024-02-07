import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { createContext, useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import axios from 'axios';

export const ProductContext = createContext<any>(null);

const theme = extendTheme({
  colors: {
    brand: {
      500: "#4F46E5",
    }
  }
});


function MyApp({ Component, pageProps }: AppProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [prod, setProd] = useState<any[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('https://equitywallet-b362155a0894.herokuapp.com/orgs/content');
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <ChakraProvider theme={theme}>
        <ProductContext.Provider value={{ prod, setProd }}>
          <Navbar />
          <Component {...pageProps} products={products} />
          <Script>
            { 'window.appName = "DeGram";' }
          </Script>
          <Script src="/deplan_signup.js" />
        </ProductContext.Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
