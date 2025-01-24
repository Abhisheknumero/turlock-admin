import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import moment from "moment";
import "../../assets/CommonStyle.css";
import { imgBaseURL } from "../../utils/StaticsData";

function CommentTable({ list, deleteHandler, setDetailValue, setShow }) {
  return (
    <div className="max-[1200px]:w-[1500px]">
      <div>
        <div className="bg-[#fff] rounded-t-xl px-4 py-3 flex items-center gap-2">
          <p className="text-base font-bold !text-black w-[5%]">#</p>
          <p className="text-sm font-bold !text-black w-[40%] pr-3">
            Post Content
          </p>
          <p className="text-sm font-bold !text-black w-[12%]">Post Type</p>
          <p className="text-sm font-bold !text-black w-[20%] pr-3"> Comment</p>
          <p className="text-sm font-bold !text-black w-[15%]">Author</p>
          <p className="text-sm font-bold !text-black w-[10%]">Date</p>
          <p className="text-sm font-bold !text-black w-[10%] text-center">
            Action
          </p>
        </div>
      </div>
      <div className="h-[calc(100vh-360px)] overflow-auto pt-1">
        {list.length > 0 &&
          list.map((item, index) => (
            <div
              key={index}
              className="bg-[#fff] px-4 py-3 flex items-center gap-2 my-1"
            >
              <p className="text-base font-medium !text-black w-[5%]">
                {index + 1}
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: item?.postId?.postContent?.replace(
                    /<\/?[^>]+(>|$)/g,
                    ""
                  ), // Strips all HTML tags
                }}
                className="text-sm font-medium !text-black w-[40%] pr-3 textOverflowClass"
              ></p>
              <p className="text-sm font-medium !text-black w-[12%]">
                {" "}
                {item?.postId?.postType}
              </p>
              <p className="text-sm font-medium !text-black w-[20%] pr-3">
                {item?.commentText}
              </p>
              <p className="text-sm font-medium !text-black w-[15%] flex items-center gap-1">
                {" "}
                <img
                  src={
                    item?.userId?.profileImage
                      ? `${imgBaseURL}${item?.userId?.profileImage}`
                      : item?.imgValue
                  }
                  className="w-7 h-7 rounded-md"
                />{" "}
                {item?.userId?.firstName} {item?.userId?.lastName}
              </p>
              <p className="text-sm font-medium !text-black w-[10%] flex items-center gap-1">
                {moment(new Date(item?.updatedAt)).format("MMM DD, YYYY")}
              </p>
              <p
                className={`${"text-sm font-medium !text-black  text-center relative flex items-center justify-center gap-3 w-[10%]"}`}
              >
                <p className="mb-0 flex items-center justify-center rounded-md w-[30px] h-[30px] !text-[#6518c3]">
                  <Icon
                    icon="flowbite:eye-outline"
                    width="28"
                    height="28"
                    className="cursor-pointer"
                    onClick={() => {
                      setShow(true);
                      setDetailValue(item);
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
                      deleteHandler(item._id);
                    }}
                  />
                </p>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CommentTable;
