import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { editOPD } from "../manajemenOPDSlice";

function EditManajemenOPDModalBody({ extraObject, closeModal }) {
  const { index } = extraObject;

  const manajemenOPD = useSelector((state) => state.opd);

  const [data, setData] = useState(
    manajemenOPD.manajemenOPD.find((data) => data.id === index)
  );

  const dispatch = useDispatch();

  const INITIAL_LEAD_OBJ = {
    namaOpd: data.namaOpd,
    idPegawaiAkses: "",
  };

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
      let dataOPD = {
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
        const response = await axios.put(
          `/APIHaloKominfoInternal/api/EditOpd/${data.id}`,
          datafordatabase,
          config
        );
        if (response) {
          dispatch(editOPD({ index, dataOPD }));
          dispatch(
            showNotification({ message: "OPD Telah Diedit!", status: 1 })
          );
          closeModal();
        }
      } catch (err) {
        setLoading(false);
        if (!err?.response) {
          dispatch(showNotification({ message: "Error Server !", status: 0 }));
        } else {
          dispatch(
            showNotification({ message: "Data gagal Di Edit", status: 0 })
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

export default EditManajemenOPDModalBody;
