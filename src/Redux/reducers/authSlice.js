import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios";
import Cookies from "universal-cookie";

const initialState = {
  isLoading: true,
  isAuth: false,
  user: {},
  errMessage: "",
};

const cookies = new Cookies();

// For Fetching the Loged In User
export const getUser = createAsyncThunk("getUser", async (name, thunkAPI) => {
  return axiosInstance
    .get("/me")
    .then((resp) => {
      // console.log(resp);
      return resp?.data?.user;
    })
    .catch((err) => {
      console.log(err);
      throw err?.response?.data?.message;
    });
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout(state, action) {
      // cookies.remove("us_id");
      // console.log(state);
      state.user = {};
      state.isAuth = false;
    },
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    [getUser.rejected]: (state, action) => {
      // state.isAuth = false;
      state.user = {}
      state.errMessage = action.error;
      state.isLoading = false;
    },
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;

// export const getUserAction = authSlice.actions;
