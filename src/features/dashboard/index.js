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

const statsData = [
  {
    title: "Jumlah Users",
    value: "1",
    icon: <UserGroupIcon className="w-8 h-8" />,
    description: "",
  },
  {
    title: "Pengaduan TTE",
    value: "0",
    icon: <CreditCardIcon className="w-8 h-8" />,
    description: "Tahun Ini",
  },
  {
    title: "Pengaduan Internet",
    value: "0",
    icon: <CircleStackIcon className="w-8 h-8" />,
    description: "Tahun Ini",
  },
  {
    title: "Total Pengaduan",
    value: "0",
    icon: <UsersIcon className="w-8 h-8" />,
    description: "Tahun Ini",
  },
];

function Dashboard() {
  const dispatch = useDispatch();

  const updateDashboardPeriod = (newRange) => {
    // Dashboard range changed, write code to refresh your values
    dispatch(
      showNotification({
        message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`,
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
        <LineChart />
        <BarChart />
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
