import React from 'react'
import { toast } from 'react-toastify';

///////////////Toast Notifications/////////////////////
const pageTitle = "Home";

// const success = (msg:string) => toast(msg, {
//     position: "top-right", // Set the position of the toast
//     autoClose: 1000, // Auto close the toast after 2 seconds
//     hideProgressBar: true, // Hide the progress bar
//     closeOnClick: false, // Don't close the toast when clicked
//     draggable: false, // Disable dragging the toast
//     style: { background: "green", color: "white" }
//   });

const success = (msg: string) => toast.success(msg, {
  position: "top-right",
  theme: "colored",
  style: { background: "green", color: "white" }
});

function error(msg: string) {
    return toast.error(msg, {
      position: "top-right",
      theme: "colored",
    });
  }


function warning(msg: string) {
    return toast.warning(msg, {
      position: "top-right",
      theme: "colored",
      style: { background: "orange", color: "white" }
    });
}

function info(msg: string) {
    return toast.info(msg, {
      position: "top-right",
      theme: "colored",
      style: { background: "blue", color: "white" } 
    });
}

export const globalService ={
    success,
    error,
    warning,
    info,
}