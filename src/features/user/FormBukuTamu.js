import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import InputText from "../../components/Input/InputText";
import SelectBox from "../../components/Input/SelectBox";
import ErrorText from "../../components/Typography/ErrorText";
import { tambahbukuTamu } from "../bukuTamu/bukuTamuSlice";
import { showNotification } from "../common/headerSlice";

const INITIAL_LEAD_OBJ = {
  tanggal: "",
  instansi: "",
  nama: "",
  jabatan: "",
  nomorTelepon: "",
  tujuan: "",
  keterangan: "",
};

const FormBukuTamu = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  console.log(leadObj);

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

  const [dataOpd, setDataOpd] = useState([]);

  const dataSelectOpd = dataOpd.map((data) => ({
    name: data.namaOpd,
    value: data.id,
  }));

  const getTotalPengaduan = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const responseUser = await axios.get(
      "/APIHaloKominfoInternal/api/TampilJabatan",
      config
    );
    return responseUser.data.data;
  };
  const [dataTotalPengaduan, setTotalPengaduanData] = useState([]);

  const dataSelectJabatan = dataTotalPengaduan.map((data) => ({
    name: data.namaJabatan,
    value: data.idMasterJabatan,
  }));

  useEffect(() => {
    getOpd()
      .then((dataOpd) => {
        // Update state userData dengan data yang diterima dari axios
        setDataOpd(dataOpd);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
      });
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
    if (leadObj.tanggal.trim() === "")
      return setErrorMessage("Tanggal Tidak Boleh Kosong !");
    else if (leadObj.instansi.trim() === "")
      return setErrorMessage("Instansi Tidak Boleh Kosong !");
    else if (leadObj.nama.trim() === "")
      return setErrorMessage("Nama Tidak Boleh Kosong !");
    else if (leadObj.jabatan.trim() === "")
      return setErrorMessage("Jabatan Tidak Boleh Kosong !");
    else if (leadObj.nomorTelepon.trim() === "")
      return setErrorMessage("No Hp Pegawai Tidak Boleh Kosong !");
    else if (leadObj.tujuan.trim() === "")
      return setErrorMessage("Tujuan Tidak Boleh Kosong !");
    else if (leadObj.keterangan.trim() === "")
      return setErrorMessage("Keterangan Tidak Boleh Kosong !");
    else {
      let datafordatabase = {
        tanggal: leadObj.tanggal,
        instansi: leadObj.instansi,
        nama: leadObj.nama,
        jabatan: leadObj.jabatan,
        nomorTelepon: leadObj.nomorTelepon,
        tujuan: leadObj.tujuan,
        keterangan: leadObj.keterangan,
      };
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(
          "/APIHaloKominfoInternal/api/TambahBukuTamu",
          datafordatabase,
          config
        );
        if (response) {
          NotificationManager.success("Data berhasil disimpan", "Success");
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
    <div className="min-h-screen bg-violet-700 flex items-center">
      <NotificationContainer />
      <div className="card mx-auto w-full max-w-sm  shadow-xl bg-slate-600">
        <div className="py-11 px-5">
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Tambah Buku Tamu
          </h2>
          <InputText
            type="date"
            defaultValue={leadObj.tanggal}
            updateType="tanggal"
            containerStyle="mt-4"
            labelTitle="tanggal"
            updateFormValue={updateFormValue}
          />

          <SelectBox
            options={dataSelectOpd}
            labelTitle="Instansi"
            placeholder="Pilih Instansi"
            containerStyle="mt-4"
            updateType="instansi"
            defaultValue={leadObj.instansi}
            updateFormValue={updateFormValue}
          />

          <InputText
            type="text"
            defaultValue={leadObj.nama}
            updateType="nama"
            containerStyle="mt-4"
            labelTitle="Nama"
            updateFormValue={updateFormValue}
          />

          <SelectBox
            options={dataSelectJabatan}
            labelTitle="Jabatan"
            placeholder="Pilih Jabatan"
            containerStyle="mt-4"
            updateType="jabatan"
            defaultValue={leadObj.jabatan}
            updateFormValue={updateFormValue}
          />

          <InputText
            type="number"
            defaultValue={leadObj.nomorTelepon}
            updateType="nomorTelepon"
            containerStyle="mt-4"
            labelTitle="No Hp"
            updateFormValue={updateFormValue}
          />

          <InputText
            type="text"
            defaultValue={leadObj.tujuan}
            updateType="tujuan"
            containerStyle="mt-4"
            labelTitle="Tujuan"
            updateFormValue={updateFormValue}
          />

          <InputText
            type="text"
            defaultValue={leadObj.keterangan}
            updateType="keterangan"
            containerStyle="mt-4"
            labelTitle="Keterangan"
            updateFormValue={updateFormValue}
          />

          <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
          <div className="modal-action">
            <Link to={"/login"}>
              <button className="btn btn-ghost">Kembali</button>
            </Link>
            <button
              className="btn btn-primary px-6"
              onClick={() => saveNewLead()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBukuTamu;
