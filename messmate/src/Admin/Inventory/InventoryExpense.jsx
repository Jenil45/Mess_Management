import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "../../Api/axios";
import Alert from "../../Components/Alert";
// import EditModal from "../Pages/EditModal";
import EditModal from "./EditModal";

function InventoryExpense(props) {
  const [alert, setalert] = useState({
    mode: false,
    message: "",
    type: "bg-[red]",
  });
  const [editModal, setEditModal] = useState(false);
  const [inventoryId, setInventoryId] = useState("");
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");
  // const [ page, setPage ] = useState(0);
  const row = 5;
  // const totalpages = Math.ceil(inventory.length / row);
  const [startingindex, setstartingindex] = useState(0);

  const ComponentPDF = useRef();

  const generatePdf = useReactToPrint({
    content: () => ComponentPDF.current,
    documentTitle: "User Data",
  });

  const generateCSV = () => {
    var csv = "Name, expense, qty, remainqty\n";
    inventory.forEach(function (row) {
      csv += row.name + ", ";
      csv += row.expense + ", ";
      csv += row.qty + ", ";
      csv += row.remainqty + ", ";
      csv += "\n";
    });

    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = "inventory.csv";
    hiddenElement.click();
  };

  useEffect(() => {
    const getData = async (e) => {
      // if button enabled with JS hack
      try {
        const response = await axios.get(`stats/getMonthlyExpenses`, {
          withCredentials: true,
        });

        console.log("Get All User", response);
        setInventory(response.data);
        console.log(JSON.stringify(response));
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [editModal, alert]);

  const content = inventory
    .filter((item, i) => {
      return item.name.toLowerCase().includes(search);
    })
    .slice(startingindex, startingindex + row)
    .map((user) => {
      return (
        <tr className="bg-white border-b-2 hover:bg-gray-800 text-center">
          <td className="w-4 p-4 text-center ">
            <div className="flex justify-center items-center text-black">
              {user.name}
            </div>
          </td>
          <td className="text-black px-6 py-4">
            <div className="flex items-center text-black justify-center">
              {user.qty}
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center text-black justify-center">
              {user.remainqty}
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center text-black justify-center">
              {user.expense}
            </div>
          </td>
        </tr>
      );
    });
  console.log(inventory);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      {editModal ? (
        <EditModal setEditmodal={setEditModal} inventoryId={inventoryId} />
      ) : (
        ""
      )}
      {alert.mode ? <Alert alert={alert} setalert={setalert} /> : ""}

      <div className="flex items-center justify-center pb-4 py-6 px-5 bg-white ">
        <div className=" flex-[6]">
          <h1 className="text-[2rem]">{props.store}</h1>
        </div>
        <div className="flex-[2]">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-2 right-0 px-1  flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-inventory"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for inventory"
              onChange={(e) => {
                setSearch(e.target.value.toLowerCase());
              }}
              value={search}
            />
          </div>
        </div>
      </div>
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                         table main part                                        */
      /* ---------------------------------------------------------------------------------------------- */}

      <table
        ref={ComponentPDF}
        className=" mt-10 w-full text-sm text-left text-black "
      >
        <thead className="text-xs text-white bg-black uppercase bg-dark   text-center">
          <tr>
            <th scope="col" className="px-6 py-3 w-[8rem]">
              Store Type
            </th>
            <th scope="col" className="px-6 py-3 w-[8rem]">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3 w-[8rem]">
              Remaining Quantity
            </th>
            <th scope="col" className="px-6 py-3 w-[8rem]">
              Total Expenses
            </th>
          </tr>
        </thead>

        <tbody className="text-center">{content}</tbody>
      </table>

      <div className="flex mb-6 mt-5 flex-row justify-center">
        <button
          className="text-center text-xl text-white bg-blue-500 px-4 mr-3 py-2 rounded-lg hover:border-2 hover:border-black"
          onClick={generatePdf}
        >
          {" "}
          Pdf{" "}
        </button>
        <button
          className="text-center text-xl text-white bg-green-700 px-4  py-2 rounded-lg hover:border-2 hover:border-black"
          onClick={generateCSV}
        >
          {" "}
          Excel{" "}
        </button>
      </div>
    </div>
  );
}

export default InventoryExpense;
