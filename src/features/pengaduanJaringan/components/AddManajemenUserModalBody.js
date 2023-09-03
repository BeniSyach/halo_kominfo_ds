import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { tambahUser } from "../manajemenUserSlice";

const INITIAL_LEAD_OBJ = {
  namaPegawaiBaru: "",
  nipBaru: "",
  nikBaru: "",
  jabatanBaru: "",
  idPegawaiAkses: "",
};

function AddManajemenUserModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = async () => {
    if (leadObj.namaPegawaiBaru.trim() === "")
      return setErrorMessage("nama Pegawai Tidak Boleh Kosong !");
    else if (leadObj.nikBaru.trim() === "")
      return setErrorMessage("NIK Tidak Boleh Kosong !");
    else if (leadObj.nipBaru.trim() === "")
      return setErrorMessage("NIP Tidak Boleh Kosong !");
    else if (leadObj.jabatanBaru.trim() === "")
      return setErrorMessage("Jabatan Tidak Boleh Kosong !");
    else if (leadObj.idPegawaiAkses.trim() === "")
      return setErrorMessage("Akses Pegawai Tidak Boleh Kosong !");
    else {
      let newLeadObj = {
        NIK: leadObj.nikBaru,
        namaPegawai: leadObj.namaPegawaiBaru,
        NIP: leadObj.nipBaru,
        jabatanBaru: leadObj.jabatanBaru,
        status: leadObj.idPegawaiAkses,
      };
      let datafordatabase = {
        nikBaru: leadObj.nikBaru,
        namaPegawaiBaru: leadObj.namaPegawaiBaru,
        nipBaru: leadObj.nipBaru,
        jabatanBaru: leadObj.jabatanBaru,
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
          "/APIHaloKominfoInternal/api/TambahPegawai",
          datafordatabase,
          config
        );
        if (response) {
          dispatch(tambahUser({ newLeadObj }));
          dispatch(
            showNotification({ message: "User Telah Ditambahkan!", status: 1 })
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
      <div className="inline-block float-left">
        <button className="btn px-6 mb-2 btn-sm normal-case btn-warning">
          Import Data
        </button>
      </div>

      <InputText
        type="text"
        defaultValue={leadObj.namaPegawaiBaru}
        updateType="namaPegawaiBaru"
        containerStyle="mt-4"
        labelTitle="Nama Pegawai"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="number"
        defaultValue={leadObj.nipBaru}
        updateType="nipBaru"
        containerStyle="mt-4"
        labelTitle="NIP"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="number"
        defaultValue={leadObj.nikBaru}
        updateType="nikBaru"
        containerStyle="mt-4"
        labelTitle="NIK"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="jabatanBaru"
        defaultValue={leadObj.jabatanBaru}
        updateType="jabatanBaru"
        containerStyle="mt-4"
        labelTitle="Jabatan"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.idPegawaiAkses}
        updateType="idPegawaiAkses"
        containerStyle="mt-4"
        labelTitle="Akses Pegawai"
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

export default AddManajemenUserModalBody;
