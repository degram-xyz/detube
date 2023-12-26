/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const products = [
    {
      _id: "647f563ca86ed102ac99509f",
      username: "apvc",
      name: "ap vc",
      logo: "/orgs/logo/06779c07-8796-402d-8966-6215fca22baa.jpg",
      wallet: "7oRuj8919tUbcncq2P2qdstKXdkDngnEDd6dDYYw7P8d",
      link: "https://fspvvh45uoiwjr3bs6akyw3kff7hj5m2pb452pzzainsxkrbp4sa.arweave.net/LJ9an52jkWTHYZeArFtqKX509Zp4ed0_OQIbK6ohfyQ",
      description: "Description",
    },
  ];
  const router = useRouter();
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden py-8 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="grid  mx-auto gap-y-10 gap-x-30 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {products.map((product) => (
              <div
                onClick={() => {
                  router.push(`/items/${product.id}`);
                }}
                key={product.id}
                className="group text-sm"
              >
                <div className="aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
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
