import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getmanajemenUserContent = createAsyncThunk(
  "/manajemenUser/content",
  async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      "/APIHaloKominfoInternal/api/TampilPegawai",
      config
    );
    return response.data;
  }
);

export const manajemenUserSlice = createSlice({
  name: "manajemenUser",
  initialState: {
    isLoading: false,
    manajemenUser: [],
  },
  reducers: {
    tambahUser: (state, action) => {
      let { newLeadObj } = action.payload;
      state.manajemenUser = [...state.manajemenUser, newLeadObj];
    },

    editUser: (state, action) => {
      let { index, data } = action.payload;
      const userIndex = state.manajemenUser.findIndex(
        (manajemenUser) => manajemenUser.NIK === index
      );

      if (userIndex !== -1) {
        state.manajemenUser[userIndex] = {
          ...state.manajemenUser[userIndex],
          ...data,
        };
      }
    },

    deleteLead: (state, action) => {
      let { index } = action.payload;
      state.manajemenUser.splice(index, 1);
    },
  },

  extraReducers: {
    [getmanajemenUserContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getmanajemenUserContent.fulfilled]: (state, action) => {
      state.manajemenUser = action.payload.data;
      state.isLoading = false;
    },
    [getmanajemenUserContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { tambahUser, editUser, deleteLead } = manajemenUserSlice.actions;

export default manajemenUserSlice.reducer;
