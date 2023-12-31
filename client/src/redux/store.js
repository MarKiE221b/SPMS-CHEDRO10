import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import uiReducer from "./uiSlice";
import fileReducer from "./fileSlice";
import durationReducer from "./durationSlice";
import authReducer from "./authSlice"
import { fetchDuration } from "./durationActions";

export const store = configureStore({
  reducer: {
    formData: formReducer,
    ui: uiReducer,
    fileData: fileReducer,
    duration: durationReducer,
    auth: authReducer,
  },
});

store.dispatch(fetchDuration());
