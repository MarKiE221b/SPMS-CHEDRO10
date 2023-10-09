import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imgGrades: null,
  imgFinance: null,
  imgOthers: null,
};

const fileSlice = createSlice({
  name: "fileData",
  initialState,
  reducers: {
    updateFileData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateFileData } = fileSlice.actions;
export const selectFileData = (state) => state.fileData;
export default fileSlice.reducer;
