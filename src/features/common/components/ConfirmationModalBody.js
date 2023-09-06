import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_CLOSE_TYPES,
} from "../../../utils/globalConstantUtil";
import { HapusUser } from "../../manajemenUser/manajemenUserSlice";
import { showNotification } from "../headerSlice";
import { hapusJabatan } from "../../jabatan/jabatanSlice";
import { hapusOPD } from "../../manajemenOPD/manajemenOPDSlice";
import { hapusKategoriPelayanan } from "../../kategoriPelayanan/kategoriPelayananSlice";
import { hapusPengaduanTTE } from "../../pengaduanTTE/pengaduanTTESlice";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();

  const { message, type, id, index, aksi } = extraObject;
  console.log(id);
  console.log(index);

  const token = localStorage.getItem("token");
  const who_akses = localStorage.getItem("who_akses");

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE) {
      // positive response, call api or dispatch redux function
      if (aksi === "ManajemenUser") {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.delete(
            `/APIHaloKominfoInternal/api/HapusPegawai/${id}/${who_akses}`,
            { idPegawaiAkses: who_akses },
            config
          );
          if (response) {
            dispatch(HapusUser({ index }));
            dispatch(showNotification({ message: "Data Dihapus!", status: 1 }));
          }
        } catch (err) {
          if (!err?.response) {
            dispatch(
              showNotification({ message: "Error Server !", status: 0 })
            );
          } else {
            dispatch(showNotification({ message: "Error !", status: 0 }));
          }
        }
      } else if (aksi === "jabatan") {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.delete(
            `/APIHaloKominfoInternal/api/HapusJabatan/${id}/${who_akses}`,
            config
          );
          if (response) {
            dispatch(hapusJabatan({ index }));
            dispatch(showNotification({ message: "Data Dihapus!", status: 1 }));
          }
        } catch (err) {
          if (!err?.response) {
            dispatch(
              showNotification({ message: "Error Server !", status: 0 })
            );
          } else {
            dispatch(showNotification({ message: "Error !", status: 0 }));
          }
        }
      } else if (aksi === "ManajemenOPD") {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.delete(
            `/APIHaloKominfoInternal/api/HapusOpd/${id}/${who_akses}`,
            config
          );
          if (response) {
            dispatch(hapusOPD({ index }));
            dispatch(showNotification({ message: "Data Dihapus!", status: 1 }));
          }
        } catch (err) {
          if (!err?.response) {
            dispatch(
              showNotification({ message: "Error Server !", status: 0 })
            );
          } else {
            dispatch(showNotification({ message: "Error !", status: 0 }));
          }
        }
      } else if (aksi === "kategoriPelayanan") {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.delete(
            `/APIHaloKominfoInternal/api/HapusKategoriPelayanan/${id}/${who_akses}`,
            config
          );
          if (response) {
            dispatch(hapusKategoriPelayanan({ index }));
            dispatch(showNotification({ message: "Data Dihapus!", status: 1 }));
          }
        } catch (err) {
          if (!err?.response) {
            dispatch(
              showNotification({ message: "Error Server !", status: 0 })
            );
          } else {
            dispatch(showNotification({ message: "Error !", status: 0 }));
          }
        }
      } else if (aksi === "pengaduanTTE") {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.delete(
            `/APIHaloKominfoInternal/api/HapusPelayanan/${id}/${who_akses}`,
            config
          );
          if (response) {
            dispatch(hapusPengaduanTTE({ index }));
            dispatch(showNotification({ message: "Data Dihapus!", status: 1 }));
          }
        } catch (err) {
          if (!err?.response) {
            dispatch(
              showNotification({ message: "Error Server !", status: 0 })
            );
          } else {
            dispatch(showNotification({ message: "Error !", status: 0 }));
          }
        }
      }
    }
    closeModal();
  };

  return (
    <>
      <p className=" text-xl mt-8 text-center">{message}</p>

      <div className="modal-action mt-12">
        <button className="btn btn-outline   " onClick={() => closeModal()}>
          Cancel
        </button>

        <button
          className="btn btn-primary w-36"
          onClick={() => proceedWithYes()}
        >
          Yes
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
