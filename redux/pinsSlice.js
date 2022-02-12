import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { reHydrate } from "./pinSlice";
import { deleteProfilePin } from "./profileSlice";

export const deletePin = createAsyncThunk(
  "pins/deletePin",
  async (pin, thunkAPI) => {
    try {
      const response = await axios.delete(
        `pin/${pin._id}`
      );
      
      
      thunkAPI.dispatch(deleteProfilePin(pin));
      return response.data.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue([]);
    }
  }
);

export const createPin = createAsyncThunk(
  "pins/createPin",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`pin`, {
        pinUrl: data.imageUrl,
        title: data.title,
        description: data.description,
        destination: data.destination,
        category: data.category,
      });

      return response.data.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue([]);
    }
  }
);

export const searchPin = createAsyncThunk(
  "pins/searchPin",
  async (searchValue, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `pin/search?query=${searchValue}`
      );

      return data.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue([]);
    }
  }
);

export const makeComment = createAsyncThunk(
  "pins/makeComment",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(`pin/${data.pinId}/comment`, {
        comment: data.comment,
      });

      thunkAPI.dispatch(reHydrate(response.data.payload.comments));
      return response.data.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue([]);
    }
  }
);

export const fetchPins = createAsyncThunk(
  "pins/fetchPins",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`pin?category=${data.slug}`);

      return response.data.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue([]);
    }
  }
);

const pinsSlice = createSlice({
  name: "pins",
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
  },
  reducers: {
    hydrateData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPin.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });

    builder.addCase(deletePin.fulfilled, (state, action) => {
      state.data = state.data.filter((item) => {
        return item._id != action.payload._id;
      });
    });
    builder.addCase(fetchPins.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.data = [];
    });
    builder.addCase(fetchPins.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });
    builder.addCase(fetchPins.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.data = [];
    });
    builder.addCase(searchPin.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.data = [];
    });
    builder.addCase(searchPin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });
    builder.addCase(searchPin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.data = [];
    });
  },
});

export const { hydrateData } = pinsSlice.actions;
export default pinsSlice.reducer;
