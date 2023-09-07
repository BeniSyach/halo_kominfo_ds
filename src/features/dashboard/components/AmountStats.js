import axios from "axios";
import { useEffect, useState } from "react";

function AmountStats() {
  const getTotalPengaduanPelayanan = async () => {
    const responseUser = await axios.get(
      "/APIHaloKominfoInternal/api/JumlahPelayananTerbanyak"
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
        <div className="stat-title">OPD Yang Sering Membuat Pengaduan TTE</div>
        <div className="stat-value">{dataTotalPengaduanPelayanan.jumlah}</div>
        <div className="stat-actions">
          <button className="btn btn-xs">
            {dataTotalPengaduanPelayanan.namaOpd}
          </button>
        </div>
      </div>

      {/* <div className="stat">
        <div className="stat-title">Cash in hand</div>
        <div className="stat-value">$5,600</div>
        <div className="stat-actions">
          <button className="btn btn-xs">View Members</button>
        </div>
      </div> */}
    </div>
  );
}

export default AmountStats;
