import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function PageStats() {
  const getTotalPengaduanPelayanan = async () => {
    const responseUser = await axios.get(
      "/APIHaloKominfoInternal/api/JumlahPengaduanTerbanyak"
    );
    return responseUser.data;
  };
  const [dataTotalPengaduanPelayanan, setTotalPengaduanDataPelayanan] =
    useState("");

  useEffect(() => {
    getTotalPengaduanPelayanan()
      .then((data) => {
        // Update state userData dengan data yang diterima dari axios
        setTotalPengaduanDataPelayanan(data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
      });
  }, []);

  return (
    <div className="stats bg-base-100 shadow">
      <div className="stat">
        {/* <div className="stat-figure invisible md:visible">
          <HeartIcon className="w-8 h-8" />
        </div> */}
        <div className="stat-title">
          OPD Yang Sering Membuat Pengaduan Internet
        </div>
        <div className="stat-value">{dataTotalPengaduanPelayanan.jumlah}</div>
        <button className="btn btn-xs">
          {dataTotalPengaduanPelayanan.namaOpd}
        </button>
      </div>

      {/* <div className="stat">
        <div className="stat-figure invisible md:visible">
          <BoltIcon className="w-8 h-8" />
        </div>
        <div className="stat-title">Page Views</div>
        <div className="stat-value">2.6M</div>
        <div className="stat-desc">14% more than last month</div>
      </div> */}
    </div>
  );
}

export default PageStats;
