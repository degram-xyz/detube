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
import cn from 'classnames';

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
  const [isImage, setIsImage] = useState<any>(null);
  useEffect(() => {
    let product: any;
    if (router.query.id) {
      product = products.find(({ _id }) => _id === router.query.id);
      setProduct(product);
    }
    const checkImage = async (url: string) => {
      const img = new Image();
      img.decoding = "async";
      img.src = url;
      const loaded = new Promise((resolve, reject) => {
        img.onload = () => resolve('loaded');
        img.onerror = () => reject(Error("Image loading error"));
      });
      if (img.decode) {
        await img.decode().catch(() => setIsImage(false));
      }
      try {
        await loaded;
        setIsImage(true);
      } catch (e) {
        setIsImage(false);
      }
    };
    checkImage(product.link);
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
  if (product !== null) {
    return (
      <>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className={cn('lg:grid lg:items-start lg:gap-x-8', { 'lg:grid-cols-5': !isImage, 'lg:grid-cols-1': isImage })}>
              {
                isImage === null
                  ? <div></div>
                  : !isImage
                    ? (<div className="aspect-w-16 aspect-h-9 col-span-3">
                      <video controls>
                        <source src={product.link} />
                      </video>
                    </div>)
                    : (<div className="w-full mb-10">
                      <img src={product.link} />
                    </div>)
              }

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
