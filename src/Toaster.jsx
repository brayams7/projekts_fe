import React from "react";
import { Flip, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Toaster = ({children}) => {
  return (
    <React.Fragment>
      {children}
      <ToastContainer
        autoClose={1000}
        position={toast.POSITION.BOTTOM_LEFT}
        transition={Flip}
      />
    </React.Fragment>
  );
};

export default Toaster;
