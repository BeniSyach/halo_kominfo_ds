import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getmanajemenOPDContent = createAsyncThunk(
  "/manajemenOPD/content",
  async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      "/APIHaloKominfoInternal/api/TampilOpd",
      config
    );
    return response.data;
  }
);

export const manajemenOPDSlice = createSlice({
  name: "manajemenOPD",
  initialState: {
    isLoading: false,
    manajemenOPD: [],
  },
  reducers: {
    tambahOPD: (state, action) => {
      let { newLeadObj } = action.payload;
      state.manajemenOPD = [...state.manajemenOPD, newLeadObj];
    },

    editOPD: (state, action) => {
      let { index, data } = action.payload;
      const OPDIndex = state.manajemenOPD.findIndex(
        (manajemenOPD) => manajemenOPD.id === index
      );

      if (OPDIndex !== -1) {
        state.manajemenOPD[OPDIndex] = {
          ...state.manajemenOPD[OPDIndex],
          ...data,
        };
      }
    },

    hapusOPD: (state, action) => {
      let { index } = action.payload;
      state.manajemenOPD.splice(index, 1);
    },
  },

  extraReducers: {
    [getmanajemenOPDContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getmanajemenOPDContent.fulfilled]: (state, action) => {
      state.manajemenOPD = action.payload.data;
      state.isLoading = false;
    },
    [getmanajemenOPDContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { tambahOPD, editOPD, hapusOPD } = manajemenOPDSlice.actions;

export default manajemenOPDSlice.reducer;
