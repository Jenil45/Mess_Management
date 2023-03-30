import React from "react";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div>
      <body className="overflow-hidden antialiased font-roboto">
        <div className=" md:flex">
          <div className="flex items-center justify-center w-full  bg-white md:w-1/2">
            <div className="max-w-md">
              <div className="text-5xl font-black text-gray-800 md:text-8xl">
                404{" "}
              </div>

              <div className="w-16 h-1 my-3 bg-primary md:my-6"></div>
              <div className="mb-5">
                <p className="text-2xl font-light leading-normal text-gray-600 md:text-3xl">
                  You are Unauthorized User{" "}
                </p>
              </div>

              <Link
                className="px-4 py-2 ml-24 mt-16 text-lg  text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-100 focus:outline-none"
                to="/"
              >
                Go Home
              </Link>
            </div>
          </div>

          <div className="relative w-full pb-full md:flex md:pb-0 md:min-h-[90vh] md:w-1/2">
            <div className="flex items-center w-full h-full max-w-4xl mx-auto">
              <img
                className="object-cover w-full"
                src="https://tailwindcomponents.com/svg/404-error-with-broken-robot-pana.svg"
                alt="Error"
              />
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Unauthorized;
