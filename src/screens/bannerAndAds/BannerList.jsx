import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Loader } from "../../utils/Loader";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import DatePicker from "react-datepicker";
import BannerTable from "./BannerTable";
import SublyApi from "../../HelperApis";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import BannerDetail from "./BannerDetail";

function BannerList() {
  const { userdetail } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [typeValue, setTypeValue] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [bannerList, setBannerList] = useState("");
  const [bannerDetail, setBannerDetail] = useState(false);
  const [bannerId, setBannerId] = useState("");
  const [title, setTitle] = useState("");

  // ====function to hide dropdown on click outside====
  $(document).mouseup(function (e) {
    if (
      $(e.target).closest(".notifyBlock").length === 0 &&
      $(e.target).closest(".block_notify").length === 0
    ) {
      setShowDropdown(false);
    }
  });

  //   ====================================Calling API for fetching Category list========================================
  useEffect(() => {
    getBanner();
  }, []);
  async function getBanner() {
    setLoading(true);
    await SublyApi.fetchBanner(userdetail.token, userdetail.id)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          setBannerList(response.data);
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => console.log(err));
  }

  //   ====================Delete category API=============================
  async function deleteHandler(id) {
    await SublyApi.deleteBanner(userdetail?.token, id)
      .then((res) => {
        if (res.status == "success") {
          toast.success("Banner deleted successfully.");
          getBanner();
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ====================Advance search API handler===================
  async function advanceSearch() {
    setLoading(true);
    const requestData = {
      title: title,
      bannerType: typeValue,
      startDate: startDate,
      endDate: endDate,
    };
    await SublyApi.bannerAdvanceSearch(userdetail?.token, requestData)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          setBannerList(response.data);
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="h-screen ">
      {loading ? <Loader /> : ""}
      <BannerDetail
        topMargin={"marginClass"}
        setShow={setBannerDetail}
        show={bannerDetail}
        id={bannerId}
        setLoading={setLoading}
      />
      <div className="xl:flex">
        <Sidebar />
        <div className="w-full z-0 h-screen overflow-auto">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-4 pb-4 flex-wrap border-b-2">
              <h3 className="mb-0 text-lg font-semibold"> Banners</h3>
            </div>
            <div className="flex items-center justify-end w-full mt-2">
              <button
                onClick={() => {
                  navigate("/Banner/Create");
                }}
                className="w-38 text-base rounded-md px-2 py-2 relative font-medium hover:border-none border-none flex items-center gap-2 hover:text-[#D10505] createBtn"
              >
                <Icon icon="ion:add-outline" width="30" height="27" />
                Create Banner
              </button>
            </div>
            <div className="mb-3">
              <h3 className="text-gray-600 font-bold text-base mb-3">
                Advanced Search
              </h3>
              <div className="flex items-center gap-3 max-lg:flex-wrap">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-semibold"
                  />
                </div>
                <div
                  onClick={() => {
                    setShowDropdown(!showDropdown);
                  }}
                  className="w-full relative notifyBlock"
                >
                  <input
                    type="text"
                    value={typeValue}
                    placeholder="Banner Type"
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

                  {showDropdown && <BannerType setTypeValue={setTypeValue} />}
                </div>
                <div className="flex items-center gap-3 w-full">
                  {" "}
                  <div>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      placeholderText="Start Date"
                      maxDate={new Date()}
                      dateFormat={"dd/MM/YYYY"}
                      className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-semibold"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      placeholderText="End Date"
                      maxDate={new Date()}
                      minDate={startDate}
                      dateFormat={"dd/MM/YYYY"}
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
                      setTypeValue("");
                      setStartDate("");
                      setEndDate("");
                      setTitle("");
                      getBanner();
                    }}
                    className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none"
                  >
                    Show All
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-gray-600 font-bold text-base my-3">
                Banner Count {`(${bannerList?.length})`}
              </h3>
              {bannerList?.length > 0 ? (
                <BannerTable
                  Table
                  list={bannerList}
                  deleteHandler={deleteHandler}
                  setCategoryId={setBannerId}
                  setCategoryDetail={setBannerDetail}
                  //   setEdit={setCreateCategory}
                  //   setPreFieldData={setPreFieldData}
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

export default BannerList;

function BannerType({ setTypeValue }) {
  return (
    <div className="rounded-md shadow-2xl absolute w-full top-15 bg-white py-2 z-10">
      <p
        onClick={() => {
          setTypeValue("Right Banner");
        }}
        className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3 hover:bg-[#ff6d6d33] cursor-pointer"
      >
        Right Banner
      </p>
      <p
        onClick={() => {
          setTypeValue("Left Banner");
        }}
        className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3 hover:bg-[#ff6d6d33] cursor-pointer"
      >
        Left Banner
      </p>
    </div>
  );
}
