import { createSlice, createAsyncThunk, isPending } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios";

const initialState = {
  isLoading: true,
  errMessage: "",
  instructorList: [],
  allInstructors: [],
  departmentList: [],
  specializationList: [],
  subSpecializationList: [],
  leaveList: [],
  userList: [],
};

// to Fetch the Departments
export const getDepartments = createAsyncThunk(
  "getDepartments",
  async (name, thunkAPI) => {
    return axiosInstance
      .get("/departments")
      .then((resp) => {
        // console.log(resp);
        return resp?.data?.result;
      })
      .catch((err) => {
        console.log(err);
        throw err?.response?.data?.message;
      });
  }
);
// to Fetch the Specializations
export const getSpecializations = createAsyncThunk(
  "getSpecializations",
  async (id, thunkAPI) => {
    return axiosInstance
      .get(`/specializations?DepartmentId=${id}`)
      .then((resp) => {
        // console.log(resp.data);
        return resp?.data?.result;
      })
      .catch((err) => {
        console.log(err);
        throw err?.response?.data?.message;
      });
  }
);

// to Fetch the Instructors
export const getInstructors = createAsyncThunk(
  "getInstructors",
  async (id, thunkAPI) => {
    return axiosInstance
      .get(`/instructors?DepartmentId=${id}`)
      .then((resp) => {
        // console.log(resp);
        return resp?.data?.result;
      })
      .catch((err) => {
        console.log(err);
        throw err?.response?.data?.message;
      });
  }
);
export const getAllInstructors = createAsyncThunk(
  "getAllInstructors",
  async () => {
    return axiosInstance
      .get(`/instructors`)
      .then((resp) => {
        // console.log(resp.data);
        return resp?.data?.result;
      })
      .catch((err) => {
        console.log(err);
        throw err?.response?.data?.message;
      });
  }
);

// Get Leaves
export const getLeaves = createAsyncThunk(
  "getLeaves",
  async (name, thunkAPI) => {
    return axiosInstance
      .get("/leaves")
      .then((resp) => {
        // console.log(resp);
        return resp?.data?.result;
      })
      .catch((err) => {
        console.log(err);
        throw err?.response?.data?.message;
      });
  }
);
// Get Leaves
export const getUsers = createAsyncThunk("getUsers", async (name, thunkAPI) => {
  return axiosInstance
    .get("/users")
    .then((resp) => {
      // console.log(resp);
      return resp?.data?.result;
    })
    .catch((err) => {
      console.log(err);
      throw err?.response?.data?.message;
    });
});

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  //   reducers: {
  //     logout(state, action) {
  //       console.log(state);
  //       state.isAuth = false;
  //       state.user = {};
  //     },
  //   },
  extraReducers: {
    // Department action creator
    [getDepartments.pending]: (state) => {
      state.isLoading = true;
    },
    [getDepartments.fulfilled]: (state, action) => {
      state.departmentList = action.payload;
      state.isLoading = false;
    },
    [getDepartments.rejected]: (state, action) => {
      state.errMessage = action.error;
      state.isLoading = false;
    },

    // specializations action creator
    [getSpecializations.pending]: (state) => {
      state.isLoading = true;
    },
    [getSpecializations.fulfilled]: (state, action) => {
      state.specializationList = action.payload;
      state.isLoading = false;
    },
    [getSpecializations.rejected]: (state, action) => {
      state.errMessage = action.error;
      state.isLoading = false;
    },

    // Instructor action creator
    [getInstructors.pending]: (state) => {
      state.isLoading = true;
    },
    [getInstructors.fulfilled]: (state, action) => {
      state.instructorList = action.payload;
      state.isLoading = false;
    },
    [getInstructors.rejected]: (state, action) => {
      state.errMessage = action.error;
      state.isLoading = false;
    },
    // All Instructor action creator
    [getAllInstructors.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllInstructors.fulfilled]: (state, action) => {
      state.allInstructors = action.payload;
      state.isLoading = false;
    },
    [getAllInstructors.rejected]: (state, action) => {
      state.errMessage = action.error;
      state.isLoading = false;
    },
    // Leaves action creator
    [getLeaves.pending]: (state) => {
      state.isLoading = true;
    },
    [getLeaves.fulfilled]: (state, action) => {
      state.leaveList = action.payload;
      state.isLoading = false;
    },
    [getLeaves.rejected]: (state, action) => {
      state.errMessage = action.error;
      state.isLoading = false;
    },
    // Users action creator
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.userList = action.payload;
      state.isLoading = false;
    },
    [getUsers.rejected]: (state, action) => {
      state.errMessage = action.error;
      state.isLoading = false;
    },
  },
});

export default dataSlice.reducer;

// export const getUserAction = authSlice.actions;
