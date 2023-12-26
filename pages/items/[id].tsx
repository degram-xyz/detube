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
    price: 2,
    orgId: "64b684f3c5129c853cb29c66",
    wallet: "Gpda5Mkjnje2J1WrPjxJDphoKPNrXA33Sf3S2K5WLnna",
    name: "Startup Pitch Deck Template",
    imageSrc: "https://i.ibb.co/VBjC16x/photo1691772016.jpg",
    imageAlt: "Startup Pitch Deck Template",
    filename: "Template 1 - Startup Pitch Deck.pptx",
  },
  {
    id: 2,
    name: "Black and White Marketing Template",
    price: 2,
    imageSrc:
      "https://i.ibb.co/LhrHHqQ/photo1692117960.jpg",
    imageAlt:
      "Black and White Marketing Template",
    orgId: "64b684f3c5129c853cb29c66",
    wallet: "Gpda5Mkjnje2J1WrPjxJDphoKPNrXA33Sf3S2K5WLnna",
    filename: "Black and White Marketing Template.pptx"
  },
  {
    id: 3,
    name: "Our Company Template",
    price: 2,
    imageSrc:
      "https://i.ibb.co/5rCMb74/photo1692117965.jpg",
    imageAlt:
      "Our Company Template",
    orgId: "64b684f3c5129c853cb29c66",
    wallet: "Gpda5Mkjnje2J1WrPjxJDphoKPNrXA33Sf3S2K5WLnna",
    filename: "Our Company Template.pptx"
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
  filename: string;
}

const Item = () => {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const prodContext = useContext(ProductContext);
  const [quantity, setQuantity] = useState<number>(1);
  useEffect(() => {
    if (router.query.id) {
      setProduct(products.find(({ _id }) => _id === router.query.id));
    }
  }, [router.query.id]);
  const [open, setOpen] = useState<boolean>(false);
  if (product !== null) {
    return (
      <>
        <Checkout products={prodContext.prod} open={open} setOpen={setOpen} />
        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-1 lg:items-start lg:gap-x-8">
              <Tab.Group as="div" className="flex flex-col-reverse">
                <Tab.Panels className="mb-10">
                  <Tab.Panel>
                    <img
                      src={product?.imageSrc}
                      alt={product?.imageAlt}
                      className="h-full w-full object-contain object-top sm:rounded-lg"
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>

              {/* Product info */}
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <h1
                  className="text-3xl  font-bold tracking-tight text-gray-900"
                >
                  {product?.name}
                </h1>

                <div className="mt-3">
                  <p className="pb-5 tracking-tight text-gray-900">
                    Solana Wallet<br/>
                    {product?.wallet}
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
