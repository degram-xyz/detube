/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage<any> = (props: any) => {
  const router = useRouter();
  const products: any[] = props.products;
  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const token = params.get('t');
    if (token) {
      localStorage.setItem('token', token);
    }
  }, []);
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden py-8 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="grid  mx-auto gap-y-10 gap-x-30 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {products.map((product) => (
              <div
                onClick={() => {
                  router.push(`/items/${product._id}`);
                }}
                key={product._id}
                className="group text-sm"
              >
                <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                  <img
                    src={`https://equitywallet-b362155a0894.herokuapp.com${product.logo}`}
                    alt={product.name}
                    className="h-full w-full object-contain object-center"
                  />
                </div>
                <h3 className="mt-4 font-medium text-gray-900">
                  {product.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
