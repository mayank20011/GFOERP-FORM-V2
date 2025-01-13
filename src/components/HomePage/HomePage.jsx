import { useState } from "react";
import Navbar from "./Navbar/Navbar.jsx";
import Body from "./Body/Body.jsx";
import { useEffect } from "react";
function HomePage({ roles }) {

  // 7 useStates for 7 components
  const [showComponent, setShowComponent] = useState(null);

  useEffect(()=>{
    // setShowComponent(roles[0]);  
    setShowComponent(JSON.parse(sessionStorage.getItem("login")).roles[0]); 
  },[]);

  return (
    // div to hold homepage
    <div className="mx-12 py-12 min-h-screen xxs:mx-6 xxs:py-6">
      <Navbar roles={roles} setShowComponent={setShowComponent} />
      <Body showComponent={showComponent} />
    </div>
  );
}

export default HomePage;
