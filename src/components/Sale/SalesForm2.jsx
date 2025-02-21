import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import LoadingForm from "./LoadingForm";
import { Bounce, toast, ToastContainer } from "react-toastify";
import InputFilterList from "../InputFilterList/InputFilterList";
import ProductContainer from "./productContainer/ProductContainer";
import PagePdf from "../pdf/PagePdf.jsx";

function SalesForm2() {
  // For Managing Loading
  const [loading, setLoading] = useState(true);
  const [buttonloading, setButtonLoading] = useState(false);
  // For Managing Clients
  const [clients, setClients] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientLoading, setClientLoading] = useState(false);

  // For Vendor List
  const [vendors, setVendors] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // for bill
  const [showBill, setShowBill] = useState(false);
  const [pdfData, setPdfData]=useState(null);

  function sendToDB(data) {
    if (data.vendorName == "") {
      toast.error(`Enter VendorName`);
    } else if (data.client == "") {
      toast.error(`Select Client`);
    } else if (data.productsSold.length == 0) {
      toast.error(`Enter Atleast 1 Product to sell`);
    } else {
      const now = new Date();
      data.time.date = now.getDate();
      data.time.month = now.getMonth() + 1;
      data.time.year = now.getFullYear();
      data.time.time = `${now.getHours()} : ${now.getMinutes()} : ${now.getSeconds()}`;
      setButtonLoading(true);
      setPdfData(data);
      axios
        .post("https://gfo-erp-backend-api.vercel.app/GFOERP/SalesData/", data)
        .then((response) => {
          if (response.data.success) {
            toast.success(`${response.data.message}`);
            setSelectedClient(null);
            setShowBill(true);
          } else {
            toast.error(`${response.data.message}`);
          }
          setButtonLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error(`Server Problem`);
          setButtonLoading(false);
        });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      vendorName: "",
      client: "",
      productsSold: [],
      time: {
        date: "",
        month: "",
        year: "",
        time: "",
      },
    };

    const formData = new FormData(e.target);

    let index = 0;

    for (const [key, value] of formData.entries()) {
      if (key == "vendorName" && index == 0) {
        if (value !== "") {
          data.vendorName = value;
        }
      } else if (key == "vendorName" && index == 1) {
        if (value != "") {
          data.client = value;
        }
      } else {
        if (value != "") {
          data.productsSold.push({
            name: key,
            quantity: value,
          });
        }
      }
      index++;
    }
    sendToDB(data);
  }

  useEffect(() => {
    axios
      .get("https://gfo-erp-backend-api.vercel.app/GFOERP/ProductsVendors")
      .then((response) => {
        if (response.data.success) {
          setVendors(response.data.data);
          setLoading(false);
        } else {
          toast.error("Can't Fetch Vendor Name");
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error("Server Problem");
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedVendor) {
      setClients(null);
      getClients(selectedVendor);
    }
  }, [selectedVendor]);

  function getClients(vendor) {
    setClientLoading(true);
    axios
      .get(
        `https://gfo-erp-backend-api.vercel.app/GFOERP/RouteClient/${vendor.name}`
      )
      .then((response) => {
        if (response.data.success) {
          setClients(response.data.data);
          setClientLoading(false);
        } else {
          toast.error("Unable to Load Clients, Try Again");
          setClientLoading(false);
        }
      })
      .catch((err) => {
        toast.error("Server Problem");
        console.log(err);
        setClientLoading(false);
      });
  }

  if (loading) {
    return <LoadingForm />;
  }

  return (
    <>
      {showBill == false ? (
        <div className="">
          <ToastContainer />

          <form
            className="flex flex-col w-100 space-y-4"
            onSubmit={handleSubmit}
          >
            <h1 className="text-green-600 text-4xl font-bold xxs:text-3xl">
              Sell !!!
            </h1>

            <div className="w-full lg:w-1/2 space-y-4 self-start xxs:space-y-0">
              {/* For Vendor Name */}
              <h1 className="text-3xl text-left text-orange-600 font-bold capitalize xxs:text-lg">
                Select Vendor
              </h1>
              <InputFilterList
                clients={vendors}
                setSelectedVendor={setSelectedVendor}
              />
            </div>

            {/* For Client Name */}
            {selectedVendor && clients && (
              <div className="w-full lg:w-1/2 space-y-4 self-start xxs:space-y-0">
                <h1 className="text-3xl text-left text-orange-600 font-bold capitalize xxs:text-lg">
                  Select Client
                </h1>
                <InputFilterList
                  clients={clients}
                  setSelectedVendor={setSelectedClient}
                />
              </div>
            )}

            {clientLoading ? (
              <p className="text-center animate-pulse">Loading Clients</p>
            ) : null}

            {selectedClient && (
              <ProductContainer selectedVendor={selectedVendor} />
            )}

            {selectedClient && (
              <button
                type="submit"
                className="text-white font-bold bg-orange-600 px-12 py-2 rounded cursor-pointer hover:scale-95 transition w-full md:w-fit md:py-4"
              >
                {buttonloading ? (
                  <i className="fa-solid fa-circle-notch animate-spin"></i>
                ) : (
                  "Submit"
                )}
              </button>
            )}
          </form>
        </div>
      ) : <PagePdf pdfData={pdfData} setClients={setClients} setShowBill={setShowBill}/>}
    </>
  );
}

export default SalesForm2;
