import React from "react";
import { Outlet } from "react-router-dom";

function Mainbar() {
  return (
    <div>
      {/* <header className="text-gray-600 body-font">
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-6 mx-auto">
            <div class="flex flex-wrap -m-4 text-center ">
              <div class="p-4 sm:w-1/4 w-1/2">
                <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                  2.7K
                </h2>
                <p class="leading-relaxed">Users</p>
              </div>
              <div class="p-4 sm:w-1/4 w-1/2">
                <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                  1.8K
                </h2>
                <p class="leading-relaxed">Subscribes</p>
              </div>
              <div class="p-4 sm:w-1/4 w-1/2">
                <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                  35
                </h2>
                <p class="leading-relaxed">Downloads</p>
              </div>
              <div class="p-4 sm:w-1/4 w-1/2">
                <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                  4
                </h2>
                <p class="leading-relaxed">Products</p>
              </div>
            </div>
          </div>
        </section>

        {/* <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900" href="/">
            First Link
          </a>
          <a className="mr-5 hover:text-gray-900" href="/">
            Second Link
          </a>
          <a className="mr-5 hover:text-gray-900" href="/">
            Third Link
          </a>
          <a className="mr-5 hover:text-gray-900" href="/">
            Fourth Link
          </a>
        </nav>
         <button className="group rounded-2xl h-10 w-40 bg-green-500 font-bold text-lg text-white relative overflow-hidden">
            Log out
            <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div>
          </button>
         </div>
      </header> */}
      <Outlet />
    </div>
  );
}

export default Mainbar;
