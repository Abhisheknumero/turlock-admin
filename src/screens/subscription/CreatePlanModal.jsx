import { Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Loader } from "../../utils/Loader";
import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import DatePicker from "react-datepicker";
import SublyApi from "../../HelperApis";
import { toast } from "react-toastify";
import $ from "jquery";
import { useSelector } from "react-redux";

function CreatePlanModal({
  show,
  setShow,
  itemValue,
  setLoading,
  setItemValue,
}) {
  const { token } = useSelector((state) => state.user.userdetail);
  const [showDropdown, setShowDropdown] = useState(false);
  const [startDate, setStartDate] = useState();
  const [price, setPrice] = useState("");
  const [monthlyPrice, setMonthlyPrice] = useState("");
  const [postTag, setPostTag] = useState([]);
  const [postTagValue, setPostTagValue] = useState("");
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState("");
  const [planValue, setPlanValue] = useState("");

  // =====================prefield data for edit post=======================
  useEffect(() => {
    if (itemValue) {
      setStatus({
        name: itemValue?.status == "active" ? "Active" : "Inactive",
        key: itemValue?.status,
      });
      setPlanValue({
        name: itemValue?.planType,
        key: itemValue?.planType,
      });
      setStartDate(itemValue?.startDate);
      setPrice(itemValue?.price);
      setMonthlyPrice(itemValue?.monthlyPrice);
      setPostTag(itemValue?.features);
    }
  }, [itemValue]);

  //   ============================================================================
  async function createPlanHandle() {
    setLoading(true);
    const requestData = {
      planType: planValue.key,
      price: price,
      monthlyPrice: monthlyPrice,
      features: postTag,
      startDate: startDate,
      status: status.key,
    };

    await SublyApi.createPlans(token, requestData)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          toast.success("Subscription plan created successfully");
          setStatus("");
          setPlanValue("");
          setStartDate();
          setPrice("");
          setMonthlyPrice("");
          setPostTag([]);
          setShow(false);
          setItemValue("");
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // ====function to hide dropdown on click outside====
  $(document).mouseup(function (e) {
    if (
      $(e.target).closest(".notifyBlock").length === 0 &&
      $(e.target).closest(".block_notify").length === 0
    ) {
      setShowDropdown(false);
      setActive(false);
    }
  });

  //   ============================================================================
  async function updatePlanHandle() {
    const requestData = {
      planType: planValue.key,
      price: price,
      monthlyPrice: monthlyPrice,
      features: postTag,
      startDate: startDate,
      status: status.key,
    };

    await SublyApi.updatePlans(token, requestData, itemValue?._id)
      .then((response) => {
        if (response.status == "success") {
          toast.success("Subscription plan updated successfully");
          setStatus("");
          setPlanValue("");
          setStartDate();
          setPrice("");
          setMonthlyPrice("");
          setPostTag([]);
          setShow(false);
          setItemValue("");
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function onTagRemove(index) {
    let tags = [...postTag];
    tags.splice(index, 1);
    setPostTag(tags);
  }
  return (
    <section>
      <Modal
        show={show}
        onHide={() => {
          setStatus("");
          setPlanValue("");
          setStartDate();
          setPrice("");
          setMonthlyPrice("");
          setPostTag([]);
          setShow(false);
          setItemValue("");
        }}
      >
        <Modal.Header closeButton className="!px-[34px]">
          <Modal.Title className="flex items-center gap-2">
            Create Plan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <div className="p-2 w-[95%] m-auto">
              <div className="w-[100%] max-lg:w-full m-auto">
                <div className="flex items-center gap-3 max-lg:flex-wrap">
                  <div
                    onClick={() => {
                      setShowDropdown(!showDropdown);
                    }}
                    className="w-full max-xl:w-full relative notifyBlock"
                  >
                    <label
                      htmlFor="subscription"
                      className="text-sm font-normal w-full"
                    >
                      <input
                        type="text"
                        placeholder="Plan type"
                        id="subscription"
                        value={planValue.name}
                        autoComplete="off"
                        className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium cursor-pointer caret-transparent"
                      />
                    </label>
                    <Icon
                      icon={`${
                        showDropdown
                          ? "majesticons:chevron-up-line"
                          : "majesticons:chevron-down-line"
                      }`}
                      width="30"
                      height="30"
                      style={{ color: "#4b5563" }}
                      className="absolute right-1 top-1"
                    />
                    {showDropdown && (
                      <PlansTypeList setPlanValue={setPlanValue} />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full my-7 ">
                  {" "}
                  <div className="w-full max-xl:w-full">
                    <label
                      htmlFor="title"
                      className="text-sm font-normal w-full"
                    >
                      <input
                        type="text"
                        placeholder="Enter the price"
                        id="title"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                        className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                      />
                    </label>
                  </div>
                  <div className="w-full max-xl:w-full">
                    <label
                      htmlFor="title"
                      className="text-sm font-normal w-full"
                    >
                      <input
                        type="text"
                        placeholder="Enter the Monthly price"
                        id="title"
                        value={monthlyPrice}
                        onChange={(e) => {
                          setMonthlyPrice(e.target.value);
                        }}
                        className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full my-7 datePickerClass">
                  <div className="w-full text-sm font-normal">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      placeholderText="Start Date"
                      dateFormat={"dd/MM/YYYY"}
                      minDate={new Date()}
                      className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                    />
                  </div>
                  <div className="w-full text-sm font-normal">
                    <div
                      onClick={() => {
                        setActive(!active);
                      }}
                      className="w-full max-xl:w-full relative notifyBlock"
                    >
                      <label
                        htmlFor="subscription"
                        className="text-sm font-normal w-full"
                      >
                        <input
                          type="text"
                          placeholder="Status"
                          value={status.name}
                          id="subscription"
                          autoComplete="off"
                          className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium cursor-pointer caret-transparent"
                        />
                      </label>
                      <Icon
                        icon={`${
                          active
                            ? "majesticons:chevron-up-line"
                            : "majesticons:chevron-down-line"
                        }`}
                        width="30"
                        height="30"
                        style={{ color: "#4b5563" }}
                        className="absolute right-1 top-1"
                      />
                      {active && <StatusDropdown setActive={setStatus} />}
                    </div>
                  </div>
                </div>
                <div className="w-full my-3">
                  <div className="w-full max-xl:w-full">
                    <label
                      htmlFor="post-tag"
                      className="text-sm font-normal w-full "
                    >
                      <div className="flex items-center w-full gap-2">
                        <input
                          type="text"
                          placeholder="Features"
                          id="post-tag"
                          value={postTagValue}
                          onChange={(e) => {
                            setPostTagValue(e.target.value);
                          }}
                          className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                        />
                        <button
                          onClick={() => {
                            if (postTagValue) {
                              setPostTagValue("");
                              setPostTag([...postTag, postTagValue]);
                            }
                          }}
                          className="w-24 text-sm rounded-md px-2 py-1.5 buttonClass relative font-medium hover:border-none"
                        >
                          Add
                        </button>
                      </div>
                    </label>
                    <div className=" ">
                      {postTag?.map((val, index) => (
                        <p
                          key={index}
                          className="flex items-center gap-1 justify-between mb-0 bg-gray-200 pl-2 py-0.5 pr-2 font-medium text-gray-600 rounded-md mt-2 text-sm"
                        >
                          {val}{" "}
                          <Icon
                            icon="si:close-duotone"
                            width="25"
                            height="25"
                            className="cursor-pointer mt-0.5"
                            onClick={() => {
                              onTagRemove(index);
                            }}
                          />
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-2 pt-4 gap-3 mb-4">
              <button
                onClick={() => {
                  setStatus("");
                  setPlanValue("");
                  setStartDate();
                  setPrice("");
                  setMonthlyPrice("");
                  setPostTag([]);
                  setShow(false);
                  setItemValue("");
                }}
                style={{ border: "1px solid #6418C3" }}
                className="px-3 py-2 rounded-3xl font-medium text-lg text-[#6418C3] w-[160px] max-lg:w-full"
              >
                Cancel
              </button>
              {itemValue ? (
                <button
                  onClick={() => {
                    updatePlanHandle();
                  }}
                  style={{ border: "1px solid #6418C3" }}
                  className="px-3 py-2 rounded-3xl font-medium text-lg text-white bg-[#6418C3] w-[160px] max-lg:w-full"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={() => {
                    createPlanHandle();
                  }}
                  style={{ border: "1px solid #6418C3" }}
                  className="px-3 py-2 rounded-3xl font-medium text-lg text-white bg-[#6418C3] w-[160px] max-lg:w-full"
                >
                  Create
                </button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default CreatePlanModal;

export function StatusDropdown({ setActive }) {
  return (
    <div className="rounded-md shadow-2xl absolute w-full top-15 bg-white py-2 z-10">
      <p
        onClick={() => {
          setActive({ name: "Active", key: "active" });
        }}
        className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3 hover:bg-[#6418c330] cursor-pointer"
      >
        Active
      </p>
      <p
        onClick={() => {
          setActive({ name: "Inactive", key: "inactive" });
        }}
        className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3 hover:bg-[#6418c330] cursor-pointer"
      >
        Inactive
      </p>
    </div>
  );
}

const planType = [
  { name: "Premium", key: "Premium" },
  { name: "Silver", key: "Silver" },
];

export function PlansTypeList({ setPlanValue }) {
  return (
    <div className="rounded-md shadow-2xl absolute w-full top-15 bg-white py-2 z-10">
      {planType.map((item, index) => (
        <p
          key={index}
          onClick={() => {
            setPlanValue({ name: item?.name, key: item?.key });
          }}
          className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3 hover:bg-[#6418c330] cursor-pointer"
        >
          {item?.name}
        </p>
      ))}
    </div>
  );
}
