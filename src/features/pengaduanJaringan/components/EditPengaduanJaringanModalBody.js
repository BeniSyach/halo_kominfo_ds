import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { editUser } from "../manajemenUserSlice";

function EditManajemenUserModalBody({ extraObject, closeModal }) {
  const { index } = extraObject;

  const manajemenUser = useSelector((state) => state.datamanajemenUser);

  const [data, setData] = useState(
    manajemenUser.manajemenUser.find((data) => data.NIK === index)
  );

  const dispatch = useDispatch();

  const INITIAL_LEAD_OBJ = {
    namaPegawaiBaru: data.namaPegawai,
    nipBaru: data.NIP,
    nikBaru: data.NIK,
    jabatanBaru: data.jabatan,
    idPegawaiAkses: data.status,
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
      let data = {
        NIK: leadObj.nikBaru,
        namaPegawai: leadObj.namaPegawaiBaru,
        NIP: leadObj.nipBaru,
        jabatanBaru: leadObj.jabatanBaru,
        status: leadObj.idPegawaiAkses,
      };
      let datafordatabase = {
        nik: leadObj.nikBaru,
        namaPegawai: leadObj.namaPegawaiBaru,
        nip: leadObj.nipBaru,
        jabatan: leadObj.jabatanBaru,
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
          `/APIHaloKominfoInternal/api/EditDataPegawai/${data.id}`,
          datafordatabase,
          config
        );
        if (response) {
          dispatch(editUser({ index, data }));
          dispatch(
            showNotification({ message: "User Telah Diedit!", status: 1 })
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
        type="text"
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

export default EditManajemenUserModalBody;
