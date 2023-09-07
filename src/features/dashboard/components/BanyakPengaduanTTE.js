import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";

function BanyakPengaduanTTE() {
  const getTotalPengaduanPelayanan = async () => {
    const responseUser = await axios.get(
      "/APIHaloKominfoInternal/api/JumlahPelayananTerbanyakList"
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
    <TitleCard title={"Rekapitulasi OPD Yang Banyak Membuat Pengaduan TTE"}>
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
                  <td>{u.pelayanan}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}

export default BanyakPengaduanTTE;
