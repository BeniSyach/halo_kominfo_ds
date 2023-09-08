import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import SelectBox from "../../../components/Input/SelectBox";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { tambahUser } from "../manajemenUserSlice";

const INITIAL_LEAD_OBJ = {
  namaPegawaiBaru: "",
  nipBaru: "",
  nikBaru: "",
  jabatanBaru: "",
};

function AddManajemenUserModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const getTotalPengaduan = async () => {
    const responseUser = await axios.get(
      "/APIHaloKominfoInternal/api/TampilJabatan"
    );
    return responseUser.data.data;
  };
  const [dataTotalPengaduan, setTotalPengaduanData] = useState([]);

  const dataSelectJabatan = dataTotalPengaduan.map((data) => ({
    name: data.namaJabatan,
    value: data.idMasterJabatan,
  }));

  useEffect(() => {
    getTotalPengaduan()
      .then((data) => {
        // Update state userData dengan data yang diterima dari axios
        setTotalPengaduanData(data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
      });
  }, []);

  const who_akses = localStorage.getItem("who_akses");

  const saveNewLead = async () => {
    if (leadObj.namaPegawaiBaru.trim() === "")
      return setErrorMessage("nama Pegawai Tidak Boleh Kosong !");
    else if (leadObj.nikBaru.trim() === "")
      return setErrorMessage("NIK Tidak Boleh Kosong !");
    else if (leadObj.nipBaru.trim() === "")
      return setErrorMessage("NIP Tidak Boleh Kosong !");
    else if (leadObj.jabatanBaru.trim() === "")
      return setErrorMessage("Jabatan Tidak Boleh Kosong !");
    else {
      let newLeadObj = {
        NIK: leadObj.nikBaru,
        namaPegawai: leadObj.namaPegawaiBaru,
        NIP: leadObj.nipBaru,
        jabatan: leadObj.jabatanBaru,
        status: who_akses,
      };
      let datafordatabase = {
        nikBaru: leadObj.nikBaru,
        namaPegawaiBaru: leadObj.namaPegawaiBaru,
        nipBaru: leadObj.nipBaru,
        jabatanBaru: leadObj.jabatanBaru,
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

      <SelectBox
        options={dataSelectJabatan}
        labelTitle="Jabatan"
        placeholder="Pilih Jabatan"
        containerStyle="mt-4"
        updateType="jabatanBaru"
        defaultValue={leadObj.jabatanBaru}
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
