import React from "react";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div>
      <body class="overflow-hidden antialiased font-roboto">
        <div class="min-h-screen md:flex">
          <div class="flex items-center justify-center w-full py-10 bg-white md:w-1/2">
            <div class="max-w-md">
              <div class="text-5xl font-black text-gray-800 md:text-8xl">
                404{" "}
              </div>

              <div class="w-16 h-1 my-3 bg-primary md:my-6"></div>

              <p class="text-2xl font-light leading-normal text-gray-600 md:text-3xl">
                You are Unauthorized User{" "}
              </p>

              <Link
                class="px-4 py-2 mt-8 text-lg text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-100 focus:outline-none"
                to="/"
              >
                Go Home
              </Link>
            </div>
          </div>

          <div class="relative w-full pb-full md:flex md:pb-0 md:min-h-screen md:w-1/2">
            <div class="flex items-center w-full h-full max-w-4xl mx-auto">
              <img
                class="object-cover w-full"
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
