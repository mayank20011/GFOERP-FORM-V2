import React from "react";
import PurchaseForm from "./PurchaseForm";
import SalesForm from "./SalesForm";
import Stock from "./Stock";
import Inventory from "./Inventory";
import Labtesting from "./Labtesting";
import BatchCoding from "./BatchCoding";
import Dashboard from "./Dashboard";

function Body({ showComponent }) {
  return (
    <div className="py-6">
      {showComponent == "sale" ? (
        <SalesForm />
      ) : showComponent == "purchase" ? (
        <PurchaseForm />
      ) : showComponent=="stock" ? (
       <Stock/>
      ) : showComponent == "inventory" ? (
        <Inventory/>
      ): showComponent == "labTesting" ? (
        <Labtesting/>
      ): showComponent == "batchCoding" ? (
        <BatchCoding/>
      ): showComponent == "dashBoard" ? (
        <Dashboard/>
      ):""}
    </div>
  );
}

export default Body;
