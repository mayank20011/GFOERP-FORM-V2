import React from 'react'

function Remark({selectedVendor}) {

  if(selectedVendor==null){
    return <p>Please Select a Vendor First</p>
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl capitalize text-red-400">Reason For Failed Batch?</h1>
      <textarea name="remark" id="remark" className="border-2 w-full outline-none p-2 h-80 resize-none" placeholder="Enter Remark..."></textarea>
    </div>
  )
}

export default Remark