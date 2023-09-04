import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { tambahOPD } from "../manajemenOPDSlice";

const INITIAL_LEAD_OBJ = {
  namaOpd: "",
  idPegawaiAkses: "",
};

function AddManajemenOPDModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = async () => {
    if (leadObj.namaOpd.trim() === "")
      return setErrorMessage("nama Pegawai Tidak Boleh Kosong !");
    else if (leadObj.idPegawaiAkses.trim() === "")
      return setErrorMessage("NIP Tidak Boleh Kosong !");
    else {
      let newLeadObj = {
        namaOpd: leadObj.namaOpd,
        status: leadObj.idPegawaiAkses,
      };
      let datafordatabase = {
        namaOpd: leadObj.namaOpd,
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
          "/APIHaloKominfoInternal/api/TambahOpd",
          datafordatabase,
          config
        );
        if (response) {
          dispatch(tambahOPD({ newLeadObj }));
          dispatch(
            showNotification({
              message: "Organisasi Perangkat Daerah Telah Ditambahkan!",
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
        defaultValue={leadObj.namaOpd}
        updateType="namaOpd"
        containerStyle="mt-4"
        labelTitle="Nama Organisasi Perangkat Daerah"
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

export default AddManajemenOPDModalBody;
