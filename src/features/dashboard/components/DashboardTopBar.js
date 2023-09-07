import SelectBox from "../../../components/Input/SelectBox";
import ArrowDownTrayIcon from "@heroicons/react/24/outline/ArrowDownTrayIcon";
import ShareIcon from "@heroicons/react/24/outline/ShareIcon";
import EnvelopeIcon from "@heroicons/react/24/outline/EnvelopeIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";

function DashboardTopBar({ updateDashboardPeriod }) {
  const [dateValue, setDateValue] = useState(new Date());

  const handleDatePickerValueChange = (dateValue) => {
    console.log("dateValue:", dateValue);
    setDateValue(dateValue);
    updateDashboardPeriod(dateValue);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="">
        <ReactDatePicker
          selected={dateValue}
          onChange={handleDatePickerValueChange}
          dateFormat="yyyy"
          showYearPicker
          yearItemNumber={5}
          className="input input-bordered w-72 "
          calendarClassName=" w-72 bg-white text-black"
        />
      </div>
    </div>
  );
}

export default DashboardTopBar;
