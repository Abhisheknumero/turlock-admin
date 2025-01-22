import DatePicker from "react-datepicker";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Loader } from "../../utils/Loader";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SublyApi from "../../HelperApis";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { PlansTypeList, StatusDropdown } from "./CreatePlans";
import $ from "jquery";
import PlansTable from "./PlansTable";
import PlanDetail from "./PlanDetail";

function Subscription() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user.userdetail);
  const [loading, setLoading] = useState(false);
  const [planList, setPlanList] = useState("");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState("");
  const [planValue, setPlanValue] = useState("");
  const [showDropdown, setShowDropdown] = useState("");
  const [show, setShow] = useState(false);
  const [planId, setPlanId] = useState("");

  //   ======================================================================
  useEffect(() => {
    getPlanList();
  }, []);

  async function getPlanList() {
    setLoading(true);
    await SublyApi.fetchPlanList(token)
      .then((response) => {
        setLoading(false);
        console.log("response", response);
        if (response.status == "success") {
          setPlanList(response.subscriptions);
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

  // ===========================Calling API for delete post============================
  async function deleteHandle(id) {
    setLoading(true);
    await SublyApi.deletePlan(token, id)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          toast.success("Plan deleted successfully.");
          getPlanList();
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className="overflow-auto">
      <PlanDetail
        show={show}
        setShow={setShow}
        setLoading={setLoading}
        planId={planId}
      />
      {loading ? <Loader /> : ""}
      <div className="xl:flex">
        <Sidebar />
        <div className="w-full z-0 h-screen overflow-auto">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-4 pb-4 flex-wrap border-b-2">
              <h3 className="mb-0 text-lg font-semibold">Plans</h3>
              <div className="flex items-center justify-end">
                <button
                  onClick={() => {
                    navigate("/Subscription/Create");
                  }}
                  className="w-38 text-base rounded-md px-2 py-2 relative font-medium hover:border-none border-none flex items-center gap-2 hover:text-[#6418C3] createBtn"
                >
                  <Icon icon="ion:add-outline" width="30" height="27" />
                  Create Plans
                </button>
              </div>
            </div>
            <div className="mb-3">
              <h3 className="text-gray-600 font-bold text-base my-3">
                Advanced Search
              </h3>
              <div className="flex items-center gap-3 max-lg:flex-wrap">
                <div
                  onClick={() => {
                    setShowDropdown(!showDropdown);
                  }}
                  className="w-full relative notifyBlock"
                >
                  <input
                    type="text"
                    value={planValue.name}
                    placeholder="Select Plan Type"
                    className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white caret-transparent cursor-pointer focus-visible:outline-none text-gray-600 font-semibold"
                  />
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
                <div
                  onClick={() => {
                    setActive(!active);
                  }}
                  className="w-full relative notifyBlock"
                >
                  <input
                    type="text"
                    value={status.name}
                    placeholder="Select Status"
                    className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white caret-transparent cursor-pointer focus-visible:outline-none text-gray-600 font-semibold"
                  />
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
                <div className="flex items-center gap-3 datePickerClass w-full">
                  {" "}
                  <div className="w-full">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      placeholderText="Start Date"
                      dateFormat={"dd/MM/YYYY"}
                      maxDate={new Date()}
                      className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-semibold"
                    />
                  </div>
                  <div className="overflow-hidden datePickerClass w-full">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      placeholderText="End Date"
                      dateFormat={"dd/MM/YYYY"}
                      maxDate={new Date()}
                      minDate={startDate}
                      className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-semibold overflow-hidden"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      advanceSearch();
                    }}
                    className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none"
                  >
                    Search
                  </button>
                  <button
                    onClick={() => {
                      setStartDate();
                      setEndDate();
                      setTitle("");
                    }}
                    className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none"
                  >
                    Show All
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <h3 className="text-gray-600 font-bold text-base my-3">
                Plans Count {`(${planList.length})`}
              </h3>
              {planList?.length > 0 ? (
                <PlansTable
                  planList={planList}
                  deleteHandle={deleteHandle}
                  setShow={setShow}
                  setPlanId={setPlanId}
                />
              ) : (
                <p className="text-center text-lg font-semibold text-gray-500">
                  No Record Found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Subscription;
