/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from 'axios';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Item = () => {
  const router = useRouter();
  function download(filename: string) {
    axios({
      url: filename,
      method: 'GET',
      responseType: 'blob'
    })
      .then((response) => {
        const url = window.URL
          .createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      })
  }
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('order') as string);
    localStorage.removeItem('order');
    products.forEach((product: any) => {
      download(product.filename);
    });
  }, []);
  return (
    <>
      <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 text-center mt-6">Downloading...</h1>
    </>
  );
};

export default Item;
