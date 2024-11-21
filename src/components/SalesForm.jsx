import axios from "axios";
import React from 'react'
import { useEffect, useState } from 'react';
import LoadingForm from './LoadingForm';

function SalesForm() {
  const [products, setProducts]=useState(null);
  const [loading, setLoading]=useState(true);

  if(loading)
    {
        return <LoadingForm/>
    }

  // To Fetch Product Name from the server
  useEffect(()=>{
     axios.get("https://gfoerp-mern-api.vercel.app/Products/")
     .then((response)=>
      {
        console.log(response.data.data)
         setProducts(response.data.data);
         setLoading(false);
      })
     .catch(()=>
      {
         alert(`Server Problem`);
      });
  },[]);

  return (
    <form>

     {/* for client Name */}
     <div>

     </div>
    
     {/* heading */}
     <h1 className="text-2xl font-bold text-orange-600">Quantity</h1>

     {/* for quantity */}
     <div className="grid ">
         
     </div>

    </form>
  )
}

export default SalesForm