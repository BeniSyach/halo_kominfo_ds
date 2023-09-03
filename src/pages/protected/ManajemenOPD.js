import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import ManajemenOPD from "../../features/manajemenOPD";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Manajemen OPD" }));
  }, []);

  return <ManajemenOPD />;
}

export default InternalPage;
