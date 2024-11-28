function DashboardCard() {
  return (
    <div className="bg-white p-3 shadow-md rounded-lg border">
      <p className="mb-0 text-xs">Total Subscriptions</p>
      <div className="flex items-center gap-1 jus">
        <p className="font-semibold my-2.5">$200.2k</p>
      </div>
      <div className="flex items-center gap-1 text-sm">
        <span className="text-xs text-[#009678] font-semibold bg-[#00f1c130] px-1.5 py-[2px] rounded-[4px]">
          +$20.9k
        </span>
        <p className="mb-0">Since last week</p>
      </div>
    </div>
  );
}

export default DashboardCard;
