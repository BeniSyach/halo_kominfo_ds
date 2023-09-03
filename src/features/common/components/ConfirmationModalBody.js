import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_CLOSE_TYPES,
} from "../../../utils/globalConstantUtil";
import { HapusUser } from "../../manajemenUser/manajemenUserSlice";
import { showNotification } from "../headerSlice";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();

  const { message, type, id, index, aksi } = extraObject;

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE) {
      // positive response, call api or dispatch redux function
      if (aksi === "ManajemenUser") {
        try {
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.put(
            `/APIHaloKominfoInternal/api/HapusPegawai/${id}`,
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
