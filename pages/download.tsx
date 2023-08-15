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
  function download(filename) {
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
        link.setAttribute('download', 'image.jpg');
        document.body.appendChild(link);
        link.click();
      })
  }
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('order'));
    localStorage.removeItem('order');
    products.forEach(product => {
      download(product.filename);
    });
  }, []);
  return (
    <>
      <h1>Downloading...</h1>
    </>
  );
};

export default Item;
