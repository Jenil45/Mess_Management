import React, { useState } from "react";
import closeBtnpic from "../../Svg/close.svg";

const Menu = () => {
  const [list, setList] = useState([]);
  const [tag, setTag] = useState("");

  const addOption = () => {
    setList((prev) => [...prev, tag]);
  };

  const removeOption = (value) => {
    setList((prev) => {
      return prev.filter((option) => option !== value);
    });
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      Menu
      <div className="w-[25rem] flex gap-2">
        <input
          className="flex-[5] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          type="text"
          onChange={(e) => setTag(e.target.value)}
          value={tag}
        />

        <button
          onClick={addOption}
          className="group rounded-2xl h-10 flex-[2] bg-green-500 font-bold text-lg text-white relative overflow-hidden"
        >
          Add Tag
          <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div>
        </button>
      </div>
      <div>
        <select
          multiple
          name=""
          id=""
          className="w-[25rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 gap-3"
        >
          {list.map((option, index) => {
            return (
              <option
                className="mt-1"
                selected
                value={option}
                onClick={() => removeOption(option)}
              >
                {option}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Menu;
