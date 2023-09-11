import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import SelectBox from "../../../components/Input/SelectBox";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { editbukuTamu } from "../bukuTamuSlice";

function EditBukuTamuModalBody({ extraObject, closeModal }) {
  const { index } = extraObject;

  const bukuTamu = useSelector((state) => state.bukuTamu);

  const [dataBuku, setData] = useState(
    bukuTamu.bukuTamu.find((data) => data.idBukuTamu === index)
  );

  const dispatch = useDispatch();

  const INITIAL_LEAD_OBJ = {
    tanggal: dataBuku.tanggal,
    instansi: dataBuku.instansi,
    nama: dataBuku.nama,
    jabatan: dataBuku.jabatan,
    nomorTelepon: dataBuku.nomorTelepon,
    tujuan: dataBuku.tujuan,
    keterangan: dataBuku.keterangan,
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

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
      let data = {
        tanggal: leadObj.tanggal,
        instansi: leadObj.instansi,
        nama: leadObj.nama,
        jabatan: leadObj.jabatan,
        nomorTelepon: leadObj.nomorTelepon,
        tujuan: leadObj.tujuan,
        keterangan: leadObj.keterangan,
      };
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
        const response = await axios.put(
          `/APIHaloKominfoInternal/api/EditBukuTamu/${dataBuku.idBukuTamu}`,
          datafordatabase,
          config
        );
        if (response) {
          dispatch(editbukuTamu({ index, data }));
          dispatch(
            showNotification({
              message: "data Telah Diedit!",
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

export default EditBukuTamuModalBody;
