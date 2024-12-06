import React from "react";
import { useState, useRef } from "react";
function PurchaseMilk({ selectedVendor }) {
  let rate;
  if (selectedVendor) {
    rate = selectedVendor.rate;
  } else {
    rate = 0;
  }

  // for snf value
  const [snfValue, setSnfValue] = useState(0);
  // for money
  const [money, setMoney] = useState(0);

  // to get fat and clr value from the input field
  const clr = useRef(0);
  const fat = useRef(0);

  // To calculate and update snf value on ui
  function calculateSnfValue() {
    let snf = clr.current.value / 4 + 0.2 * fat.current.value + 0.66;
    setSnfValue(snf);
  }

  function calculateMoney() {
    setMoney(snfValue * rate);
  }
  if (selectedVendor == null) {
    return <p>Please Select a Vendor First</p>;
  }
  return (
    <div className="space-y-4">
      {/* heading */}
      <h1 className="text-2xl text-green-600 font-bold">Lets Purchase</h1>

      {/* for purchasing */}
      <div className="space-y-4">
        {/*For amount of the Milk */}
        <div>
          <label htmlFor="fat" className="text-blue-600 text-xl">
            Amount of the Milk ?
          </label>
          <input
            type="number"
            placeholder="Enter Amount in kg ..."
            className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-black"
            name="amount"
            onChange={calculateMoney}
          />
        </div>

        {/*For fat% the product  */}
        <div>
          <label htmlFor="fat" className="text-blue-600 text-xl">
            Enter FAT Percentage Of The Batch
          </label>
          <input
            type="number"
            placeholder="Enter Fat %"
            className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-gray-400"
            name="fat"
            onChange={calculateSnfValue}
            ref={fat}
          />
        </div>

        {/*For clr the product  */}
        <div className="">
          <label htmlFor="clr" className="text-blue-600 text-xl">
            Enter CLR Value Of The Batch
          </label>
          <input
            type="number"
            placeholder="Enter CLR Value"
            className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-gray-400"
            name="clr"
            onChange={calculateSnfValue}
            ref={clr}
          />
        </div>

        {/* for vechile Number */}
        <div className="">
          <label htmlFor="vechileNumber" className="text-blue-600 text-xl">
            Select Vechile Number
          </label>

          <select
            className="w-full outline-none h-12 border-2 rounded-md cursor-pointer px-4"
            name="vechileNumber"
          >
            {selectedVendor.vechileNumber.map((number) => (
              <option value={number} key={number}>
                {number}
              </option>
            ))}
            <option value="New" className="cursor-pointer">
              New Vechile
            </option>
          </select>
        </div>

        {/*For SNF  */}
        <div className="">
          <label htmlFor="snf" className="text-blue-600 text-xl">
            SNF Value is :
          </label>
          <p className="border-2 text-gray-400 p-2 rounded-sm cursor-not-allowed select-none">
            {snfValue}
          </p>
        </div>

        {/*For CalculatedMoney  */}
        <div className="">
          <label htmlFor="money" className="text-blue-600 text-xl">
            Net Amount For Purchase is :
          </label>
          <p className="border-2 text-gray-400 p-2 rounded-sm cursor-not-allowed select-none">
            {money}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PurchaseMilk;

// ,
// "name":"",
//  "rate":,
// "phoneNumber":["",""],
// "vechileNumber":["","",""],
// "balanceAmount"
