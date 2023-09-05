import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import jabatanSlice from "../features/jabatan/jabatanSlice";
import jenisPelayananSlice from "../features/jenisPelayanan/jenisPelayananSlice";
import manajemenOPDSlice from "../features/manajemenOPD/manajemenOPDSlice";
import manajemenUserSlice from "../features/manajemenUser/manajemenUserSlice";

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  datamanajemenUser: manajemenUserSlice,
  jabatan: jabatanSlice,
  opd: manajemenOPDSlice,
  jenisPelayanan: jenisPelayananSlice,
};

export default configureStore({
  reducer: combinedReducer,
});
