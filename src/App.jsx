import { useState } from "react";
import HomePage from "./components/HomePage/HomePage";
import LoginForm from "./components/Login/LoginForm";
import { ToastContainer } from "react-toastify";
import PagePdf from "./components/pdf/PagePdf.jsx";
import { PDFDownloadLink } from "@react-pdf/renderer";

function App() {
  const [roles, setRoles] = useState(null);
  return (
    // div for screen background color
    <div className="sm:container mx-auto w-full min-h-screen">
      <ToastContainer />
      {sessionStorage.getItem("login")!=null ? (
        <HomePage roles={roles} />
      ) : (
        <LoginForm setRoles={setRoles} />
      )}
    </div>
  );
}
 export default App;
// function App() {
//   return (
//     <div>
//       <PagePdf/>
//       {/* <h1>Generate PDF with React</h1>
//       <PDFDownloadLink document={<PagePdf />} fileName="Bill.pdf">
        
//         {({ blob, url, loading, error }) =>
//           loading ? "Loading document..." : "Download PDF"
//         }
//       </PDFDownloadLink> */}
//     </div>
//   );
// }
// export default App;
