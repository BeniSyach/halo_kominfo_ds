import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { tambahPengaduanTTE } from "../pengaduanTTESlice";

const who_akses = localStorage.getItem("who_akses");

const INITIAL_LEAD_OBJ = {
  idPegawai: "",
  tanggalPelayanan: "",
  jenisPelayanan: "",
  kategoriPelayanan: "",
  statusPelayanan: "",
  namaCustomer: "",
  nikCustomer: "",
  nipCustomer: "",
  opd: "",
  emailCustomer: "",
  nomorTeleponCustomer: "",
  idPegawaiAkses: who_akses,
};

function AddPengaduanTTEModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = async () => {
    if (leadObj.idPegawai.trim() === "")
      return setErrorMessage("nama Pegawai Tidak Boleh Kosong !");
    else if (leadObj.jenisPelayanan.trim() === "")
      return setErrorMessage("Jenis Pelayanan Tidak Boleh Kosong !");
    else if (leadObj.tanggalPelayanan.trim() === "")
      return setErrorMessage("Tanggal Pelayanan Tidak Boleh Kosong !");
    else if (leadObj.kategoriPelayanan.trim() === "")
      return setErrorMessage("Kategori Pelayanan Tidak Boleh Kosong !");
    else if (leadObj.statusPelayanan.trim() === "")
      return setErrorMessage("Status Pelayanan Tidak Boleh Kosong !");
    else if (leadObj.namaCustomer.trim() === "")
      return setErrorMessage("Nama Customer Tidak Boleh Kosong !");
    else if (leadObj.nikCustomer.trim() === "")
      return setErrorMessage("NIK Customer Tidak Boleh Kosong !");
    else if (leadObj.nipCustomer.trim() === "")
      return setErrorMessage("NIP Customer Tidak Boleh Kosong !");
    else if (leadObj.opd.trim() === "")
      return setErrorMessage("OPD Tidak Boleh Kosong !");
    else if (leadObj.emailCustomer.trim() === "")
      return setErrorMessage("Email Customer Tidak Boleh Kosong !");
    else if (leadObj.nomorTeleponCustomer.trim() === "")
      return setErrorMessage("Nomor Telepon Customer Tidak Boleh Kosong !");
    else if (leadObj.idPegawaiAkses.trim() === "")
      return setErrorMessage("Akses Pegawai Tidak Boleh Kosong !");
    else {
      let newLeadObj = {
        idPegawai: leadObj.idPegawai,
        tanggalPelayanan: leadObj.tanggalPelayanan,
        jenisPelayanan: leadObj.jenisPelayanan,
        kategoriPelayanan: leadObj.kategoriPelayanan,
        statusPelayanan: leadObj.statusPelayanan,
        namaCustomer: leadObj.namaCustomer,
        nikCustomer: leadObj.nikCustomer,
        nipCustomer: leadObj.nipCustomer,
        opd: leadObj.opd,
        emailCustomer: leadObj.emailCustomer,
        nomorTeleponCustomer: leadObj.nomorTeleponCustomer,
        idPegawaiAkses: who_akses,
      };
      let datafordatabase = {
        idPegawai: leadObj.idPegawai,
        tanggalPelayanan: leadObj.tanggalPelayanan,
        jenisPelayanan: leadObj.jenisPelayanan,
        kategoriPelayanan: leadObj.kategoriPelayanan,
        statusPelayanan: leadObj.statusPelayanan,
        namaCustomer: leadObj.namaCustomer,
        nikCustomer: leadObj.nikCustomer,
        nipCustomer: leadObj.nipCustomer,
        opd: leadObj.opd,
        emailCustomer: leadObj.emailCustomer,
        nomorTeleponCustomer: leadObj.nomorTeleponCustomer,
        idPegawaiAkses: who_akses,
      };
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(
          "/APIHaloKominfoInternal/api/TambahPelayanan",
          datafordatabase,
          config
        );
        if (response) {
          dispatch(tambahPengaduanTTE({ newLeadObj }));
          dispatch(
            showNotification({
              message: "Pengaduan TTE Telah Ditambahkan!",
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
        defaultValue={leadObj.tanggalPelayanan}
        updateType="tanggalPelayanan"
        containerStyle="mt-4"
        labelTitle="Tanggal Pelayanan"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.jenisPelayanan}
        updateType="jenisPelayanan"
        containerStyle="mt-4"
        labelTitle="Jenis Pelayanan"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.kategoriPelayanan}
        updateType="kategoriPelayanan"
        containerStyle="mt-4"
        labelTitle="Kategori Pelayanan"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.statusPelayanan}
        updateType="statusPelayanan"
        containerStyle="mt-4"
        labelTitle="Status Pelayanan"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.namaCustomer}
        updateType="namaCustomer"
        containerStyle="mt-4"
        labelTitle="Nama Customer"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="number"
        defaultValue={leadObj.nikCustomer}
        updateType="nikCustomer"
        containerStyle="mt-4"
        labelTitle="NIK Customer"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="number"
        defaultValue={leadObj.nipCustomer}
        updateType="nipCustomer"
        containerStyle="mt-4"
        labelTitle="NIP Customer"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="number"
        defaultValue={leadObj.opd}
        updateType="opd"
        containerStyle="mt-4"
        labelTitle="OPD Customer"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="email"
        defaultValue={leadObj.emailCustomer}
        updateType="emailCustomer"
        containerStyle="mt-4"
        labelTitle="Email Customer"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="number"
        defaultValue={leadObj.nomorTeleponCustomer}
        updateType="nomorTeleponCustomer"
        containerStyle="mt-4"
        labelTitle="No Hp Customer"
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

export default AddPengaduanTTEModalBody;
