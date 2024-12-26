import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import LoadingForm from "./LoadingForm";
import { Bounce, toast, ToastContainer } from "react-toastify";
import InputFilterList from "../InputFilterList/InputFilterList";
import ProductContainer from "./productContainer/ProductContainer";

function SalesForm2() {
  // For Managing Loading
  const [loading, setLoading] = useState(true);

  // For Managing Clients
  const [clients, setClients] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientLoading, setClientLoading] = useState(false);

  // For Vendor List
  const [vendors, setVendors] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // Ensures hook is always called

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      vendorName: "",
    };
    const formData = new FormData(e.target);
    for (const [key, value] of formData.entries()) {
      if (value !== "") {
        data[key] = value;
      }
    }
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
    <div className="">

      <ToastContainer />
      
      <form className="flex flex-col w-100 space-y-4" onSubmit={handleSubmit}>
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

        {selectedClient && <ProductContainer selectedVendor={selectedVendor} />}

        {selectedClient && (
          <button
            type="submit"
            className="text-white font-bold bg-orange-600 px-12 py-2 rounded cursor-pointer hover:scale-95 transition w-full md:w-fit md:py-4"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}

export default SalesForm2;
