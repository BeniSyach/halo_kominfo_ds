import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import SelectBox from "../../../components/Input/SelectBox";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { editPengaduanTTE } from "../pengaduanTTESlice";

function EditPengaduanTTEModalBody({ extraObject, closeModal }) {
  const { index } = extraObject;
  const who_akses = localStorage.getItem("who_akses");

  const pengaduanTTE = useSelector((state) => state.pengaduanTTE);

  const [dataPengaduanTTE, setData] = useState(
    pengaduanTTE.pengaduanTTE.find((data) => data.idPelayanan === index)
  );

  const dispatch = useDispatch();

  const INITIAL_LEAD_OBJ = {
    idPegawai: dataPengaduanTTE.idPegawai,
    tanggalPelayanan: dataPengaduanTTE.tanggalPelayanan,
    jenisPelayanan: dataPengaduanTTE.jenisPelayanan,
    kategoriPelayanan: dataPengaduanTTE.kategoriPelayanan,
    statusPelayanan: dataPengaduanTTE.statusPelayanan,
    namaCustomer: dataPengaduanTTE.namaCustomer,
    nikCustomer: dataPengaduanTTE.nikCustomer,
    nipCustomer: dataPengaduanTTE.nipCustomer,
    opd: dataPengaduanTTE.opd,
    emailCustomer: dataPengaduanTTE.emailCustomer,
    nomorTeleponCustomer: dataPengaduanTTE.nomorTeleponCustomer,
    idPegawaiAkses: who_akses,
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const getTotalPengaduan = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const responseUser = await axios.get(
      "/APIHaloKominfoInternal/api/TampilPegawai",
      config
    );
    return responseUser.data.data;
  };
  const [dataTotalPengaduan, setTotalPengaduanData] = useState([]);

  const dataSelectPegawai = dataTotalPengaduan.map((data) => ({
    name: data.namaPegawai,
    value: data.id,
  }));

  const getOpd = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const responseUser = await axios.get(
      "/APIHaloKominfoInternal/api/TampilOpd",
      config
    );
    return responseUser.data.data;
  };

  const dataSelectStatus = [
    {
      name: "Belum Selesai",
      value: 0,
    },
    {
      name: "Selesai",
      value: 1,
    },
  ];

  const [dataOpd, setDataOpd] = useState([]);

  const dataSelectOpd = dataOpd.map((data) => ({
    name: data.namaOpd,
    value: data.id,
  }));

  const getJenisPelayanan = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const responseUser = await axios.get(
      "/APIHaloKominfoInternal/api/TampilJenisPelayanan",
      config
    );
    return responseUser.data.data;
  };

  const [dataJenisPelayanan, setDataJenisPelayanan] = useState([]);

  const dataSelectJenisPelayanan = dataJenisPelayanan.map((data) => ({
    name: data.jenisPelayanan,
    value: data.id,
  }));

  const getKategoriPelayanan = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const responseUser = await axios.get(
      "/APIHaloKominfoInternal/api/TampilKategoriPelayanan",
      config
    );
    return responseUser.data.data;
  };

  const [dataKategoriPelayanan, setDataKategoriPelayanan] = useState([]);

  const dataSelectKategoriPelayanan = dataKategoriPelayanan.map((data) => ({
    name: data.kategoriPelayanan,
    value: data.id,
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
    getOpd()
      .then((dataOpd) => {
        // Update state userData dengan data yang diterima dari axios
        setDataOpd(dataOpd);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
      });
    getJenisPelayanan()
      .then((dataJenisPelayanan) => {
        // Update state userData dengan data yang diterima dari axios
        setDataJenisPelayanan(dataJenisPelayanan);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
      });
    getKategoriPelayanan()
      .then((dataKategoriPelayanan) => {
        // Update state userData dengan data yang diterima dari axios
        setDataKategoriPelayanan(dataKategoriPelayanan);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
      });
  }, []);

  const saveNewLead = async () => {
    if (leadObj.idPegawai.trim() === "")
      return setErrorMessage("nama Pegawai Tidak Boleh Kosong !");
    else if (leadObj.jenisPelayanan.trim() === "")
      return setErrorMessage("Jenis Pelayanan Tidak Boleh Kosong !");
    else if (leadObj.tanggalPelayanan.trim() === "")
      return setErrorMessage("Tanggal Pelayanan Tidak Boleh Kosong !");
    else if (leadObj.kategoriPelayanan.trim() === "")
      return setErrorMessage("Kategori Pelayanan Tidak Boleh Kosong !");
    else if (leadObj.statusPelayanan.trim() === "")
      return setErrorMessage("Status Pelayanan Tidak Boleh Kosong !");
    else if (leadObj.namaCustomer.trim() === "")
      return setErrorMessage("Nama Customer Tidak Boleh Kosong !");
    else if (leadObj.nikCustomer.trim() === "")
      return setErrorMessage("NIK Customer Tidak Boleh Kosong !");
    else if (leadObj.nipCustomer.trim() === "")
      return setErrorMessage("NIP Customer Tidak Boleh Kosong !");
    else if (leadObj.opd.trim() === "")
      return setErrorMessage("OPD Tidak Boleh Kosong !");
    else if (leadObj.emailCustomer.trim() === "")
      return setErrorMessage("Email Customer Tidak Boleh Kosong !");
    else if (leadObj.nomorTeleponCustomer.trim() === "")
      return setErrorMessage("Nomor Telepon Customer Tidak Boleh Kosong !");
    else if (leadObj.idPegawaiAkses.trim() === "")
      return setErrorMessage("Akses Pegawai Tidak Boleh Kosong !");
    else {
      let data = {
        idPegawai: leadObj.idPegawai,
        tanggalPelayanan: leadObj.tanggalPelayanan,
        jenisPelayanan: leadObj.jenisPelayanan,
        kategoriPelayanan: leadObj.kategoriPelayanan,
        statusPelayanan: leadObj.statusPelayanan,
        namaCustomer: leadObj.namaCustomer,
        nikCustomer: leadObj.nikCustomer,
        nipCustomer: leadObj.nipCustomer,
        opd: leadObj.opd,
        emailCustomer: leadObj.emailCustomer,
        nomorTeleponCustomer: leadObj.nomorTeleponCustomer,
        idPegawaiAkses: who_akses,
      };
      let datafordatabase = {
        idPegawai: leadObj.idPegawai,
        tanggalPelayanan: leadObj.tanggalPelayanan,
        jenisPelayanan: leadObj.jenisPelayanan,
        kategoriPelayanan: leadObj.kategoriPelayanan,
        statusPelayanan: leadObj.statusPelayanan,
        namaCustomer: leadObj.namaCustomer,
        nikCustomer: leadObj.nikCustomer,
        nipCustomer: leadObj.nipCustomer,
        opd: leadObj.opd,
        emailCustomer: leadObj.emailCustomer,
        nomorTeleponCustomer: leadObj.nomorTeleponCustomer,
        idPegawaiAkses: who_akses,
      };
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.put(
          `/APIHaloKominfoInternal/api/EditPelayanan/${dataPengaduanTTE.idPelayanan}`,
          datafordatabase,
          config
        );
        if (response) {
          dispatch(editPengaduanTTE({ index, data }));
          dispatch(
            showNotification({
              message: "Pengaduan TTE Telah Diedit!",
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
      <SelectBox
        options={dataSelectPegawai}
        labelTitle="Nama Pegawai"
        placeholder="Pilih Pegawai"
        containerStyle="mt-4"
        updateType="idPegawai"
        defaultValue={leadObj.idPegawai}
        updateFormValue={updateFormValue}
      />

      <InputText
        type="date"
        defaultValue={leadObj.tanggalPelayanan}
        updateType="tanggalPelayanan"
        containerStyle="mt-4"
        labelTitle="Tanggal Pelayanan"
        updateFormValue={updateFormValue}
      />

      <SelectBox
        options={dataSelectJenisPelayanan}
        labelTitle="Jenis Pelayanan"
        placeholder="Pilih Jenis Pelayanan"
        containerStyle="mt-4"
        updateType="jenisPelayanan"
        defaultValue={leadObj.jenisPelayanan}
        updateFormValue={updateFormValue}
      />

      <SelectBox
        options={dataSelectKategoriPelayanan}
        labelTitle="Kategori Pelayanan"
        placeholder="Pilih Kategori Pelayanan"
        containerStyle="mt-4"
        updateType="kategoriPelayanan"
        defaultValue={leadObj.kategoriPelayanan}
        updateFormValue={updateFormValue}
      />

      <SelectBox
        options={dataSelectStatus}
        labelTitle="Status Pelayanan"
        placeholder="Status Pelayanan"
        containerStyle="mt-4"
        updateType="statusPelayanan"
        defaultValue={leadObj.statusPelayanan}
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.namaCustomer}
        updateType="namaCustomer"
        containerStyle="mt-4"
        labelTitle="Nama Customer"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="number"
        defaultValue={leadObj.nikCustomer}
        updateType="nikCustomer"
        containerStyle="mt-4"
        labelTitle="NIK Customer"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="number"
        defaultValue={leadObj.nipCustomer}
        updateType="nipCustomer"
        containerStyle="mt-4"
        labelTitle="NIP Customer"
        updateFormValue={updateFormValue}
      />

      <SelectBox
        options={dataSelectOpd}
        labelTitle="OPD"
        placeholder="Pilih Pegawai"
        containerStyle="mt-4"
        updateType="opd"
        defaultValue={leadObj.opd}
        updateFormValue={updateFormValue}
      />

      <InputText
        type="email"
        defaultValue={leadObj.emailCustomer}
        updateType="emailCustomer"
        containerStyle="mt-4"
        labelTitle="Email Customer"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="number"
        defaultValue={leadObj.nomorTeleponCustomer}
        updateType="nomorTeleponCustomer"
        containerStyle="mt-4"
        labelTitle="No Hp Customer"
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

export default EditPengaduanTTEModalBody;
