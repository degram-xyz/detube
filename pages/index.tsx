/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const products = [
    {
      id: 1,
      price: 2,
      name: "Startup Pitch Deck Template",
      imageSrc: "https://i.ibb.co/VBjC16x/photo1691772016.jpg",
      imageAlt: "Startup Pitch Deck Template",
    },
    {
      id: 2,
      name: "Black and White Marketing Template",
      imageSrc:
        "https://i.ibb.co/w6LMBwC/photo1692103554.jpg",
      imageAlt:
        "Black and White Marketing Template",
      price: 2,
    },
    {
      id: 3,
      price: 2,
      name: "Our Company Template",
      imageSrc:
        "https://i.ibb.co/fqj84wb/photo1689679446.jpg",
      imageAlt:
        "Our Company Template",
    },
  ];
  const router = useRouter();
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden py-8 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="flex flex-col text-center w-full mb-8">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">The best slides for the best prices from the best presentaion gurus</h1>
          </div>
          <div className="grid  mx-auto gap-y-10 gap-x-30 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {products.map((product) => (
              <div
                onClick={() => {
                  router.push(`/items/${product.id}`);
                }}
                key={product.id}
                className="group text-sm"
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-contain object-center"
                  />
                </div>
                <h3 className="mt-4 font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-2 font-medium text-gray-900">
                  $ {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
