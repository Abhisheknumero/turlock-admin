import { useEffect, useState } from "react";
import { Loader } from "../../utils/Loader";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import SublyApi from "../../HelperApis";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function GalleryList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.user.userdetail);
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState("");

  //   ==================fetch media gallery list==================
  useEffect(() => {
    async function galleryList() {
      setLoading(true);
      await SublyApi.mediaGalleryList(token, location.state.key._id)
        .then((response) => {
          setLoading(false);
          console.log(response);
          if (response.status == "success") {
            setGallery(response.data);
          } else {
            toast.error(response.data.error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    galleryList();
  }, []);

  console.log(gallery);

  return (
    <section className="overflow-auto">
      {loading ? <Loader /> : ""}
      <div className="xl:flex">
        <Sidebar />
        <div className="w-full z-0 h-screen overflow-auto">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-4 pb-4 flex-wrap border-b-2">
              <h3 className="mb-0 text-lg font-semibold">
                {location.state?.key?.categoryName}
              </h3>
              <div className="flex items-center justify-end max-sm:w-full">
                <button
                  onClick={() => {
                    navigate("/Media");
                  }}
                  className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GalleryList;
