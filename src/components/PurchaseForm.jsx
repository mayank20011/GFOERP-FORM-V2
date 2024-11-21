import React from "react";
import formdata from "../data/purchaseForm";
function PurchaseForm() {
  return (
    <form className="gap-6 flex flex-col">
      {/* for client Name */}
      <div></div>

      {/* for Product Details */}
      <div className="grid grid-cols-2 gap-6 w-full">
        {formdata.map((data) => (
          <div>
            <label htmlFor={data} className="text-blue-600">
              {data}
            </label>
            <input
              type="text"
              placeholder="Enter Date of Order"
              className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-gray-400"
              name={data}
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

export default PurchaseForm;
