// slices/userSlice.js
// import SublyApi from "@/utils/authApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SublyApi from "../../HelperApis";

const initialState = {
  userdetail: null,
  loading: false,
  emailPhone: null,
};

// api call
export const userLogin = createAsyncThunk("users/login", async (data) => {
  const response = await SublyApi.LoginHandle(data);
  return response;
});

const authSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearReducer: (state) => {
      state.loading = false;
      state.userdetail = null;
      state.emailPhone = null;
    },
    holdEmailPhone: (state, action) => {
      state.emailPhone = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.userdetail = action.payload.data;
    });

    builder.addCase(userLogin.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const { clearReducer, holdEmailPhone } = authSlice.actions;
export default authSlice.reducer;
