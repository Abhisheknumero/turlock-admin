import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import SublyApi from "../../HelperApis";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Switch from "react-switch";
import { categoryType, imgBaseURL } from "../../utils/StaticsData";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../../utils/Loader";

function CreateCategory() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.user.userdetail);
  const [showDropdown, setShowDropdown] = useState({
    type: false,
  });
  const [isActive, setIsActive] = useState(false);
  const [fileValue, setFileValue] = useState("");
  const [mediaPreview, setMediaPreview] = useState("");
  const [title, setTitle] = useState();
  const [description, setDescription] = useState("");
  const [categoryType, setCategoryType] = useState({ id: "", key: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state) {
      setIsActive(
        location.state && location.state.categoryStatus == "Active"
          ? true
          : false
      );
      setTitle(location.state.categoryName);
      setCategoryType({
        id: location.state.categoryCreatedBy,
        key: location.state.categoryType,
      });
      setDescription(location.state.categoryDescription);
      setFileValue(`${imgBaseURL}${location.state.categoryThumbnail}`);
      setMediaPreview(`${imgBaseURL}${location.state.categoryThumbnail}`);
    }
  }, []);

  // =================================Media handler======================================\
  const mediaHandler = async (e) => {
    let fileReader,
      isCancel = false;
    if (e.target.files && e.target.files.length > 0) {
      const file = [e.target.files];
      setMediaPreview(e.target.files[0]);
      await Object.values(file[0]).map(async (item, index) => {
        if (e.target.files && e.target.files.length > 0) {
          fileReader = new FileReader();
          fileReader.onload = async (e) => {
            const { result } = e.target;
            if (result && !isCancel) {
              await setFileValue(result);
            }
          };
          fileReader.readAsDataURL(item);
        }
      });
    }
  };

  // ==============================Function for handling removing image===================================
  async function onImageRemove() {
    // let profileimages = [...fileValue];
    // profileimages.splice(index, 1);
    setFileValue("");
    // let profileImageData = [...mediaPreview];
    // profileImageData.splice(index, 1);
    setMediaPreview("");
  }

  //   =======================================Create Category API handling===========================================
  async function categoryHandler() {
    setLoading(true);
    const requestData = new FormData();
    requestData.append("categoryName", title);
    requestData.append("categoryType", categoryType.key);
    requestData.append("categoryDescription", description);
    requestData.append("categoryStatus", isActive ? "Active" : "Inactive");
    requestData.append("uploadImage", mediaPreview);
    await SublyApi.createCategory(requestData, token)
      .then((response) => {
        if (response.status == "success") {
          toast.success(response.status);
          setTitle("");
          setDescription("");
          setCategoryType({});
          setFileValue("");
          setMediaPreview("");
          setIsActive(false);
          navigate("/Post/Category");
        } else {
          toast.error(response.data.error);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  //   =======================Category update API================
  async function updateHandler() {
    const requestData = new FormData();
    requestData.append("categoryName", title);
    requestData.append("categoryType", categoryType.key);
    requestData.append("categoryDescription", description);
    requestData.append("categoryStatus", isActive ? "Active" : "Inactive");
    requestData.append("uploadImage", mediaPreview);
    await SublyApi.updateCategory(token, requestData, location.state._id)
      .then((response) => {
        if (response.status == "success") {
          toast.success(response.status);
          setTitle("");
          setDescription("");
          setCategoryType({});
          setFileValue("");
          setMediaPreview("");
          setIsActive(false);
          navigate("/Post/Category");
        } else {
          toast.error(response.data.error);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className="h-screen ">
      {loading ? <Loader /> : ""}
      <div className="xl:flex">
        <Sidebar />
        <div className="w-full z-0">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-4 pb-5 flex-wrap gap-3">
              <h3 className="mb-0 text-2xl font-semibold">Create Category</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigate("/Post/Post-List");
                  }}
                  className={`${
                    location.pathname.includes("/Post-List")
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
                  className={`${
                    location.pathname.includes("/Post/Category")
                      ? "bg-[#D10505] text-white"
                      : "buttonClass"
                  } ${"w-28 text-sm rounded-md px-2 py-2 font-medium hover:border-[#D10505] relative"}`}
                >
                  Post Category
                </button>
              </div>
            </div>
            <div className="container">
              <div className="flex items-center gap-3 max-lg:flex-wrap">
                <div className="w-full max-xl:w-full">
                  <label htmlFor="title" className="text-sm font-normal w-full">
                    Category Title
                    <input
                      type="text"
                      placeholder="Category Title"
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
                    setShowDropdown({
                      ...showDropdown,
                      type: !showDropdown.type,
                    });
                  }}
                  className="w-full max-xl:w-full relative"
                >
                  <label htmlFor="type" className="text-sm font-normal w-full">
                    Category Type
                    <input
                      type="text"
                      placeholder="Select Type"
                      id="type"
                      value={categoryType.key}
                      autoComplete="off"
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
                    className="absolute right-1 top-6 cursor-pointer"
                  />
                  {showDropdown.type && (
                    <CategoryType setCategoryType={setCategoryType} />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 max-lg:flex-wrap my-2.5">
                <div className="w-full max-xl:w-full ml-2">
                  <label
                    htmlFor="post-tag"
                    className="text-md font-medium w-full flex items-center text-gray-500 gap-3"
                  >
                    Active :
                    <Switch
                      onChange={(e) => {
                        setIsActive(e);
                      }}
                      checked={isActive}
                      offColor="#a5a5a5"
                      onColor="#D10505"
                      uncheckedIcon={false}
                      checkedIcon={false}
                      width={40}
                      height={20}
                      boxShadow="0 0 2px 3px #D10505"
                      activeBoxShadow="0 0 2px 3px #D10505"
                    />
                  </label>
                </div>
              </div>
              <div className="w-full mb-3">
                <textarea
                  placeholder="Write Content..."
                  className="resize-none placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full h-[140px] rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>{" "}
              {!fileValue && (
                <div className="flex items-center justify-center">
                  <label
                    htmlFor="uploadCategory"
                    style={{
                      border: "1px solid #9ca3af",
                      borderStyle: "dotted",
                    }}
                    className="rounded-md py-3 m-auto w-[30%] max-lg:w-full bg-gray-50 text-gray-600 cursor-pointer flex flex-col items-center"
                  >
                    {" "}
                    <Icon
                      icon="clarity:upload-cloud-line"
                      width="40"
                      height="40"
                    />
                    <p className="mb-0 text-lg font-normal ">
                      Upload media files
                    </p>
                  </label>
                </div>
              )}
              {fileValue && (
                <div className="flex items-center gap-2">
                  {/* {fileValue.length > 0 &&
                    fileValue.map((item, index) => ( */}
                  <div
                    // key={index}
                    className="border rounded-md flex items-center justify-center w-[140px] h-[140px] object-cover bg-gray-100 relative overflow-hidden"
                  >
                    <img src={fileValue} alt="img" />
                    <Icon
                      icon="si:close-duotone"
                      width="30"
                      height="30"
                      className="absolute top-0 right-0 cursor-pointer"
                      onClick={() => {
                        onImageRemove();
                      }}
                    />
                  </div>
                </div>
              )}
              <div className="flex items-center justify-center mt-5 mb-1 gap-3">
                <button
                  onClick={() => {
                    setTitle("");
                    setDescription("");
                    setCategoryType({});
                    setFileValue("");
                    setMediaPreview("");
                    setIsActive(false);
                    navigate("/Post/Category");
                  }}
                  style={{ border: "1px solid #D10505" }}
                  className="px-3 py-1.5 rounded-3xl font-normal text-md text-black bg-gray-100 w-[120px]"
                >
                  Cancel
                </button>
                {location.state ? (
                  <button
                    onClick={() => {
                      updateHandler();
                    }}
                    style={{ border: "1px solid #D10505" }}
                    className="px-3 py-1.5 rounded-3xl font-normal text-md text-white bg-[#D10505] w-[120px]"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      categoryHandler();
                    }}
                    style={{ border: "1px solid #D10505" }}
                    className="px-3 py-1.5 rounded-3xl font-normal text-md text-white bg-[#D10505] w-[120px]"
                  >
                    Create
                  </button>
                )}
              </div>
              <input
                type="file"
                id="uploadCategory"
                accept="image/*"
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

export default CreateCategory;

function CategoryType({ setCategoryType }) {
  return (
    <div className="rounded-md shadow-2xl absolute w-full top-15 bg-white py-2 z-50 max-h-48 overflow-auto">
      {categoryType.map((item, index) => (
        <p
          onClick={() => {
            setCategoryType({ id: item.id, key: item.key });
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
