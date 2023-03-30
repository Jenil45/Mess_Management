import React from "react";

const Card = ({ name, menu, time }) => {
  return (
    <>
    <div className="p-4 xl:w-1/4 md:w-1/2 min-w-[33%] min-h-[50vh] ">
      <div className="h-full p-6 rounded-lg border-2 border-black    bg-white flex flex-col relative  overflow-hidden">
        <div className="flex-[2]">
          <span className="bg-lime-400 text-black text-center w-[11rem] text-[1rem] h-[2.5rem] px-3 py-1  text-sm font-bold absolute right-0 top-0 rounded-bl">
            {time}
          </span>

          <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-black">
            <span className="text-2xl ml-1  font-semibold text-blue-800">
              {name}
            </span>
          </h1>
        </div>
        <ol  type={1} className="flex-[8]">
          {menu.map((item) => {
            return <li>{item}</li>;
          })}
        </ol>
        <p className="text-xs flex-[1] text-gray-500 mt-[1.4rem]">
Please Follow all rules of mess and Enjoy Your Food
        </p>
      </div>
    </div>


      {/* <div
        class=" flex flex-col min-w-[30%] border-2 border-black justify-around max-w-sm rounded-lg bg-white text-center shadow-lg ">
        <div className=" border-b-black border-b-2  ">
        <div
          class="text-2xl font-semibold flex[1] py-3 px-6 ">
          {name}
        </div>
        <div className=" text-center mt-2 mb-3  text-red-500 w-full  text-[1.2rem] h-[2rem] px-3 py-1 tracking-widest  rounded-bl">
            {time}
          </div>
        </div>
        <div class="p-6 items-stretch flex[5] min-h-[40vh]">
          <ol type={1} className="">
            {menu.map((item) => {
              return <li className="text-xl font-semibold">{item}</li>;
            })}
          </ol>
        </div>

      </div> */}

      </>
  );
};

export default Card;
