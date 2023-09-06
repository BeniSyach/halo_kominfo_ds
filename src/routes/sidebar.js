import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";
import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import TableCellsIcon from "@heroicons/react/24/outline/TableCellsIcon";
import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import WalletIcon from "@heroicons/react/24/outline/WalletIcon";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "/app/manajemen_user", // url
    icon: <UserIcon className={iconClasses} />, // icon component
    name: "Manajemen User", // name that appear in Sidebar
  },
  {
    path: "", //no url needed as this has submenu
    icon: <InboxArrowDownIcon className={`${iconClasses} inline`} />, // icon component
    name: "Pengaduan", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/PengaduanTTE",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Pengaduan TTE",
      },
      {
        path: "/app/pengaduanJaringan", //url
        icon: <BoltIcon className={submenuIconClasses} />, // icon component
        name: "Pengaduan Jaringan", // name that appear in Sidebar
      },
    ],
  },
  {
    path: "/app/jabatan", // url
    icon: <TableCellsIcon className={iconClasses} />, // icon component
    name: "Jabatan", // name that appear in Sidebar
  },
  {
    path: "/app/manajemen_opd", // url
    icon: <DocumentIcon className={iconClasses} />, // icon component
    name: "Manajemen OPD", // name that appear in Sidebar
  },
  {
    path: "/app/jenis_pelayanan", // url
    icon: <DocumentTextIcon className={iconClasses} />, // icon component
    name: "Jenis Pelayanan", // name that appear in Sidebar
  },
  {
    path: "/app/kategori_pelayanan", // url
    icon: <WalletIcon className={iconClasses} />, // icon component
    name: "Kategori Pelayanan", // name that appear in Sidebar
  },
];

export default routes;
