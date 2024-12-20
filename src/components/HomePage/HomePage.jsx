import { useState } from "react";
import Navbar from "./Navbar/Navbar.jsx";
import Body from "./Body/Body.jsx";
function HomePage({ roles }) {
  // 7 useStates for 7 components
  const [showComponent, setShowComponent] = useState(null);

  return (
    // div to hold homepage
    <div className="mx-12 py-12 min-h-screen">
      <Navbar roles={roles} setShowComponent={setShowComponent} />
      <Body showComponent={showComponent} />
    </div>
  );
}

export default HomePage;
