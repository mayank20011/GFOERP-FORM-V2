import React from "react";

function ProductContainer({ selectedVendor }) {
  
  return (
    <div className="space-y-6 xxs:space-y-4">
      <h1 className="text-3xl font-bold text-orange-600 xxs:text-lg">Select Quantity</h1>
      <div className="grid grid-cols-1 gap-6 w-full sm:grid-cols-2 xxs:gap-4">
        {selectedVendor.products.map((product, index) => (
          <div key={product.productName}>
            <label htmlFor={`${product.productName}`} className="text-blue-600">
              {`${product.productName}`}
            </label>
            <input
              type="number"
              placeholder="Enter Quantity ..."
              className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer"
              name={`${product.productName}`}
              onWheel={(e)=>{e.target.blur()}}
              step="any"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductContainer;
