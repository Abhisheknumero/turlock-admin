import { AgCharts } from "ag-charts-react";
import { useState } from "react";

function DashboardCard({ item }) {
  const [options, setOptions] = useState({
    data: getData(),
    series: [
      {
        xKey: "quarter",
        yKey: "petrol",
        strokeWidth: 1,
        marker: {
          enabled: false,
        },
        label: {
          enabled: false,
        },
      },
    ],
  });
  return (
    <div className="bg-white p-3 shadow-md rounded-lg border">
      <p className="mb-0 text-xs">Total Subscriptions</p>
      <div className="flex items-center gap-1 jus">
        <p className="font-bold my-2.5">
          {item.key == 1 ? `$${item.count}` : item.count}
        </p>
        {/* <AgCharts options={options} /> */}
      </div>
      <div className="flex items-center gap-1 text-sm">
        <span
          className={` ${
            item?.lastWeek > 0 || item.key == 1
              ? "text-[#009678] bg-[#00f1c130] font-semibold"
              : "text-[#cc2424] bg-[#f100001e] font-medium"
          } ${"text-xs px-1.5 py-[2px] rounded-[4px]"}`}
        >
          {item.key == 1
            ? `$${item?.lastWeek}`
            : item?.lastWeek > 0
            ? `+${item?.lastWeek}`
            : `${item?.lastWeek} ${item.key == 2 && "Less User"}`}
        </span>
        <p className="mb-0 text-xs">Since last week</p>
      </div>
    </div>
  );
}

export default DashboardCard;

function getData() {
  return [
    {
      quarter: "Q1",
      petrol: 200,
    },
    {
      quarter: "Q2",
      petrol: 300,
    },
    {
      quarter: "Q3",
      petrol: 350,
    },
    {
      quarter: "Q4",
      petrol: 400,
    },
  ];
}
