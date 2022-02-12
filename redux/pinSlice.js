import { createSlice } from "@reduxjs/toolkit";

const pinSlice = createSlice({
  name: "pin",
  initialState: {
    loading: true,
    data: [],
  },
  reducers: {
    reHydrate: (state, action) => {      
      state.data.comments = action.payload;
    },
    hydrateData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { reHydrate, hydrateData } = pinSlice.actions;
export default pinSlice.reducer;
