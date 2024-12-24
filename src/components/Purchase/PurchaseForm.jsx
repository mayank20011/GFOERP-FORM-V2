import React from "react";
import girlTyping from "../../img/girlTyping.gif";
import { useState, useEffect, useRef } from "react";
import Remark from "./Remark.jsx";
import PurchaseMilk from "./PurchaseMilk.jsx";
import InputFilterList from "../InputFilterList/InputFilterList.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function PurchaseForm() {
 
  // for form
  const form=useRef(null);

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

  function Whatsapp(message) {
    console.log(message);
    form.current.reset();
  }

  function sendWhatsapp(dataToSend, success = false) {
    let message = "";

    // if labtest passed
    if(success){
      message = `Hey ${selectedVendor.name} !, We are happy to say that your Product Passed our Labtest, amount of milk is ${dataToSend.amount} kg and the fat% in your product is ${dataToSend.fat}% and clr value is ${dataToSend.clr} which genearte a total amout of ${dataToSend.money} and your balnce amount is:`;
      Whatsapp(message);
    }

    // if labtest failed
    else{
      if (dataToSend.remark == "") {
        toast.error("Enter Remark");
      } 
      else{
        message = `Hey ${selectedVendor.name} !, We are sorry to inform that Your Product did not meet our passing Criteria, Reason for failing our test is: ${dataToSend.remark}`;
        Whatsapp(message);
      }
    }
  }

  function sendToDb(dataToSend) {
    if (dataToSend.money == 0) {
      toast.error("Generate Money First");
    } else {
      axios
        .post("http://localhost:5000/GFOERP/PurchaseData",dataToSend)
        .then((response) => {
          if (response.data.success) {
            toast.success("Saved To Db Successfully");
            form.current.reset();
            sendWhatsapp(dataToSend, true);
          } else {
            toast.error("Issue While Saving Data in DataBase");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Server issue");
        });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const now = new Date();
    const formData = new FormData(e.target);
    const dataToSend = {
      dateAndTime: {
        date: "",
        month: "",
        year: "",
        time: "",
      },
      purchasingRates: {
        fatRate: 0,
        snfRate: 0,
      },
    };
    for (const [key, value] of formData.entries()) {
      dataToSend[key] = value;
    }
    dataToSend.dateAndTime.date = now.getDate();
    dataToSend.dateAndTime.month = now.getMonth();
    dataToSend.dateAndTime.year = now.getFullYear();
    dataToSend.dateAndTime.time = `${now.getHours()}:${now.getMinutes()}`;
    dataToSend.purchasingRates.fatRate = selectedVendor.fatRate;
    dataToSend.purchasingRates.snfRate = selectedVendor.snfRate;
    console.log(dataToSend);
    if (passedorFailed === "Passed") {
      sendToDb(dataToSend);
    } else {
      sendWhatsapp(dataToSend, false);
    }
  }

  if (loading) {
    return <p>Loading . . .</p>;
  }

  return (
    // to hold form and image
    <div className="flex w-full gap-4 items-center justify-between">
      <ToastContainer />
      {/* pass Fail container */}
      <form
        className="w-full lg:w-1/2 space-y-4 self-start"
        onSubmit={handleSubmit}
        ref={form}
      >
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
            type="button"
            onClick={() => {
              setPassedOrFailed("Passed");
            }}
          >
            Yes
          </button>
          <button
            className="px-6 py-2 text-white text-bold bg-red-600 rounded-md hover:scale-95 transition"
            type="button"
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
      </form>

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