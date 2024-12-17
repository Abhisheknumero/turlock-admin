import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Loader } from "../../utils/Loader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SublyApi from "../../HelperApis";
import $ from "jquery";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Col, Row } from "react-bootstrap";
import placeholder from "../../assets/video-placeholder.png";
import { toast } from "react-toastify";
import { categoryType, imgBaseURL } from "../../utils/StaticsData";
import CreateCategory from "../../components/CreateCategory";

function CreateReels() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.user.userdetail);
  const [showDropdown, setShowDropdown] = useState({
    type: false,
    subscription: false,
    category: false,
  });
  const [fileValue, setFileValue] = useState("");
  const [mediaPreview, setMediaPreview] = useState("");
  const [description, setDescription] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [categoryList, setCategoryList] = useState("");
  const [postTag, setPostTag] = useState([]);
  const [postTagValue, setPostTagValue] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  const [subValue, setSubValue] = useState("");
  const [mediaObject, setMediaObject] = useState("");

  // =====================prefield data for edit post=======================
  useEffect(() => {
    if (location.state) {
      setDescription(location.state?.postContent);
      setFileValue(`${imgBaseURL}${location.state?.postMedia}`);
      setMediaPreview(`${imgBaseURL}${location.state?.postMedia}`);
      setMediaObject(`${imgBaseURL}${location.state?.postMedia}`);
      const tags = location.state?.postTag[0].split(",");
      setPostTag(tags);
      setSubValue({ subValue: location.state?.subscription });
      setPostTitle(location?.state?.postTitle);
    }
  }, [location.state]);

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

  const mediaHandler = (event) => {
    const file = event.target.files[0];
    setMediaObject(file);
    const url = URL.createObjectURL(file);
    setMediaPreview(url);
    generateVideoThumbnails(file);
  };

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
              setFileValue(res);
            });
            resolve(fileValue);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally((res) => {
            console.log(res);
            resolve(fileValue);
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

  //   const mediaHandler = async (e) => {
  //     let profileImageData = [...mediaPreview];
  //     let profileViewData = [...fileValue];
  //     let fileReader,
  //       isCancel = false;
  //     if (e.target.files && e.target.files.length > 0) {
  //       if (e.target.files[0].type.includes("image")) {
  //         const file = [e.target.files];
  //         Object.values(file[0]).map((item, index) => {
  //           profileImageData.push(item);
  //         });
  //         setMediaPreview(profileImageData);
  //         await Object.values(file[0]).map(async (item, index) => {
  //           if (e.target.files && e.target.files.length > 0) {
  //             fileReader = new FileReader();
  //             var url = URL.createObjectURL(file.originFileObj);

  //             fileReader.onload = async (e) => {
  //               const { result } = e.target;
  //               if (item.type.includes("image")) {
  //                 if (result && !isCancel) {
  //                   await profileViewData.push(result);
  //                   await setFileValue(profileViewData);
  //                 }
  //               } else {
  //                 if (result && !isCancel) {
  //                   await profileViewData.push(result);
  //                   await setFileValue(profileViewData);
  //                 }
  //               }
  //             };
  //             fileReader.readAsDataURL(item);
  //           }
  //         });
  //       } else {
  //         const file = [e.target.files];
  //         Object.values(file[0]).map((item, index) => {
  //           profileImageData.push(item);
  //         });
  //         setMediaPreview(profileImageData);
  //         // importFileandPreview(e.target.files);
  //         generateVideoThumbnails(e.target.files[0], 1);
  //       }
  //     }
  //   };

  // ==============================Function for handling removing image===================================
  async function onImageRemove() {
    setFileValue("");
    setMediaPreview("");
  }

  async function onTagRemove(index) {
    let tags = [...postTag];
    tags.splice(index, 1);
    setPostTag(tags);
  }

  // =================================Create Reels API handler===================================
  async function createReelsHandle() {
    setLoading(true);
    const requestData = new FormData();
    requestData.append("categories", categoryList._id);
    requestData.append("postType", categoryList.categoryType);
    requestData.append("postTitle", postTitle);
    requestData.append("postContent", description);
    requestData.append("commonUpload", mediaObject);
    requestData.append("subscription", subValue.subValue);
    requestData.append("postTag", postTag);
    requestData.append("postCategory", categoryList.categoryType);
    await SublyApi.createPost(token, requestData)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          navigate("/Reels");
          toast.success(response.status);
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // =================================Update post API handler===================================
  async function updatePostHandle() {
    setLoading(true);
    const requestData = new FormData();
    requestData.append("categories", categoryList._id);
    requestData.append("postType", categoryList.categoryType);
    requestData.append("postTitle", postTitle);
    requestData.append("postContent", description);
    requestData.append("commonUpload", mediaObject);
    requestData.append("subscription", subValue.subValue);
    requestData.append("postTag", postTag);
    requestData.append("postCategory", categoryList.categoryType);
    await SublyApi.updatePost(token, requestData, location.state?._id)
      .then((response) => {
        console.log("response", response);
        setLoading(false);
        if (response.status == "success") {
          navigate("/Post/Post-List");
          toast.success(response.status);
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    async function getCategory() {
      await SublyApi.fetchCategory(token)
        .then((response) => {
          if (response.status == "success") {
            setCategoryList;
            const reelCheck = response.data.filter(
              (ele) => ele.categoryName == "REELS"
            );
            setCategoryList(reelCheck[0]);
            if (!reelCheck.length > 0) {
              toast.dismiss();
              toast.error("First need to create category for reels type.");
              setShowModal(true);
            }
          } else {
            toast.error(response.data.error);
          }
        })
        .catch((err) => console.log(err));
    }
    getCategory();
  }, [isCategory]);

  function onCloseHandle() {
    setShowModal(false);
    navigate("/Reels");
  }

  return (
    <section className="overflow-auto">
      {loading ? <Loader /> : ""}
      <CreateCategory
        setShow={setShowModal}
        show={showModal}
        topMargin={"marginClass"}
        setLoading={setLoading}
        isReels={onCloseHandle}
        setIsCategory={setIsCategory}
      />
      <div className="xl:flex">
        <Sidebar />
        <div className="w-full z-0 h-screen overflow-auto">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-4 pb-4 flex-wrap border-b-2">
              <h3 className="mb-0 text-lg font-semibold">Create Reels</h3>
              <button
                onClick={() => {
                  navigate("/Reels");
                }}
                className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none"
              >
                Back
              </button>
            </div>
            <Row className="mt-5">
              <Col xl={6} lg={12} className="w-[40%] max-lg:w-full col-span-5">
                <div className="flex items-center gap-3 max-lg:flex-wrap">
                  <div className="w-full max-xl:w-full">
                    <label
                      htmlFor="title"
                      className="text-sm font-normal w-full"
                    >
                      Reels Title
                      <input
                        type="text"
                        placeholder="Reels Title"
                        id="title"
                        value={postTitle}
                        onChange={(e) => {
                          setPostTitle(e.target.value);
                        }}
                        className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                      />
                    </label>
                  </div>
                  <div
                    onClick={() => {
                      setShowDropdown({
                        ...showDropdown,
                        category: !showDropdown.category,
                      });
                    }}
                    className="w-full max-xl:w-full relative notifyBlock"
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
                        value={"Reels"}
                        autoComplete="off"
                        className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium caret-transparent"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-3 max-lg:flex-wrap my-3">
                  <div className="w-full max-xl:w-full">
                    <label
                      htmlFor="post-tag"
                      className="text-sm font-normal w-full "
                    >
                      Post Tag
                      <div className="flex items-center w-full gap-2">
                        <input
                          type="text"
                          placeholder="Post Tag"
                          id="post-tag"
                          value={postTagValue}
                          onChange={(e) => {
                            setPostTagValue(
                              e.target.value.includes("#")
                                ? e.target.value
                                : `#${e.target.value}`
                            );
                          }}
                          className="placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                        />
                        <button
                          onClick={() => {
                            if (postTagValue) {
                              setPostTagValue("");
                              setPostTag([...postTag, postTagValue]);
                            }
                          }}
                          className="w-24 text-sm rounded-md px-2 py-1.5 buttonClass relative font-medium hover:border-none"
                        >
                          Add
                        </button>
                      </div>
                    </label>
                    <div className="flex items-center gap-2 ">
                      {postTag?.map((val, index) => (
                        <p
                          key={index}
                          className="flex items-center gap-1 justify-between mb-0 bg-[#d105054b] pl-2 pr-0.5 font-medium text-gray-600 rounded-sm mt-2"
                        >
                          {val.includes("#") ? val : `#${val}`}{" "}
                          <Icon
                            icon="si:close-duotone"
                            width="20"
                            height="20"
                            className="cursor-pointer mt-0.5"
                            onClick={() => {
                              onTagRemove(index);
                            }}
                          />
                        </p>
                      ))}
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setShowDropdown({
                        ...showDropdown,
                        subscription: !showDropdown.subscription,
                      });
                    }}
                    className="w-full max-xl:w-full relative notifyBlock"
                  >
                    <label
                      htmlFor="subscription"
                      className="text-sm font-normal w-full"
                    >
                      Subscription
                      <input
                        type="text"
                        placeholder="Subscription"
                        id="subscription"
                        autoComplete="off"
                        value={subValue.subValue}
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
                    {showDropdown.subscription && (
                      <FilterDropdown
                        setFilterValue={setSubValue}
                        filterValue={subValue}
                      />
                    )}
                  </div>
                </div>
                <div className="w-full my-4">
                  <textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    placeholder="Write Content..."
                    className="resize-none placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full h-[180px] rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                  />
                </div>
                {!fileValue && (
                  <label
                    htmlFor="upload"
                    style={{
                      border: "1px solid #9ca3af",
                      borderStyle: "dotted",
                    }}
                    className="rounded-md py-3 flex items-center justify-center m-auto w-[40%] max-lg:w-full bg-white text-gray-600 gap-3 cursor-pointer"
                  >
                    {" "}
                    <Icon
                      icon="clarity:upload-cloud-line"
                      width="40"
                      height="40"
                    />
                    <p className="mb-0 text-xl font-medium ">Upload reels</p>
                  </label>
                )}
                {fileValue && (
                  <div className="flex items-center gap-2">
                    {fileValue && (
                      <div className="border rounded-md flex items-center justify-center w-[140px] h-[140px] object-cover bg-white relative overflow-hidden">
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
                    )}
                  </div>
                )}
                <div className="flex items-center justify-center mt-5">
                  {location.state ? (
                    <button
                      onClick={() => {
                        updatePostHandle();
                      }}
                      style={{ border: "1px solid #D10505" }}
                      className="px-3 py-2.5 rounded-3xl font-semibold text-lg text-white bg-[#D10505] m-auto w-[40%] max-lg:w-full"
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        createReelsHandle();
                      }}
                      style={{ border: "1px solid #D10505" }}
                      className="px-3 py-2.5 rounded-3xl font-semibold text-lg text-white bg-[#D10505] m-auto w-[40%] max-lg:w-full"
                    >
                      Create
                    </button>
                  )}
                </div>
                <input
                  type="file"
                  id="upload"
                  accept=".mp4, .avi, .mov, .mkv"
                  className="hidden"
                  onChange={(e) => {
                    mediaHandler(e);
                  }}
                />
              </Col>
              <Col xl={6} lg={12} className=" flex items-center justify-center">
                <div className="w-[700px] h-[500px] flex items-center justify-center">
                  {mediaPreview ? (
                    <video
                      src={mediaPreview}
                      controls={true}
                      className="h-100% w-100% rounded-lg"
                    />
                  ) : (
                    <label
                      htmlFor="upload"
                      className="w-full h-full relative cursor-pointer"
                    >
                      <p className="mb-0 absolute bottom-20 left-[40%] text-2xl font-semibold text-gray-400">
                        Upload reels
                      </p>
                      <img
                        src={placeholder}
                        alt="placeholder"
                        className="w-full h-full  rounded-lg"
                      />
                    </label>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateReels;

function CategoryType() {
  return (
    <div className="rounded-md shadow-2xl absolute w-full top-15 bg-white py-2 z-50 max-h-48 overflow-auto">
      {categoryType &&
        categoryType?.map((item, index) => (
          <p
            onClick={() => {
              setCategoryValue({ id: item.id, key: item?.key });
            }}
            className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3 hover:bg-[#ff6d6d33] cursor-pointer"
            key={index}
          >
            {item.key}
          </p>
        ))}
    </div>
  );
}

function FilterDropdown({ setFilterValue, filterValue }) {
  return (
    <div className="rounded-md shadow-2xl absolute w-full top-15 bg-white py-2 z-10">
      <p
        onClick={() => {
          setFilterValue({ ...filterValue, subValue: "Free" });
        }}
        className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3 hover:bg-[#ff6d6d33] cursor-pointer"
      >
        Free
      </p>
      <p
        onClick={() => {
          setFilterValue({ ...filterValue, subValue: "Paid" });
        }}
        className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3 hover:bg-[#ff6d6d33] cursor-pointer"
      >
        Paid
      </p>
    </div>
  );
}
