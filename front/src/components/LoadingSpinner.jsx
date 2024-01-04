// LoadingSpinner.js
import React from "react";
import "./css/loadingspinner.css";

const LoadingSpinner = () => {
   return (
      <div className="loading">
         <div className="loader">
            <div className="face">
               <div className="circle"></div>
            </div>
            <div className="face">
               <div className="circle"></div>
            </div>
         </div>
      </div>
   );
};

export default LoadingSpinner;
