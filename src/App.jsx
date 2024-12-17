import { useState } from "react";
import HomePage from "./components/HomePage/HomePage";
import LoginForm from "./components/Login/LoginForm";
function App() {
  const [roles, setRoles] = useState(null);
  return (
    // div for screen background color
    <div className="sm:container mx-auto w-full min-h-screen">
      {roles ? <HomePage roles={roles} /> : <LoginForm setRoles={setRoles} />}
    </div>
  );
}

export default App;
