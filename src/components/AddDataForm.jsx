import React from "react";

function AddDataForm() {
  return (
    <div className="grid gap-6 w-full">
      {/* For Client Name */}
      <div className="flex w-full gap-4 flex-col md:flex-row">
        <div className="w-full md:w-4/5">
          <label htmlFor="clientName" className="text-blue-600">
            Add Client
          </label>
          <input
            type="text"
            placeholder="Enter Client Name ..."
            className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-gray-400"
            name="dateOfOrder"
          />
        </div>
        <button className="w-fit md:w-1/5
        bg-orange-600 text-white font-bold self-end px-3 h-10 rounded-lg hover:scale-95 transition duration-300">Add Client</button>
      </div>
    </div>
  );
}

export default AddDataForm;
