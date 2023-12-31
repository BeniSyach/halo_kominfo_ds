import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import SelectBox from "../../../components/Input/SelectBox";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { editUser } from "../manajemenUserSlice";

function EditManajemenUserModalBody({ extraObject, closeModal }) {
  const { index } = extraObject;
  const who_akses = localStorage.getItem("who_akses");
  const manajemenUser = useSelector((state) => state.datamanajemenUser);

  const [dataUser, setDataUser] = useState(
    manajemenUser.manajemenUser.find((data) => data.NIK === index)
  );

  const dispatch = useDispatch();

  const INITIAL_LEAD_OBJ = {
    namaPegawaiBaru: dataUser.namaPegawai,
    nipBaru: dataUser.NIP,
    nikBaru: dataUser.NIK,
    jabatanBaru: dataUser.jabatan,
    idPegawaiAkses: who_akses,
  };

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
      let data = {
        NIK: leadObj.nikBaru,
        namaPegawai: leadObj.namaPegawaiBaru,
        NIP: leadObj.nipBaru,
        jabatan: leadObj.jabatanBaru,
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
          `/APIHaloKominfoInternal/api/EditDataPegawai/${dataUser.id}`,
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

export default EditManajemenUserModalBody;
