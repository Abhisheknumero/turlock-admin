import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { imgBaseURL } from "../../utils/StaticsData";
import { toast } from "react-toastify";
import SublyApi from "../../HelperApis";
import $ from "jquery";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import DatePicker from "react-datepicker";

function CreateBannerModal({
  show,
  setShow,
  itemValue,
  setItemValue,
  setLoading,
}) {
  const { userdetail } = useSelector((state) => state.user);
  const [fileValue, setFileValue] = useState("");
  const [mediaPreview, setMediaPreview] = useState("");
  const [bannerType, setBannerType] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const RIGHT_WIDTH = 728;
  const RIGHT_HEIGHT = 90;
  const LEFT_WIDTH = 206;
  const LEFT_HEIGHT = 67;

  // =====================prefield data for edit post=======================
  useEffect(() => {
    if (itemValue) {
      setFileValue(`${itemValue?.bannerImage}`);
      setMediaPreview(`${itemValue?.bannerImage}`);
      setBannerType(itemValue?.bannerType);
      setStartDate(itemValue?.startDate);
      setEndDate(itemValue?.endDate);
    }
  }, [itemValue]);
  console.log("itemValue", itemValue);

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
    if (bannerType && startDate && endDate && mediaPreview) {
      setLoading(true);
      const requestData = new FormData();
      //   requestData.append("title", title);
      requestData.append("bannerType", bannerType);
      requestData.append("startDate", startDate);
      requestData.append("endDate", endDate);
      requestData.append("commonUpload", mediaPreview);
      //   requestData.append("imageNavLink", link);
      await SublyApi.createBanner(
        userdetail?.token,
        userdetail?.id,
        requestData
      )
        .then((response) => {
          if (response.status == "success") {
            toast.success(response.status);
            setFileValue("");
            setMediaPreview("");
            setBannerType("");
            setStartDate("");
            setEndDate("");
            setShow(false);
            setItemValue("");
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
    if (bannerType && startDate && endDate && mediaPreview) {
      setLoading(true);
      const requestData = new FormData();
      //   requestData.append("title", title);
      requestData.append("bannerType", bannerType);
      requestData.append("startDate", startDate);
      requestData.append("endDate", endDate);
      requestData.append("commonUpload", mediaPreview);
      //   requestData.append("imageNavLink", link);
      await SublyApi.updateBanner(
        userdetail?.token,
        requestData,
        itemValue?._id
      )
        .then((response) => {
          if (response.status == "success") {
            toast.success(response.status);
            setFileValue("");
            setMediaPreview("");
            setBannerType("");
            setStartDate("");
            setEndDate("");
            setShow(false);
            setItemValue("");
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
    <section>
      <Modal
        show={show}
        onHide={() => {
          setFileValue("");
          setMediaPreview("");
          setBannerType("");
          setStartDate("");
          setEndDate("");
          setShow(false);
          setItemValue("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {" "}
            <div className="w-[95%] max-lg:w-full m-auto">
              <div className="flex items-center gap-3 max-lg:flex-wrap mt-2">
                <div
                  onClick={() => {
                    setShowDropdown(!showDropdown);
                  }}
                  className="w-full max-xl:w-full relative notifyBlock "
                >
                  <label
                    htmlFor="category"
                    className="text-sm font-normal w-full"
                  >
                    <input
                      type="text"
                      placeholder="Select Banner Type"
                      id="category"
                      value={bannerType}
                      autoComplete="off"
                      className="placeholder:text-gray-600 placeholder:font-medium py-2.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium cursor-pointer caret-transparent"
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
                    className="absolute right-1 top-1 cursor-pointer"
                    onClick={() => {
                      setShowDropdown(!showDropdown);
                    }}
                  />
                  {showDropdown && <BannerType setBannerType={setBannerType} />}
                </div>
              </div>
              <div className="flex items-center gap-3 max-lg:flex-wrap mt-4">
                <div
                  onClick={() => {
                    setShowDropdown(!showDropdown);
                  }}
                  className="w-full max-xl:w-full relative notifyBlock "
                >
                  <label
                    htmlFor="category"
                    className="text-sm font-normal w-full"
                  >
                    <input
                      type="text"
                      placeholder="Select Screen"
                      id="category"
                      value={bannerType}
                      autoComplete="off"
                      className="placeholder:text-gray-600 placeholder:font-medium py-2.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium cursor-pointer caret-transparent"
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
                    className="absolute right-1 top-1 cursor-pointer"
                    onClick={() => {
                      setShowDropdown(!showDropdown);
                    }}
                  />
                  {showDropdown && <BannerType setBannerType={setBannerType} />}
                </div>
              </div>
              <div className="flex items-center gap-3 max-lg:flex-wrap my-4">
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
                    <input
                      type="text"
                      placeholder="Select Banner Location"
                      id="category"
                      value={bannerType}
                      autoComplete="off"
                      className="placeholder:text-gray-600 placeholder:font-medium py-2.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium cursor-pointer caret-transparent"
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
                    className="absolute right-1 top-1 cursor-pointer"
                    onClick={() => {
                      setShowDropdown(!showDropdown);
                    }}
                  />
                  {showDropdown && <BannerType setBannerType={setBannerType} />}
                </div>
              </div>
              <div className="flex items-center gap-3 max-lg:flex-wrap">
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
                    <input
                      type="text"
                      placeholder="Select Banner position"
                      id="category"
                      value={bannerType}
                      autoComplete="off"
                      className="placeholder:text-gray-600 placeholder:font-medium py-2.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium cursor-pointer caret-transparent"
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
                    className="absolute right-1 top-1 cursor-pointer"
                    onClick={() => {
                      setShowDropdown(!showDropdown);
                    }}
                  />
                  {showDropdown && <BannerType setBannerType={setBannerType} />}
                </div>
              </div>
              <div className="flex items-center gap-3 max-lg:flex-wrap mt-4 mb-4">
                <div className="flex items-center gap-3 w-full ">
                  <div className="placeholder:text-gray-600  text-sm placeholder:placeholder:font-medium  py-2.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 placeholder:font-medium ">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      placeholderText="Start Date"
                      dateFormat={"dd/MM/YYYY"}
                      minDate={new Date()}
                      className=" focus-visible:outline-none text-gray-600 placeholder:font-medium overflow-hidden placeholder:text-gray-600 font-medium"
                    />
                  </div>
                  <div className="placeholder:text-gray-600 text-sm placeholder:placeholder:font-medium py-2.5 px-3 border border-gray-400 !w-full rounded-md bg-white focus-visible:outline-none text-gray-600 placeholder:font-medium  overflow-hidden">
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
              </div>
              {!fileValue && (
                <div className="flex items-center justify-center mt-4">
                  <label
                    htmlFor="uploadCategory"
                    style={{
                      border: "1px solid #9ca3af",
                      borderStyle: "dotted",
                    }}
                    className="rounded-md py-3 m-auto w-[50%] max-lg:w-full bg-gray-50 text-gray-600 cursor-pointer flex justify-center gap-2 items-center"
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
              <div className="flex items-center justify-center mt-5 mb-3 gap-3">
                <button
                  onClick={() => {
                    setFileValue("");
                    setMediaPreview("");
                    setBannerType("");
                    setStartDate("");
                    setEndDate("");
                    setShow(false);
                    setItemValue("");
                  }}
                  style={{ border: "1px solid #6418C3" }}
                  className="px-3 py-2.5 rounded-3xl text-base font-medium text-black bg-gray-100 w-[120px]"
                >
                  Cancel
                </button>
                {itemValue ? (
                  <button
                    onClick={() => {
                      bannerEditHandler();
                    }}
                    style={{ border: "1px solid #6418C3" }}
                    className="px-3 py-2.5 rounded-3xl text-base font-medium text-white bg-[#6418C3] w-[120px]"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      bannerHandler();
                    }}
                    style={{ border: "1px solid #6418C3" }}
                    className="px-3 py-2.5 rounded-3xl text-base font-medium text-white bg-[#6418C3] w-[120px]"
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
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default CreateBannerModal;

function BannerType({ setBannerType }) {
  return (
    <div className="rounded-md shadow-2xl absolute w-full top-15 bg-white py-2.5 z-10">
      <p
        onClick={() => {
          setBannerType("Right Banner");
        }}
        className="text-[#4b5563] font-semibold text-sm mb-0 py-2.5 px-3 hover:bg-[#6418c330] cursor-pointer"
      >
        Right Banner
      </p>
      <p
        onClick={() => {
          setBannerType("Left Banner");
        }}
        className="text-[#4b5563] font-semibold text-sm mb-0 py-2.5 px-3 hover:bg-[#6418c330] cursor-pointer"
      >
        Left Banner
      </p>
    </div>
  );
}
