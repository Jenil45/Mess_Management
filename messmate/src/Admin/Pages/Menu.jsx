import React, {  useState } from "react";
import MultiSelect from "../Components/MultiSelect";

const Menu = () => {
  const [isSetMenu, setIsSetMenu] = useState(true);

  const [menuB, setMenuB] = useState([]);
  const [menuL, setMenuL] = useState([]);
  const [menuD, setMenuD] = useState([]);
  const handleSubmit = (e) => {
    // e.preventDefalut();
    console.log("inner the console");
    console.log("Menu Break Fast" +menuB);
    console.log("Menu Dinner" +menuD);
    console.log("Menu Lunch" +menuL);
    var todayday= document.getElementById('day');
    var value = todayday.options[todayday.selectedIndex].value;
    console.log(value);
    // console.log(menuD);
    // console.log(menuL);
  };

  const handleday = (e) =>{
    console.log("in the handle day ");
    console.log(e);
  }
  return (
    <div>
      <div className='flex items-center justify-center w-full p-3 gap-[4rem] '>
        <div className='flex gap-3 items-center justify-center'>
          <input
            type='radio'
            id='html'
            name='fav_language'
            value='Menu Add'
            defaultChecked
            onChange={() => setIsSetMenu(true)}
          />
          <label className='text-[1.3rem]'>Menu Add</label>
        </div>
        <div className='flex gap-3 items-center justify-center'>
          <input
            type='radio'
            id='css'
            name='fav_language'
            value='Subscription Add'
            onChange={() => setIsSetMenu(false)}
          />
          <label className='text-[1.3rem]'>Subscription Add</label>
        </div>
      </div>
      <hr />
      {isSetMenu ? (
        <div className='p-3 mt-1 flex flex-col justify-between min-h-[85vh] '>

          <h1 className='text-[2rem] text-center'>Add the Menu</h1>

          {/* ---------------------------------------------------------------------------------------------- */
          /*                                           Day select                                           */
          /* ---------------------------------------------------------------------------------------------- */}

          <div className='dayselect flex flex-row'>
            <label
              for='countries'
              class='block mb-2 text-sm min-w-fit m-2  font-medium text-gray-900 dark:text-white'>
              Select an option
            </label>
            <select
              id='day'
              class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              onChange={handleday}>
              <option selected>Choose a Day</option>
              <option value='Monday'>Monday</option>
              <option value='Tuesday'>Tuesday</option>
              <option value='Wednesday'>WednesDay</option>
              <option value='Thuesday'>ThuesDay</option>
              <option value='Friday'>Friday</option>
              <option value='Saturday'>Saturday</option>
            </select>
          </div>

          {/* ---------------------------------------------------------------------------------------------- */
          /*                                            menu part                                           */
          /* ---------------------------------------------------------------------------------------------- */}

          <div className='menu grid grid-cols-3 bg-orange-300 min-h-[40vh] p-3'>
            <MultiSelect
              thing={"Breakfast"}
              setMenu={setMenuB}
              Menu={menuB}
            />
            <MultiSelect
              thing={"Lunch"}
              setMenu={setMenuD}
              Menu={menuD}
            />
            <MultiSelect
              thing={"Dinner"}
              setMenu={setMenuL}
              Menu={menuL}

            />

          </div>

          {/* ---------------------------------------------------------------------------------------------- */
          /*                                           submit part                                          */
          /* ---------------------------------------------------------------------------------------------- */}


          <div className='menusubmit flex justify-center'>
            <button
              type='button'
              class='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
              onClick={handleSubmit}>
              Submit
            </button>
          </div>


        </div>
      ) : (
        <div>Subscription</div>
      )}
    </div>
  );
};

export default Menu;
