import { createSlice } from "@reduxjs/toolkit";

const userInitialState = { userInfo: null };

const userSlice = createSlice({
   name: "user",
   initialState: userInitialState,
   reducers: {
      setUserInfo(state, action) {
         state.userInfo = action.payload;
      },
      resetUserInfo(state, action) {
         state.userInfo = null;
      },
   },
});

// Exporting the actions fromt the countSlice into the countActions and reducers
const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export { userActions, userReducer };
