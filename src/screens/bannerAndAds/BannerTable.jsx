import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import moment from "moment";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function BannerTable({
  list,
  deleteHandler,
  setCategoryId,
  setCategoryDetail,
  setItemValue,
  setShow,
}) {
  const navigate = useNavigate();
  return (
    <div className="max-[1200px]:w-[1500px]">
      <div>
        <div className="bg-[#fff] rounded-t-xl px-4 py-3 flex items-center gap-2">
          <p className="text-base font-bold !text-black w-[5%]">#</p>
          <p className="text-sm font-bold !text-black w-[40%] pr-3">
            {" "}
            Category Name{" "}
          </p>
          <p className="text-sm font-bold !text-black w-[20%] pl-3">
            {" "}
            Start Date
          </p>
          <p className="text-sm font-bold !text-black w-[20%]"> End Date</p>
          <p className="text-sm font-bold !text-black w-[20%] text-center">
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
              <p className="text-sm font-medium !text-black w-[40%] pr-3 textOverflowClass">
                {item?.title}
              </p>{" "}
              <p className="text-sm font-medium !text-black w-[20%] pl-3">
                {moment(new Date(item?.startDate)).format("MMM DD, YYYY")}
              </p>
              <p className="text-sm font-medium !text-black w-[20%]">
                {" "}
                {moment(new Date(item?.endDate)).format("MMM DD, YYYY")}
              </p>
              <p
                className={`${"text-sm font-medium !text-black  text-center relative flex items-center justify-center gap-3 w-[20%]"}`}
              >
                <p className="mb-0 flex items-center justify-center rounded-md w-[30px] h-[30px] !text-[#6518c3]">
                  <Icon
                    icon="flowbite:eye-outline"
                    width="28"
                    height="28"
                    className="cursor-pointer"
                    onClick={() => {
                      setCategoryId(item._id);
                      setCategoryDetail(true);
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
                      setShow(true);
                      setItemValue(item);
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

export default BannerTable;
