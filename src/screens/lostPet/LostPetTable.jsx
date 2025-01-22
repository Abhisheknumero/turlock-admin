import moment from "moment";
import { Table } from "react-bootstrap";

function LostPetTable({
  list,
  deleteHandle,
  setShowDetail,
  setShow,
  setDataValue,
}) {
  return (
    <div>
      <Table bordered responsive className="!border-gray-500">
        <thead>
          <tr>
            <th className=" text-sm font-bold !text-gray-600 !bg-gray-300 w-[20%]">
              Applicant Name
            </th>
            <th className=" text-sm font-bold !text-gray-600 !bg-gray-300 w-[20%] text-center">
              Date
            </th>
            <th className=" text-sm font-bold !text-gray-600 !bg-gray-300 w-[20%] text-start">
              Email
            </th>
            <th className=" text-sm font-bold !text-gray-600 !bg-gray-300 w-[20%] text-center">
              Phone
            </th>
            <th className=" text-sm font-bold !text-gray-600 !bg-gray-300 w-[20%] text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 &&
            list.map((item, index) => (
              <tr key={index}>
                <td
                  align="start"
                  className="text-sm font-medium !text-gray-700"
                >
                  {item?.applicantName}
                </td>
                <td
                  align="center"
                  className="text-sm font-medium !text-gray-700"
                >
                  {moment(new Date(item?.createdAt)).format("MMM DD, YYYY")}
                </td>
                <td
                  align="start"
                  className="text-sm font-medium !text-gray-700"
                >
                  {item?.email}
                </td>
                <td
                  align="center"
                  className="text-sm font-medium !text-gray-700"
                >
                  {item?.phoneNumber || "--"}
                </td>
                <td>
                  <div className="flex items-center justify-center gap-3">
                    <span
                      onClick={() => {
                        setShowDetail(true);
                        setDataValue(item);
                      }}
                      className="text-[#6418C3] cursor-pointer bg-[#6418C333] text-sm px-2 rounded-sm font-normal"
                    >
                      View
                    </span>
                    <span
                      onClick={() => {
                        setShow(true);
                        setDataValue(item);
                      }}
                      className="text-[#6418C3] cursor-pointer bg-[#6418C333] text-sm px-2 rounded-sm font-normal"
                    >
                      Edit
                    </span>
                    <span
                      onClick={() => {
                        deleteHandle(item._id);
                      }}
                      className="text-[#6418C3] cursor-pointer bg-[#6418C333] text-sm px-2 rounded-sm font-normal"
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

export default LostPetTable;
