/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { Disclosure, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
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
import { Checkout } from "../../components/checkout";
import { ProductContext } from "../_app";
const products = [
  {
    id: 1,
    price: 10,
    orgId: "64b684f3c5129c853cb29c66",
    wallet: "Gpda5Mkjnje2J1WrPjxJDphoKPNrXA33Sf3S2K5WLnna",
    name: "Digit Pack",
    imageSrc: "https://i.ibb.co/vqcdMj9/photo1689679418.jpg",
    imageAlt: "Digit Pack",
  },
  {
    id: 2,
    name: "SEO & Digital Marketing",
    price: 10,
    imageSrc:
      "https://i.ibb.co/3hf8fgH/photo1689679432.jpg",
    imageAlt:
      "SEO & Digital Marketing",
    orgId: "64b684f3c5129c853cb29c66",
    wallet: "Gpda5Mkjnje2J1WrPjxJDphoKPNrXA33Sf3S2K5WLnna",
  },
  {
    id: 3,
    name: "Digital Marketing",
    price: 10,
    imageSrc:
      "https://i.ibb.co/fqj84wb/photo1689679446.jpg",
    imageAlt:
      "Digital Marketing",
    orgId: "64b684f3c5129c853cb29c66",
    wallet: "Gpda5Mkjnje2J1WrPjxJDphoKPNrXA33Sf3S2K5WLnna",
  },
];
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
interface Product {
  id: number;
  name: string;
  href: string;
  price: number;
  quantity: number;
  image: string;
  imageAlt: string;
  wallet: string;
  orgId: string;
}

const Item = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.query.id) {
      const product = products[parseInt(router.query.id as string) - 1];
      window.location.href = product.imageSrc;
    }
  }, [router.query.id]);
  return (
    <>
      <h1>Downloading...</h1>
    </>
  );
};

export default Item;
