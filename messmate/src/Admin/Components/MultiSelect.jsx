import { useState } from "react";
import closeBtnpic from "../../Svg/close.svg";

const MultiSelect = ({ thing, setMenu, Menu }) => {

  const [tag1, setTag1] = useState("");


  const addOption = () => {
    console.log("not add space in this area");
    // setList1((prev) => [...prev, tag1]);
    setMenu(() => [...Menu,tag1 ])
    setTag1("");
  };

  const removeOption = (value) => {
    setMenu((prev) => {
      return prev.filter((option) => option !== value);
    });
  };

  return (
    <>
      <div className='pt-[2rem] flex flex-col gap-[3rem] items-center justify-center'>


        {/* ---------------------------------------------------------------------------------------------- */
        /*                                           Menu select                                           */
        /* ---------------------------------------------------------------------------------------------- */}

        <div className='flex flex-col gap-[2rem] items-center justify-center'>
          <h1 className='text-center'>Add {thing} </h1>
          <div className='w-[30rem] flex flex-col gap-[2rem] items-center'>
            <div>
              <input
                className='flex-[5] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                type='text'
                onChange={(e) => setTag1(e.target.value)}
                value={tag1}
              />
              <button
                onClick={addOption}
                className='group rounded-2xl h-10 flex-[2] bg-green-500 font-bold text-lg text-white relative overflow-hidden'>
                Add
              </button>
            </div>
          </div>

        {/* ---------------------------------------------------------------------------------------------- */
        /*                                          List Of menu                                          */
        /* ---------------------------------------------------------------------------------------------- */}

          {Menu.map((item, index) => {
            return (
              <div className="flex  min-w-">
                <div>
                  {Menu[index]}
                </div>
                <img
                  src={closeBtnpic}
                  alt="hello"
                  onClick={() => removeOption(Menu[index])}
                  className='group rounded-2xl h-10 flex-[2] bg-red-500 font-bold text-lg text-white relative overflow-hidden'>

                </img>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MultiSelect;
