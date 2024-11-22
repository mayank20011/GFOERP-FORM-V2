import { useState } from "react";
import AddDataForm from "./components/AddDataForm";
import PurchaseForm from "./components/PurchaseForm";
import SalesForm from "./components/SalesForm";
import "./app.css";
import logo from "./img/logo.png";
function App() {
  const [selectedForm, setSelectedForm] = useState("purchaseForm");

  // salesForm and addDataForm value is to show other two form

  // function to display sales form
  function showSalesForm() {
    setSelectedForm("salesForm");
  }

  // function to display purchase form
  function showPurchaseForm() {
    setSelectedForm("purchaseForm");
  }

  // function to display addData Form
  function showAddDataForm() {
    setSelectedForm("addDataForm");
  }

  return (
    // div for background
    <div
      className="min-h-screen w-full flex items-center justify-center bg-custom-image bg-center bg-cover bg-no-repeat"
      style={{ filter: "blur(0px)" }}
    >
      {/* This div will contain button and forms */}
      <div className="w-4/5 opacity-95 grid gap-4 my-12 p-6 md:w-1/2 md:space-y-6 md:p-14 relative bg-gray-100">
        
        <img src={logo} className="absolute -top-16 -left-20 w-48 -rotate-45 hover:scale-105 transition duration-300 cursor-pointer md:-top-10 md:-left-10"/>

      <div className="absolute p-2 px-4 text-md md:px-4 md:py-3 md:text-3xl text-white bg-green-600" style={{"right":"48%", "top":"-30px"}}>V</div>
        {/* Form Heading */}
         <h1 className="text-center text-5xl font-bold text-green-600">GFO ERP</h1>

        {/* Buttons for navigation */}
        <ul className="flex justify-center space-x-5">
          <li
            className={`text-sm md:text-md text-white font-bold px-8 py-4 ${selectedForm === "salesForm"? "bg-orange-600": "bg-blue-700"} rounded-sm cursor-pointer hover:scale-110 transition duration-200 w-1/3 text-center`}
            onClick={showSalesForm}
          >
            Sale
          </li>
          <li
            className={`text-sm md:text-md text-white font-bold px-8 py-4 ${selectedForm === "purchaseForm"? "bg-orange-600": "bg-blue-700"} rounded-sm cursor-pointer hover:scale-110 transition duration-200 w-1/3 text-center`}
            onClick={showPurchaseForm}
          >
            Purchase
          </li>
          <li
            className={`text-sm md:text-md text-white font-bold px-8 py-4 ${selectedForm === "addDataForm"? "bg-orange-600": "bg-blue-700"} rounded-sm cursor-pointer hover:scale-110 transition duration-200 w-1/3 text-center`}
            onClick={showAddDataForm}
          >
            Add Data
          </li>
        </ul>

        {/* horizontal line */}
        <div className="w-full border border-orange-600"></div>

        {/* container to hold 3 different forms based on the click */}

        <div>
          {selectedForm === "purchaseForm" ? (
            <PurchaseForm />
          ) : selectedForm === "salesForm" ? (
            <SalesForm />
          ) : (
            <AddDataForm />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
