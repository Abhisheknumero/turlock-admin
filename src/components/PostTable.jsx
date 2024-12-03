import moment from "moment";
import { Table } from "react-bootstrap";

function PostTable() {
  return (
    <div>
      <Table bordered responsive className="!border-gray-500">
        <thead>
          <tr>
            <th className="!pl-5 text-sm font-bold !text-gray-600 !bg-gray-300 w-[35%]">
              Title
            </th>
            <th className="!pl-5 text-sm font-bold !text-gray-600 !bg-gray-300 w-[10%]">
              Author
            </th>
            <th className="!pl-5 text-sm font-bold !text-gray-600 !bg-gray-300 w-[8%]">
              Date
            </th>
            <th className="!pl-5 text-sm font-bold !text-gray-600 !bg-gray-300 w-[10%]">
              Category
            </th>
            <th className="!pl-5 text-sm font-bold !text-gray-600 !bg-gray-300 w-[10%]">
              Subscription
            </th>
            <th className="!pl-5 text-sm font-bold !text-gray-600 !bg-gray-300 w-[5%]">
              Status
            </th>
            <th className="!pl-5 text-sm font-bold !text-gray-600 !bg-gray-300 w-[10%]">
              Tags
            </th>
            <th className="!pl-5 text-sm font-bold !text-gray-600 !bg-gray-300 w-[8%]">
              #Comment
            </th>
            <th className="!pl-5 text-sm font-bold !text-gray-600 !bg-gray-300 w-[5%]">
              #Viwes
            </th>
            <th className="!pl-5 text-sm font-bold !text-gray-600 !bg-gray-300 w-[20%]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-sm font-medium !text-gray-700">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </td>
            <td align="center" className="text-sm font-medium !text-gray-700">
              Abhishek Bicholiya
            </td>
            <td align="center" className="text-sm font-medium !text-gray-700">
              {moment(new Date()).format("MMM DD, YYYY")}
            </td>
            <td align="center" className="text-sm font-medium !text-gray-700">
              Breakingnews
            </td>
            <td className="text-sm font-medium !text-gray-700">Free</td>
            <td className="text-sm font-medium !text-gray-700">Active</td>
            <td className="text-sm font-medium !text-gray-700">
              #Breaking_news
            </td>
            <td className="text-sm font-medium !text-gray-700">0</td>
            <td className="text-sm font-medium !text-gray-700">0</td>
            <td>
              <div className="flex items-center justify-center gap-3">
                <span className="text-[#D10505] cursor-pointer bg-[#d1050533] text-sm px-2 rounded-sm font-normal">
                  View
                </span>
                <span className="text-[#D10505] cursor-pointer bg-[#d1050533] text-sm px-2 rounded-sm font-normal">
                  Edit
                </span>
                <span className="text-[#D10505] cursor-pointer bg-[#d1050533] text-sm px-2 rounded-sm font-normal">
                  Delete
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default PostTable;
