import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";
import PostTable from "../../components/PostTable";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Post() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState({
    type: false,
    category: false,
    subscription: false,
    status: false,
  });

  return (
    <section className="h-screen ">
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Header />
          <div className="px-9">
            <div className="flex items-center justify-between pt-10 pb-3">
              <h3 className="mb-0 text-lg font-semibold">Post</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigate("/Post");
                  }}
                  className={`${
                    location.pathname.includes("/Post")
                      ? "bg-[#D10505] text-white"
                      : "buttonClass"
                  } ${"w-28 text-sm rounded-md px-2 py-2 font-medium hover:border-[#D10505] relative"}`}
                >
                  Post
                </button>
                <button className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none">
                  Post Category
                </button>
                <button className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none">
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
                </button>
                <button
                  onClick={() => {
                    navigate("/Post/Create");
                  }}
                  className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none"
                >
                  Add New
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
                Post Count {"(0)"}
              </h3>
              <PostTable />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Post;

function FilterDropdown() {
  return (
    <div className="rounded-md shadow-xl absolute w-full top-10 bg-white py-2">
      <p className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3">
        Demo1
      </p>
      <p className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3">
        Demo2
      </p>
      <p className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3">
        Demo3
      </p>
      <p className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3">
        Demo4
      </p>
    </div>
  );
}
