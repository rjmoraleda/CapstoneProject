import React from "react";

import SidebarLeft from "../../../components/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight";
import "./container.css";
import Articles from "./Articles";

const Main = () => {
   return (
      <section className="container">
         <div className="sidebar-left sticky">
            <SidebarLeft />
         </div>

         <div className="article-card">
            <Articles />
         </div>

         <div className="sidebar-right sticky">
            <SidebarRight />
         </div>
      </section>
   );
};

export default Main;
