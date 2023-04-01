import React from "react";
import { useState } from "react";
import axios from "../../Api/axios";
import Alert from "../../Components/Alert";

const AddInventory = () => {
  const [alert, setalert] = useState({
    mode: false,
    message: "",
    type: "bg-[red]",
  });

  const [name, setName] = useState(null);
  const [storeType, setStoreType] = useState(null);
  const [qty, setQty] = useState(0);
  const [single_price, setSingle_Price] = useState(0);

  // handling submit
  const addInventory = async (e) => {
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
      const response = await axios.post(
        "/inventory/addinventory/",
        JSON.stringify({ name, storeType, qty, single_price }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setalert({
        mode: true,
        message: "Inventory Added successfully",
        type: "bg-[green]",
      });
      //clear state and controlled inputs
      setName("");
      setStoreType("");
      setQty(0);
      setSingle_Price(0);
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
    <>
      <section className="text-gray-600 body-font">
        {alert.mode ? <Alert alert={alert} setalert={setalert} /> : ""}
        <div className="container mx-auto flex flex-wrap items-center justify-between w-[50%]">
          <div className="lg:w-2/6 md:w-1/2 p-9 ml-8 bg-gray-100 rounded-lg  flex flex-[5] flex-col md:ml-auto w-[30rem] mt-10 md:mt-0">
            <h2 className="text-gray-900 text-3xl text-center font-medium title-font ">
              Add AddInventory
            </h2>
            <form onSubmit={addInventory}>
              <div className="relative mb-4">
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
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
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
              <div className="relative mb-4">
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

              <div className="relative mb-4">
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

              <button className="text-white bg-indigo-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-900 rounded text-lg">
                Add Inventory
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddInventory;
