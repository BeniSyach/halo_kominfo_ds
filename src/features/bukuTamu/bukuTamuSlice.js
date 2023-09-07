import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBukuTamuContent = createAsyncThunk(
  "/bukuTamu/content",
  async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      "/APIHaloKominfoInternal/api/TampilBukuTamu",
      config
    );
    return response.data;
  }
);

export const BukuTamuSlice = createSlice({
  name: "bukuTamu",
  initialState: {
    isLoading: false,
    bukuTamu: [],
  },
  reducers: {
    tambahbukuTamu: (state, action) => {
      let { newLeadObj } = action.payload;
      state.bukuTamu = [...state.bukuTamu, newLeadObj];
    },

    editbukuTamu: (state, action) => {
      let { index, data } = action.payload;
      const userIndex = state.bukuTamu.findIndex(
        (bukuTamu) => bukuTamu.idBukuTamu === index
      );

      if (userIndex !== -1) {
        state.bukuTamu[userIndex] = {
          ...state.bukuTamu[userIndex],
          ...data,
        };
      }
    },

    hapusbukuTamu: (state, action) => {
      let { index } = action.payload;
      state.bukuTamu.splice(index, 1);
    },
  },

  extraReducers: {
    [getBukuTamuContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getBukuTamuContent.fulfilled]: (state, action) => {
      state.bukuTamu = action.payload.data;
      state.isLoading = false;
    },
    [getBukuTamuContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { tambahbukuTamu, editbukuTamu, hapusbukuTamu } =
  BukuTamuSlice.actions;

export default BukuTamuSlice.reducer;
