import { createAsyncThunk } from "@reduxjs/toolkit";
import { setDuration } from "./durationSlice";
import { makeRequest } from "../axios";

export const fetchDuration = createAsyncThunk(
  "duration/fetchDuration",
  async (_, { dispatch }) => {
    try {
      const response = await makeRequest.get("/duration");
      dispatch(setDuration(response.data));
    } catch (error) {
      throw error;
    }
  }
);
