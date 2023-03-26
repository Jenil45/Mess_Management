import React, { useEffect, useState } from "react";
import closeBtnpic from "../../Svg/close.svg";
import MultiSelect from "../Components/MultiSelect";

const Menu = () => {
  const [isSetMenu, setIsSetMenu] = useState(true);

  const [menuB, setMenuB] = useState([]);
  const [menuL, setMenuL] = useState([]);
  const [menuD, setMenuD] = useState([]);

  // const [list1, setList1] = useState([]);
  // const [list2, setList2] = useState([]);
  // const [list3, setList3] = useState([]);

  // const [tag1, setTag1] = useState("");
  // const [tag2, setTag2] = useState("");
  // const [tag3, setTag3] = useState("");

  // const addOption = (item) => {
  //   setList1((prev) => [...prev, item]);
  // };

  // const removeOption = (value) => {
  //   setList1((prev) => {
  //     return prev.filter((option) => option !== value);
  //   });
  // };
  const handleSubmit = () => {
    console.log(menuB);
    // console.log(menuD);
    // console.log(menuL);
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full py-[5rem] gap-[4rem] ">
        <div className="flex gap-3 items-center justify-center">
          <input
            type="radio"
            id="html"
            name="fav_language"
            value="Menu Add"
            onChange={() => setIsSetMenu(true)}
          />
          <label className="text-[1.3rem]">Menu Add</label>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <input
            type="radio"
            id="css"
            name="fav_language"
            value="Subscription Add"
            onChange={() => setIsSetMenu(false)}
          />
          <label className="text-[1.3rem]">Subscription Add</label>
        </div>
      </div>
      <hr />
      {isSetMenu ? (
        <div>
          <MultiSelect thing={"Breakfast"} setMenuB={setMenuB} />
          {/* <MultiSelect thing={"Lunch"} setMenu={setMenuL} /> */}
          {/* <MultiSelect thing={"Dinner"} setMenu={setMenuD} /> */}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <div>Subscriotion</div>
      )}
    </div>
  );
};

export default Menu;
