import React from "react";
import { Link } from "react-router-dom";
import "./components.css";

const BreadCrumbs = ({ data }) => {
   return (
      <div className="bread-crumbs">
         {data.map((item, index) => (
            <div className="bread-crumbs-details" key={index}>
               <Link to={item.link}>{item.name}</Link>
               {/* Generating a Information from the data */}
               {index !== data.length - 1 && <span>/</span>}
               {/* //This well create a slash but not include on the end */}
            </div>
         ))}
      </div>
   );
};

export default BreadCrumbs;
