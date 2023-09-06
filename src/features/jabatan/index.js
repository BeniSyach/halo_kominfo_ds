import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import SearchBar from "../../components/Input/SearchBar";
import { getJabatanContent } from "./jabatanSlice";

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
  const dispatch = useDispatch();

  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");

  const showFiltersAndApply = (params) => {
    applyFilter(params);
    setFilterParam(params);
  };

  const removeAppliedFilter = () => {
    removeFilter();
    setFilterParam("");
    setSearchText("");
  };

  useEffect(() => {
    if (searchText == "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);

  const openAddNewJabatanModal = () => {
    dispatch(
      openModal({
        title: "Tambah Jabatan",
        bodyType: MODAL_BODY_TYPES.add_jabatan_new,
      })
    );
  };

  return (
    <>
      <div className="inline-block float-right ">
        <button
          className="btn px-6 btn-sm normal-case btn-primary"
          onClick={() => openAddNewJabatanModal()}
        >
          Tambah Jabatan
        </button>
      </div>
      <div className="inline-block float-right  mr-5 ">
        <SearchBar
          searchText={searchText}
          styleClass="mr-4"
          setSearchText={setSearchText}
        />
        {filterParam != "" && (
          <button
            onClick={() => removeAppliedFilter()}
            className="btn btn-xs mr-2 btn-active btn-ghost normal-case"
          >
            {filterParam}
            <XMarkIcon className="w-4 ml-2" />
          </button>
        )}
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn btn-sm btn-outline">
            <FunnelIcon className="w-2 mr-2" />
            Filter
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52"
          >
            {/* {
                        locationFilters.map((l, k) => {
                            return  <li key={k}><a onClick={() => showFiltersAndApply(l)}>{l}</a></li>
                        })
                    } */}
            <div className="divider mt-0 mb-0"></div>
            <li>
              <a onClick={() => removeAppliedFilter()}>Remove Filter</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

function Jabatan() {
  const { jabatan } = useSelector((state) => state.jabatan);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJabatanContent());
  }, [dispatch]);

  const [data, Setdata] = useState(jabatan);
  const removeFilter = () => {
    Setdata(jabatan);
  };

  const applyFilter = (params) => {
    let filteredData = jabatan.filter((t) => {
      return t.location == params;
    });
    Setdata(filteredData);
  };

  // Search according to name
  const applySearch = (value) => {
    let filteredData = jabatan.filter((t) => {
      return (
        t.namaJabatan.toLowerCase().includes(value.toLowerCase()) ||
        t.namaJabatan.toLowerCase().includes(value.toLowerCase())
      );
    });
    Setdata(filteredData);
  };

  const editJabatan = (index, data) => {
    dispatch(
      openModal({
        title: "Edit Jabatan",
        bodyType: MODAL_BODY_TYPES.Edit_jabatan_NEW,
        extraObject: {
          index,
          data,
        },
      })
    );
  };

  const hapusJabatan = (id, index, aksi) => {
    dispatch(
      openModal({
        title: "Konfirmasi",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Apakah Kamu Yakin Menghapus Jabatan Ini?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
          id,
          index,
          aksi,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Form Menu Jabatan"
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
            applySearch={applySearch}
            applyFilter={applyFilter}
            removeFilter={removeFilter}
          />
        }
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Jabatan</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {jabatan.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>{k + 1}</td>
                    <td>{l.namaJabatan}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => editJabatan(l.idMasterJabatan)}
                      >
                        <PencilIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() =>
                          hapusJabatan(l.idMasterJabatan, k, "jabatan")
                        }
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Jabatan;
