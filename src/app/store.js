import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import jabatanSlice from "../features/jabatan/jabatanSlice";
import jenisPelayananSlice from "../features/jenisPelayanan/jenisPelayananSlice";
import kategoriPelayananSlice from "../features/kategoriPelayanan/kategoriPelayananSlice";
import manajemenOPDSlice from "../features/manajemenOPD/manajemenOPDSlice";
import manajemenUserSlice from "../features/manajemenUser/manajemenUserSlice";
import pengaduanTTESlice from "../features/pengaduanTTE/pengaduanTTESlice";
import pengaduanJaringanSlice from "../features/pengaduanJaringan/pengaduanJaringanSlice";
import bukuTamuSlice from "../features/bukuTamu/bukuTamuSlice";

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  datamanajemenUser: manajemenUserSlice,
  jabatan: jabatanSlice,
  opd: manajemenOPDSlice,
  jenisPelayanan: jenisPelayananSlice,
  kategoriPelayanan: kategoriPelayananSlice,
  pengaduanTTE: pengaduanTTESlice,
  pengaduanJaringan: pengaduanJaringanSlice,
  bukuTamu: bukuTamuSlice,
};

export default configureStore({
  reducer: combinedReducer,
});
