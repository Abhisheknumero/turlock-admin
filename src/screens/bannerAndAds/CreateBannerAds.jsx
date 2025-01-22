import { useEffect, useRef, useState } from "react";
import { Loader } from "../../utils/Loader";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import DatePicker from "react-datepicker";
import $ from "jquery";
import SublyApi from "../../HelperApis";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { imgBaseURL } from "../../utils/StaticsData";

function CreateBannerAds() {
  const { userdetail } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [fileValue, setFileValue] = useState("");
  const [mediaPreview, setMediaPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [bannerType, setBannerType] = useState("");
  const [title, setTitle] = useState("");
  const [link, setlink] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const RIGHT_WIDTH = 728;
  const RIGHT_HEIGHT = 90;
  const LEFT_WIDTH = 206;
  const LEFT_HEIGHT = 67;

  // =====================prefield data for edit post=======================
  useEffect(() => {
    if (location.state) {
      setTitle(location?.state?.title);
      setFileValue(`${imgBaseURL}${location.state?.bannerImage}`);
      setMediaPreview(`${imgBaseURL}${location.state?.bannerImage}`);
      setlink(location?.state?.imageNavLink);
      setBannerType(location?.state?.bannerType);
      setStartDate(location?.state?.startDate);
      setEndDate(location?.state?.endDate);
    }
  }, [location.state]);

  console.log("location.state", location.state);

  // =================================Media handler======================================\
  // const mediaHandler = async (e) => {
  //   let fileReader,
  //     isCancel = false;
  //   if (e.target.files && e.target.files.length > 0) {
  //     const file = [e.target.files];
  //     setMediaPreview(e.target.files[0]);
  //     await Object.values(file[0]).map(async (item, index) => {
  //       if (e.target.files && e.target.files.length > 0) {
  //         fileReader = new FileReader();
  //         fileReader.onload = async (e) => {
  //           const { result } = e.target;
  //           if (result && !isCancel) {
  //             await setFileValue(result);
  //           }
  //         };
  //         fileReader.readAsDataURL(item);
  //       }
  //     });
  //   }
  // };

  const mediaHandler = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      // Load the image as base64 string
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        // Wait until the image loads to check dimensions
        if (bannerType == "Right Banner") {
          img.onload = () => {
            console.log("ee", img.width, img.height);
            if (img.width !== RIGHT_WIDTH || img.height !== RIGHT_HEIGHT) {
              toast.error(
                "Image must be exactly 728x90 pixels of right banner."
              );
              setFileValue(null);
            } else {
              setFileValue(e.target.result);
              setMediaPreview(file); // Show image preview
            }
          };
        } else {
          img.onload = () => {
            console.log("ee", img.width, img.height);
            if (img.width !== LEFT_WIDTH || img.height !== LEFT_HEIGHT) {
              toast.error(
                "Image must be exactly 206x67 pixels of right banner."
              );
              setFileValue(null);
            } else {
              setFileValue(e.target.result);
              setMediaPreview(file); // Show image preview
            }
          };
        }

        img.onerror = () => {
          alert("Failed to load the image. Please try again.");
        };
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  console.log("pixelData", mediaPreview);

  // ==============================Function for handling removing image===================================
  async function onImageRemove() {
    setFileValue("");
    setMediaPreview("");
  }

  // ====function to hide dropdown on click outside====
  $(document).mouseup(function (e) {
    if (
      $(e.target).closest(".notifyBlock").length === 0 &&
      $(e.target).closest(".block_notify").length === 0
    ) {
      setShowDropdown(false);
    }
  });

  //   =======================================Create Category API handling===========================================
  async function bannerHandler() {
    if (title && bannerType && startDate && endDate && mediaPreview && link) {
      setLoading(true);
      const requestData = new FormData();
      requestData.append("title", title);
      requestData.append("bannerType", bannerType);
      requestData.append("startDate", startDate);
      requestData.append("endDate", endDate);
      requestData.append("commonUpload", mediaPreview);
      requestData.append("imageNavLink", link);
      await SublyApi.createBanner(
        userdetail?.token,
        userdetail?.id,
        requestData
      )
        .then((response) => {
          if (response.status == "success") {
            toast.success(response.status);
            setTitle("");
            setFileValue("");
            setMediaPreview("");
            setlink("");
            setBannerType("");
            setStartDate("");
            setEndDate("");
            navigate("/Banner");
          } else {
            toast.error(response.data.error);
          }
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("All fields are required");
    }
  }

  //   =======================================Update Category API handling===========================================
  async function bannerEditHandler() {
    if (title && bannerType && startDate && endDate && mediaPreview && link) {
      setLoading(true);
      const requestData = new FormData();
      requestData.append("title", title);
      requestData.append("bannerType", bannerType);
      requestData.append("startDate", startDate);
      requestData.append("endDate", endDate);
      requestData.append("commonUpload", mediaPreview);
      requestData.append("imageNavLink", link);
      await SublyApi.updateBanner(
        userdetail?.token,
        requestData,
        location?.state?._id
      )
        .then((response) => {
          if (response.status == "success") {
            toast.success(response.status);
            setTitle("");
            setFileValue("");
            setMediaPreview("");
            setlink("");
            setBannerType("");
            setStartDate("");
            setEndDate("");
            navigate("/Banner");
          } else {
            toast.error(response.data.error);
          }
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("All fields are required");
    }
  }

  return (
    <section className="h-screen ">
      {loading ? <Loader /> : ""}
      <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-auto">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-4 pb-5">
              <h3 className="mb-0 text-2xl font-semibold">
                Create Banner and Ads
              </h3>
              <button
                onClick={() => {
                  navigate("/Banner");
                }}
                className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none"
              >
                Back
              </button>
            </div>
            <div className="w-[50%] max-lg:w-full m-auto">
              <div className="flex items-center gap-3 max-lg:flex-wrap">
                <div className="w-full max-xl:w-full">
                  <label htmlFor="title" className="text-sm font-normal w-full">
                    Banner Title
                    <input
                      type="text"
                      placeholder="Post Title"
                      id="title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                    />
                  </label>
                </div>
                <div
                  onClick={() => {
                    setShowDropdown(!showDropdown);
                  }}
                  className="w-full max-xl:w-full relative notifyBlock"
                >
                  <label
                    htmlFor="category"
                    className="text-sm font-normal w-full"
                  >
                    Banner Type
                    <input
                      type="text"
                      placeholder="Select Category"
                      id="category"
                      value={bannerType}
                      autoComplete="off"
                      className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium cursor-pointer caret-transparent"
                    />
                  </label>
                  <Icon
                    icon={`${
                      showDropdown
                        ? "majesticons:chevron-up-line"
                        : "majesticons:chevron-down-line"
                    }`}
                    width="30"
                    height="30"
                    style={{ color: "#4b5563" }}
                    className="absolute right-1 top-6 cursor-pointer"
                    onClick={() => {
                      setShowDropdown(!showDropdown);
                    }}
                  />
                  {showDropdown && <BannerType setBannerType={setBannerType} />}
                </div>
              </div>
              <div className="flex items-center gap-3 max-lg:flex-wrap mt-4 mb-4">
                <div className="flex items-center gap-3 w-full ">
                  <div className="placeholder:text-gray-600  text-sm placeholder:placeholder:font-medium  py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 placeholder:font-medium ">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      placeholderText="Start Date"
                      dateFormat={"dd/MM/YYYY"}
                      minDate={new Date()}
                      className=" focus-visible:outline-none text-gray-600 placeholder:font-medium overflow-hidden placeholder:text-gray-600 font-medium"
                    />
                  </div>
                  <div className="placeholder:text-gray-600 text-sm placeholder:placeholder:font-medium py-2 px-3 border border-gray-400 !w-full rounded-md bg-white focus-visible:outline-none text-gray-600 placeholder:font-medium  overflow-hidden">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      placeholderText="End Date"
                      dateFormat={"dd/MM/YYYY"}
                      minDate={startDate}
                      className=" focus-visible:outline-none text-gray-600 placeholder:font-medium  overflow-hidden placeholder:text-gray-600 font-medium"
                    />
                  </div>
                </div>
                <div className="w-full max-xl:w-full relative">
                  <label htmlFor="link" className="text-sm font-normal w-full">
                    <input
                      type="text"
                      placeholder="Navigation Link"
                      id="link"
                      value={link}
                      onChange={(e) => {
                        setlink(e.target.value);
                      }}
                      className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                    />
                  </label>
                </div>
              </div>
              {!fileValue && (
                <div className="flex items-center justify-center mt-4">
                  <label
                    htmlFor="uploadCategory"
                    style={{
                      border: "1px solid #9ca3af",
                      borderStyle: "dotted",
                    }}
                    className="rounded-md py-3 m-auto w-[30%] max-lg:w-full bg-gray-50 text-gray-600 cursor-pointer flex justify-center gap-2 items-center"
                  >
                    {" "}
                    <Icon
                      icon="clarity:upload-cloud-line"
                      width="40"
                      height="40"
                    />
                    <p className="mb-0 text-lg font-normal ">Upload files</p>
                  </label>
                </div>
              )}
              {fileValue && (
                <div className="flex items-center gap-2 mt-4">
                  <div className="border rounded-md flex items-center justify-center w-[140px] h-[140px] object-cover bg-gray-100 relative overflow-hidden">
                    <img src={fileValue} alt="img" />
                    <Icon
                      icon="si:close-duotone"
                      width="35"
                      height="35"
                      className="absolute top-0 right-0 cursor-pointer"
                      onClick={() => {
                        onImageRemove();
                      }}
                    />
                  </div>
                </div>
              )}
              <div className="flex items-center justify-center mt-5">
                {location.state ? (
                  <button
                    onClick={() => {
                      bannerEditHandler();
                    }}
                    style={{ border: "1px solid #6418C3" }}
                    className="px-3 py-2.5 rounded-3xl font-semibold text-lg text-white bg-[#6418C3] m-auto w-[30%] max-lg:w-full"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      bannerHandler();
                    }}
                    style={{ border: "1px solid #6418C3" }}
                    className="px-3 py-2.5 rounded-3xl font-semibold text-lg text-white bg-[#6418C3] m-auto w-[30%] max-lg:w-full"
                  >
                    Create
                  </button>
                )}
              </div>
              <input
                type="file"
                id="uploadCategory"
                accept=".jpg, .png, .webp, .jpeg, .gif"
                className="hidden"
                onChange={(e) => {
                  mediaHandler(e);
                }}
              />
              {/* <canvas ref={canvasRef} style={{ border: "1px solid black" }} /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateBannerAds;

function BannerType({ setBannerType }) {
  return (
    <div className="rounded-md shadow-2xl absolute w-full top-15 bg-white py-2 z-10">
      <p
        onClick={() => {
          setBannerType("Right Banner");
        }}
        className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3 hover:bg-[#6418c330] cursor-pointer"
      >
        Right Banner
      </p>
      <p
        onClick={() => {
          setBannerType("Left Banner");
        }}
        className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3 hover:bg-[#6418c330] cursor-pointer"
      >
        Left Banner
      </p>
    </div>
  );
}
