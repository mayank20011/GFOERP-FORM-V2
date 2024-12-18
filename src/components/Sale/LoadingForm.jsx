import React from "react";

function LoadingForm() {
  return (
    <div className="w-full mx-auto">
      <div className="animate-pulse space-y-6">
        <div className="w-full flex space-x-8">
          <div className="bg-slate-300 w-1/2 h-12 rounded-md"></div>
          <div className="bg-slate-300 w-1/2 h-12 rounded-md"></div>
        </div>

        <div className="bg-slate-300 w-4/5 h-10 rounded-md"></div>

        <div className="grid grid-cols-2 gap-5">
          <div className="bg-slate-300 h-10 rounded-md"></div>
          <div className="bg-slate-300 h-10 rounded-md"></div>
          <div className="bg-slate-300 h-10 rounded-md"></div>
          <div className="bg-slate-300 h-10 rounded-md"></div>
          <div className="bg-slate-300 h-10 rounded-md"></div>
          <div className="bg-slate-300 h-10 rounded-md"></div>
          <div className="bg-slate-300 h-10 rounded-md"></div>
          <div className="bg-slate-300 h-10 rounded-md"></div>
          <div className="bg-slate-300 h-10 rounded-md"></div>
          <div className="bg-slate-300 h-10 rounded-md"></div>
        </div>

        <div
          className="bg-slate-300 w-40 mx-auto h-12 rounded-md -mb-5"
          style={{ right: "30%" }}
        >
        </div>
      </div>
    </div>
  );
}

export default LoadingForm;
