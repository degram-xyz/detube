import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { createContext, useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Paywall from "../components/paywall";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import axios from 'axios';
import cn from 'classnames';

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
  const [address, setAddress] = useState<string | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('https://equitywallet-b362155a0894.herokuapp.com/orgs/content');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {

  });
  return (
    <>
      <Script src="/deplan-wallet.js" />
      <ChakraProvider theme={theme}>
        <ProductContext.Provider value={{ prod, setProd }}>
          {
            !address && <div className="blocker">
              <Paywall onConnect={(a: string) => setAddress(a)}></Paywall>
            </div>
          }
          <div className={cn({ 'blured': !address })}>
            <Navbar />
            <Component {...pageProps} products={products} />
          </div>
        </ProductContext.Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
