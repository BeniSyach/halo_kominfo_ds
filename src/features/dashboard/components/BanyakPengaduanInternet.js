import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";

const userSourceData = [
  { source: "Dinas Kominfostan", count: "56,345" },
  { source: "Dinas Kesehatan", count: "41,341" },
  { source: "BAPENDA", count: "34,379" },
  {
    source: "Puskesmas Pagar Merbau",
    count: "12,359",
    conversionPercent: 20.9,
  },
  {
    source: "Kecamatan Bangun Purba",
    count: "10,345",
    conversionPercent: 10.3,
  },
];

function BanyakPengaduanInternet() {
  const getTotalPengaduanPelayanan = async () => {
    const responseUser = await axios.get(
      "/APIHaloKominfoInternal/api/JumlahPengaduanTerbanyakList"
    );
    return responseUser.data.data;
  };
  const [dataTotalPengaduanPelayanan, setTotalPengaduanDataPelayanan] =
    useState([]);

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
    <TitleCard
      title={"Rekapitulasi OPD Yang Banyak Membuat Pengaduan Internet"}
    >
      {/** Table Data */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="normal-case">Organisasi Perangkat Daerah</th>
              <th className="normal-case">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {dataTotalPengaduanPelayanan.map((u, k) => {
              return (
                <tr key={k}>
                  <th>{k + 1}</th>
                  <td>{u.namaOpd}</td>
                  <td>{u.pengaduan}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}

export default BanyakPengaduanInternet;
