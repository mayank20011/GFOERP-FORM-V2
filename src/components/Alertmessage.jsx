import { useEffect, useState } from "react";
import styles from "./Alertmessage.module.css";

function Alertmessage({ message, successorfailure }) {
  
const [visibility, setVisibility] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibility(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visibility) {
    return null;
  }

  return (
    <div
      className={`${
        successorfailure === "success"
          ? "bg-green-400 text-green-700"
          : "bg-red-400 text-red-7oo"
      } text-md p-2 rounded-sm w-3/5 absolute z-20 top-20 text-center md:w-2/5 lg:w-1/4 ${
        styles.alert
      }`}
    >
      {successorfailure === "success" ? (
        <i className="fa-solid fa-check pr-2"></i>
      ) : (
        <i className="fa-solid fa-x pr-2"></i>
      )}
      {message}
    </div>
  );
}

export default Alertmessage;
