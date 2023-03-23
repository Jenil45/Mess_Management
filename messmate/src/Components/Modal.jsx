import React from "react";

function Modal({ setLoginmodal }) {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={() => setLoginmodal(false)}
      />

      <div className="flex fixed left-[35%] min-w-[30%]   transform overflow-hidden  p-9  bg-gray-100 rounded-lg   flex-col    md:mt-0 ">
        <div className="flex">
          <h2 className="grow h-14 text-gray-900 text-3xl text-center font-medium title-font mb-5">
            Add user
          </h2>
          <div class="flex-none ">
            <img
              src=""
              alt="Photo Coming ..."
              onClick={() => setLoginmodal(false)}
            />
          </div>
        </div>

        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">
            Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button className="text-white bg-indigo-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Login
        </button>
        <p className="text-xs text-gray-500 mt-3">
          Literally you probably haven't heard of them jean shorts.
        </p>
      </div>
    </div>
  );
}

export default Modal;
