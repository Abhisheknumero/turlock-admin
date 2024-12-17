import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import PostTable from "../../components/PostTable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SublyApi from "../../HelperApis";
import { useSelector } from "react-redux";
import { Loader } from "../../utils/Loader";
import DatePicker from "react-datepicker";
import { FilterDropdown } from "../postScreens/Post";
import $ from "jquery";
import ReelsDetail from "../../components/ReelsDetail";

function Reels() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user.userdetail);
  const [loading, setLoading] = useState(false);
  const [reelList, setReelList] = useState([]);
  const [reelsId, setReelsId] = useState("");
  const [reelDetail, setReelDetail] = useState("");
  const [showDropdown, setShowDropdown] = useState({
    type: false,
    category: false,
    subscription: false,
    status: false,
  });
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [categorytype, setCategoryType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [title, setTitle] = useState("");
  const [reelCategory, setReelCategory] = useState();

  // ====function to hide dropdown on click outside====
  $(document).mouseup(function (e) {
    if (
      $(e.target).closest(".notifyBlock").length === 0 &&
      $(e.target).closest(".block_notify").length === 0
    ) {
      setShowDropdown({});
    }
  });

  useEffect(() => {
    getCategory();
  }, []);
  async function getCategory() {
    setLoading(true);
    await SublyApi.fetchCategory(token)
      .then(async (response) => {
        if (response.status == "success") {
          const reelCheck = response.data.filter(
            (ele) => ele.categoryName == "REELS"
          );
          setReelCategory(reelCheck[0]);
          await SublyApi.fetchPostBycate(token, reelCheck[0]._id)
            .then((respo) => {
              setLoading(false);
              if (respo.status == "success") {
                setReelList(respo.data);
              } else {
                toast.dismiss();
                setReelList([]);
                // toast.error(respo.data.error);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setLoading(false);
          toast.dismiss();
          toast.error(response.data.error);
        }
      })
      .catch((err) => console.log(err));
  }

  // ===========================Calling API for delete post============================
  async function deleteHandle(id) {
    setLoading(true);
    await SublyApi.deletePost(token, id)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          toast.success("Reel deleted successfully.");
          getCategory();
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => console.log(err));
  }

  // ====================Advance search API handler===================
  async function advanceSearch() {
    setLoading(true);
    const requestData = {
      title: title,
      category: reelCategory?.id,
      subscriptionType: filterValue?.subscription?.subValue,
      startDate: startDate,
      endDate: endDate,
    };
    await SublyApi.searchPost(token, requestData)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          setReelList(response.data.posts);
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="h-screen">
      <ReelsDetail
        topMargin={"marginClass"}
        setShow={setReelDetail}
        show={reelDetail}
        id={reelsId}
        setLoading={setLoading}
      />
      {loading ? <Loader /> : ""}
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-4 pb-3 flex-wrap gap-x-3 gap-y-1">
              <h3 className="mb-0 text-lg font-semibold">Reels</h3>
              <div className="flex items-center justify-end max-sm:w-full">
                <button
                  onClick={() => {
                    navigate("/Reels/Create");
                  }}
                  className="w-38 text-base rounded-md px-2 py-2 font-medium hover:border-none border-none flex items-center gap-2 hover:text-[#D10505] createBtn"
                >
                  <Icon icon="ion:add-outline" width="30" height="27" />
                  Create Reels
                </button>
              </div>
            </div>
            <div className="mb-3">
              <h3 className="text-gray-600 font-bold text-base my-3">
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
                    setShowDropdown({
                      ...showDropdown,
                      subscription: !showDropdown.subscription,
                    });
                  }}
                  className="w-full relative notifyBlock"
                >
                  <input
                    type="text"
                    value={filterValue?.subscription?.subValue}
                    placeholder="Select Subscription Type"
                    className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white caret-transparent cursor-pointer focus-visible:outline-none text-gray-600 font-semibold"
                  />
                  <Icon
                    icon={`${
                      showDropdown.subscription
                        ? "majesticons:chevron-up-line"
                        : "majesticons:chevron-down-line"
                    }`}
                    width="30"
                    height="30"
                    style={{ color: "#4b5563" }}
                    className="absolute right-1 top-1"
                  />
                  {showDropdown.subscription && (
                    <FilterDropdown
                      setFilterValue={setFilterValue}
                      filterValue={filterValue}
                    />
                  )}
                </div>
                <div className="flex items-center gap-3 w-full">
                  {" "}
                  <div>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      placeholderText="Start Date"
                      dateFormat={"dd/MM/YYYY"}
                      maxDate={new Date()}
                      className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-semibold"
                    />
                  </div>
                  <div className="overflow-hidden">
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
                      setFilterValue({
                        subscription: { subValue: "", id: "" },
                        category: { name: "", id: "" },
                      });
                      setTitle("");
                      getCategory();
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
                Reels Count {`(${reelList?.length})`}
              </h3>
              {reelList?.length > 0 ? (
                <PostTable
                  postList={reelList}
                  setPostId={setReelsId}
                  setPostDetail={setReelDetail}
                  deleteHandle={deleteHandle}
                  isReel={true}
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

export default Reels;
