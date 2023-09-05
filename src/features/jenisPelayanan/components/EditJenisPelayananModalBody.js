import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { editJenisPelayanan } from "../jenisPelayananSlice";

function EditJenisPelayananModalBody({ extraObject, closeModal }) {
  const { index } = extraObject;
  const who_akses = localStorage.getItem("who_akses");

  const jenisPelayanan = useSelector((state) => state.jenisPelayanan);

  const [dataJenisPelayanan, setData] = useState(
    jenisPelayanan.jenisPelayanan.find((data) => data.id === index)
  );

  const dispatch = useDispatch();

  const INITIAL_LEAD_OBJ = {
    jenisPelayanan: dataJenisPelayanan.jenisPelayanan,
    idPegawaiAkses: who_akses,
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = async () => {
    if (leadObj.jenisPelayanan.trim() === "")
      return setErrorMessage("Jenis Pelayanan Tidak Boleh Kosong !");
    else if (leadObj.idPegawaiAkses.trim() === "")
      return setErrorMessage("Akses Pegawai Tidak Boleh Kosong !");
    else {
      let data = {
        jenisPelayanan: leadObj.jenisPelayanan,
        idPegawaiAkses: leadObj.idPegawaiAkses,
      };
      let datafordatabase = {
        jenisPelayanan: leadObj.jenisPelayanan,
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
          `/APIHaloKominfoInternal/api/EditJenisPelayanan/${dataJenisPelayanan.id}`,
          datafordatabase,
          config
        );
        if (response) {
          dispatch(editJenisPelayanan({ index, data }));
          dispatch(
            showNotification({
              message: "Jenis Pelayanan Telah Diedit!",
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
        defaultValue={leadObj.jenisPelayanan}
        updateType="jenisPelayanan"
        containerStyle="mt-4"
        labelTitle="Jenis Pelayanan"
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

export default EditJenisPelayananModalBody;
