import { createSlice } from "@reduxjs/toolkit";

const durationSlice = createSlice({
  name: "duration",
  initialState: null,
  reducers: {
    setDuration: (state, action) => {
      return action.payload;
    },
  },
});

export const { setDuration } = durationSlice.actions;
export const selectDuration = (state) => state.duration;
export default durationSlice.reducer;
