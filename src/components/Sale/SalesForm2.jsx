import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import LoadingForm from "../LoadingForm";
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
    const formData = new FormData(e.target);
    let data = {};
    let spreadSheatData = {};
    let quantity = {};
    formData.forEach((value, key) => {
      if (
        key === "clientName" ||
        key === "dateOfOrder" ||
        key === "dateOfDispatchAndTime"
      ) {
        spreadSheatData[`${convertString(key)}`] = value;
      } else {
        spreadSheatData[key] = value;
      }
      if (
        key === "dateOfDispatchAndTime" ||
        key === "dateOfOrder" ||
        key === "clientName"
      ) {
        data[key] = value;
      } else {
        quantity[key] = value;
      }
    });
    data[`Quantity`] = quantity;

    const reqUrl = `${import.meta.env.VITE_DB_URL}/Sales/`;

    fetch(`${import.meta.env.VITE_SALES_SHEET_URL}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [spreadSheatData],
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    axios
      .post(reqUrl, data)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log("Request successful:", response.data);
          toast.success("Sales Data saved to Database", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition: Bounce,
          });
          clearForm();
        }
      })
      .catch((error) => {
        console.error("Request failed:", error.response || error.message);
        alert(`Failure:${error}`);
      });
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
