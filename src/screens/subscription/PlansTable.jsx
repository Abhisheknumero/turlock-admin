import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import moment from "moment";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PlansTable({
  planList,
  deleteHandle,
  setShow,
  setPlanId,
  setCreateModal,
  setPlanValue,
}) {
  return (
    <div className="max-[1200px]:w-[1500px]">
      <div>
        <div className="bg-[#fff] rounded-t-xl px-4 py-3 flex items-center gap-2">
          <p className="text-base font-bold !text-black w-[5%]">#</p>
          <p className="text-sm font-bold !text-black w-[20%] pr-3">
            {" "}
            Plan Type
          </p>
          <p className="text-sm font-bold !text-black w-[20%] pl-3"> Price</p>
          <p className="text-sm font-bold !text-black w-[20%]"> Date</p>
          <p className="text-sm font-bold !text-black w-[20%] text-center">
            Status{" "}
          </p>
          <p className="text-sm font-bold !text-black w-[20%] text-center">
            Action{" "}
          </p>
        </div>
      </div>
      <div className="h-[calc(100vh-360px)] overflow-auto pt-1">
        {planList.length > 0 &&
          planList.map((val, index) => (
            <div
              key={index}
              className="bg-[#fff] px-4 py-3 flex items-center gap-2 my-1"
            >
              <p className="text-base font-medium !text-black w-[5%]">
                {index + 1}
              </p>
              <p className="text-sm font-medium !text-black w-[20%] pr-3 ">
                {" "}
                {val?.planType}
              </p>{" "}
              <p className="text-sm font-medium !text-black w-[20%] pl-3">
                {val?.price}
              </p>
              <p className="text-sm font-medium !text-black w-[20%]">
                {moment(new Date(val?.startDate)).format("MMM DD, YYYY")}
              </p>
              <p className="text-sm font-medium w-[20%] text-center flex items-center justify-center">
                {val?.status == "active" ? (
                  <p className="!text-[#30c550] bg-[#D8FFE0] py-1.5 px-4 rounded-full ">
                    Active
                  </p>
                ) : (
                  <p className="!text-[#FF4A55] bg-[#FFECED] py-1.5 px-4 rounded-full ">
                    Inactive
                  </p>
                )}
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
                      setShow(true);
                      setPlanId(val?._id);
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
                      setCreateModal(true);
                      setPlanValue(val);
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
                      deleteHandle(val?._id);
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

export default PlansTable;
