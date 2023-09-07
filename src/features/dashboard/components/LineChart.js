import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import TitleCard from "../../../components/Cards/TitleCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function LineChart(prop) {
  const getTotalPengaduan = async () => {
    const responseUser = await axios.get(
      `/APIHaloKominfoInternal/api/PelayananByTahun/${prop.dataTahun}`
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
        fill: true,
        label: "Jumlah Pengaduan TTE",
        data: dataTotalPengaduan,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <TitleCard title={"Statistik Jumlah Pengaduan TTE"}>
      <Line data={data} options={options} />
    </TitleCard>
  );
}

export default LineChart;
