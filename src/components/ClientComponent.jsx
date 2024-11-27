import React from "react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import styles from "./ClientComponent.module.css";
import LoadingClientname from "./LoadingClientname.jsx";

function ClientComponent() {

  // For input tag
  const clientNameInput = useRef(null);

  // clentNames will store the data from api
  const [clientNames, setClientNames] = useState(null);

  // For list opening and closing
  const [openList, setOPenList] = useState(false);

  // for loading form
  const [loading, setLoading]= useState(true);

  // To Store coppy of clentNames
  const [copyClientNames, setCopyClientNames]=useState(null);
  
  //Hook will run when component will get rendered
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_DB_URL}/Client/`)
      .then((response) => {
        let names = [];
        response.data.data.forEach((obj) => {
          names.push(obj.clientName);
        });
        setClientNames(names);
        setCopyClientNames(names);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(`Server Problem`);
      });
  }, []);

  // onClick on clientNames from clientNames click
  function clientNameClick(e) {
    clientNameInput.current.value = e.target.innerHTML;
    setOPenList(false);
  }

  // onCLick on input 
  function getAllClientsName() {
    if (openList) {
      setOPenList(false);
    } else {
      setOPenList(true);
    }
  }

  // onChange function 
  function searchClientByinput(e) {

    if(e.target.value=="")
      {
        setOPenList(true);
      }

    const searchedValue = e.target.value.toLowerCase();
    const foundnames = clientNames.filter((name) => {
      if(name.toLowerCase().startsWith(searchedValue))
        {
          return true;
        };
    });
    setCopyClientNames(foundnames);
    // setClientNames(foundnames);
  }

  if(loading)
    {
      return <LoadingClientname/>
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
          name="clientName"
          ref={clientNameInput}
          onClick={getAllClientsName}
          onChange={searchClientByinput}
        />

        {/* To Hold List*/}
        {openList ? (
          <div className=" z-10 absolute w-full">
            {/* for clientNames */}
            <div className={`bg-white grid gap-2 mt-2 h-auto max-h-64 overflow-auto py-2 ${styles.scroller}`}>
              {copyClientNames
                ? copyClientNames.map((name, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 border-2 mx-0 cursor-pointer bg-green-600 rounded-md font-bold text-white h-fit"
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
