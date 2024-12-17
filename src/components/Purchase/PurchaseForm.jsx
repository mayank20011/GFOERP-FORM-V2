import React from "react";
import girlTyping from "../../img/girlTyping.gif";
import { useState, useEffect } from "react";
import Remark from "./Remark.jsx";
import PurchaseMilk from "./PurchaseMilk.jsx";
import InputFilterList from "../InputFilterList/InputFilterList.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function PurchaseForm() {
  // for loading
  const [loading, setLoading] = useState(true);

  // to check if the batch passed the test or not?
  const [passedorFailed, setPassedOrFailed] = useState(null);

  // to store clients data comming from the server
  const [clients, setClients] = useState(null);

  // to change value of pass fail
  function changeValuesOfPassFail(e) {
    if (e.target.value === "Yes") {
      setPassedOrFailed("Passed");
    } else {
      setPassedOrFailed("Failed");
    }
  }

  // for selection of vendor and sharing its data to multiple components
  const [selectedVendor, setSelectedVendor] = useState(null);

  // to get data from server
  useEffect(() => {
    axios
      .get("http://localhost:5000/GFOERP/PurchaseVendors")
      .then((response) => {
        // console.log(response.data);
        setClients(response.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        console.log("Error while fetching clients from Server is :");
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading . . .</p>;
  }

  return (
    // to hold form and image
    <div className="flex w-full gap-4 items-center justify-between">
      {/* pass Fail container */}
      <div className="w-full lg:w-1/2 space-y-4 self-start">
        <h1 className="text-3xl text-left text-green-600 font-bold capitalize">
          Select Vendor
        </h1>

        <InputFilterList
          clients={clients}
          setSelectedVendor={setSelectedVendor}
        />

        <h1 className="text-3xl text-left text-green-600 font-bold">
          Did Batch Passed the Lab Test ?
        </h1>

        <div className="flex gap-4">
          <button
            className="px-6 py-2 text-white text-bold bg-green-600 rounded-md hover:scale-95 transition "
            onClick={() => {
              setPassedOrFailed("Passed");
            }}
          >
            Yes
          </button>
          <button
            className="px-6 py-2 text-white text-bold bg-red-600 rounded-md hover:scale-95 transition"
            onClick={() => {
              setPassedOrFailed("Failed");
            }}
          >
            No
          </button>
        </div>

        {passedorFailed == "Failed" ? (
          <Remark selectedVendor={selectedVendor} />
        ) : passedorFailed === "Passed" ? (
          <PurchaseMilk selectedVendor={selectedVendor} />
        ) : (
          ""
        )}

        {selectedVendor == null ? null : passedorFailed !== null ? (
          <button
            className="text-white font-bold text-xl w-full text-cener bg-green-600 py-2 rounded-lg hover:scale-95 transition md:w-fit md:px-8 md:text-md shadow-2xl shadow-black"
            type="submit"
          >
            {passedorFailed === "Passed"
              ? "Add To Stock"
              : "Send Remark To Customer"}
          </button>
        ) : null}
      </div>

      {/* img and  other stuff*/}
      <div className="hidden mx-auto lg:block">
        <h1 className="text-5xl text-center text-green-600">
          Purchasing Something?
        </h1>
        <p className="pt-4 text-center font-bold text-2xl text-slate-500">
          Place Your Order Carefully
        </p>
        <img src={girlTyping} alt="Typing Animation" className="" />
      </div>
    </div>
  );
}

export default PurchaseForm;
