import React, { useState } from 'react'

const MultiSelect = ({thing , setMenuB}) => {
    const [list1, setList1] = useState([]);
    // const [list2, setList2] = useState([]);
    // const [list3, setList3] = useState([]);
  
    const [tag1, setTag1] = useState("");
    // const [tag2, setTag2] = useState("");
    // const [tag3, setTag3] = useState("");
  
    const addOption = () => {
      setList1((prev) => [...prev, tag1]);
    };
  
    // const removeOption = (value) => {
    // //   setList1((prev) => {
    // //     return prev.filter((option) => option !== value);
    // //   });
    // value.prop('selected', false);
    // };
    function getSelectedOptions(sel) {
        var opt;
        var len = list1.length;
        for (var i = 0; i < len; i++) {
          opt = list1[i];
          console.log(opt,len);
      
          if (opt.selected) {
            setMenuB((prev)=> [...prev ,opt]);
          } 
        }      
      }

  return (
    <div className="pt-[2rem] flex flex-col gap-[3rem] items-center justify-center">
          <h1 className="text-[2rem]">Menu Section</h1>
          <div className="flex flex-col gap-[2rem] items-center justify-center">
            <h1>Add {thing} : </h1>
            <div className="w-[30rem] flex gap-[2rem] items-center">
              <input
                className="flex-[5] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                onChange={(e) => setTag1(e.target.value)}
                value={tag1}
              />

              <button
                onClick={addOption}
                className="group rounded-2xl h-10 flex-[2] bg-green-500 font-bold text-lg text-white relative overflow-hidden"
              >
                Add Tag
                {/* <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div> */}
              </button>
            </div>
            <select
              multiple
              name=""
              id=""
              className="w-[30rem] h-[8rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 gap-3"
              onChange={getSelectedOptions(this)}
            >
              {list1.map((option, index) => {
                return (
                  <option
                    className="mt-1"
                    selected
                    key={index}
                    value={option}
                  >
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
          
        </div>        
  )
}

export default MultiSelect
