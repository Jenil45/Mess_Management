import { useState } from "react";
import closeBtnpic from "../../Svg/close.svg";

const MultiSelect = ({ thing, setMenu, Menu }) => {
  const [tag1, setTag1] = useState("");

  const addOption = () => {
    console.log("not add space in this area");
    // setList1((prev) => [...prev, tag1]);
    setMenu(() => [...Menu, tag1]);
    setTag1("");
  };

  const removeOption = (value) => {
    setMenu((prev) => {
      return prev.filter((option) => option !== value);
    });
  };

  return (
    <>
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                           Menu select                                           */
      /* ---------------------------------------------------------------------------------------------- */}

      <div className="flex flex-col gap-[1rem] mt-5 items-center justify-start pt-4 w-[23rem] h-[30rem] border-[2px] border-gray-400 rounded-2xl shadow-xl ">
        <h1 className="text-center h5 text-xl">Add {thing} </h1>

        <div className="w-[30rem] flex flex-col gap-[2rem] items-center justify-center">
          <div className="p-[1rem] flex items-center gap-[1rem]">
            <input
              className="flex-[5] bg-slate-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              type="text"
              onChange={(e) => setTag1(e.target.value)}
              value={tag1}
            />
            <button
              onClick={addOption}
              className="group rounded-full w-10 h-10 text-2xl flex-[2] bg-green-500 font-bold  text-white relative overflow-hidden"
            >
              +
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------------------------------------------- */
        /*                                          List Of menu                                          */
        /* ---------------------------------------------------------------------------------------------- */}
        <div className="w-[70%] mx-auto  rounded">
          {Menu.map((item, index) => {
            return (
              <div className="flex items-center justify-center  p-2 gap-[1rem]">
                <div className="w-[10rem] border border-[1px] rounded p-2">
                  {Menu[index]}
                </div>
                {/* <img
                src={closeBtnpic}
                alt="hello"
                onClick={() => removeOption(Menu[index])}
                className="group rounded-2xl h-10 flex-[2] bg-red-500 font-bold text-lg text-white relative overflow-hidden"
              ></img> */}
                <button
                  onClick={() => removeOption(Menu[index])}
                  className="group rounded-full w-6 h-8 flex-[2] text-center bg-red-500 h3 font-bold text-lg text-white relative overflow-hidden"
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MultiSelect;
