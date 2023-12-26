import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('https://equitywallet-b362155a0894.herokuapp.com/orgs/content');
      setProducts(data);
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    const token = searchParams.get('t');
    localStorage.setItem('token', token);
  }, []);
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
