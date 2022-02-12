import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchProfileData = createAsyncThunk(
  "userProfile/fetchProfileData",
  async (userId, thunkAPI) => {
    try {
      const { data } = await axios.get(`user/${userId}`);

      thunkAPI.dispatch(fetchProfilePins(userId));
      return data.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue([]);
    }
  }
);

export const fetchProfilePins = createAsyncThunk(
  "userProfile/fetchProfilePins",
  async (userId, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `pin?userId=${userId}`
      );

      return data.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue([]);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    isLoading: true,
    isError: false,
    saved: [],
    pins: [],
    user: null,
  },
  reducers: {
    deleteProfilePin: (state, action) => {
      if (
        state.pins.find((item) => {
          return item._id == action.payload._id;
        })
      ) {
       
        state.pins = state.pins.filter(
          (item) => item._id != action.payload._id
        );
      }
      if (
        state.saved.find((item) => {
          return item._id == action.payload._id;
        })
      ) {
        state.saved = state.pins.filter(
          (item) => item._id != action.payload._id
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileData.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.saved = [];

      state.user = null;
    });
    builder.addCase(fetchProfileData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.saved = [];
      state.user = null;
    });
    builder.addCase(fetchProfileData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.saved = action.payload.saved;
      state.user = action.payload;
    });
    builder.addCase(fetchProfilePins.pending, (state, action) => {
      state.pins = [];
    });
    builder.addCase(fetchProfilePins.rejected, (state, action) => {
      state.pins = [];
    });
    builder.addCase(fetchProfilePins.fulfilled, (state, action) => {
      state.pins = action.payload;
    });
  },
});

export const { deleteProfilePin } = profileSlice.actions;
export default profileSlice.reducer;
