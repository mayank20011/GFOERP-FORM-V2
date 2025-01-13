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
  const form = useRef(null);

  // for loading
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

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

  const [isMessageSent, setIsMessageSent] = useState(false);


  // to get data from server
  useEffect(() => {
    axios
      .get("https://gfo-erp-backend-api.vercel.app/GFOERP/PurchaseVendors")
      .then((response) => {
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

  useEffect(() => {
    setPassedOrFailed(null);
  }, [selectedVendor]);

  function Whatsapp(message) {
    console.log(selectedVendor.phoneNumber);
    console.log(message);
    const url = `https://api.whatsapp.com/send?phone=${
      selectedVendor.phoneNumber[0]
    }&text=${encodeURIComponent(message)}`;
    // window.open(url, "_blank");
    setIsMessageSent(true);
    setSelectedVendor(null);
    setPassedOrFailed(null);
  }

  function sendWhatsapp(dataToSend) {
    let message = "";
    // if labtest passed
    if (dataToSend.passedOrFailed == "Passed") {
      message = `Hey ${selectedVendor.name} !, We are happy to say that your Product Passed our Labtest, amount of milk is ${dataToSend.amount} kg and the fat% in your product is ${dataToSend.fat}% and clr value is ${dataToSend.clr} which genearte a total amout of ${dataToSend.money} and your balnce amount is:`;
      Whatsapp(message);
    }
    // if labtest failed
    else {
      message = `Hey ${selectedVendor.name} !, We are sorry to inform that Your Product did not meet our passing Criteria, Reason for failing our test is: ${dataToSend.remark}`;
      Whatsapp(message);
    }
  }

  function saveToDb(dataToSend) {
    setButtonLoading(true);
    console.log(dataToSend);
    axios
      .post(
        "https://gfo-erp-backend-api.vercel.app/GFOERP/PurchaseData",
        dataToSend
      )
      .then((response) => {
        if (response.data.success) {
          toast.success("Saved To Db Successfully");
          sendWhatsapp(dataToSend);
          setButtonLoading(false);
        } else {
          toast.error("Issue While Saving Data in DataBase");
          setButtonLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("No Such Vendor in Db");
        setButtonLoading(false);
      });
  }

  function sendToDb(dataToSend) {
    if (dataToSend.passedOrFailed == "Passed") {
      if (dataToSend.money == 0) {
        toast.error("Generate Money First");
      } else {
        saveToDb(dataToSend);
      }
    } else {
      if (dataToSend.remark == "") {
        toast.error("Remark Can't be Empty");
      } else {
        saveToDb(dataToSend);
      }
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
      id:selectedVendor._id,
      balanceAmount:selectedVendor.balanceAmount,
    };

    for (const [key, value] of formData.entries()) {
      dataToSend[key] = value;
    }

    dataToSend.dateAndTime.date = now.getDate();
    dataToSend.dateAndTime.month = now.getMonth()+1;
    dataToSend.dateAndTime.year = now.getFullYear();
    dataToSend.dateAndTime.time = `${now.getHours()}:${now.getMinutes()}`;
    if (passedorFailed == "Passed") {
      dataToSend["passedOrFailed"] = "Passed";
      const PurchasingRates = {
        fatRate: selectedVendor.fatRate,
        snfRate: selectedVendor.snfRate,
      };
      dataToSend["PurchasingRates"] = PurchasingRates;
    } else {
      dataToSend["passedOrFailed"] = "Failled";
    }
    sendToDb(dataToSend);
  }

  if (loading) {
    return <p className="text-center">Loading . . .</p>;
  }

  return (
    // to hold form and image
    <div className="flex w-full items-center justify-between">
      <ToastContainer />
      {/* pass Fail container */}
      <form
        className="w-full lg:w-1/2 space-y-4 self-start xxs:space-y-3"
        onSubmit={handleSubmit}
        ref={form}
      >
        <h1 className="text-red-600 text-4xl font-bold xxs:text-3xl">
          Purchase !!!
        </h1>
        <div>
          <h1 className="text-3xl text-left text-green-600 font-bold capitalize xxs:text-lg">
            Select Vendor
          </h1>

          <InputFilterList
            clients={clients}
            setSelectedVendor={setSelectedVendor}
          />
        </div>

        {selectedVendor ? (
          <div>
            <h1 className="text-3xl text-left text-green-600 font-bold xxs:text-xl">
              Did Batch Passed the Lab Test ?
            </h1>

            <div className="flex gap-4 xxs:gap-2 mt-2">
              <button
                className="px-6 py-2 text-white text-bold bg-green-600 rounded-md hover:scale-75 transition shadow-lg hover:shadow-green-600"
                type="button"
                onClick={() => {
                  setPassedOrFailed("Passed");
                }}
              >
                Yes
              </button>
              <button
                className="px-6 py-2 text-white text-bold bg-red-600 rounded-md hover:scale-75 transition shadow-lg hover:shadow-red-600"
                type="button"
                onClick={() => {
                  setPassedOrFailed("Failed");
                }}
              >
                No
              </button>
            </div>
          </div>
        ) : null}

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
            {passedorFailed === "Passed" ? (
              buttonLoading ? (
                <p>
                  {" "}
                  <span>
                    <i className="fa-solid fa-circle-notch animate-spin mr-2"></i>
                  </span>
                  Loading <span className="animate-pulse">. . .</span>
                </p>
              ) : (
                "Add To Stock"
              )
            ) : buttonLoading ? (
              <p>
                <span>
                  <i className="fa-solid fa-circle-notch animate-spin mr-2"></i>
                </span>
                Loading <span className="animate-pulse">. . .</span>
              </p>
            ) : (
              "Send Remark To Customer"
            )}
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