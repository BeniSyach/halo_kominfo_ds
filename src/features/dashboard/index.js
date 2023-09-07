import DashboardStats from "./components/DashboardStats";
import AmountStats from "./components/AmountStats";
import PageStats from "./components/PageStats";

import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import DashboardTopBar from "./components/DashboardTopBar";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import { useState } from "react";
import BanyakPengaduanTTE from "./components/BanyakPengaduanTTE";
import BanyakPengaduanInternet from "./components/BanyakPengaduanInternet";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment/moment";

function Dashboard() {
  const dispatch = useDispatch();

  const getUsers = async () => {
    const responseUser = await axios.get(
      "/APIHaloKominfoInternal/api/JumlahPegawai"
    );
    return responseUser.data.data;
  };
  const [dataUser, setUserData] = useState("");

  const getJumlahPelayanan = async () => {
    const responseUser = await axios.get(
      "/APIHaloKominfoInternal/api/JumlahLaporanPelayanan"
    );
    return responseUser.data.data;
  };
  const [dataJumlahPelayanan, setJumlahPelayananData] = useState("");

  const getPengaduanInternet = async () => {
    const responseUser = await axios.get(
      "/APIHaloKominfoInternal/api/JumlahLaporanPengaduan"
    );
    return responseUser.data.data;
  };
  const [dataPengaduanInternet, setPengaduanInternetData] = useState("");

  const getTotalPengaduan = async () => {
    const responseUser = await axios.get(
      "/APIHaloKominfoInternal/api/JumlahSeluruhPengaduanPelayanan"
    );
    return responseUser.data.data;
  };
  const [dataTotalPengaduan, setTotalPengaduanData] = useState("");

  useEffect(() => {
    getUsers()
      .then((data) => {
        // Update state userData dengan data yang diterima dari axios
        setUserData(data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
      });
    getJumlahPelayanan()
      .then((data) => {
        // Update state userData dengan data yang diterima dari axios
        setJumlahPelayananData(data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
      });
    getPengaduanInternet()
      .then((data) => {
        // Update state userData dengan data yang diterima dari axios
        setPengaduanInternetData(data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
      });
    getTotalPengaduan()
      .then((data) => {
        // Update state userData dengan data yang diterima dari axios
        setTotalPengaduanData(data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
      });
  }, []);

  const statsData = [
    {
      title: "Jumlah Users",
      value: dataUser.jumlahPegawai,
      icon: <UserGroupIcon className="w-8 h-8" />,
      description: "",
    },
    {
      title: "Pengaduan TTE",
      value: dataJumlahPelayanan.jumlahPelyanan,
      icon: <CreditCardIcon className="w-8 h-8" />,
      description: "Tahun Ini",
    },
    {
      title: "Pengaduan Internet",
      value: dataPengaduanInternet.jumlahPengaduan,
      icon: <CircleStackIcon className="w-8 h-8" />,
      description: "Tahun Ini",
    },
    {
      title: "Total Pengaduan",
      value: dataTotalPengaduan.jumlahPelayanan,
      icon: <UsersIcon className="w-8 h-8" />,
      description: "Tahun Ini",
    },
  ];

  const [tahun, setTahun] = useState(new Date());

  const updateDashboardPeriod = (newRange) => {
    // Dashboard range changed, write code to refresh your values
    setTahun(newRange);
    dispatch(
      showNotification({
        message: `di ganti ke tahun ${newRange}`,
        status: 1,
      })
    );
  };

  return (
    <>
      {/** ---------------------- Select Period Content ------------------------- */}
      <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} />

      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>

      {/** ---------------------- Different charts ------------------------- */}
      <div className="grid lg:grid-cols-1 mt-4 grid-cols-1 gap-6">
        <LineChart dataTahun={moment(tahun).format("YYYY")} />
        <BarChart dataTahun={moment(tahun).format("YYYY")} />
      </div>

      {/** ---------------------- Different stats content 2 ------------------------- */}

      <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
        <AmountStats />
        <PageStats />
      </div>

      {/** ---------------------- User source channels table  ------------------------- */}

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <BanyakPengaduanTTE />
        <BanyakPengaduanInternet />
      </div>
    </>
  );
}

export default Dashboard;
