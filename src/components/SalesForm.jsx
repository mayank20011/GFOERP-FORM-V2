import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import LoadingForm from "./LoadingForm";

function SalesForm() {
  console.log(`Rendered`);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  // To Fetch Product Name from the server
  useEffect(() => {
    axios
      .get("https://gfoerp-mern-api.vercel.app/Products/")
      .then((response) => {
        console.log(response.data.data);
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(`Server Problem`);
      });
  }, []);

  if (loading) {
    return <LoadingForm />;
  }

  return (
    <form className="gap-6 flex flex-col">
      {/* for client Name */}
      <div></div>

      {/* for date of order and dispatch time */}
      <h1 className="text-3xl font-bold text-orange-600 self-baseline">
        Order And Dispatch
      </h1>

      <div className="grid grid-cols-2 gap-6 w-full">
        <div>
          <label htmlFor="dateOfOrder" className="text-blue-600">
            Date of Order
          </label>
          <input
            type="date"
            placeholder="Enter Date of Order"
            className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-gray-400"
            name="dateOfOrder"
          />
        </div>
        <div>
          <label htmlFor="dateOfDispatchAndTime" className="text-blue-600">
            Dispatch Date And Time
          </label>
          <input
            type="datetime-local"
            placeholder="Enter Date of Order"
            className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-gray-400"
            name="dateOfDispatchAndTime"
          />
        </div>
      </div>

      {/* heading */}
      <h1 className="text-3xl font-bold text-orange-600 self-baseline">
        Quantity
      </h1>

      {/* for quantity */}
      <div className="grid grid-cols-2 gap-6 w-full">
        {products.map((product) => (
          <div key={product._id}>
            <label
              htmlFor={product.productName}
              className="text-blue-600"
            >{`${product.productName} (${product.quantity})`}</label>
            <input
              type="text"
              placeholder="Enter Quantity ..."
              className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer"
              name={product.productName}
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="text-white font-bold bg-orange-600 px-12 py-2 rounded cursor-pointer hover:scale-95 transition w-full md:w-fit md:py-4"
      >
        Submit
      </button>
    </form>
  );
}

export default SalesForm;
