import React, { useState, useEffect, useRef } from "react";
import { images } from "../constants";
import "./components.css";
import { FaBars, FaTimes, FaAngleDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/user";
import { useNavigate } from "react-router-dom";

const Header = () => {
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef(null);

   const toggleDropdown = () => {
      setIsOpen(!isOpen);
   };

   const closeDropdown = (event) => {
      // Close the dropdown if the clicked element is outside of it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
         setIsOpen(false);
      }
   };

   useEffect(() => {
      // Add click event listener to the document
      document.addEventListener("click", closeDropdown);

      // Clean up the event listener when the component unmounts
      return () => {
         document.removeEventListener("click", closeDropdown);
      };
   }, []);

   const navigate = useNavigate();
   const navRef = React.useRef();
   const userState = useSelector((state) => state.user);

   const showNavbar = () => {
      navRef.current.classList.toggle("responsive_nav");
   };
   const dispatch = useDispatch();
   const logoutHandler = () => {
      dispatch(logout());
   };

   return (
      <section>
         <header className="header">
            <div className="logo">
               <a href="/">
                  <img src={images.Logo} alt="Logo" />
               </a>
            </div>

            <div className="groupSearch">
               <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                  <g>
                     <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                  </g>
               </svg>
               <input placeholder="Search" type="search" className="input" />
            </div>
            <div className="buttons">
               <ul>
                  {!userState.userInfo && (
                     <li>
                        <a href="/register" className="signUP">
                           Register
                        </a>
                     </li>
                  )}
               </ul>
               <nav ref={navRef} className="navbar">
                  <a href="/#">Home</a>
                  <a href="/#">Activity</a>
                  <a href="/#">Topics</a>
                  <a href="/#">About</a>
                  {userState.userInfo ? (
                     <div className="dropdown" ref={dropdownRef}>
                        <button
                           onClick={toggleDropdown}
                           className="profile-nav"
                        >
                           Account <FaAngleDown />
                        </button>
                        {isOpen && (
                           <div className="dropdown-content relative">
                              <button
                                 className="dp-links"
                                 onClick={() => navigate("/edit-profile")}
                              >
                                 Edit Profile
                              </button>
                              <button
                                 className="dp-links"
                                 onClick={logoutHandler}
                              >
                                 Logout
                              </button>
                           </div>
                        )}
                     </div>
                  ) : (
                     <div>
                        <button
                           onClick={() => navigate("/login")}
                           className="login"
                        >
                           Login
                        </button>
                        <button
                           onClick={() => navigate("/register")}
                           className="signup-hidden"
                        >
                           Register
                        </button>
                     </div>
                  )}
                  <button
                     className="nav-btn nav-close-btn"
                     onClick={showNavbar}
                  >
                     <FaTimes />
                  </button>
               </nav>

               <button className="nav-btn" onClick={showNavbar}>
                  <FaBars />
               </button>
            </div>
         </header>
      </section>
   );
};

export default Header;
