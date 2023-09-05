import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getJabatanContent = createAsyncThunk(
  "/jabatan/content",
  async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      "/APIHaloKominfoInternal/api/TampilJabatan",
      config
    );
    return response.data;
  }
);

export const jabatanSlice = createSlice({
  name: "jabatan",
  initialState: {
    isLoading: false,
    jabatan: [],
  },
  reducers: {
    tambahJabatan: (state, action) => {
      let { newLeadObj } = action.payload;
      state.jabatan = [...state.jabatan, newLeadObj];
    },

    editJabatan: (state, action) => {
      let { index, data } = action.payload;
      const userIndex = state.jabatan.findIndex(
        (jabatan) => jabatan.id === index
      );

      if (userIndex !== -1) {
        state.jabatan[userIndex] = {
          ...state.jabatan[userIndex],
          ...data,
        };
      }
    },

    hapusJabatan: (state, action) => {
      let { index } = action.payload;
      state.jabatan.splice(index, 1);
    },
  },

  extraReducers: {
    [getJabatanContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getJabatanContent.fulfilled]: (state, action) => {
      state.jabatan = action.payload.data;
      state.isLoading = false;
    },
    [getJabatanContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { tambahJabatan, editJabatan, hapusJabatan } =
  jabatanSlice.actions;

export default jabatanSlice.reducer;
