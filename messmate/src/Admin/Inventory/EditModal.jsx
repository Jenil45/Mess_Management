import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../Api/axios";
import Alert from "../../Components/Alert";
import closeBtnpic from "../../Svg/close.svg";

function EditModal(props) {
  // const { setAuth } = useAuth();
  const [alert, setalert] = useState({
    mode: false,
    message: "",
    type: "bg-[red]",
  });

  const [name, setName] = useState(null);
  const [storeType, setStoreType] = useState(null);
  const [qty, setQty] = useState(0);
  const [usedqty, setUsedQty] = useState(0);
  const [single_price, setSingle_Price] = useState(0);

  useEffect(() => {
    const getData = async (inventoryId) => {
      // if button enabled with JS hack
      //   console.log("Inside effect", userEmail);
      try {
        const response = await axios.get(
          `/inventory/getinventory/${inventoryId}`,
          {
            withCredentials: true,
          }
        );

        // console.log("Get All User", response.data);
        setName(response.data.name);
        setStoreType(response.data.storeType);
        setQty(response.data.qty);
        // setUsedQty(response.data.usedqty);
        setSingle_Price(response.data.single_price);
        console.log(JSON.stringify(response));
      } catch (err) {
        console.log(err);
      }
    };

    getData(props.inventoryId);
  }, [EditModal]);

  // handling submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const e1 = storeType === null;
    const e2 = name === null;
    const e3 = qty > 0;
    const e4 = single_price > 0;
    console.log(storeType);
    if (e1 || e2 || !e3 || !e4) {
      setalert({
        mode: true,
        message: "Invallid entry",
        type: "bg-[red]",
      });
      return;
    }
    try {
      const response = await axios.patch(
        `/inventory/updateinventory/${props.inventoryId}`,
        JSON.stringify({ name, storeType, qty, single_price, usedqty }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response);
      setalert({
        mode: true,
        message: "Inventory Updated successfully",
        type: "bg-[green]",
      });
      //clear state and controlled inputs
      props.setEditmodal(false);
    } catch (err) {
      if (!err?.response) {
        setalert({
          mode: true,
          message: "No Server Response",
          type: "bg-[red]",
        });
      } else {
        setalert({
          mode: true,
          message: "Inventory Not Added failed",
          type: "bg-[red]",
        });
      }
    }
  };
  return (
    <div
      className="relative z-10 mt-[-10rem]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={() => props.setEditmodal(false)}
      />

      <div className="flex fixed left-[35%] min-w-[30%] max-w-[35%]  transform overflow-hidden  p-7  bg-gray-100 rounded-lg   flex-col    md:mt-0 ">
        <div className="flex">
          <h2 className="grow h-14 text-gray-900 text-3xl text-center font-medium title-font mb-2">
            Edit user
          </h2>
          <div class="flex-none ">
            <img
              src={closeBtnpic}
              alt=""
              className=" cursor-pointer min-h-[35px] min-w-[35px] mt-1"
              onClick={() => props.setEditmodal(false)}
            />
          </div>
        </div>
        {alert.mode ? <Alert alert={alert} setalert={setalert} /> : ""}
        <form>
          <div className="relative mb-3">
            <label
              htmlFor="full-name"
              className="leading-7 text-sm text-gray-600"
            >
              User Id
            </label>
            <input
              type="text"
              id="full-name"
              name="name"
              onChange={(e) => e.target.value}
              value={props.inventoryId}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-3">
            <label
              htmlFor="full-name"
              className="leading-7 text-sm text-gray-600"
            >
              Inventory Name
            </label>
            <input
              type="text"
              id="full-name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-3">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Store Type
            </label>
            <select
              id="countries_disabled"
              name="role"
              onChange={(e) => setStoreType(e.target.value)}
              value={storeType}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected value={""}>
                Select Store Type...
              </option>
              <option value={"Vessels"}>Vessels</option>
              <option value={"Vegetables"}>Vegetables</option>
              <option value={"Essentials"}>Essentials</option>
              <option value={"Liquid"}>Liquid</option>
              <option value={"Miscellaneous"}>Electricity</option>
            </select>
          </div>
          <div className="relative mb-3">
            <label
              htmlFor="contact"
              className="leading-7 text-sm text-gray-600"
            >
              Quantity
            </label>
            <input
              type="number"
              id="contact"
              name="quantity"
              onChange={(e) => setQty(e.target.value)}
              value={qty}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-3">
            <label
              htmlFor="contact"
              className="leading-7 text-sm text-gray-600"
            >
              Total Used Quantity
            </label>
            <input
              type="number"
              id="contact"
              name="quantity"
              onChange={(e) => setUsedQty(e.target.value)}
              value={usedqty}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="relative mb-3">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Single Price
            </label>
            <input
              type="text"
              id="password"
              name="password"
              onChange={(e) => setSingle_Price(e.target.value)}
              value={single_price}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <button
            className="text-white bg-indigo-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-900 rounded text-lg"
            onClick={handleUpdate}
          >
            Update Inventory
          </button>
        </form>
      </div>
    </div>
  );
}
export default EditModal;
