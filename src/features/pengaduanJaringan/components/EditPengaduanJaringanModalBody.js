import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import SelectBox from "../../../components/Input/SelectBox";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { editPengaduanJaringan } from "../pengaduanJaringanSlice";

function EditPengaduanJaringanModalBody({ extraObject, closeModal }) {
  const { index } = extraObject;
  const who_akses = localStorage.getItem("who_akses");

  const pengaduanJaringan = useSelector((state) => state.pengaduanJaringan);

  const [dataPengaduanJaringan, setData] = useState(
    pengaduanJaringan.pengaduanJaringan.find(
      (data) => data.idPengaduan === index
    )
  );

  const dispatch = useDispatch();

  const INITIAL_LEAD_OBJ = {
    idPegawai: dataPengaduanJaringan.idPegawai,
    tanggalPengaduan: dataPengaduanJaringan.tanggalPengaduan,
    keteranganPengaduan: dataPengaduanJaringan.keteranganPengaduan,
    statusPengaduan: dataPengaduanJaringan.statusPengaduan,
    kegiatanPengaduan: dataPengaduanJaringan.kegiatanPengaduan,
    opd: dataPengaduanJaringan.opd,
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
  }, []);

  const saveNewLead = async () => {
    if (leadObj.idPegawai.trim() === "")
      return setErrorMessage("nama Pegawai Tidak Boleh Kosong !");
    else if (leadObj.keteranganPengaduan.trim() === "")
      return setErrorMessage("Keterangan Pengaduan Tidak Boleh Kosong !");
    else if (leadObj.tanggalPengaduan.trim() === "")
      return setErrorMessage("Tanggal Pengaduan Tidak Boleh Kosong !");
    else if (leadObj.statusPengaduan.trim() === "")
      return setErrorMessage("Status Pengaduan Tidak Boleh Kosong !");
    else if (leadObj.kegiatanPengaduan.trim() === "")
      return setErrorMessage("Kegiatan Tidak Boleh Kosong !");
    else if (leadObj.opd.trim() === "")
      return setErrorMessage("OPD Tidak Boleh Kosong !");
    else if (leadObj.idPegawaiAkses.trim() === "")
      return setErrorMessage("Akses Pegawai Tidak Boleh Kosong !");
    else {
      let data = {
        keteranganPengaduan: leadObj.keteranganPengaduan,
        idPegawai: leadObj.idPegawai,
        tanggalPengaduan: leadObj.tanggalPengaduan,
        statusPengaduan: leadObj.statusPengaduan,
        kegiatanPengaduan: leadObj.kegiatanPengaduan,
        opd: leadObj.opd,
        idPegawaiAkses: leadObj.idPegawaiAkses,
      };
      let datafordatabase = {
        keteranganPengaduan: leadObj.keteranganPengaduan,
        idPegawai: leadObj.idPegawai,
        tanggalPengaduan: leadObj.tanggalPengaduan,
        statusPengaduan: leadObj.statusPengaduan,
        kegiatanPengaduan: leadObj.kegiatanPengaduan,
        opd: leadObj.opd,
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
          `/APIHaloKominfoInternal/api/EditPengaduan/${dataPengaduanJaringan.idPengaduan}`,
          datafordatabase,
          config
        );
        if (response) {
          dispatch(editPengaduanJaringan({ index, data }));
          dispatch(
            showNotification({ message: "Pengaduan Telah Diedit!", status: 1 })
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
        defaultValue={leadObj.tanggalPengaduan}
        updateType="tanggalPengaduan"
        containerStyle="mt-4"
        labelTitle="Tanggal Pengaduan"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.keteranganPengaduan}
        updateType="keteranganPengaduan"
        containerStyle="mt-4"
        labelTitle="Keterangan Pengaduan"
        updateFormValue={updateFormValue}
      />

      <SelectBox
        options={dataSelectStatus}
        labelTitle="Status Pengaduan"
        placeholder="Pilih Pegawai"
        containerStyle="mt-4"
        updateType="statusPengaduan"
        defaultValue={leadObj.statusPengaduan}
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.kegiatanPengaduan}
        updateType="kegiatanPengaduan"
        containerStyle="mt-4"
        labelTitle="Kegiatan pengaduan"
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

export default EditPengaduanJaringanModalBody;
