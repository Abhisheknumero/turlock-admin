import moment from "moment";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PlansTable({ planList, deleteHandle }) {
  const navigate = useNavigate();
  return (
    <div className="h-[calc(100vh-450px)] overflow-auto">
      <Table bordered responsive className="!border-gray-500">
        <thead>
          <tr>
            <th className="text-sm font-bold !text-gray-600 !bg-gray-300 w-[12%]">
              Plan Type
            </th>
            <th className="text-sm text-center font-bold !text-gray-600 !bg-gray-300 w-[10%]">
              Date
            </th>
            <th className="text-sm font-bold !text-gray-600 !bg-gray-300 w-[30%]">
              Features
            </th>
            <th className="text-sm text-center font-bold !text-gray-600 !bg-gray-300 w-[8%]">
              Price
            </th>
            <th className="text-sm text-center font-bold !text-gray-600 !bg-gray-300 w-[8%]">
              Monthly Price
            </th>
            <th className="text-sm font-bold text-center !text-gray-600 !bg-gray-300 w-[8%]">
              Status
            </th>
            <th className="text-sm text-center font-bold !text-gray-600 !bg-gray-300 w-[15%]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {planList?.map((val, index) => (
            <tr key={index}>
              <td className="text-sm font-medium !text-gray-700">
                {val?.planType}
              </td>
              <td align="center" className="text-sm font-medium !text-gray-700">
                {moment(new Date(val?.startDate)).format("MMM DD, YYYY")}
              </td>
              <td align="center" className="text-sm font-medium !text-gray-700">
                {val?.features.map((item, index) => item + ", ") || "--"}
              </td>
              <td align="center" className="text-sm font-medium !text-gray-700">
                {val?.price}
              </td>
              <td align="center" className="text-sm font-medium !text-gray-700">
                {val?.monthlyPrice || "--"}
              </td>
              <td align="center" className="text-sm font-medium !text-gray-700">
                {val?.status || "--"}
              </td>
              <td>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-[#D10505] cursor-pointer bg-[#d1050533] text-sm px-2 rounded-sm font-normal">
                    View
                  </span>
                  <span
                    onClick={() => {
                      navigate("/Subscription/Create", { state: val });
                    }}
                    className="text-[#D10505] cursor-pointer bg-[#d1050533] text-sm px-2 rounded-sm font-normal"
                  >
                    Edit
                  </span>
                  <span
                    onClick={() => {
                      deleteHandle(val?._id);
                    }}
                    className="text-[#D10505] cursor-pointer bg-[#d1050533] text-sm px-2 rounded-sm font-normal"
                  >
                    Delete
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PlansTable;
