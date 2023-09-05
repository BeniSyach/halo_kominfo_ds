import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { tambahKategoriPelayanan } from "../kategoriPelayananSlice";

const who_akses = localStorage.getItem("who_akses");

const INITIAL_LEAD_OBJ = {
  idJenisPelayanan: "",
  kategoriPelayanan: "",
  idPegawaiAkses: who_akses,
};

function AddKategoriPelayananModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = async () => {
    if (leadObj.idJenisPelayanan.trim() === "")
      return setErrorMessage("nama Pegawai Tidak Boleh Kosong !");
    else if (leadObj.kategoriPelayanan.trim() === "")
      return setErrorMessage("NIP Tidak Boleh Kosong !");
    else if (leadObj.idPegawaiAkses.trim() === "")
      return setErrorMessage("Akses Pegawai Tidak Boleh Kosong !");
    else {
      let newLeadObj = {
        idJenisPelayanan: leadObj.idJenisPelayanan,
        kategoriPelayanan: leadObj.kategoriPelayanan,
        idPegawaiAkses: leadObj.idPegawaiAkses,
      };
      let datafordatabase = {
        idJenisPelayanan: leadObj.idJenisPelayanan,
        kategoriPelayanan: leadObj.kategoriPelayanan,
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
          "/APIHaloKominfoInternal/api/TambahKategoriPelayanan",
          datafordatabase,
          config
        );
        if (response) {
          dispatch(tambahKategoriPelayanan({ newLeadObj }));
          dispatch(
            showNotification({
              message: "Kategori Pelayanan Telah Ditambahkan!",
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
        type="number"
        defaultValue={leadObj.idJenisPelayanan}
        updateType="idJenisPelayanan"
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

export default AddKategoriPelayananModalBody;
