import React from "react";
import PurchaseForm from "../../Purchase/PurchaseForm.jsx";
import SalesForm2 from "../../Sale/SalesForm2.jsx";
import SalesForm from "../../SalesForm.jsx";
import Stock from "../../Stock/Stock.jsx";
import Inventory from "../../Inventory/Inventory.jsx";
import Labtesting from "../../labTesting/Labtesting.jsx";
import BatchCoding from "../../BatchCoding/BatchCoding.jsx";
import Dashboard from "../../Dashboard.jsx";

function Body({ showComponent }) {
  return (
    <div className="py-6">
      {showComponent == "sale" ? (
        <SalesForm2 />
      ) : showComponent == "purchase" ? (
        <PurchaseForm />
      ) : showComponent == "stock" ? (
        <Stock />
      ) : showComponent == "inventory" ? (
        <Inventory />
      ) : showComponent == "labTesting" ? (
        <Labtesting />
      ) : showComponent == "batchCoding" ? (
        <BatchCoding />
      ) : showComponent == "dashBoard" ? (
        <Dashboard />
      ) : (
        ""
      )}
    </div>
  );
}

export default Body;
