import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { editOPD } from "../manajemenOPDSlice";

function EditManajemenOPDModalBody({ extraObject, closeModal }) {
  const { index } = extraObject;

  const who_akses = localStorage.getItem("who_akses");

  const manajemenOPD = useSelector((state) => state.opd);

  const [dataOpd, setData] = useState(
    manajemenOPD.manajemenOPD.find((data) => data.id === index)
  );

  const dispatch = useDispatch();

  const INITIAL_LEAD_OBJ = {
    namaOpd: dataOpd.namaOpd,
    idPegawaiAkses: who_akses,
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = async () => {
    if (leadObj.namaOpd.trim() === "")
      return setErrorMessage("nama OPD Tidak Boleh Kosong !");
    else if (leadObj.idPegawaiAkses.trim() === "")
      return setErrorMessage("Akses Pegawai Tidak Ada");
    else {
      let data = {
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
          `/APIHaloKominfoInternal/api/EditOpd/${dataOpd.id}`,
          datafordatabase,
          config
        );
        if (response) {
          dispatch(editOPD({ index, data }));
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
