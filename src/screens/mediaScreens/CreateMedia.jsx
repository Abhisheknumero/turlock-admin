import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

function CreateMedia() {
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState({});
  const [fileValue, setFileValue] = useState("");
  const [mediaPreview, setMediaPreview] = useState("");

  // =================================Media handler======================================\

  const mediaHandler = async (e) => {
    let profileImageData = [...mediaPreview];
    let profileViewData = [...fileValue];
    let fileReader,
      isCancel = false;
    console.log("sdjvkfhsuihsgvf", e);

    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].type.includes("image")) {
        const file = e.target.files;
        // Object.values(file[0]).map((item, index) => {
        //   setMediaPreview(item);
        //   profileImageData.push(item);
        // });
        console.log("sdjvkfhsuihsgvf", file[0]);

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

  console.log("mediaPreview", mediaPreview);
  console.log(fileValue);

  return (
    <section className="overflow-auto">
      {loading ? <Loader /> : ""}
      <div className="xl:flex">
        <Sidebar />
        <div className="w-full z-0 h-screen overflow-auto">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-4 pb-4 flex-wrap border-b-2">
              <h3 className="mb-0 text-lg font-semibold">Create Media</h3>
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
                  className="w-full relative"
                >
                  <input
                    type="text"
                    placeholder="Select Category"
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
                  />
                </div>
                <div className="w-full relative">
                  <input
                    type="file"
                    id="upload"
                    accept="image/*, video/*"
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
                    <p className="mb-0 border-r py-1.5 pr-3 ">Choose File</p>
                    <p className="mb-0 overflow-hidden text-nowrap">
                      {mediaPreview ? mediaPreview.name : "No File Chosen"}
                    </p>
                    <Icon
                      icon="si:close-duotone"
                      width="35"
                      height="35"
                      className="absolute top-0 right-0 cursor-pointer"
                      onClick={() => {
                        onImageRemove();
                      }}
                    />
                  </label>
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
                <button className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none">
                  Cancel
                </button>
                <button className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none">
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
