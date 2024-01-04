import React, { useState } from "react";
import { createPortal } from "react-dom";
import { stables } from "../constants";
import { IoPersonCircleOutline } from "react-icons/io5";
import "./css/profilepicture.css";
import CropEasy from "./crop/CropEasy";
import { updateProfilePicture } from "../services/index/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { userActions } from "../store/reducers/userReducers";

const ProfilePicture = (props) => {
   const { avatar } = props;
   const queryClient = useQueryClient();
   const dispatch = useDispatch();
   const userState = useSelector((state) => state.user);
   const [openCrop, setOpenCrop] = useState(false);
   const [photo, setPhoto] = useState(null);

   const { mutate, isLoading } = useMutation({
      mutationFn: ({ token, formData }) => {
         return updateProfilePicture({
            token: token,
            formData: formData,
         });
      },
      onSuccess: (data) => {
         dispatch(userActions.setUserInfo(data));
         setOpenCrop(false);
         localStorage.setItem("account", JSON.stringify(data));
         queryClient.invalidateQueries(["profile"]);
         toast.success("Profile Photo is removed");
      },
      onError: (error) => {
         toast.error(error.message);
         console.log(error);
      },
   });

   // uploading the image/avatar
   const handleFileChange = (e) => {
      const file = e.target.files[0];
      setPhoto({ url: URL.createObjectURL(file), file });
      setOpenCrop(true);
   };
   // for deleting the image/avatar
   const handleDeleteImage = () => {
      if (window.confirm("Are you sure you want to delete this image?")) {
         try {
            const formData = new FormData();
            formData.append("profilePicture", undefined);

            mutate({ token: userState.userInfo.token, formData: formData });
         } catch (error) {
            toast.error(error.message);
            console.log(error);
         }
      }
   };

   return (
      <>
         {openCrop &&
            createPortal(
               <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
               document.getElementById("portal")
            )}
         <div className="profile-container">
            <div className="profile-picture">
               {/* Checking if the user have an avatar/profile picture
              from the uploads folder src={stables.UPLOAD_FOLDER_BASE_URL + avatar} */}
               <label htmlFor="profilePicture" className="profile-label">
                  {avatar ? (
                     <img
                        src={stables.UPLOAD_FOLDER_BASE_URL + avatar}
                        alt="Profile"
                        className="profile-img"
                     />
                  ) : (
                     <div className="profile-icon">
                        <IoPersonCircleOutline className="profile-icons" />
                     </div>
                  )}
               </label>
               <input
                  type="file"
                  id="profilePicture"
                  className="profile-input"
                  onChange={handleFileChange}
               />
            </div>
            <button
               type="button"
               className="profile-picture-del"
               onClick={handleDeleteImage}
            >
               Delete
            </button>
         </div>
      </>
   );
};

export default ProfilePicture;
