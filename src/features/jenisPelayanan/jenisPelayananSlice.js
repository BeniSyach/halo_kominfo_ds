import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getJenisPelayananContent = createAsyncThunk(
  "/jenisPelayanan/content",
  async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      "/APIHaloKominfoInternal/api/TampilJenisPelayanan",
      config
    );
    return response.data;
  }
);

export const jenisPelayananSlice = createSlice({
  name: "jenisPelayanan",
  initialState: {
    isLoading: false,
    jenisPelayanan: [],
  },
  reducers: {
    tambahJenisPelayanan: (state, action) => {
      let { newLeadObj } = action.payload;
      state.jenisPelayanan = [...state.jenisPelayanan, newLeadObj];
    },

    editJenisPelayanan: (state, action) => {
      let { index, data } = action.payload;
      const userIndex = state.jenisPelayanan.findIndex(
        (jenisPelayanan) => jenisPelayanan.id === index
      );

      if (userIndex !== -1) {
        state.jenisPelayanan[userIndex] = {
          ...state.jenisPelayanan[userIndex],
          ...data,
        };
      }
    },

    hapusJenisPelayanan: (state, action) => {
      let { index } = action.payload;
      state.jenisPelayanan.splice(index, 1);
    },
  },

  extraReducers: {
    [getJenisPelayananContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getJenisPelayananContent.fulfilled]: (state, action) => {
      state.jenisPelayanan = action.payload.data;
      state.isLoading = false;
    },
    [getJenisPelayananContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { tambahJenisPelayanan, editJenisPelayanan, hapusJenisPelayanan } =
  jenisPelayananSlice.actions;

export default jenisPelayananSlice.reducer;
