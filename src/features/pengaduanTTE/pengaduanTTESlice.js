import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPengaduanTTEContent = createAsyncThunk(
  "/pengaduanTTE/content",
  async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      "/APIHaloKominfoInternal/api/TampilPelayanan",
      config
    );
    return response.data;
  }
);

export const pengaduanTTESlice = createSlice({
  name: "pengaduanTTE",
  initialState: {
    isLoading: false,
    pengaduanTTE: [],
  },
  reducers: {
    tambahPengaduanTTE: (state, action) => {
      let { newLeadObj } = action.payload;
      state.pengaduanTTE = [...state.pengaduanTTE, newLeadObj];
    },

    editPengaduanTTE: (state, action) => {
      let { index, data } = action.payload;
      const userIndex = state.pengaduanTTE.findIndex(
        (pengaduanTTE) => pengaduanTTE.idPelayanan === index
      );

      if (userIndex !== -1) {
        state.pengaduanTTE[userIndex] = {
          ...state.pengaduanTTE[userIndex],
          ...data,
        };
      }
    },

    hapusPengaduanTTE: (state, action) => {
      let { index } = action.payload;
      state.pengaduanTTE.splice(index, 1);
    },
  },

  extraReducers: {
    [getPengaduanTTEContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getPengaduanTTEContent.fulfilled]: (state, action) => {
      state.pengaduanTTE = action.payload.data;
      state.isLoading = false;
    },
    [getPengaduanTTEContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { tambahPengaduanTTE, editPengaduanTTE, hapusPengaduanTTE } =
  pengaduanTTESlice.actions;

export default pengaduanTTESlice.reducer;
