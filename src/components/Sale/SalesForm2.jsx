import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import LoadingForm from "./LoadingForm";
import { Bounce, toast } from "react-toastify";
import InputFilterList from "../InputFilterList/InputFilterList";
import ProductContainer from "./productContainer/ProductContainer";

function SalesForm2() {
  function clearForm() {
    refArray.current.forEach((element) => {
      element.value = "";
    });
  }

  // For Managing Loading
  const [loading, setLoading] = useState(true);
  // For Managing Clients
  const [clients, setClient] = useState(null);
  const [client, setSelectedClient] = useState(null);
  // For Vendor List
  const [vendors, setVendors] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // Ensures hook is always called

  function handleSubmit(e) {
    e.preventDefault();
    const data={
      vendorName:"",
    }
    const formData = new FormData(e.target);
    for (const [key, value] of formData.entries()) {
      if(value!=""){
         data[key]=value;
      }
    }
    console.log(data);
  }

  useEffect(() => {
    const fetchClient = axios.get("http://localhost:5000/GFOERP/Client");
    const fetchVendors = axios.get(
      "http://localhost:5000/GFOERP/ProductsVendors"
    );

    // Use Promise.all to wait for both requests to complete
    Promise.all([fetchClient, fetchVendors])
      .then(([clientResponse, vendorsResponse]) => {
        setClient(clientResponse.data.data);
        setVendors(vendorsResponse.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <LoadingForm />;
  }

  return (
    <form className="gap-6 flex flex-col w-100" onSubmit={handleSubmit}>
      <div className="w-full lg:w-1/2 space-y-4 self-start">
        {/* For Vendor Name */}
        <h1 className="text-3xl text-left text-orange-600 font-bold capitalize">
          Select Vendor
        </h1>
        <InputFilterList
          clients={vendors}
          setSelectedVendor={setSelectedVendor}
        />
      </div>

      {selectedVendor ? (
        <ProductContainer selectedVendor={selectedVendor} />
      ) : null}

      <button
        type="submit"
        className="text-white font-bold bg-orange-600 px-12 py-2 rounded cursor-pointer hover:scale-95 transition w-full md:w-fit md:py-4"
      >
        Submit
      </button>
    </form>
  );
}

export default SalesForm2;
