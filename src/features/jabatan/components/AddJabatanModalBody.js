import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { tambahJabatan } from "../jabatanSlice";

const who_akses = localStorage.getItem("who_akses");

const INITIAL_LEAD_OBJ = {
  namaJabatan: "",
  idPegawaiAkses: who_akses,
};

function AddJabatanModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = async () => {
    if (leadObj.namaJabatan.trim() === "")
      return setErrorMessage("nama Jabatan Tidak Boleh Kosong !");
    else if (leadObj.idPegawaiAkses.trim() === "")
      return setErrorMessage("Akses Tidak Ada !");
    else {
      let newLeadObj = {
        idPegawaiAkses: leadObj.idPegawaiAkses,
        namaJabatan: leadObj.namaJabatan,
      };
      let datafordatabase = {
        idPegawaiAkses: leadObj.idPegawaiAkses,
        namaJabatan: leadObj.namaJabatan,
      };
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(
          "/APIHaloKominfoInternal/api/TambahJabatan",
          datafordatabase,
          config
        );
        if (response) {
          dispatch(tambahJabatan({ newLeadObj }));
          dispatch(
            showNotification({
              message: "Jabatan Telah Ditambahkan!",
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
        defaultValue={leadObj.namaJabatan}
        updateType="namaJabatan"
        containerStyle="mt-4"
        labelTitle="Nama Jabatan"
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

export default AddJabatanModalBody;
