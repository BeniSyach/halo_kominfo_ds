import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import PengaduanJaringan from "../../features/pengaduanJaringan";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Pengaduan Jaringan" }));
  }, []);

  return <PengaduanJaringan />;
}

export default InternalPage;
