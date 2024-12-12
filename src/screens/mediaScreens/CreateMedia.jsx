import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import $ from "jquery";
import CreateMediaCategory from "../../components/CreateMediaCategory";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../utils/Loader";
import { toast } from "react-toastify";
import SublyApi from "../../HelperApis";
import { useSelector } from "react-redux";

function CreateMedia() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user.userdetail);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState({});
  const [fileValue, setFileValue] = useState("");
  const [mediaPreview, setMediaPreview] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);
  const [categoryList, setCategoryList] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  // ====function to hide dropdown on click outside====
  $(document).mouseup(function (e) {
    if (
      $(e.target).closest(".notifyBlock").length === 0 &&
      $(e.target).closest(".block_notify").length === 0
    ) {
      setShowDropdown({});
    }
  });

  // =================================Media handler======================================\

  const mediaHandler = async (e) => {
    let profileImageData = [...mediaPreview];
    let profileViewData = [...fileValue];
    let fileReader,
      isCancel = false;
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].type.includes("image")) {
        const file = e.target.files;
        // Object.values(file[0]).map((item, index) => {
        //   setMediaPreview(item);
        //   profileImageData.push(item);
        // });
        setMediaPreview(file[0]);
        await Object.values(file).map(async (item, index) => {
          if (e.target.files && e.target.files.length > 0) {
            fileReader = new FileReader();
            fileReader.onload = async (e) => {
              const { result } = e.target;
              if (item.type.includes("image")) {
                if (result && !isCancel) {
                  await profileViewData.push({ url: result, type: "image" });
                  await setFileValue(result);
                }
              } else {
                if (result && !isCancel) {
                  await profileViewData.push({ url: result, type: "video" });
                  await setFileValue(result);
                }
              }
            };
            fileReader.readAsDataURL(item);
          }
        });
      } else {
        const file = e.target.files;
        // Object.values(file[0]).map((item, index) => {
        //   profileImageData.push(item);
        // });
        setMediaPreview(file[0]);
        // importFileandPreview(e.target.files);
        generateVideoThumbnails(e.target.files[0], 1);
      }
    }
  };

  // ==============================Function for handling removing image===================================
  async function onImageRemove() {
    setFileValue("");
    setMediaPreview("");
  }

  // ======================================generating video thumbnail==========================================
  const importFileandPreview = (file, revoke) => {
    return new Promise((resolve, reject) => {
      window.URL = window.URL || window.webkitURL;
      let preview = window.URL.createObjectURL(file);
      // remove reference
      if (revoke) {
        window.URL.revokeObjectURL(preview);
      }
      setTimeout(() => {
        resolve(preview);
      }, 100);
    });
  };

  const generateVideoThumbnails = async (videoFile) => {
    let thumbnail = [...fileValue];
    let fractions = [];
    return new Promise(async (resolve, reject) => {
      if (!videoFile.type?.includes("video")) reject("not a valid video file");
      await getVideoDuration(videoFile).then(async (duration) => {
        // divide the video timing into particular timestamps in respective to number of thumbnails
        // ex if time is 10 and numOfthumbnails is 4 then result will be -> 0, 2.5, 5, 7.5 ,10
        // we will use this timestamp to take snapshots
        for (let i = 0; i <= duration; i += duration / 0) {
          fractions.push(Math.floor(i));
        }

        // the array of promises
        let promiseArray = fractions.map((time) => {
          return getVideoThumbnail(videoFile, time);
        });
        await Promise.all(promiseArray)
          .then((res) => {
            res.forEach((res) => {
              thumbnail.push({ url: res, type: "video" });
              setFileValue(thumbnail);
            });
            resolve(thumbnail);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally((res) => {
            console.log(res);
            resolve(thumbnail);
          });
      });
      reject("something went wront");
    });
  };

  const getVideoThumbnail = (file, videoTimeInSeconds) => {
    return new Promise((resolve, reject) => {
      if (file.type.match("video")) {
        importFileandPreview(file).then((urlOfFIle) => {
          var video = document.createElement("video");
          var timeupdate = function () {
            if (snapImage()) {
              video.removeEventListener("timeupdate", timeupdate);
              video.pause();
            }
          };
          video.addEventListener("loadeddata", function () {
            if (snapImage()) {
              video.removeEventListener("timeupdate", timeupdate);
            }
          });
          var snapImage = function () {
            var canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas
              .getContext("2d")
              .drawImage(video, 0, 0, canvas.width, canvas.height);
            var image = canvas.toDataURL();
            var success = image.length > 100000;
            if (success) {
              URL.revokeObjectURL(urlOfFIle);
              resolve(image);
            }
            return success;
          };
          video.addEventListener("timeupdate", timeupdate);
          video.preload = "metadata";
          video.src = urlOfFIle;
          // Load video in Safari / IE11
          video.muted = true;
          video.playsInline = true;
          video.currentTime = videoTimeInSeconds;
          video.play();
        });
      } else {
        reject("file not valid");
      }
    });
  };

  const getVideoDuration = (videoFile) => {
    return new Promise((resolve, reject) => {
      if (videoFile) {
        if (videoFile.type.match("video")) {
          importFileandPreview(videoFile).then((url) => {
            let video = document.createElement("video");
            console.log("video", video);

            video.addEventListener("loadeddata", function () {
              resolve(video.duration);
            });
            video.preload = "metadata";
            video.src = url;
            // Load video in Safari / IE11
            video.muted = true;
            video.playsInline = true;
            video.play();
            //  window.URL.revokeObjectURL(url);
          });
        }
      } else {
        reject(0);
      }
    });
  };

  // =======================fetch media list=========================
  useEffect(() => {
    fetchList();
  }, []);
  async function fetchList() {
    setLoading(true);
    await SublyApi.mediaList(token)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          setCategoryList(response.data);
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ==================================API for create media=====================================
  async function createMediaHandle() {
    setLoading(true);
    const requestData = new FormData();
    requestData.append("commonUpload", mediaPreview);
    requestData.append("mediaFileCategory", categoryValue.id);
    await SublyApi.createMedia(token, requestData)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          toast.success("Create media successfully");
          navigate("/Media");
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
      <CreateMediaCategory
        setShow={setCategoryModal}
        show={categoryModal}
        topMargin={"marginClass"}
        setLoading={setLoading}
      />
      {loading ? <Loader /> : ""}
      <div className="xl:flex">
        <Sidebar />
        <div className="w-full z-0 h-screen overflow-auto">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-4 pb-4 flex-wrap border-b-2">
              <h3 className="mb-0 text-lg font-semibold">Create Media</h3>
              <button
                onClick={() => {
                  navigate("/Media");
                }}
                className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none"
              >
                Back
              </button>
            </div>
            <div className="container">
              <div className="flex items-center justify-between gap-3 mt-5 ">
                {" "}
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
                    placeholder="Select Category"
                    value={categoryValue?.key}
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
                    onClick={() => {
                      setShowDropdown({
                        ...showDropdown,
                        category: !showDropdown.category,
                      });
                    }}
                  />
                  {showDropdown.category && (
                    <CategoryType
                      setShow={setCategoryModal}
                      categoryList={categoryList}
                      setCategoryValue={setCategoryValue}
                    />
                  )}
                </div>
                <div className="w-full relative">
                  <input
                    type="file"
                    id="upload"
                    accept=".png, .jpg, .jpeg, .gif, .webp, .mp4, .avi, .mov, .mkv"
                    className="hidden"
                    onChange={(e) => {
                      mediaHandler(e);
                      e.stopPropagation();
                    }}
                  />
                  <label
                    htmlFor="upload"
                    className="px-3 border border-gray-400 w-full rounded-md bg-white text-gray-600 font-medium flex items-center gap-3 cursor-pointer"
                  >
                    <p className="mb-0 border-r py-1.5 pr-3 text-nowrap">
                      Choose File
                    </p>
                    <p
                      className={`${
                        mediaPreview ? "pr-4" : ""
                      } ${"mb-0 overflow-hidden text-nowrap"}`}
                    >
                      {mediaPreview ? mediaPreview.name : "No File Chosen"}
                    </p>
                  </label>
                  {mediaPreview && (
                    <Icon
                      icon="si:close-duotone"
                      width="30"
                      height="30"
                      className="absolute top-1 right-1 cursor-pointer"
                      onClick={() => {
                        onImageRemove();
                      }}
                    />
                  )}
                </div>
              </div>
              {fileValue && (
                <div className="flex items-center gap-2 mt-4">
                  <div className="border rounded-md flex items-center justify-center w-[140px] h-[140px] object-cover bg-white relative overflow-hidden">
                    <img src={fileValue} alt="img" />
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => {
                    setCategoryValue({ id: "", key: "" });
                    setMediaPreview("");
                    setFileValue("");
                  }}
                  className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    createMediaHandle();
                  }}
                  className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateMedia;

function CategoryType({ setShow, categoryList, setCategoryValue }) {
  return (
    <div className="rounded-md shadow-2xl absolute w-full top-15 bg-white py-2 z-50 max-h-48 overflow-auto">
      <p
        onClick={() => {
          setShow(true);
        }}
        className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3 hover:bg-[#ff6d6d33] cursor-pointer flex items-center gap-2"
      >
        <Icon icon="fluent:add-20-regular" width="22" height="22" />
        Add Category
      </p>
      {categoryList &&
        categoryList?.map((item, index) => (
          <p
            onClick={() => {
              setCategoryValue({ id: item._id, key: item?.categoryName });
            }}
            className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3 hover:bg-[#ff6d6d33] cursor-pointer"
            key={index}
          >
            {item.categoryName}
          </p>
        ))}
    </div>
  );
}
