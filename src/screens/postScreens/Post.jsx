import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Header from "../../components/Header";
import PostTable from "../../components/PostTable";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import SublyApi from "../../HelperApis";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Loader } from "../../utils/Loader";
import PostDetail from "../../components/PostDetail";
import CreateCategory from "../../components/CreateCategory";
import DatePicker from "react-datepicker";
import $ from "jquery";
import CreatePostModal from "./CreatePostModal";

function Post() {
  const { token } = useSelector((state) => state.user.userdetail);
  const [showDropdown, setShowDropdown] = useState({
    type: false,
    category: false,
    subscription: false,
    status: false,
  });
  const [postList, setPostList] = useState("");
  const [loading, setLoading] = useState(false);
  const [postDetail, setPostDetail] = useState(false);
  const [postId, setPostId] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [categorytype, setCategoryType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  const getInitials = (userName) => {
    const names = userName.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  // ===================Calling API for fetch post list=====================
  useEffect(() => {
    postListHandle();
  }, []);
  async function postListHandle() {
    setLoading(true);
    await SublyApi.fetchPostList(token)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          const list = response.data.map((val, index) => {
            const initials = getInitials(val?.postType || "Post");
            const imgvalue = `https://ui-avatars.com/api/?name=${initials}&background=6418c3b8&color=fff&bold=true`; // Set fallback image
            response.data[index] = {
              ...response.data[index],
              imgValue: imgvalue,
            };
            setPostList(response.data);
          });
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => console.log(err));
  }

  console.log("postList", postList);

  // ====================API for fetch category list=====================
  useEffect(() => {
    async function getCategory() {
      await SublyApi.fetchCategory(token)
        .then((response) => {
          if (response.status == "success") {
            setCategoryType(response.data);
            if (!response.data.length > 0) {
              setCategoryModal(true);
            }
          } else {
            toast.error(response.data.error);
          }
        })
        .catch((err) => console.log(err));
    }
    getCategory();
  }, []);

  // ===========================Calling API for delete post============================
  async function deleteHandle(id) {
    setLoading(true);
    await SublyApi.deletePost(token, id)
      .then((response) => {
        if (response.status == "success") {
          toast.success("Post deleted successfully.");
          postListHandle();
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => console.log(err));
  }

  // ====function to hide dropdown on click outside====
  $(document).mouseup(function (e) {
    if (
      $(e.target).closest(".notifyBlock").length === 0 &&
      $(e.target).closest(".block_notify").length === 0
    ) {
      setShowDropdown({});
    }
  });

  // ====================Advance search API handler===================
  async function advanceSearch() {
    setLoading(true);
    const requestData = {
      title: title,
      category: filterValue?.category?.id,
      subscriptionType: filterValue?.subscription?.subValue,
      startDate: startDate,
      endDate: endDate,
    };
    await SublyApi.searchPost(token, requestData)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          setPostList(response.data.posts);
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="overflow-auto">
      <PostDetail
        topMargin={"marginClass"}
        setShow={setPostDetail}
        show={postDetail}
        id={postId}
        setLoading={setLoading}
      />
      <CreateCategory
        setShow={setCategoryModal}
        show={categoryModal}
        topMargin={"marginClass"}
        setLoading={setLoading}
      />
      <CreatePostModal
        topMargin={"marginClass"}
        setShow={setShow}
        show={show}
        setLoading={setLoading}
      />
      {loading ? <Loader /> : ""}
      <div className="xl:flex">
        <Sidebar />
        <div className="w-full z-0 h-screen overflow-auto">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-4 pb-4 flex-wrap border-b-2">
              <h3 className="mb-0 text-lg font-semibold">Post</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => {
                    setShow(true);
                  }}
                  className={`${"bg-[#6418C3] text-white"} ${"w-[160px] text-base rounded-md px-2 py-2 font-medium hover:border-[#6418C3] flex items-center justify-center gap-1"}`}
                >
                  <Icon icon="fluent:add-16-filled" width="25" height="25" />
                  Create Post
                </button>
              </div>
            </div>
            <div className="flex items-center justify-end w-full my-2">
              {/* <button
                onClick={() => {
                  // navigate("/Post/Create");
                  setShow(true);
                }}
                className="w-38 text-base rounded-md px-2 py-2 relative font-medium hover:border-none border-none flex items-center gap-2 hover:text-[#6418C3] createBtn"
              >
                <Icon icon="ion:add-outline" width="30" height="27" />
                Create Post
              </button> */}
            </div>
            {/* <div className="mb-3">
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
                      category: !showDropdown.category,
                    });
                  }}
                  className="w-full relative notifyBlock"
                >
                  <input
                    type="text"
                    value={filterValue?.category?.name}
                    placeholder="Select Category"
                    className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white caret-transparent cursor-pointer focus-visible:outline-none text-gray-600 font-semibold"
                  />
                  <Icon
                    icon={`${
                      showDropdown.category
                        ? "majesticons:chevron-up-line"
                        : "majesticons:chevron-down-line"
                    }`}
                    width="30"
                    height="30"
                    style={{ color: "#4b5563" }}
                    className="absolute right-1 top-1"
                  />

                  {showDropdown.category && (
                    <CategoryType
                      categoryList={categorytype}
                      setFilterValue={setFilterValue}
                      filterValue={filterValue}
                    />
                  )}
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
                      postListHandle();
                    }}
                    className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none"
                  >
                    Show All
                  </button>
                </div>
              </div>
            </div> */}
            <div className="mb-5">
              <h3 className="text-gray-600 font-bold text-base my-3">
                Post Count {`(${postList?.length})`}
              </h3>
              {postList?.length > 0 ? (
                <PostTable
                  postList={postList}
                  setPostId={setPostId}
                  setPostDetail={setPostDetail}
                  deleteHandle={deleteHandle}
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

export default Post;

export function FilterDropdown({ setFilterValue, filterValue }) {
  return (
    <div className="rounded-md shadow-2xl absolute w-full top-10 bg-white py-2">
      <p
        onClick={() => {
          setFilterValue({
            ...filterValue,
            subscription: { subValue: "Free", id: 1 },
          });
        }}
        className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3 hover:bg-[#6418c330] cursor-pointer"
      >
        Free
      </p>
    </div>
  );
}

function CategoryType({ categoryList, setFilterValue, filterValue }) {
  return (
    <div className="rounded-md shadow-2xl absolute w-full top-15 bg-white py-2 z-50 max-h-48 overflow-auto">
      {categoryList &&
        categoryList?.map(
          (item, index) =>
            (item.categoryName == "NEWS" ||
              item.categoryName == "FEATURED NEWS") && (
              <p
                onClick={() => {
                  setFilterValue({
                    ...filterValue,
                    category: { name: item.categoryName, id: item._id },
                  });
                }}
                className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3 hover:bg-[#6418c330] cursor-pointer"
                key={index}
              >
                {item.categoryName}
              </p>
            )
        )}
    </div>
  );
}
