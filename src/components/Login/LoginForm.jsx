import React from "react";
import axios from "axios";
import { useState, useRef } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm({ setRoles }) {
  // for password field
  const pass = useRef(null);

  // for login name
  const name = useRef(null);

  // for loading
  const [loading, setLoading] = useState(false);

  // to send name and data to db
  function handleFormSubmit(e) {
    e.preventDefault();
    const loager = {};
    loager[`name`] = name.current.value.trim();
    loager[`password`] = pass.current.value.trim();

    axios
      .post("https://gfo-erp-backend-api.vercel.app/GFOERP/UserLogin/", loager)
      .then((response) => {
        if (response.data.authorization) {
          setLoading(false);
          setRoles(response.data.roles);
          sessionStorage.setItem(
            "login",
            JSON.stringify({
              handler: `${loager.name}`,
              roles: response.data.roles,
            })
          );
          console.log(response.data.roles);
        } else {
          setLoading(false);
          toast.warning("User Validation Failed");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Server Problem or Validation Failed");
        console.log(`Error From Server While Login in is: `);
        console.log(err);
      });
  }

  // for button clicked
  function submitButtonClicked(e) {
    setLoading(true);
    handleFormSubmit(e);
  }

  // Function to hide and show password
  function hideShowPassword() {
    if (pass.current.type == "text") {
      pass.current.type = "password";
    } else {
      pass.current.type = "text";
    }
  }

  return (
    // to center form div
    <div className="min-h-screen w-full flex items-center justify-center">
      {/* Toast Container for allert */}
      <ToastContainer
        className="pt-2 sm:w-4/5 mx-3"
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        style={{ maxWidth: "90%", margin: "20px 10px" }}
      />

      {/* to contain whole form */}
      <div
        className="grid gap-6 px-3 w-4/5 shadow-2xl shadow-green-600 rounded-lg border-2 border-gray-200 py-8"
        style={{ maxWidth: "400px" }}
      >
        {/* heading */}
        <h1 className="text-center text-4xl text-green-600 font-bold">Login</h1>

        {/* for login */}
        <form className="grid gap-3" onSubmit={handleFormSubmit}>
          {/* for name */}
          <input
            type="text"
            placeholder="Enter Name"
            className="p-3 outline-none border-2 rounded-md w-full cursor-pointer"
            ref={name}
          />

          {/* div for password */}
          <div className="relative">
            {/* for password */}
            <input
              type="password"
              placeholder="Enter Password"
              className="p-3 outline-none border-2 rounded-md w-full cursor-pointer"
              ref={pass}
            />
            {/* for eye */}
            <i
              className="fa-regular fa-eye absolute top-4 right-3 cursor-pointer font-bold"
              onClick={hideShowPassword}
            ></i>
          </div>

          <button
            type="submit"
            className="text-white text-bold w-full p-3 bg-green-600 rounded-md hover:scale-95 transition"
            onClick={submitButtonClicked}
          >
            {loading ? (
              <div className="flex gap-2 justify-center items-center text-md">
                <i className="fa-solid fa-circle-notch animate-spin"></i>
                <p>
                  Processing
                  <span className="animate-ping font-extrabold">. . .</span>
                </p>
              </div>
            ) : (
              <div>Log In</div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
