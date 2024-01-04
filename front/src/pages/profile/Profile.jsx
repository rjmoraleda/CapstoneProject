import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserProfile } from "../../services/index/users";
import { useSelector } from "react-redux";

import { stables } from "../../constants";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../components/MainLayout";

const Profile = (props) => {
   const { avatar } = props;
   const userState = useSelector((state) => state.user);
   const navigate = useNavigate();

   console.log("Avatar:", avatar);

   // fitching the user data from the database
   const {
      // data , isLoading , error is a property where
      //assign to profileData, profileIsLoading, profileError in short rename the data , isLoading , error
      data: profileData,
      // isLoading: profileIsLoading,
      // error: profileError,
   } = useQuery({
      //function run when the page is loaded
      queryFn: () => {
         return getUserProfile({ token: userState.userInfo.token });
      },
      queryKey: ["profile"],
   });

   console.log(profileData);

   return (
      <MainLayout>
         {userState.userInfo ? (
            <div>
               <img
                  src={stables.UPLOAD_FOLDER_BASE_URL + profileData?.avatar}
                  alt="Profile"
               />
               <p>{profileData?.name}</p>
               <p>{profileData?.email}</p>
               <p>{profileData?.role}</p>
               {/* <p>{new Date(profileData.createdAt).getDate()}</p> */}
            </div>
         ) : (
            <div>
               <button onClick={() => navigate("/login")} className="login">
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
      </MainLayout>
   );
};

export default Profile;
