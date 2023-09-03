import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import JenisPelayanan from "../../features/jenisPelayanan";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Jenis Pelayanan" }));
  }, []);

  return <JenisPelayanan />;
}

export default InternalPage;
