import { createSlice } from "@reduxjs/toolkit";
import {
  getOtherUsersThunk,
  getProfileUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
} from "./user.thunk";

const initialState = {
  isAuthenticated: false,
  screenLoading: true,
  userProfile: null,
  otherUsers: null,
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")),
  buttonLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(loginUserThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.user;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // register
    builder.addCase(registerUserThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.user;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });
    builder.addCase(registerUserThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // logout
    builder.addCase(logoutUserThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.userProfile = null;
      state.otherUsers = null;
      state.selectedUser = null;
      state.isAuthenticated = false;
      state.buttonLoading = false;
      localStorage.clear();
    });
    builder.addCase(logoutUserThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // getProfile
    builder.addCase(getProfileUserThunk.pending, () => {});
    builder.addCase(getProfileUserThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.screenLoading = false;
      state.userProfile = action.payload?.profile;
    });
    builder.addCase(getProfileUserThunk.rejected, (state) => {
      state.screenLoading = false;
    });

    // getOtherUsers
    builder.addCase(getOtherUsersThunk.pending, () => {});
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.otherUsers = action.payload?.otherUsers;
      state.screenLoading = false;
    });
    builder.addCase(getOtherUsersThunk.rejected, (state) => {
      state.screenLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedUser } = userSlice.actions;

export default userSlice.reducer;
