import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useEffect, useState } from "react";
import CreateCategory from "../../components/CreateCategory";
import { Loader } from "../../utils/Loader";
import SublyApi from "../../HelperApis";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function PostCreate() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.user.userdetail);
  const [showDropdown, setShowDropdown] = useState({
    type: false,
    subscription: false,
    category: false,
  });
  const [fileValue, setFileValue] = useState("");
  const [mediaPreview, setMediaPreview] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState("");

  // =================================Media handler======================================\

  const mediaHandler = async (e) => {
    let profileImageData = [...mediaPreview];
    let profileViewData = [...fileValue];
    let fileReader,
      isCancel = false;
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].type.includes("image")) {
        const file = [e.target.files];
        Object.values(file[0]).map((item, index) => {
          console.log(item);

          profileImageData.push(item);
        });
        setMediaPreview(profileImageData);
        await Object.values(file[0]).map(async (item, index) => {
          if (e.target.files && e.target.files.length > 0) {
            fileReader = new FileReader();
            fileReader.onload = async (e) => {
              const { result } = e.target;
              if (item.type.includes("image")) {
                if (result && !isCancel) {
                  await profileViewData.push({ url: result, type: "image" });
                  await setFileValue(profileViewData);
                }
              } else {
                if (result && !isCancel) {
                  await profileViewData.push({ url: result, type: "video" });
                  await setFileValue(profileViewData);
                }
              }
            };
            fileReader.readAsDataURL(item);
          }
        });
      } else {
        const file = [e.target.files];
        Object.values(file[0]).map((item, index) => {
          console.log(item);

          profileImageData.push(item);
        });
        setMediaPreview(profileImageData);
        // importFileandPreview(e.target.files);
        generateVideoThumbnails(e.target.files[0], 1);
      }
    }
  };

  // ==============================Function for handling removing image===================================
  async function onImageRemove(index) {
    let profileimages = [...fileValue];
    profileimages.splice(index, 1);
    setFileValue(profileimages);
    let profileImageData = [...mediaPreview];
    profileImageData.splice(index, 1);
    setMediaPreview(profileImageData);
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

  // =============================================================================================

  useEffect(() => {
    async function getCategory() {
      await SublyApi.fetchCategory(token)
        .then((response) => {
          if (response.status == "success") {
            setCategoryList(response.data);
          } else {
            toast.error(response.data.error);
          }
        })
        .catch((err) => console.log(err));
    }
    getCategory();
  }, []);

  return (
    <section className="h-screen ">
      {loading ? <Loader /> : ""}
      {/* <CreateCategory
        setShow={setCategoryModal}
        show={categoryModal}
        topMargin={"marginClass"}
        setLoading={setLoading}
      /> */}
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-10 pb-5">
              <h3 className="mb-0 text-2xl font-semibold">Create Post</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigate("/Post/Post-List");
                  }}
                  className={`${
                    location.pathname.includes("/Post")
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
                  className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none"
                >
                  Post Category
                </button>
              </div>
            </div>
            <div className="w-3/5 max-lg:w-full m-auto">
              <div className="flex items-center gap-3 max-lg:flex-wrap">
                <div className="w-full max-xl:w-full">
                  <label htmlFor="title" className="text-sm font-normal w-full">
                    Post Title
                    <input
                      type="text"
                      placeholder="Post Title"
                      id="title"
                      className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                    />
                  </label>
                </div>
                <div className="w-full max-xl:w-full relative">
                  <label
                    htmlFor="type"
                    className="text-sm font-normal w-full"
                    onClick={() => {
                      setShowDropdown({
                        ...showDropdown,
                        type: !showDropdown.type,
                      });
                    }}
                  >
                    Post Type
                    <input
                      type="text"
                      placeholder="Select Type"
                      id="type"
                      value={""}
                      className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium cursor-pointer caret-transparent"
                    />
                  </label>
                  <Icon
                    icon={`${
                      showDropdown.type
                        ? "majesticons:chevron-up-line"
                        : "majesticons:chevron-down-line"
                    }`}
                    width="30"
                    height="30"
                    style={{ color: "#4b5563" }}
                    className="absolute right-1 top-6"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 max-lg:flex-wrap my-3">
                <div className="w-full max-xl:w-full">
                  <label
                    htmlFor="post-tag"
                    className="text-sm font-normal w-full"
                  >
                    Post Tag
                    <input
                      type="text"
                      placeholder="Post Tag"
                      id="post-tag"
                      className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                    />
                  </label>
                </div>
                <div className="w-full max-xl:w-full relative">
                  <label
                    onClick={() => {
                      setShowDropdown({
                        ...showDropdown,
                        subscription: !showDropdown.subscription,
                      });
                    }}
                    htmlFor="subscription"
                    className="text-sm font-normal w-full"
                  >
                    Subscription
                    <input
                      type="text"
                      placeholder="Subscription"
                      id="subscription"
                      value={""}
                      className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium cursor-pointer caret-transparent"
                    />
                  </label>
                  <Icon
                    icon={`${
                      showDropdown.subscription
                        ? "majesticons:chevron-up-line"
                        : "majesticons:chevron-down-line"
                    }`}
                    width="30"
                    height="30"
                    style={{ color: "#4b5563" }}
                    className="absolute right-1 top-6"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 max-lg:flex-wrap my-3">
                <div className="w-full max-xl:w-full relative">
                  <label
                    htmlFor="link-title"
                    className="text-sm font-normal w-full"
                  >
                    Link Title
                    <input
                      type="text"
                      placeholder="Link Title"
                      id="link-title"
                      className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                    />
                  </label>
                </div>
                <div className="w-full max-xl:w-full relative">
                  <label htmlFor="link" className="text-sm font-normal w-full">
                    Link
                    <input
                      type="text"
                      placeholder="Link"
                      id="link"
                      className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                    />
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-3 max-lg:flex-wrap">
                <div
                  onClick={() => {
                    setShowDropdown({
                      ...showDropdown,
                      category: !showDropdown.category,
                    });
                  }}
                  className="w-full max-xl:w-full relative"
                >
                  <label
                    htmlFor="category"
                    className="text-sm font-normal w-full"
                  >
                    Category
                    <input
                      type="text"
                      placeholder="Select Category"
                      id="category"
                      value={""}
                      className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium cursor-pointer caret-transparent"
                    />
                  </label>
                  <Icon
                    icon={`${
                      showDropdown.category
                        ? "majesticons:chevron-up-line"
                        : "majesticons:chevron-down-line"
                    }`}
                    width="30"
                    height="30"
                    style={{ color: "#4b5563" }}
                    className="absolute right-1 top-6 cursor-pointer"
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
                    />
                  )}
                </div>
                <div className="w-full max-xl:w-full relative"></div>
              </div>
              <div className="w-full my-4">
                <textarea
                  placeholder="Write Content..."
                  className="resize-none placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full h-[140px] rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                />
              </div>
              {!fileValue.length > 0 && (
                <label
                  htmlFor="upload"
                  style={{ border: "1px solid #9ca3af", borderStyle: "dotted" }}
                  className="rounded-md py-3 flex items-center justify-center m-auto w-[30%] max-lg:w-full bg-white text-gray-600 gap-3 cursor-pointer"
                >
                  {" "}
                  <Icon
                    icon="clarity:upload-cloud-line"
                    width="40"
                    height="40"
                  />
                  <p className="mb-0 text-xl font-medium ">
                    Upload media files
                  </p>
                </label>
              )}
              {fileValue.length > 0 && (
                <div className="flex items-center gap-2">
                  {fileValue.length > 0 &&
                    fileValue.map((item, index) => (
                      <div
                        key={index}
                        className="border rounded-md flex items-center justify-center w-[140px] h-[140px] object-cover bg-white relative"
                      >
                        <img src={item.url} alt="img" />
                        <Icon
                          icon="si:close-duotone"
                          width="35"
                          height="35"
                          className="absolute top-0 right-0 cursor-pointer"
                          onClick={() => {
                            onImageRemove(index);
                          }}
                        />
                      </div>
                    ))}
                  <label
                    htmlFor="upload"
                    className="border rounded-md flex items-center justify-center w-[140px] h-[140px] bg-white text-gray-600 cursor-pointer"
                  >
                    <Icon icon="iwwa:add" width="65" height="65" />
                  </label>
                </div>
              )}
              <div className="flex items-center justify-center mt-5">
                <button
                  style={{ border: "1px solid #D10505" }}
                  className="px-3 py-2.5 rounded-3xl font-semibold text-lg text-white bg-[#D10505] m-auto w-[40%] max-lg:w-full"
                >
                  Create
                </button>
              </div>
              <input
                type="file"
                id="upload"
                accept="image/*, video/*"
                className="hidden"
                onChange={(e) => {
                  mediaHandler(e);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PostCreate;

function CategoryType({ setShow, categoryList }) {
  return (
    <div className="rounded-md shadow-2xl absolute w-full top-15 bg-white py-2 z-50 max-h-48 overflow-auto">
      <p
        onClick={() => {
          setShow(true);
        }}
        className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3 hover:bg-[#ff6d6d33] cursor-pointer flex items-center gap-2"
      >
        <Icon icon="fluent:add-20-regular" width="22" height="22" />
        Create Category
      </p>
      {categoryList &&
        categoryList?.map((item, index) => (
          <p
            className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3 hover:bg-[#ff6d6d33] cursor-pointer"
            key={index}
          >
            {item.categoryName}
          </p>
        ))}
    </div>
  );
}
