import { useLocation, useNavigate } from "react-router-dom";
import { FilterDropdown } from "./Post";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import SublyApi from "../../HelperApis";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Loader } from "../../utils/Loader";
import CategoryTable from "../../components/CategoryTable";
import CategoryDetail from "../../components/CategoryDetail";

function Category() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user.userdetail);
  const [showDropdown, setShowDropdown] = useState({
    type: false,
    category: false,
    subscription: false,
    status: false,
  });
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState("");
  const [categoryDetail, setCategoryDetail] = useState(false);
  const [chategoryId, setCategoryId] = useState("");
  //   ====================================Calling API for fetching Category list========================================
  useEffect(() => {
    getCategory();
  }, []);
  async function getCategory() {
    setLoading(true);
    await SublyApi.fetchCategory(token)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          setCategoryList(response.data);
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => console.log(err));
  }

  //   ====================Delete category API=============================
  async function deleteHandler(id) {
    await SublyApi.deleteCategory(token, id).then((res) => {
      if (res.status == "success") {
        toast.success(res.message);
        getCategory();
      } else {
        toast.error(res.data.error);
      }
    });
  }

  return (
    <section className="h-screen ">
      {loading ? <Loader /> : ""}
      <CategoryDetail
        topMargin={"marginClass"}
        setShow={setCategoryDetail}
        show={categoryDetail}
        id={chategoryId}
        setLoading={setLoading}
      />
      <div className="xl:flex">
        <Sidebar />
        <div className="w-full z-0">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-10 pb-4 flex-wrap border-b-2">
              <h3 className="mb-0 text-lg font-semibold"> Post Category</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => {
                    navigate("/Post/Post-List");
                  }}
                  className={`${
                    location.pathname.includes("/Post/Post-List")
                      ? "bg-[#D10505] text-white"
                      : "buttonClass"
                  } ${"w-28 text-sm rounded-md px-2 py-2 font-medium hover:border-[#D10505] relative"}`}
                >
                  Post
                </button>
                <button
                  onClick={() => {
                    navigate("/Post/Category");
                  }}
                  className={`${
                    location.pathname.includes("/Category")
                      ? "bg-[#D10505] text-white"
                      : "buttonClass"
                  } ${"w-28 text-sm rounded-md px-2 py-2 font-medium hover:border-[#D10505] relative"}`}
                >
                  Post Category
                </button>
                {/*<button className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none">
                  Category Type
                </button>
                <button className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none">
                  Post Type
                </button>
                <button className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none">
                  Tag
                </button>
                <button className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none">
                  Tag Type
                </button> */}
              </div>
            </div>
            <div className="flex items-center justify-end w-full mt-2">
              <button
                onClick={() => {
                  navigate("/Post/Category/Create");
                }}
                className="w-38 text-base rounded-md px-2 py-2 relative font-medium hover:border-none border-none flex items-center gap-2 hover:text-[#D10505] createBtn"
              >
                <Icon icon="ion:add-outline" width="30" height="27" />
                Create Category
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
                    className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-semibold"
                  />
                </div>
                <div className="w-full relative">
                  <input
                    type="text"
                    value={""}
                    placeholder="Select Type"
                    className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white caret-transparent cursor-pointer focus-visible:outline-none text-gray-600 font-semibold"
                    onClick={() => {
                      setShowDropdown({
                        ...showDropdown,
                        type: !showDropdown.type,
                      });
                    }}
                  />
                  <Icon
                    icon={`${
                      showDropdown.type
                        ? "majesticons:chevron-up-line"
                        : "majesticons:chevron-down-line"
                    }`}
                    width="30"
                    height="30"
                    style={{ color: "#4b5563" }}
                    className="absolute right-1 top-1"
                  />

                  {showDropdown.type && <FilterDropdown />}
                </div>
                <div className="w-full relative">
                  <input
                    type="text"
                    value={""}
                    placeholder="Select Category"
                    className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white caret-transparent cursor-pointer focus-visible:outline-none text-gray-600 font-semibold"
                    onClick={() => {
                      setShowDropdown({
                        ...showDropdown,
                        category: !showDropdown.category,
                      });
                    }}
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

                  {showDropdown.category && <FilterDropdown />}
                </div>
                <div className="w-full relative">
                  <input
                    type="text"
                    value={""}
                    placeholder="Select Subscription Type"
                    className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white caret-transparent cursor-pointer focus-visible:outline-none text-gray-600 font-semibold"
                    onClick={() => {
                      setShowDropdown({
                        ...showDropdown,
                        subscription: !showDropdown.subscription,
                      });
                    }}
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

                  {showDropdown.subscription && <FilterDropdown />}
                </div>
                <div className="w-full relative">
                  <input
                    type="text"
                    value={""}
                    placeholder="Select Status"
                    className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white caret-transparent cursor-pointer focus-visible:outline-none text-gray-600 font-semibold"
                    onClick={() => {
                      setShowDropdown({
                        ...showDropdown,
                        status: !showDropdown.status,
                      });
                    }}
                  />
                  <Icon
                    icon={`${
                      showDropdown.status
                        ? "majesticons:chevron-up-line"
                        : "majesticons:chevron-down-line"
                    }`}
                    width="30"
                    height="30"
                    style={{ color: "#4b5563" }}
                    className="absolute right-1 top-1"
                  />

                  {showDropdown.status && <FilterDropdown />}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <button className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none">
                  Search
                </button>
                <button className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none">
                  Show All
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-gray-600 font-bold text-base my-3">
                Category Count {"(0)"}
              </h3>
              <CategoryTable
                list={categoryList}
                deleteHandler={deleteHandler}
                setCategoryId={setCategoryId}
                setCategoryDetail={setCategoryDetail}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Category;
