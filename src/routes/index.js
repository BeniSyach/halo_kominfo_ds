// All components mapping with path for internal routes

import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Welcome = lazy(() => import("../pages/protected/Welcome"));
const Page404 = lazy(() => import("../pages/protected/404"));
const PengaduanTTE = lazy(() => import("../pages/protected/PengaduanTTE"));
const ManajemenUser = lazy(() => import("../pages/protected/ManajemenUser"));
const ProfileSettings = lazy(() =>
  import("../pages/protected/ProfileSettings")
);
const Jabatan = lazy(() => import("../pages/protected/Jabatan"));
const ManajemenOPD = lazy(() => import("../pages/protected/ManajemenOPD"));
const JenisPelayanan = lazy(() => import("../pages/protected/JenisPelayanan"));
const KategoriPelayanan = lazy(() =>
  import("../pages/protected/KategoriPelayanan")
);

const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/welcome", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/manajemen_user",
    component: ManajemenUser,
  },
  {
    path: "/pengaduanTTE",
    component: PengaduanTTE,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },

  {
    path: "/jabatan",
    component: Jabatan,
  },
  {
    path: "/manajemen_opd",
    component: ManajemenOPD,
  },
  {
    path: "/jenis_pelayanan",
    component: JenisPelayanan,
  },
  {
    path: "/kategori_pelayanan",
    component: KategoriPelayanan,
  },

  {
    path: "/404",
    component: Page404,
  },
];

export default routes;
