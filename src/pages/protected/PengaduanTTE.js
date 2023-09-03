import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import PengaduanTTE from "../../features/pengaduanTTE";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Pengaduan" }));
  }, []);

  return <PengaduanTTE />;
}

export default InternalPage;
