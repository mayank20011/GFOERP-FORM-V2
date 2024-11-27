import React from "react";
import { useRef } from "react";
import axios from "axios";

function AddDataForm() {

  const clientName = useRef(null);
  const productName = useRef(null);
  const productQuantity = useRef(null);

  // function clear product name after data saved successfully
  function clearProductName() {
    productName.current.value = "";
    productQuantity.current.value = "";
  }

  // function to clear clientName afer data saved successfully in db
  function clearClientName() {
    clientName.current.value = "";
  }

  function addClientToDb() {
    axios
      .post(`${import.meta.env.VITE_DB_URL}/Client/`, {
        clientName: clientName.current.value,
      })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          alert("ClientName saved sucessfully in Db");
          clearClientName();
        } else {
          console.log(response.data);
          alert(response.data.error);
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }

  function addProductInDb() {
    axios
      .post(`${import.meta.env.VITE_DB_URL}/Products/`, {
        productName: productName.current.value,
        quantity: productQuantity.current.value,
      })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          alert("Product Saved in Database SuccessFully");
          clearProductName();
        } else {
          console.log(response.data);
          alert(response.data.error);
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }

  return (
    <div className="grid gap-6 w-100">
      <h1 className="text-xl sm:text-3xl font-bold text-orange-600 self-baseline">
        Add New Client !
      </h1>
      {/* For Client Name */}
      <div className="flex w-full gap-4 flex-col md:flex-row">
        <div className="w-full md:w-4/5">
          <input
            type="text"
            placeholder="Enter Client Name ..."
            className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-gray-400"
            name="dateOfOrder"
            ref={clientName}
          />
        </div>
        <button
          className="w-fit md:w-1/5
        bg-orange-600 text-white font-bold px-3 h-10 rounded-lg hover:scale-95 transition duration-300"
          onClick={addClientToDb}
        >
          Add Client
        </button>
      </div>

      {/* For adding Product */}
      <h1 className="text-xl sm:text-3xl font-bold text-orange-600 self-baseline">
        Add New Product !
      </h1>

      <div className="grid space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Enter Product Name ..."
            className="w-100 border-2 rounded-sm h-10 p-3 outline-none sm:w-1/2 cursor-pointer text-gray-400"
            ref={productName}
          />
          <input
            type="text"
            placeholder="Enter Product Quantity ..."
            className="w-100 border-2 rounded-sm h-10 p-3 outline-none sm:w-1/2 cursor-pointer text-gray-400"
            ref={productQuantity}
          />
        </div>
        <button
          className="bg-orange-600 text-white font-bold px-3 h-10 rounded-lg hover:scale-95 transition duration-300 w-fit"
          onClick={addProductInDb}
        >
          Add Product
        </button>
      </div>

    </div>
  );
}

export default AddDataForm;
