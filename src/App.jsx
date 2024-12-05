import { useState } from "react";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
function App() {
  const [roles, setRoles] = useState(null);
  // const [roles, setRoles] = useState(['sale', 'purchase', 'stock', 'inventory', 'labTesting', 'batchCoding']);
  return (
    // div for screen background color
    <div className="sm:container mx-auto w-full min-h-screen">
      {roles ? <HomePage roles={roles} /> : <LoginForm setRoles={setRoles} />}
    </div>
  );
}

export default App;
