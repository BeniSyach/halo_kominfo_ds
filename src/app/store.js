import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import jabatanSlice from "../features/jabatan/jabatanSlice";
import manajemenOPDSlice from "../features/manajemenOPD/manajemenOPDSlice";
import manajemenUserSlice from "../features/manajemenUser/manajemenUserSlice";

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  datamanajemenUser: manajemenUserSlice,
  jabatan: jabatanSlice,
  opd: manajemenOPDSlice,
};

export default configureStore({
  reducer: combinedReducer,
});
