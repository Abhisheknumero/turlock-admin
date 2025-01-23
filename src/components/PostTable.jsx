import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import moment from "moment";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PostTable({
  postList,
  setPostId,
  setPostDetail,
  deleteHandle,
  isReel,
  setShow,
  setItemValue,
}) {
  const [actionId, setActionId] = useState("");
  return (
    <div className="max-[1200px]:w-[1500px]">
      <div>
        <div className="bg-[#fff] rounded-t-xl px-4 py-3 flex items-center gap-2">
          <p className="text-base font-bold !text-black w-[5%]">#</p>
          <p className="text-sm font-bold !text-black w-[30%] pr-3">Title</p>
          <p className="text-sm font-bold !text-black w-[10%]">Date</p>
          {!isReel && (
            <p className="text-sm font-bold !text-black w-[10%]">Post Type</p>
          )}
          <p className="text-sm font-bold !text-black w-[17%]">Tags</p>
          <p className="text-sm font-bold !text-black w-[10%] text-center">
            Comment
          </p>
          <p className="text-sm font-bold !text-black w-[10%] text-center">
            Viwes
          </p>
          <p
            className={`${
              isReel ? "w-[15%]" : "w-[8%]"
            } ${"text-sm font-bold !text-black text-center"}`}
          >
            Action
          </p>
        </div>
      </div>
      <div className="h-[calc(100vh-360px)] overflow-auto pt-1">
        {postList?.map((val, index) => (
          <div
            key={index}
            className="bg-[#fff] px-4 py-3 flex items-center gap-2 my-1"
          >
            <p className="text-base font-medium !text-black w-[5%]">
              {index + 1}
            </p>
            <p className="text-sm font-medium !text-black w-[30%] pr-3">
              {val?.postTitle}
            </p>
            <p className="text-sm font-medium !text-black w-[10%]">
              {" "}
              {moment(new Date(val?.updatedAt)).format("MMM DD, YYYY")}
            </p>
            {!isReel && (
              <p className="text-sm font-medium !text-black w-[10%] flex items-center gap-1">
                <img src={val?.imgValue} className="w-7 h-7 rounded-md" />
                {val?.postType}
              </p>
            )}
            <p className="text-sm font-medium !text-black w-[17%]">
              {val?.postTag || "--"}
            </p>
            <p className="text-sm font-medium !text-black w-[10%] text-center">
              {val?.comments || "0"}
            </p>
            <p className="text-sm font-medium !text-black w-[10%] text-center">
              {val?.views || "0"}
            </p>
            <p
              className={`${
                isReel ? "w-[15%]" : "w-[8%]"
              } ${"text-sm font-medium !text-black  text-center relative flex items-center justify-center gap-3"}`}
            >
              {/* <Icon
                icon="bi:three-dots-vertical"
                width="22"
                height="22"
                className="cursor-pointer"
                onClick={() => {
                  setActionId(actionId == val?._id ? "" : val?._id);
                }}
              />
              {actionId == val?._id && <ActionModal />} */}
              <p className="mb-0 flex items-center justify-center rounded-md w-[30px] h-[30px] !text-[#6518c3]">
                <Icon
                  icon="flowbite:eye-outline"
                  width="28"
                  height="28"
                  className="cursor-pointer"
                  onClick={() => {
                    setPostId(val._id);
                    setPostDetail(true);
                  }}
                />
              </p>
              <p className="mb-0 flex items-center justify-center rounded-md w-[30px] h-[30px] !text-[#6518c3]">
                <Icon
                  icon="bx:edit"
                  width="23"
                  height="23"
                  className="cursor-pointer"
                  onClick={() => {
                    if (isReel) {
                      setItemValue(val);
                      setShow(true);
                    } else {
                      setShow(true);
                      setItemValue(val);
                    }
                  }}
                />
              </p>
              <p className="mb-0 flex items-center justify-center rounded-md w-[30px] h-[30px] !text-[#6518c3]">
                <Icon
                  icon="material-symbols:delete-outline-rounded"
                  width="23"
                  height="23"
                  className="cursor-pointer"
                  onClick={() => {
                    deleteHandle(val._id);
                  }}
                />
              </p>
            </p>
          </div>
        ))}
      </div>
      {/* <Table bordered responsive className="!border-gray-500">
        <thead>
          <tr>
            <th className="text-sm font-bold !text-gray-600 !bg-gray-300 w-[40%]">
              Title
            </th>
            <th className="text-sm text-center font-bold !text-gray-600 !bg-gray-300 w-[8%]">
              Date
            </th>
            <th className="text-sm text-center font-bold !text-gray-600 !bg-gray-300 w-[10%]">
              Category
            </th>
            <th className="text-sm text-center font-bold !text-gray-600 !bg-gray-300 w-[8%]">
              Post Type
            </th>
           
            <th className="text-sm font-bold text-center !text-gray-600 !bg-gray-300 w-[10%]">
              Tags
            </th>
            <th className="text-sm font-bold text-center !text-gray-600 !bg-gray-300 w-[8%]">
              #Comment
            </th>
            <th className="text-sm font-bold text-center !text-gray-600 !bg-gray-300 w-[5%]">
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
            
              <td align="center" className="text-sm font-medium !text-gray-700">
                {moment(new Date(val?.updatedAt)).format("MMM DD, YYYY")}
              </td>
              <td align="center" className="text-sm font-medium !text-gray-700">
                {val?.postCategory || "--"}
              </td>
              <td align="center" className="text-sm font-medium !text-gray-700">
                {val?.postType}
              </td>
             
              <td align="center" className="text-sm font-medium !text-gray-700">
                {val?.postTag || "--"}
              </td>
              <td align="center" className="text-sm font-medium !text-gray-700">
                {val?.comments || "--"}
              </td>
              <td align="center" className="text-sm font-medium !text-gray-700">
                {val?.views || "--"}
              </td>
              <td>
                <div className="flex items-center justify-center gap-3">
                  <span
                    onClick={() => {
                      setPostId(val._id);
                      setPostDetail(true);
                    }}
                    className="text-[#6418C3] cursor-pointer bg-[#6418C333] text-sm px-2 rounded-sm font-normal"
                  >
                    View
                  </span>
                  <span
                    onClick={() => {
                      if (isReel) {
                        navigate("/Reels/Create", { state: val });
                      } else {
                        navigate("/Post/Create", { state: val });
                      }
                    }}
                    className="text-[#6418C3] cursor-pointer bg-[#6418C333] text-sm px-2 rounded-sm font-normal"
                  >
                    Edit
                  </span>
                  <span
                    onClick={() => {
                      deleteHandle(val._id);
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
      </Table> */}
    </div>
  );
}

export default PostTable;
