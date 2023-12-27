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
import type { NextPage } from "next";
import axios from 'axios';

const STORAGE_KEY = 'active_session';

function getUTCDate() {
  const date = new Date();
  const utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
    date.getUTCDate(), date.getUTCHours(),
    date.getUTCMinutes(), date.getUTCSeconds());
  return new Date(utc);
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Item: NextPage<{ products: any[] }> = ({ products }) => {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  useEffect(() => {
    if (router.query.id) {
      setProduct(products.find(({ _id }) => _id === router.query.id));
    }
  }, [router.query.id]);

  useEffect(() => {
    const storeSession = (session: any) => {
      const token = localStorage.getItem('token');
      return axios({
        url: 'https://phorevr-09ba19e6f8ae.herokuapp.com/apps/sessions',
        method: 'post',
        data: session,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    };
    
    const product = products.find(({ _id }) => _id === router.query.id);
    let session = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (session) {
      storeSession(session);
      localStorage.setItem(STORAGE_KEY, '');
    }
    session = {
      wallet: product.wallet,
      startedAt: getUTCDate().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    const exitingFunction = () => {
      session.stoppedAt = getUTCDate().toISOString();
      storeSession(session);
      localStorage.setItem(STORAGE_KEY, '');
    };

    router.events.on("routeChangeStart", exitingFunction);

    return () => {
      console.log("unmounting component...");
      router.events.off("routeChangeStart", exitingFunction);
    };
  }, []);
  const [open, setOpen] = useState<boolean>(false);
  if (product !== null) {
    return (
      <>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-5 lg:items-start lg:gap-x-8">
              <div className="aspect-w-16 aspect-h-9 col-span-3">
                <video autoplay>
                  <source src={product.link} />
                </video>
              </div>

              {/* Product info */}
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <h1
                  className="text-3xl  font-bold tracking-tight text-gray-900"
                >
                  {product?.name}
                </h1>

                <div className="mt-3">
                  <p className="pb-5 tracking-tight text-gray-900">
                    {product?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
};

export default Item;
