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

function BanyakPengaduanTTE() {
  return (
    <TitleCard title={"REKAPITULASI OPD Yang Banyak Membuat Pengaduan TTE"}>
      {/** Table Data */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="normal-case">Source</th>
              <th className="normal-case">No of Users</th>
            </tr>
          </thead>
          <tbody>
            {userSourceData.map((u, k) => {
              return (
                <tr key={k}>
                  <th>{k + 1}</th>
                  <td>{u.source}</td>
                  <td>{u.count}</td>
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
