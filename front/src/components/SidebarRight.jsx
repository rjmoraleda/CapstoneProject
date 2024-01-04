import React from "react";
import "./components.css";

import { images } from "../constants";
const SidebarRight = () => {
   return (
      <section className="sidebarRight">
         <div className="tags">
            <h2>Popular Tags</h2>
            <ul>
               <li>
                  <a href="/" className="development">
                     #development
                  </a>
               </li>
               <li>
                  <a href="/" className="github">
                     #github
                  </a>
               </li>
               <li>
                  <a href="/" className="javascript">
                     #javascript
                  </a>
               </li>
               <li>
                  <a href="/" className="html">
                     #html
                  </a>
               </li>
               <li>
                  <a href="/" className="css">
                     #css
                  </a>
               </li>
               <li>
                  <a href="/" className="tip">
                     #tip
                  </a>
               </li>
            </ul>
         </div>

         <div className="development-topics">
            <h2>#development</h2>
            <div className="post-topics">
               <p className="post-topics-title">
                  5 PRO Tips for an Unbeatable GitHub README!
               </p>

               <div className="infotext-profile post-profile-img">
                  <a href="/" className="comments">
                     20 Comments
                  </a>
                  <img
                     src={images.theProfile}
                     className="profile"
                     alt="The Profile"
                  />
               </div>
            </div>

            <div className="post-topics">
               <p className="post-topics-title">
                  5 PRO Tips for an Unbeatable GitHub README!
               </p>

               <div className="infotext-profile post-profile-img">
                  <a href="/" className="comments">
                     20 Comments
                  </a>
                  <img
                     src={images.theProfile}
                     className="profile"
                     alt="The Profile"
                  />
               </div>
            </div>

            <div className="post-topics">
               <p className="post-topics-title">
                  5 PRO Tips for an Unbeatable GitHub README!
               </p>

               <div className="infotext-profile post-profile-img">
                  <a href="/" className="comments">
                     20 Comments
                  </a>
                  <img
                     src={images.theProfile}
                     className="profile"
                     alt="The Profile"
                  />
               </div>
            </div>

            <div className="post-topics">
               <p className="post-topics-title">
                  5 PRO Tips for an Unbeatable GitHub README!
               </p>

               <div className="infotext-profile post-profile-img">
                  <a href="/" className="comments">
                     20 Comments
                  </a>
                  <img
                     src={images.theProfile}
                     className="profile"
                     alt="The Profile"
                  />
               </div>
            </div>
            <div className="post-topics">
               <p className="post-topics-title">
                  5 PRO Tips for an Unbeatable GitHub README!
               </p>

               <div className="infotext-profile post-profile-img">
                  <a href="/" className="comments">
                     20 Comments
                  </a>
                  <img
                     src={images.theProfile}
                     className="profile"
                     alt="The Profile"
                  />
               </div>
            </div>
         </div>
      </section>
   );
};

export default SidebarRight;
