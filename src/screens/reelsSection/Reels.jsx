import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

function Reels() {
  const navigate = useNavigate();
  return (
    <section className="h-screen ">
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reels;
