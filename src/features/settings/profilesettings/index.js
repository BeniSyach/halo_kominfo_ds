import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import axios from "axios";
import { getmanajemenUserContent } from "../../manajemenUser/manajemenUserSlice";

function ProfileSettings() {
  const who_akses = localStorage.getItem("who_akses");

  const manajemenUser = useSelector((state) => state.datamanajemenUser);
  const [dataUser, setDataUser] = useState(
    manajemenUser.manajemenUser.find((data) => data.id === who_akses)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getmanajemenUserContent());
  }, [dispatch]);

  const INITIAL_LEAD_OBJ = {
    namaPegawaiBaru: dataUser.namaPegawai,
    nipBaru: dataUser.NIP,
    nikBaru: dataUser.NIK,
    jabatanBaru: dataUser.namaJabatan,
    idPegawaiAkses: who_akses,
  };

  const [loading, setLoading] = useState(false);
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  // Call API to update profile settings changes
  const updateProfile = async () => {
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
        `/APIHaloKominfoInternal/api/EditDataPegawai/${who_akses}`,
        datafordatabase,
        config
      );
      if (response) {
        dispatch(showNotification({ message: "Profil Diperbarui", status: 1 }));
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
  };

  const updateFormValue = ({ updateType, value }) => {
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  return (
    <>
      <TitleCard title="Profile Settings" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            labelTitle="Nama"
            defaultValue={leadObj.namaPegawaiBaru}
            updateType="namaPegawaiBaru"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="NIP"
            defaultValue={leadObj.nipBaru}
            updateType="nipBaru"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="NIK"
            defaultValue={leadObj.nikBaru}
            updateType="nikBaru"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Jabatan"
            defaultValue={leadObj.jabatanBaru}
            updateType="jabatanBaru"
            updateFormValue={updateFormValue}
          />
          {/* <InputText
            labelTitle="Status"
            defaultValue={dataTotalPengaduan.status}
            updateFormValue={updateFormValue}
          /> */}
        </div>

        <div className="mt-16">
          <button
            className="btn btn-primary float-right"
            onClick={() => updateProfile()}
          >
            Update
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default ProfileSettings;
