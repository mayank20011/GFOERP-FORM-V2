import React from "react";
import ClientComponent from "./clientComponent";
function PurchaseForm() {
  return (
    <form className="gap-6 flex flex-col">
      {/* for client Name */}
      <div><ClientComponent/></div>

      {/* for Product Details */}
      <div className="grid grid-cols-2 gap-6 w-full">

        {/*For Quantity*/}
        <div>
          <label htmlFor="quantity" className="text-blue-600">Quantity
          </label>
          <input
            type="text"
            placeholder="Enter Quantity in Liters"
            className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-gray-400"
            name="quantity"
          />
        </div>

        {/*For fat% the product  */}
        <div>
          <label htmlFor="fat" className="text-blue-600">FAT
          </label>
          <input
            type="text"
            placeholder="Enter Fat %"
            className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-gray-400"
            name="fat"
          />
        </div>

        {/*For clr the product  */}
        <div>
          <label htmlFor="clr" className="text-blue-600">CLR
          </label>
          <input
            type="text"
            placeholder="Enter CLR Value"
            className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-gray-400"
            name="clr"
          />
        </div>

        {/*For alchol % in the product  */}
        <div>
          <label htmlFor="alchol" className="text-blue-600">Alchol
          </label>
          <input
            type="text"
            placeholder="Enter alchol %"
            className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-gray-400"
            name="alchol"
          />
        </div>

        {/*For Acidity in the product  */}
        <div>
          <label htmlFor="Acidity" className="text-blue-600">Acidity
          </label>
          <input
            type="text"
            placeholder="Enter Acidity of Milk"
            className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-gray-400"
            name="acidity"
          />
        </div>

        {/*For Adulteration */}
        <div>
          <label htmlFor="adulteration" className="text-blue-600">Adulteration
          </label>
          <input
            type="text"
            placeholder="Enter Quantity in Liters"
            className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-gray-400"
            name="quantity"
          />
        </div>

        {/* Timestamp  */}
        <div>
          <label htmlFor="quantity" className="text-blue-600">TimeStamp
          </label>
          <input
            type="date"
            placeholder="Enter Timestamp"
            className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-gray-400"
            name="quantity"
          />
        </div>

        {/* what to do ? */}
        <div>
          <label htmlFor="quantity" className="text-blue-600">What To Do?
          </label>
          <input
            type="text"
            placeholder="Enter Quantity in Liters"
            className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-gray-400"
            name="quantity"
          />
        </div>

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
