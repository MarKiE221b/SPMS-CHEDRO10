import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChecked: false,
  openAlert: false,
  openDialog: false,
  agreeDialog: false,
  toggleState: "1",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsChecked: (state, action) => {
      state.isChecked = action.payload;
    },
    setOpenAlert: (state, action) => {
      state.openAlert = action.payload;
    },
    setOpenDialog: (state, action) => {
      state.openDialog = action.payload;
    },
    setToggleState: (state, action) => {
      state.toggleState = action.payload;
    },
    setAgreeDialog: (state, action) => {
      state.agreeDialog = action.payload;
    },
  },
});

export const {
  setIsChecked,
  setOpenAlert,
  setOpenDialog,
  setToggleState,
  setAgreeDialog,
} = uiSlice.actions;
export const selectUiState = (state) => state.ui;
export default uiSlice.reducer;
