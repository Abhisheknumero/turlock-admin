import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import folderImg from "../../assets/folder-img.png";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import SublyApi from "../../HelperApis";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Loader } from "../../utils/Loader";

function Media() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mediaValue, setMediaValue] = useState("");
  const { token } = useSelector((state) => state.user.userdetail);

  // =======================fetch media list=========================
  useEffect(() => {
    fetchList();
  }, []);
  async function fetchList() {
    setLoading(true);
    await SublyApi.mediaList(token)
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.status == "success") {
          setMediaValue(response.data);
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
      {loading ? <Loader /> : ""}
      <div className="xl:flex">
        <Sidebar />
        <div className="w-full z-0 h-screen overflow-auto">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-4 pb-4 flex-wrap border-b-2">
              <h3 className="mb-0 text-lg font-semibold">Media Gallery</h3>
              <div className="flex items-center justify-end max-sm:w-full">
                <button
                  onClick={() => {
                    navigate("/Media/Create");
                  }}
                  className="w-38 text-base rounded-md px-2 py-2 font-medium hover:border-none border-none flex items-center gap-2 hover:text-[#D10505] createBtn"
                >
                  <Icon icon="ion:add-outline" width="30" height="27" />
                  Create Media
                </button>
              </div>
            </div>
            <div className="flex items-center gap-5 my-8">
              {mediaValue.length > 0
                ? mediaValue?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        navigate("/Media/Gallery-list", {
                          state: { key: item },
                        });
                      }}
                      className="cursor-pointer"
                    >
                      <div className="w-[100px] h-[100px]">
                        <img
                          src={folderImg}
                          alt="folder"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="mb-0 text-base font-semibold text-center">
                        {item?.categoryName}
                      </p>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Media;
