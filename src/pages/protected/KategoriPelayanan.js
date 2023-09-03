import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import KategoriPelayanan from "../../features/kategoriPelayanan";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Kategori Pelayanan" }));
  }, []);

  return <KategoriPelayanan />;
}

export default InternalPage;
