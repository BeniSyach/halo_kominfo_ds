import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPengaduanJaringanContent = createAsyncThunk(
  "/pengaduanJaringan/content",
  async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      "/APIHaloKominfoInternal/api/TampilPengaduan",
      config
    );
    return response.data;
  }
);

export const pengaduanJaringanSlice = createSlice({
  name: "pengaduanJaringan",
  initialState: {
    isLoading: false,
    pengaduanJaringan: [],
  },
  reducers: {
    tambahPengaduanJaringan: (state, action) => {
      let { newLeadObj } = action.payload;
      state.pengaduanJaringan = [...state.pengaduanJaringan, newLeadObj];
    },

    editPengaduanJaringan: (state, action) => {
      let { index, data } = action.payload;
      const userIndex = state.pengaduanJaringan.findIndex(
        (pengaduanJaringan) => pengaduanJaringan.idPengaduan === index
      );

      if (userIndex !== -1) {
        state.pengaduanJaringan[userIndex] = {
          ...state.pengaduanJaringan[userIndex],
          ...data,
        };
      }
    },

    hapusPengaduanJaringan: (state, action) => {
      let { index } = action.payload;
      state.pengaduanJaringan.splice(index, 1);
    },
  },

  extraReducers: {
    [getPengaduanJaringanContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getPengaduanJaringanContent.fulfilled]: (state, action) => {
      state.pengaduanJaringan = action.payload.data;
      state.isLoading = false;
    },
    [getPengaduanJaringanContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  tambahPengaduanJaringan,
  editPengaduanJaringan,
  hapusPengaduanJaringan,
} = pengaduanJaringanSlice.actions;

export default pengaduanJaringanSlice.reducer;
