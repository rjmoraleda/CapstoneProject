import React, { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/index/users";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducers";
import toast from "react-hot-toast";
import "./login.css";

const Login = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const userState = useSelector((state) => state.user);
   //creating a mutation to login a user
   const { mutate, isLoading } = useMutation({
      mutationFn: ({ email, password }) => {
         return login({ email, password });
      },

      //after getting the data from the mutation this function run
      onSuccess: (data) => {
         dispatch(userActions.setUserInfo(data));
         //saving the data in the local storage to better experience
         localStorage.setItem("account", JSON.stringify(data));
         toast.success("Login Successful");
         console.log(data);
      },
      // trowing an error
      onError: (error) => {
         toast.error(error.message);
         console.log(error);
      },
   });

   //useEffect Redirect the User to Home upon successfull login

   useEffect(() => {
      if (userState.userInfo) {
         navigate(-1);
      }
   }, [navigate, userState.userInfo]);

   const {
      register,
      handleSubmit,
      formState: { errors, isValid },
   } = useForm({
      defaultValues: {
         email: "",
         password: "",
      },
      mode: "onChange",
   });

   //getting the data from the form
   const submitHandler = (data) => {
      const { email, password } = data;
      mutate({
         email,
         password,
      });
   };

   return (
      <MainLayout>
         <section className="login-acct">
            <div className="login-container">
               <h1>Login</h1>
               <form onSubmit={handleSubmit(submitHandler)}>
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
                     <label htmlFor="password">Password</label>

                     <input
                        type="password"
                        id="password"
                        {...register("password", {
                           minLength: {
                              value: 6,
                              message: "Password must be at least 6 characters",
                           },
                           required: {
                              value: true,
                              message: "Password is required",
                           },
                        })}
                        placeholder="Enter your password"
                        className={`${
                           errors.password ? "error-border" : "no-error"
                        }`}
                     />
                     {errors.password?.message && (
                        <p className="error-reg">{errors.password.message}</p>
                     )}
                  </div>

                  {/* FOR FORGOT PASSWORD */}
                  <Link to="/forgot-password" className="forgot">
                     Forgot Password
                  </Link>

                  {/* FOR SUBMIT BUTTON */}
                  <button
                     type="submit"
                     disabled={!isValid || isLoading}
                     className={`btn-login ${isValid ? "enabled" : "disabled"}`}
                  >
                     Login
                  </button>

                  {/* FOR ALREADY HAVE AN ACCOUNT */}
                  <p className="have-account">
                     Don't have an account?{" "}
                     <Link to="/register" className="login-btn">
                        Register
                     </Link>
                  </p>
               </form>
            </div>
         </section>
      </MainLayout>
   );
};

export default Login;
