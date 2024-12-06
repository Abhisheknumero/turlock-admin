import moment from "moment";
import { Table } from "react-bootstrap";

function PostTable({ postList, setPostId, setPostDetail, deleteHandle }) {
  return (
    <div className="h-[calc(100vh-450px)] overflow-auto">
      <Table bordered responsive className="!border-gray-500">
        <thead>
          <tr>
            <th className="text-sm font-bold !text-gray-600 !bg-gray-300 w-[40%]">
              Title
            </th>
            {/* <th className="text-sm font-bold !text-gray-600 !bg-gray-300 w-[10%]">
              Author
            </th> */}
            <th className="text-sm text-center font-bold !text-gray-600 !bg-gray-300 w-[8%]">
              Date
            </th>
            <th className="text-sm text-center font-bold !text-gray-600 !bg-gray-300 w-[10%]">
              Category
            </th>
            <th className="text-sm text-center font-bold !text-gray-600 !bg-gray-300 w-[8%]">
              Subscription
            </th>
            {/* <th className="text-sm text-center font-bold !text-gray-600 !bg-gray-300 w-[5%]">
              Status
            </th> */}
            <th className="text-sm font-bold text-center !text-gray-600 !bg-gray-300 w-[10%]">
              Tags
            </th>
            <th className="text-sm font-bold !text-gray-600 !bg-gray-300 w-[8%]">
              #Comment
            </th>
            <th className="text-sm font-bold !text-gray-600 !bg-gray-300 w-[5%]">
              #Viwes
            </th>
            <th className="text-sm text-center font-bold !text-gray-600 !bg-gray-300 w-[20%]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {postList?.map((val, index) => (
            <tr key={index}>
              <td className="text-sm font-medium !text-gray-700">
                {val?.postTitle}
              </td>
              {/* <td align="start" className="text-sm font-medium !text-gray-700">
                Abhishek Bicholiya
              </td> */}
              <td align="center" className="text-sm font-medium !text-gray-700">
                {moment(new Date(val?.updatedAt)).format("MMM DD, YYYY")}
              </td>
              <td align="center" className="text-sm font-medium !text-gray-700">
                {val?.postCategory || "--"}
              </td>
              <td align="center" className="text-sm font-medium !text-gray-700">
                {val?.subscription}
              </td>
              {/* <td align="center" className="text-sm font-medium !text-gray-700">
                Active
              </td> */}
              <td align="center" className="text-sm font-medium !text-gray-700">
                {val?.postTag}
              </td>
              <td className="text-sm font-medium !text-gray-700">
                {val?.comments}
              </td>
              <td className="text-sm font-medium !text-gray-700">
                {val?.views}
              </td>
              <td>
                <div className="flex items-center justify-center gap-3">
                  <span
                    onClick={() => {
                      setPostId(val._id);
                      setPostDetail(true);
                    }}
                    className="text-[#D10505] cursor-pointer bg-[#d1050533] text-sm px-2 rounded-sm font-normal"
                  >
                    View
                  </span>
                  <span className="text-[#D10505] cursor-pointer bg-[#d1050533] text-sm px-2 rounded-sm font-normal">
                    Edit
                  </span>
                  <span
                    onClick={() => {
                      deleteHandle(val._id);
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

export default PostTable;
