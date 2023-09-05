import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getKategoriPelayananContent = createAsyncThunk(
  "/kategoriPelayanan/content",
  async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      "/APIHaloKominfoInternal/api/TampilKategoriPelayanan",
      config
    );
    return response.data;
  }
);

export const kategoriPelayananSlice = createSlice({
  name: "kategoriPelayanan",
  initialState: {
    isLoading: false,
    kategoriPelayanan: [],
  },
  reducers: {
    tambahKategoriPelayanan: (state, action) => {
      let { newLeadObj } = action.payload;
      state.kategoriPelayanan = [...state.kategoriPelayanan, newLeadObj];
    },

    editKategoriPelayanan: (state, action) => {
      let { index, data } = action.payload;
      const userIndex = state.kategoriPelayanan.findIndex(
        (kategoriPelayanan) => kategoriPelayanan.id === index
      );

      if (userIndex !== -1) {
        state.kategoriPelayanan[userIndex] = {
          ...state.kategoriPelayanan[userIndex],
          ...data,
        };
      }
    },

    hapusKategoriPelayanan: (state, action) => {
      let { index } = action.payload;
      state.kategoriPelayanan.splice(index, 1);
    },
  },

  extraReducers: {
    [getKategoriPelayananContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getKategoriPelayananContent.fulfilled]: (state, action) => {
      state.kategoriPelayanan = action.payload.data;
      state.isLoading = false;
    },
    [getKategoriPelayananContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  tambahKategoriPelayanan,
  editKategoriPelayanan,
  hapusKategoriPelayanan,
} = kategoriPelayananSlice.actions;

export default kategoriPelayananSlice.reducer;
