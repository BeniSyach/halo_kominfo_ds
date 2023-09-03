import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import ManajemenUser from "../../features/manajemenUser";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Pengaduan" }));
  }, []);

  return <ManajemenUser />;
}

export default InternalPage;
