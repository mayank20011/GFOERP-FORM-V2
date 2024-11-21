import { useState } from "react";
import AddDataForm from "./components/AddDataForm";
import PurchaseForm from "./components/PurchaseForm";
import SalesForm from "./components/SalesForm";

function App() {

  const [selectedForm, setSelectedForm]=useState('purchaseForm');
  // salesForm and addDataForm value is to show other two form 

  // function to display sales form
  function showSalesForm()
  {
    setSelectedForm("salesForm")
  }

  // function to display purchase form
  function showPurchaseForm()
  {
    setSelectedForm("purchaseForm");
  }

  // function to display addData Form
  function showAddDataForm()
  {
     setSelectedForm("addDataForm");
  }

  return (
    // div for background
    <div className="min-h-screen w-full bg-gray-200 flex items-center justify-center">

      {/* This div will contain button and forms */}
      <div className="w-4/5 bg-white space-y-6 p-6 md:p-8 md:w-3/5 md:space-y-12">
        
        {/* Buttons for navigation */}
        <ul className="flex justify-center space-x-5">
          <li className="text-sm md:text-xl text-white font-bold px-8 py-2 bg-blue-700 rounded-sm cursor-pointer hover:scale-110 transition duration-200" onClick={showSalesForm}>Sale</li>
          <li className="text-sm md:text-xl text-white font-bold px-8 py-2 bg-orange-600 rounded-sm cursor-pointer hover:scale-110 transition duration-200" onClick={showPurchaseForm}>Purchase</li>
          <li className="text-sm md:text-xl text-white font-bold px-8 py-2 bg-blue-700 rounded-sm cursor-pointer hover:scale-110 transition duration-200" onClick={showAddDataForm}>Add Data</li>
        </ul>

        {/* horizontal line */}
        <div className="w-full border"></div>

        {/* container to hold 3 different forms based on the click */}

        <div>
           { selectedForm === "purchaseForm"? <PurchaseForm/>: selectedForm ==="salesForm" ? <SalesForm/> :<AddDataForm/>}
        </div>

      </div>

    </div>
  )
}

export default App
