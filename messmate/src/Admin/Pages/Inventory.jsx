import React, { useState } from "react";
import AddInventory from "../Inventory/AddInventory";
import InventoryExpense from "../Inventory/InventoryExpense";
import StoreA from "../Inventory/StoreA";

const Inventory = () => {
  const [store, setStore] = useState("addInventory");
  return (
    <div className="flex flex-col gap-[1rem] h-[100vh]">
      <div className="header flex flex-[1.2] items-center justify-center gap-[2rem]">
        <button
          type="button"
          class="text-white h-[3rem] w-[9rem] bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-3 py-[0.5rem] text-center mr-2 mb-2 "
          onClick={() => {
            setStore("addInventory");
          }}
        >
          Add Inventory
        </button>
        <button
          type="button"
          class="text-white h-[3rem] w-[6rem] bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-[0.5rem] text-center mr-2 mb-2 "
          onClick={() => {
            setStore("A");
          }}
        >
          Store A
        </button>
        <button
          type="button"
          class="text-white h-[3rem] w-[6rem] bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-[0.5rem] text-center mr-2 mb-2 "
          onClick={() => {
            setStore("B");
          }}
        >
          Store B
        </button>
        <button
          type="button"
          class="text-white h-[3rem] w-[6rem] bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-[0.5rem] text-center mr-2 mb-2 "
          onClick={() => {
            setStore("C");
          }}
        >
          Store C
        </button>
        <button
          type="button"
          class="text-white h-[3rem] w-[6rem] bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-[0.5rem] text-center mr-2 mb-2 "
          onClick={() => {
            setStore("D");
          }}
        >
          Store D
        </button>
        <button
          type="button"
          class="text-white h-[3rem] w-[6rem] bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-[0.5rem] text-center mr-2 mb-2 "
          onClick={() => {
            setStore("E");
          }}
        >
          Store E
        </button>
        <button
          type="button"
          class="text-white h-[3rem] w-[6rem] bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-[0.5rem] text-center mr-2 mb-2 "
          onClick={() => {
            setStore("Ex");
          }}
        >
          Expenses
        </button>
      </div>
      <hr />
      <div className="flex-[6]">
        {store === "addInventory" ? <AddInventory /> : ""}
        {store === "A" ? (
          <StoreA store={"StoreA"} info={"Things added in pieces"} />
        ) : (
          ""
        )}
        {store === "B" ? (
          <StoreA store={"StoreB"} info={"Vegetable Section (in k.g.,)"} />
        ) : (
          ""
        )}
        {store === "C" ? (
          <StoreA store={"StoreC"} info={"Groceries Section (in k.g.,)"} />
        ) : (
          ""
        )}
        {store === "D" ? (
          <StoreA store={"StoreD"} info={"Things added in ltr"} />
        ) : (
          ""
        )}
        {store === "E" ? (
          <StoreA store={"StoreE"} info={"Miscellaneous Expenses"} />
        ) : (
          ""
        )}
        {store === "Ex" ? <InventoryExpense store={"Expenses"} /> : ""}
      </div>
    </div>
  );
};

export default Inventory;
