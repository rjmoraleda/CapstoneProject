import React, { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProfile, updateProfile } from "../../services/index/users";
import "./profile.css";
import ProfilePicture from "../../components/ProfilePicture";
import { toast } from "react-hot-toast";
import { userActions } from "../../store/reducers/userReducers";

const EditProfile = () => {
   //declaring into variable
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const userState = useSelector((state) => state.user);

   // fitching the user data from the database
   const {
      // data , isLoading , error is a property where
      //assign to profileData, profileIsLoading, profileError in short rename the data , isLoading , error
      data: profileData,
      isLoading: profileIsLoading,
   } = useQuery({
      //function run when the page is loaded
      queryFn: () => {
         return getUserProfile({ token: userState.userInfo.token });
      },
      queryKey: ["profile"],
   });

   // creating a mutation for updating the  users
   const { mutate, isLoading } = useMutation({
      mutationFn: ({ name, email, password }) => {
         return updateProfile({
            token: userState.userInfo.token,
            userData: { name, email, password },
         });
      },

      //after getting the data from the mutation this function run
      onSuccess: (data) => {
         dispatch(userActions.setUserInfo(data));
         //saving the data in the local storage to better experience
         localStorage.setItem("account", JSON.stringify(data));
         toast.success("Profile Updated Successful");
         console.log(data);
      },
      onError: (error) => {
         toast.error(error.message);
         console.log(error);
      },
   });

   //useEffect Redirect the User to Login upon successfull registration
   useEffect(() => {
      if (!userState.userInfo) {
         navigate("/");
      }
   }, [navigate, userState.userInfo]);

   const {
      register,
      handleSubmit,
      formState: { errors, isValid },
   } = useForm({
      defaultValues: {
         name: "",
         email: "",
         password: "",
      },
      values: {
         name: profileIsLoading ? "" : profileData?.name,
         email: profileIsLoading ? "" : profileData?.email,
      },
      mode: "onChange",
   });

   //getting the data from the form
   const submitHandler = (data) => {
      const { name, email, password } = data;
      mutate({
         name,
         email,
         password,
      });
   };

   return (
      <MainLayout>
         <section className="register">
            <div className="register-container">
               <ProfilePicture avatar={profileData?.avatar} />
               <form onSubmit={handleSubmit(submitHandler)}>
                  {/* For NAME */}
                  <div className="name">
                     <label htmlFor="name">Name</label>

                     <input
                        type="text"
                        id="name"
                        // creating validation for the NAME
                        {...register("name", {
                           minLength: {
                              value: 3,
                              message: "Name must be at least 3 characters",
                           },
                           required: {
                              value: true,
                              message: "Name is required",
                           },
                        })}
                        placeholder="Enter your name"
                        className={`${
                           errors.name ? "error-border" : "no-error"
                        }`}
                     />
                     {errors.name?.message && (
                        <p className="error-reg">{errors.name.message}</p>
                     )}
                  </div>

                  {/* FOR EMAIL */}
                  <div className="email">
                     <label htmlFor="email">Email</label>

                     <input
                        type="email"
                        id="email"
                        // creating validation for the EMAIL
                        {...register("email", {
                           required: {
                              value: true,
                              message: "Email is required",
                           },
                           pattern: {
                              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: "Enter a valid email",
                           },
                        })}
                        placeholder="Enter your email"
                        className={`${
                           errors.name ? "error-border" : "no-error"
                        }`}
                     />
                     {errors.email?.message && (
                        <p className="error-reg">{errors.email.message}</p>
                     )}
                  </div>

                  {/* FOR PASSWORD */}
                  <div className="password">
                     <label htmlFor="password">
                        Enter New Password <span>(Optional)</span>
                     </label>

                     <input
                        type="password"
                        id="password"
                        {...register("password")}
                        placeholder="Enter your new password"
                        className={`${
                           errors.password ? "error-border" : "no-error"
                        }`}
                     />
                     {errors.password?.message && (
                        <p className="error-reg">{errors.password.message}</p>
                     )}
                  </div>

                  {/* FOR SUBMIT BUTTON */}
                  <button
                     type="submit"
                     disabled={!isValid || profileIsLoading}
                     className={`btn-register ${
                        isValid ? "enabled" : "disabled"
                     }`}
                  >
                     Update Profile
                  </button>
               </form>
            </div>
         </section>
      </MainLayout>
   );
};

export default EditProfile;
