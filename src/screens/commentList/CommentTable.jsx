import moment from "moment";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CommentTable({ list, deleteHandler, setDetailValue, setShow }) {
  const navigate = useNavigate();
  return (
    <div>
      <Table bordered responsive className="!border-gray-500">
        <thead>
          <tr>
            {/* <th className=" text-sm font-bold !text-gray-600 !bg-gray-300 w-[35%]">
                Description
              </th> */}
            <th className=" text-sm font-bold !text-gray-600 !bg-gray-300 w-[20%]">
              Comment
            </th>
            <th className=" text-sm font-bold !text-gray-600 !bg-gray-300 w-[8%] text-center">
              Author
            </th>{" "}
            <th className=" text-sm font-bold !text-gray-600 !bg-gray-300 w-[8%] text-center">
              Date
            </th>
            {/* <th className=" text-sm font-bold !text-gray-600 !bg-gray-300 w-[10%]">
                Category Type
              </th> */}
            <th className=" text-sm font-bold !text-gray-600 !bg-gray-300 w-[5%] text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 &&
            list.map((item, index) => (
              <tr key={index}>
                {/* <td className="text-sm font-medium !text-gray-700">
                    {item.categoryDescription}
                  </td> */}
                <td
                  align="start"
                  className="text-sm font-medium !text-gray-700"
                >
                  {item?.commentText}
                </td>
                <td
                  align="center"
                  className="text-sm font-medium !text-gray-700"
                >
                  {item?.userId?.firstName} {item?.userId?.lastName}
                </td>
                <td
                  align="center"
                  className="text-sm font-medium !text-gray-700"
                >
                  {moment(new Date(item?.createdAt)).format("MMM DD, YYYY")}
                </td>
                {/* <td
                    align="start"
                    className="text-sm font-medium !text-gray-700"
                  >
                    {item?.categoryType.toUpperCase()}
                  </td> */}
                <td>
                  <div className="flex items-center justify-center gap-3">
                    <span
                      onClick={() => {
                        setDetailValue(item);
                        setShow(true);
                      }}
                      className="text-[#D10505] cursor-pointer bg-[#d1050533] text-sm px-2 rounded-sm font-normal"
                    >
                      View
                    </span>
                    <span
                      onClick={() => {
                        deleteHandler(item._id);
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

export default CommentTable;
