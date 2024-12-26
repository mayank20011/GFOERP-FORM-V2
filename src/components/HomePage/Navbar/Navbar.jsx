import React from "react";
import Logo from "../../../img/logo.png";
import styles from "./Navbar.module.css";
import { useRef } from "react";

function Navbar({ roles, setShowComponent }) {

  const navLinks=useRef(null);
  
  function navIn()
  {
    navLinks.current.classList.toggle(styles.navlinks);
  }

  function navButtonClicked(e) {
    if(e.target.id!="dashBoard"){
   setShowComponent(e.target.id)}
   else{
    window.location.href='https://gfoerp-dashboard.vercel.app/';
   }
  }

  function navDivClick()
  {
    navLinks.current.classList.toggle(styles.navlinks);
  }

  return (
    // for navbar
    <div className="flex w-full border-3 items-center gap-2 justify-between">
      {/* for logo */}
      <img
        src={Logo}
        alt="Vardan Farms Logo"
        className="h-20 cursor-pointer hover:scale-105 transition xxs:h-12"
        style={{ filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))" }}
      />
      <div className={`flex flex-col absolute bg-white font-bold top-0 p-8 z-50 w-1/2 opacity-95 min-w-[300px] min-h-screen right-0 xl:grow xl:gap-2 xl:flex-row xl:min-h-fit xl:w-fit xl:static xl:max-w-auto transition duration-300 px-0 ${styles.navlinks} border-l-2 xl:border-l-0 px-6 xl:px-0`} ref={navLinks} onClick={navDivClick}>
        {roles.map((role, index) => (
          <button
            className={`font-bold text-xl py-6 ${ index === roles.length -1 ? "" :"border-b-2"} text-left hover:scale-95 transition capitalize xl:px-6 xl:py-3 xl:text-white xl:border-b-0 xl:bg-blue-600 xl:rounded-md xl:shadow-lg xl:shadow-gray-500 xxs:text-base`}
            key={role}
            id={role}
            onClick={navButtonClicked}
          >
            {role}
          </button>
        ))}
      </div>

      <i className="fa-solid fa-burger text-4xl font-bold cursor-pointer xl:hidden xxs:text-3xl" onClick={navIn}></i>
    </div>
  );
}

export default Navbar;
