import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { editJabatan } from "../jabatanSlice";

function EditManajemenUserModalBody({ extraObject, closeModal }) {
  const { index } = extraObject;

  const jabatan = useSelector((state) => state.jabatan);

  const [data, setData] = useState(
    jabatan.jabatan.find((data) => data.NIK === index)
  );

  const dispatch = useDispatch();

  const INITIAL_LEAD_OBJ = {
    namaJabatan: "",
    idPegawaiAkses: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = async () => {
    if (leadObj.namaJabatan.trim() === "")
      return setErrorMessage("nama Jabatan Tidak Boleh Kosong !");
    else if (leadObj.idPegawaiAkses.trim() === "")
      return setErrorMessage("Akses Tidak Ada !");
    else {
      let data = {
        NIK: leadObj.idPegawaiAkses,
        namaPegawai: leadObj.namaJabatan,
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
        const response = await axios.put(
          `/APIHaloKominfoInternal/api/EditJabatan/${data.id}`,
          datafordatabase,
          config
        );
        if (response) {
          dispatch(editJabatan({ index, data }));
          dispatch(
            showNotification({ message: "Jabatan Telah Diedit!", status: 1 })
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

export default EditManajemenUserModalBody;
