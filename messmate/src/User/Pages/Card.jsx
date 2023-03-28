import React from "react";

const Card = ({ name, menu, time }) => {
  return (
    <div className="p-4 xl:w-1/4 md:w-1/2 min-w-[33%] min-h-[50vh]">
      <div className="h-full p-6 rounded-lg border-2 border-red-500 flex flex-col relative  overflow-hidden">
        <div className="flex-[2]">
          <span className="bg-red-500 text-white text-center w-[11rem] text-[0.85rem] h-[2rem] px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
            {time}
          </span>
          {/* <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
            {name}
          </h2> */}
          <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
            <span className="text-lg ml-1 font-normal text-gray-500">
              {name}
            </span>
          </h1>
        </div>
        <ul className="flex-[8]">
          {menu.map((item) => {
            return <li>{item}</li>;
          })}
        </ul>
        <p className="text-xs flex-[1] text-gray-500 mt-[1.4rem]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis facilis
          quam aliquid!
        </p>
      </div>
    </div>
  );
};

export default Card;
