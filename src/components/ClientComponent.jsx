import React from "react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import axios from "axios";

function ClientComponent() {
  const clientNameInput = useRef(null);
  const [clientNames, setClientNames] = useState(null);
  const [openList, setOPenList] = useState(false);

  
  //Hook will run when component will get rendered
  useEffect(() => {
    axios
      .get("https://gfoerp-mern-api.vercel.app/Client/")
      .then((response) => {
        let names = [];
        response.data.data.forEach((obj) => {
          names.push(obj.clientName);
        });
        setClientNames(names);
      })
      .catch((err) => {
        console.log(err);
        alert(`Server Problem`);
      });
  }, []);

  function clientNameClick(e) {
    clientNameInput.current.value = e.target.innerHTML;
    setOPenList(false);
  }
  function getAllClientsName() {
    if (openList) {
      setOPenList(false);
    } else {
      setOPenList(true);
    }
  }
  function searchClientByinput(e) {
    if(e.target.value=="")
      {
        setOPenList(true);
      }
    else{
      setOPenList(true);
    }
    const searchedValue = e.target.value.toLowerCase();
    const foundnames = clientNames.filter((name) => {
      if(name.toLowerCase().startsWith(searchedValue))
        {
          return true;
        };
    });
    setClientNames(foundnames);
  }

  return (
    <div className="grid grid-cols-1 gap-6 w-full relative">
      <div>
        <label htmlFor="clientName" className="text-blue-600">
          Enter ClientName
        </label>
        <input
          type="text"
          placeholder="Enter clientName ..."
          className="border-2 rounded-sm h-10 p-3 outline-none w-full cursor-pointer text-gray-400"
          name="quantity"
          ref={clientNameInput}
          onClick={getAllClientsName}
          onChange={searchClientByinput}
        />

        {/* To Hold List*/}
        {openList ? (
          <div className=" z-10 absolute w-full">
            {/* for clientNames */}
            <div className="bg-gray-200 grid gap-2 mt-2 h-auto max-h-64 overflow-auto py-2">
              {clientNames
                ? clientNames.map((name, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 border-2 mx-2 cursor-pointer bg-orange-600 rounded-md font-bold text-white h-fit"
                      onClick={clientNameClick}
                    >
                      {name}
                    </div>
                  ))
                : ""}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ClientComponent;
