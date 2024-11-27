import React from "react";
import ClientComponent from "./ClientComponent";
import axios from "axios";
import { useRef } from "react";

function PurchaseForm() {

  const refArray= useRef([]);
  // function to clear form values only after data saved in db
  function clearForm()
  {
    refArray.current.forEach((element)=>{
      element.value="";
    });
    
  }

  function handleSubmit(e)
  {
    // console.log(e.target);
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    console.log(data);
    const reqUrl =
      `${import.meta.env.VITE_DB_URL}/Purchase/`;


    // For sending data to db
    axios
      .post(reqUrl, data)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          // If the status code is in the success range (200-299), the request was successful
          console.log("Request successful:", response.data);
          alert(`Data Saved Successfully in db`);
          clearForm();
        }
      })
      .catch((error) => {
        // Handle errors (non-2xx status codes or network errors)
        console.error("Request failed:", error.response || error.message);
        alert(`Failure:${error}`);
      });

    //  For sending data to spreadsheet
    fetch(`${import.meta.env.VITE_PURCHASE_SHEET_URL}`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          data: [
              data
          ]
      })
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
  
  }
  return (
    <form className="gap-6 flex flex-col w-100" onSubmit={handleSubmit}>
      {/* for client Name */}
      <div><ClientComponent/></div>
      {/* for Product Details */}
      <div className="grid grid-cols-1 gap-6 w-full sm:grid-cols-2">

        {/*For Quantity*/}
        <div>
          <label htmlFor="quantity" className="text-blue-600">Quantity
          </label>
          <input
            type="text"
            placeholder="Enter Quantity in Liters"
            className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-gray-400"
            name="quantity"
            ref={ (el)=>refArray.current[0]=el }
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
            ref={ (el)=>refArray.current[1]=el }
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
            ref={ (el)=>refArray.current[2]=el }
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
            ref={ (el)=>refArray.current[3]=el }
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
            ref={ (el)=>refArray.current[4]=el }
          />
        </div>

        {/*For Adulteration */}
        <div className="grid">
          <label htmlFor="adulteration" className="text-blue-600">Adulteration
          </label>
          <select className="border-2 rounded-sm h-10 outline-none w-full cursor-pointer text-gray-400 bg-white" name="adulteration"
          ref={ (el)=>refArray.current[5]=el }>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Timestamp  */}
        <div>
          <label htmlFor="timeStamp" className="text-blue-600">TimeStamp
          </label>
          <input
            type="date"
            placeholder="Enter Timestamp"
            className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-gray-400 bg-white"
            name="timeStamp"
            ref={ (el)=>refArray.current[6]=el }
          />
        </div>

        {/* what to do ? */}
        <div className="grid">
          <label htmlFor="whatToDo" className="text-blue-600">What To Do?
          </label>
          <select className="border-2 rounded-sm h-10 outline-none w-full cursor-pointer text-gray-400 bg-white" name="whatToDo" ref={ (el)=>refArray.current[7]=el }>
            <option value="Accept">Accept</option>
            <option value="Reject">Reject</option>
          </select>
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
