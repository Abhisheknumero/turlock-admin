import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";

function PostCreate() {
  const location = useLocation();
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
                <button className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none">
                  Add New
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PostCreate;
