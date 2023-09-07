import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { tambahPengaduanJaringan } from "../pengaduanJaringanSlice";

const who_akses = localStorage.getItem("who_akses");

const INITIAL_LEAD_OBJ = {
  idPegawai: "",
  tanggalPengaduan: "",
  keteranganPengaduan: "",
  statusPengaduan: "",
  kegiatanPengaduan: "",
  opd: "",
  idPegawaiAkses: who_akses,
};

function AddPengaduanJaringanModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = async () => {
    if (leadObj.idPegawai.trim() === "")
      return setErrorMessage("nama Pegawai Tidak Boleh Kosong !");
    else if (leadObj.keteranganPengaduan.trim() === "")
      return setErrorMessage("Keterangan Pengaduan Tidak Boleh Kosong !");
    else if (leadObj.tanggalPengaduan.trim() === "")
      return setErrorMessage("Tanggal Pengaduan Tidak Boleh Kosong !");
    else if (leadObj.statusPengaduan.trim() === "")
      return setErrorMessage("Status Pengaduan Tidak Boleh Kosong !");
    else if (leadObj.kegiatanPengaduan.trim() === "")
      return setErrorMessage("Kegiatan Tidak Boleh Kosong !");
    else if (leadObj.opd.trim() === "")
      return setErrorMessage("OPD Tidak Boleh Kosong !");
    else if (leadObj.idPegawaiAkses.trim() === "")
      return setErrorMessage("Akses Pegawai Tidak Boleh Kosong !");
    else {
      let newLeadObj = {
        keteranganPengaduan: leadObj.keteranganPengaduan,
        idPegawai: leadObj.idPegawai,
        tanggalPengaduan: leadObj.tanggalPengaduan,
        statusPengaduan: leadObj.statusPengaduan,
        kegiatanPengaduan: leadObj.kegiatanPengaduan,
        opd: leadObj.opd,
        idPegawaiAkses: leadObj.idPegawaiAkses,
      };
      let datafordatabase = {
        idPegawai: leadObj.idPegawai,
        tanggalPengaduan: leadObj.tanggalPengaduan,
        statusPengaduan: leadObj.statusPengaduan,
        keteranganPengaduan: leadObj.keteranganPengaduan,
        kegiatanPengaduan: leadObj.kegiatanPengaduan,
        opd: leadObj.opd,
        idPegawaiAkses: leadObj.idPegawaiAkses,
      };
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(
          "/APIHaloKominfoInternal/api/TambahPengaduan",
          datafordatabase,
          config
        );
        if (response) {
          dispatch(tambahPengaduanJaringan({ newLeadObj }));
          dispatch(
            showNotification({
              message: "Pengaduan Telah Ditambahkan!",
              status: 1,
            })
          );
          closeModal();
        }
      } catch (err) {
        setLoading(false);
        if (!err?.response) {
          dispatch(showNotification({ message: "Error Server !", status: 0 }));
        } else {
          dispatch(
            showNotification({ message: "Data gagal Di Tambahkan", status: 0 })
          );
        }
      }
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={leadObj.idPegawai}
        updateType="idPegawai"
        containerStyle="mt-4"
        labelTitle="Nama Pegawai"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="date"
        defaultValue={leadObj.tanggalPengaduan}
        updateType="tanggalPengaduan"
        containerStyle="mt-4"
        labelTitle="Tanggal Pengaduan"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.keteranganPengaduan}
        updateType="keteranganPengaduan"
        containerStyle="mt-4"
        labelTitle="Keterangan Pengaduan"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.statusPengaduan}
        updateType="statusPengaduan"
        containerStyle="mt-4"
        labelTitle="Status Pengaduan"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.kegiatanPengaduan}
        updateType="kegiatanPengaduan"
        containerStyle="mt-4"
        labelTitle="Kegiatan pengaduan"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.opd}
        updateType="opd"
        containerStyle="mt-4"
        labelTitle="OPD"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddPengaduanJaringanModalBody;
