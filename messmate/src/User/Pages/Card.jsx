import React from "react";

const Card = ({ name, menu, time }) => {
  return (
    <>
      <div className="p-4 xl:w-1/4 md:w-1/2 min-w-[30%] min-h-[50vh] ">
        <div className="h-full p-6 rounded-3xl border-2 border-black    bg-white flex flex-col relative">
          <div className="flex-[2] flex flex-col">
            <div className="text-5xl text-gray-900 leading-none flex flex-col items-center pb-4 mb-4 border-b border-black">
              <div className="text-3xl ml-1  mt-1  font-semibold text-blue-800">
                {name}
              </div>
              <div className="text-xl text-center">{time}</div>
            </div>

          </div>
          <ol type={1} className="flex-[8]">
            {menu.map((item) => {
              return <li className="ml-3 mt-1 text-black tetx-base font-semibold">{item}</li>;
            })}
          </ol>
          <p className="text-xs flex-[1]  text-red-400 mt-[1.4rem]">
             * Please Follow all rules of mess and Enjoy Your Food
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
