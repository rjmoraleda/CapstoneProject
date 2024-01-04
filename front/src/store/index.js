import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducers";

// Initialize the state with default values
const userInfoFromStorage = localStorage.getItem("account")
   ? JSON.parse(localStorage.getItem("account"))
   : null;

const initialState = {
   user: { userInfo: userInfoFromStorage },
};

const store = configureStore({
   reducer: {
      // Codes for all reducers
      user: userReducer,
   },
   preloadedState: initialState,
});

export default store;
