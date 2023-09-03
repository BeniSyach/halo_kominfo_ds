import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";

function PageStats({}) {
  return (
    <div className="stats bg-base-100 shadow">
      <div className="stat">
        {/* <div className="stat-figure invisible md:visible">
          <HeartIcon className="w-8 h-8" />
        </div> */}
        <div className="stat-title">
          OPD Yang Sering Membuat Pengaduan Internet
        </div>
        <div className="stat-value">25.6K</div>
        <button className="btn btn-xs">"Nama OPD"</button>
      </div>

      {/* <div className="stat">
        <div className="stat-figure invisible md:visible">
          <BoltIcon className="w-8 h-8" />
        </div>
        <div className="stat-title">Page Views</div>
        <div className="stat-value">2.6M</div>
        <div className="stat-desc">14% more than last month</div>
      </div> */}
    </div>
  );
}

export default PageStats;
