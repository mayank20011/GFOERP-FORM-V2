import { useState } from "react";
import AddDataForm from "./components/AddDataForm";
import PurchaseForm from "./components/PurchaseForm";
import SalesForm from "./components/SalesForm";
import styles from "./App.module.css";
import logo from "./img/logo.png";
// import backgroundImage from "./img/grass.jpg"

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
      className={`min-h-screen w-full flex items-center justify-center  bg-center bg-cover bg-no-repeat w-100 ${styles.backgroundImage}`}
    >

      {/* This div will contain button and forms */}
      <div className="mx-4 w-full opacity-95 grid gap-4 my-12 p-6 md:space-y-6 md:p-14 relative bg-gray-100 md:mx-0 md:w-4/5 lg:w-2/3 xl:w-1/2">
        
        <img src={logo} className="hidden sm:block absolute -top-8 -left-8 w-36 -rotate-45 hover:scale-105 transition duration-300 cursor-pointer md:-left-10 md:w-48 sm:-left-20 md:-top-16"/>

      <div className="absolute p-2 px-4 text-md md:px-4 md:py-3 md:text-3xl text-white bg-green-600" style={{"right":"48%", "top":"-30px"}}>V</div>
        {/* Form Heading */}
         <h1 className="text-center text-5xl font-bold text-green-600">GFO ERP</h1>

        {/* Buttons for navigation */}
        <ul className="flex justify-center space-x-2 sm:space-x-5">
          <li
            className={`px-0 text-xs md:text-md text-white font-bold sm:px-8 py-4 ${selectedForm === "salesForm"? "bg-orange-600": "bg-blue-700"} rounded-sm cursor-pointer hover:scale-110 transition duration-200 w-1/3 text-center sm:text-sm`}
            onClick={showSalesForm}
          >
            Sale
          </li>
          <li
            className={`px-0 text-xs md:text-md text-white font-bold sm:px-8 py-4 ${selectedForm === "purchaseForm"? "bg-orange-600": "bg-blue-700"} rounded-sm cursor-pointer hover:scale-110 transition duration-200 w-1/3 text-center sm:text-sm`}
            onClick={showPurchaseForm}
          >
            Purchase
          </li>
          <li
            className={`px-0 text-xs md:text-md text-white font-bold sm:px-8 py-4 ${selectedForm === "addDataForm"? "bg-orange-600": "bg-blue-700"} rounded-sm cursor-pointer hover:scale-110 transition duration-200 w-1/3 text-center sm:text-sm`}
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
