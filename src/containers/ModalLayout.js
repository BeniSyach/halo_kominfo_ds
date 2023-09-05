import { useEffect } from "react";
import { MODAL_BODY_TYPES } from "../utils/globalConstantUtil";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../features/common/modalSlice";
import ConfirmationModalBody from "../features/common/components/ConfirmationModalBody";
import AddManajemenUserModalBody from "../features/manajemenUser/components/AddManajemenUserModalBody";
import EditManajemenUserModalBody from "../features/manajemenUser/components/EditManajemenUserModalBody";
import AddJabatanModalBody from "../features/jabatan/components/AddJabatanModalBody";
import EditJabatanModalBody from "../features/jabatan/components/EditJabatanModalBody";
import AddManajemenOPDModalBody from "../features/manajemenOPD/components/AddManajemenOPDModalBody";
import EditManajemenOPDModalBody from "../features/manajemenOPD/components/EditManajemenOPDModalBody";
import AddJenisPelayananModalBody from "../features/jenisPelayanan/components/AddJenisPelayananModalBody";
import EditJenisPelayananModalBody from "../features/jenisPelayanan/components/EditJenisPelayananModalBody";
import AddKategoriPelayananModalBody from "../features/kategoriPelayanan/components/AddKategoriPelayananModalBody";
import EditKategoriPelayananModalBody from "../features/kategoriPelayanan/components/EditKategoriPelayananModalBody";

function ModalLayout() {
  const { isOpen, bodyType, size, extraObject, title } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const close = (e) => {
    dispatch(closeModal(e));
  };

  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className={`modal-box  ${size === "lg" ? "max-w-5xl" : ""}`}>
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => close()}
          >
            ✕
          </button>
          <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>

          {/* Loading modal body according to different modal type */}
          {
            {
              [MODAL_BODY_TYPES.LEAD_ManajemenUser_NEW]: (
                <AddManajemenUserModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.Edit_LEAD_ManajemenUser_NEW]: (
                <EditManajemenUserModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.add_jabatan_new]: (
                <AddJabatanModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.Edit_jabatan_NEW]: (
                <EditJabatanModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.add_manajemen_OPD]: (
                <AddManajemenOPDModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.edit_manajemen_OPD]: (
                <EditManajemenOPDModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.LEAD_jenisPelayanan_NEW]: (
                <AddJenisPelayananModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.Edit_LEAD_jenisPelayanan_NEW]: (
                <EditJenisPelayananModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.LEAD_kategoriPelayanan_NEW]: (
                <AddKategoriPelayananModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.Edit_LEAD_kategoriPelayanan_NEW]: (
                <EditKategoriPelayananModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),

              [MODAL_BODY_TYPES.CONFIRMATION]: (
                <ConfirmationModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[bodyType]
          }
        </div>
      </div>
    </>
  );
}

export default ModalLayout;
