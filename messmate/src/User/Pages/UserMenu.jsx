import React, { useEffect, useState } from "react";
import axios from "../../Api/axios";
import Card from "./Card";
import userMenu from "../../Svg/UserMenu.png";
const UserMenu = () => {
  const [ day, setDay ] = useState("Monday");
  const [ isMenuAvlbl, setIsMenuAvlbl ] = useState(false);

  const [ menuB, setMenuB ] = useState(null);
  const [ menuL, setMenuL ] = useState(null);
  const [ menuD, setMenuD ] = useState(null);
  const [ menuS, setMenuS ] = useState(null);

  // fetch data for menu
  useEffect(() => {
    const getData = async (e) => {
      // if button enabled with JS hack
      try {
        const response = await axios.get(`/menu/getMenu/${day}`, {
          withCredentials: true,
        });

        if (response.data.menu.length > 0) {
          setMenuB(response.data.menu[ 0 ].menu_breakfast);
          setMenuL(response.data.menu[ 0 ].menu_lunch);
          setMenuD(response.data.menu[ 0 ].menu_dinner);
          setMenuS(response.data.menu[ 0 ].special_menu);
          setIsMenuAvlbl(true);
        } else {
          setMenuB(null);
          setMenuL(null);
          setMenuD(null);
          setMenuS(null);
          setIsMenuAvlbl(false);
        }
        console.log(response.data);
        // alert(response.data.message);
      } catch (err) {
        setMenuB([]);
        setMenuL([]);
        setMenuD([]);
        setMenuS([]);
        console.log(err);
      }
    };

    getData();
  }, [ day ]);

  return (
    <div className="flex flex-col min-h-[75vh] justify-between px-4 mt-2">
      <hr />

      <div className="head flex-[1] mb-3 mt-3  font-bold ">
        <h1 className="text-center m-2 text-xl md:text-5xl ">🍽 Today's Mess Menu 🍽</h1>
      </div>

      <div className="innerpart mt-5 flex-[10] flex  flex-row gap- ">
        <div className="sidepart flex flex-col  flex-[1] ">
          {/* ----------------------------------------- Select Part ---------------------------------------- */}

          <div className="subscribtion_header">
            <div className="dayselect flex flex-row">
              <label
                for="countries"
                class="block mb-2 text-sm min-w-fit m-2  font-medium text-black"
              >
                {/* Select an option */}
              </label>
              <select
                id="day"
                name="menu_day"
                class="bg-gray-50 w-[20rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                { }
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">WednesDay</option>
                <option value="Thursday">ThursDay</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
          </div>

          {/* ----------------------------------------- Bottom part ---------------------------------------- */}

          {isMenuAvlbl ? (
            <>
              {menuS.length > 0 ? (

                <div className="w-full md:w-full flex flex-wrap mt-4 mx-2 rounded-2xl bg-[#00ffff] py-3 text-black font-semibold text-lg px-4 md:px-20 min-h-[30px]">
                  Today Menu Special :     <span className="text-black text-xl"> {menuS.map((items) => { return items })}</span>
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-wrap gap-[10px]  w-full mt-[2rem] ">
                <Card name={"Breakfast"} menu={menuB} time={"8a.m.-10a.m."} />
                <Card name={"Lunch"} menu={menuL} time={"12 p.m.- 2 p.m."} />
                <Card
                  name={"Dinner"}
                  menu={menuD}
                  time={"7:30 p.m.-9:30 p.m."}
                />
              </div>

            </>
          ) : (
            <div className="flex  m-auto min-h-[40vh] mt-[1rem] justify-between flex-col items-center ">
              <span className="text-black text-4xl font-serif">
                Menu Not Set ...{" "}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
