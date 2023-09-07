import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import TitleCard from "../../../components/Cards/TitleCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart(prop) {
  const getTotalPengaduan = async () => {
    const responseUser = await axios.get(
      `/APIHaloKominfoInternal/api/PengaduanByTahun/${prop.dataTahun}`
    );
    return responseUser.data.data;
  };
  const [dataTotalPengaduan, setTotalPengaduanData] = useState([]);

  useEffect(() => {
    getTotalPengaduan()
      .then((data) => {
        // Update state userData dengan data yang diterima dari axios
        setTotalPengaduanData(data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
      });
  }, [prop]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const labels = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Jumlah Pengaduan Internet",
        data: dataTotalPengaduan,
        backgroundColor: "rgba(53, 162, 235, 1)",
      },
    ],
  };

  return (
    <TitleCard title={"Statistik Jumlah Pengaduan Internet"}>
      <Bar options={options} data={data} />
    </TitleCard>
  );
}

export default BarChart;
