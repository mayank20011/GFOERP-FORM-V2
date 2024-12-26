import React from "react";
import { useState, useRef, useEffect } from "react";

function PurchaseMilk({ selectedVendor }) {
  let snf = 0;

  // for snf value
  const [snfValue, setSnfValue] = useState(0);
  // for money
  const [money, setMoney] = useState(0);

  // to get fat and clr value from the input field
  const clr = useRef(0);
  const fat = useRef(0);
  const milkAmount = useRef(0);
  const err1=useRef(null);
  const err2=useRef(null);
  const err3=useRef(null);

  useEffect(() => {
  }, [snfValue]);

  // To Calculate Money
  function calculateMoney(e) {
    e.stopPropagation();
    err1.current.textContent='';
    if(clr.current.value.length==0 || fat.current.value.length==0 || milkAmount.current.value.length==0)
      {
         if(clr.current.value.length===0)
         {
             err3.current.textContent=clr.current.validationMessage;
          }
         if(fat.current.value.length===0)
          {
             err2.current.textContent=fat.current.validationMessage;
          }
         if(milkAmount.current.value.length===0){
            err1.current.textContent=milkAmount.current.validationMessage;
         }
      }
    else{
    const moneycalculated =
      (milkAmount.current.value / 100) *
      (fat.current.value * selectedVendor.fatRate +
        selectedVendor.snfRate * snfValue);
    setMoney(moneycalculated);
  }
  }

  // To calculate and update snf value on ui
  function calculateSnfValue() {
    setMoney(0);
    err2.current.textContent='';
    err3.current.textContent='';
    snf = clr.current.value / 4 + 0.2 * fat.current.value + 0.66;
    setSnfValue(snf);
  }

  if (selectedVendor == null) {
    return <p>Please Select a Vendor First</p>;
  }
  
  return (
    <div className="space-y-4">
      {/* heading */}
      <h1 className="text-2xl text-green-600 font-bold xxs:text-lg">Lets Purchase</h1>

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
            ref={milkAmount}
            required
          />
          <span className="text-red-600" ref={err1}></span>
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
            required
            step="0.001"
            onWheel={(e)=> e.target.blur()}
          />
          <span className="text-red-600" ref={err2}></span>
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
            required
            step="0.001"
            onWheel={(e)=> e.target.blur()}
          />
          <span className="text-red-600" ref={err3}></span>
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
        <div className="grid">
          <label htmlFor="snf" className="text-blue-600 text-xl">
            SNF Value is :
          </label>
          <input className="border-2 text-gray-400 p-2 rounded-sm cursor-not-allowed outline-none select-none"
          value={snfValue}
          readOnly
          name="snfValue">
          </input>
        </div>

        {/*For CalculatedMoney  */}
        <div className="">
          <label htmlFor="money" className="text-blue-600 text-xl">
            Net Amount For Purchase is :
          </label>
          <div className="flex gap-2 xxs:grid">
            <input className="border-2 text-gray-400 p-2 rounded-sm cursor-not-allowed select-none grow"
            value={money}
            readOnly
            name="money">
            </input>

            <button
              onClick={calculateMoney}
              className="bg-orange-600 text-white p-2 rounded-md cursor-pointer hover:scale-95 transition xxs:w-fit"
              type="button"
            >
              Calculate Amount
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseMilk;
