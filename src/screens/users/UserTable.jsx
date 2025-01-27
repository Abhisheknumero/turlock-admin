import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Table } from "react-bootstrap";
import { imgBaseURL } from "../../utils/StaticsData";

function UserTable({ list, deleteHandle, setShow, setUserValue }) {
  return (
    <div className="max-[1200px]:w-[1500px]">
      <div>
        <div className="bg-[#fff] rounded-t-xl px-4 py-3 flex items-center gap-2">
          <p className="text-base font-bold !text-black w-[5%]">#</p>
          <p className="text-sm font-bold !text-black w-[20%] pr-3">
            {" "}
            First Name
          </p>
          <p className="text-sm font-bold !text-black w-[20%] pl-3">
            {" "}
            Last Name
          </p>
          <p className="text-sm font-bold !text-black w-[20%]"> Email</p>
          <p className="text-sm font-bold !text-black w-[20%] text-center">
            Phone{" "}
          </p>
          <p className="text-sm font-bold !text-black w-[20%] text-center">
            Action{" "}
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
              <p className="text-sm font-medium !text-black w-[20%] pr-3 flex items-center gap-1">
                {" "}
                <img
                  src={
                    item?.profileImage
                      ? `${item?.profileImage}`
                      : item?.imgValue
                  }
                  className="w-7 h-7 rounded-md"
                />{" "}
                {item?.firstName}
              </p>{" "}
              <p className="text-sm font-medium !text-black w-[20%] pl-3">
                {item?.lastName}
              </p>
              <p className="text-sm font-medium !text-black w-[20%]">
                {item?.email}
              </p>
              <p className="text-sm font-medium !text-black w-[20%] text-center">
                {item?.phone || "--"}
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
                      setUserValue(item);
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
                      deleteHandle(item._id);
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

export default UserTable;
