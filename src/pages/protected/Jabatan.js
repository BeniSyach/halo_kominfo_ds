import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Jabatan from "../../features/jabatan";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Jabatan" }));
  }, []);

  return <Jabatan />;
}

export default InternalPage;
