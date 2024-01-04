import React, { useState } from "react";
import "./cropeasy.css";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfilePicture } from "../../services/index/users";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducers";
import toast from "react-hot-toast";
const CropEasy = ({ photo, setOpenCrop }) => {
   const userState = useSelector((state) => state.user);
   const queryClient = useQueryClient();
   const dispatch = useDispatch();
   const [crop, setCrop] = useState({ x: 0, y: 0 });
   const [zoom, setZoom] = useState(1);
   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

   const { mutate, isLoading } = useMutation({
      mutationFn: ({ token, formData }) => {
         return updateProfilePicture({
            token: token,
            formData: formData,
         });
      },

      //after getting the data from the mutation this function run
      onSuccess: (data) => {
         dispatch(userActions.setUserInfo(data));
         setOpenCrop(false);
         //saving the data in the local storage to better experience
         localStorage.setItem("account", JSON.stringify(data));
         queryClient.invalidateQueries(["profile"]);
         toast.success("Profile Photo Updated Successful");
         console.log(data);
      },
      onError: (error) => {
         toast.error(error.message);
         console.log(error);
      },
   });

   const handleCropComplete = (cropArea, cropAreaPixels) => {
      setCroppedAreaPixels(cropAreaPixels);
   };

   const handleCropImage = async () => {
      try {
         const croppedImg = await getCroppedImg(photo?.url, croppedAreaPixels);

         const file = new File([croppedImg.file], `${photo?.file?.name}`, {
            type: photo?.file?.type,
         });

         const formData = new FormData();
         formData.append("profilePicture", file);

         mutate({ token: userState.userInfo.token, formData: formData });
      } catch (error) {
         toast.error(error.message);
         console.log(error);
      }
   };
   return (
      <div className="pop-modal">
         <div className="pop">
            <h2 className="pop-title">Crop Image</h2>
            <div className="crop-image">
               <Cropper
                  image={photo?.url}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onZoomChange={setZoom}
                  onCropChange={setCrop}
                  onCropComplete={handleCropComplete}
               />
            </div>
            <div>
               <label htmlFor="zoomRange" className="zoom">
                  Zoom: {`${Math.round(zoom * 100)}`}
               </label>
               <input
                  type="range"
                  name="zoomRange"
                  id="zoomRange"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(e.target.value)}
                  className="zoom-range"
               />
            </div>
            <div className="crop-btn">
               <button
                  disabled={isLoading}
                  className="crop-cancel"
                  onClick={() => setOpenCrop(false)}
               >
                  Cancel
               </button>
               <button className="crop-upload" onClick={handleCropImage}>
                  Crop & Upload
               </button>
            </div>
         </div>
      </div>
   );
};

export default CropEasy;
