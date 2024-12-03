import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { categoryType } from "../utils/StaticsData";
import Switch from "react-switch";
import SublyApi from "../HelperApis";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function CreateCategory({ show, setShow, topMargin, setLoading }) {
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

  // =================================Media handler======================================\
  const mediaHandler = async (e) => {
    let profileImageData = [...mediaPreview];
    let profileViewData = [...fileValue];
    let fileReader,
      isCancel = false;
    if (e.target.files && e.target.files.length > 0) {
      const file = [e.target.files];
      Object.values(file[0]).map((item, index) => {
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
            }
          };
          fileReader.readAsDataURL(item);
        }
      });
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

  //   =======================================Create Category API handling===========================================
  async function categoryHandler() {
    console.log("Abhishek");

    setLoading(true);
    const requestData = new FormData();
    requestData.append("categoryName", title);
    requestData.append("categoryType", categoryType.id);
    requestData.append("categoryDescription", description);
    requestData.append("categoryStatus", isActive);
    requestData.append("uploadImage", mediaPreview);
    await SublyApi.createCategory(requestData, token)
      .then((response) => {
        if (response.status == "success") {
          toast.success(response.status);
          setShow(false);
        } else {
          toast.error(response.data.status);
        }
        console.log("response", response);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <section>
      <Modal
        className={`${topMargin}`}
        show={show}
        onHide={() => {
          setShow(false);
          setTitle("");
          setDescription("");
          setCategoryType({});
          setFileValue("");
          setMediaPreview("");
          setIsActive(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
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
                    onChange={() => {
                      setIsActive(!isActive);
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
            {!fileValue.length > 0 && (
              <div className="flex items-center justify-center">
                <label
                  htmlFor="uploadCategory"
                  style={{ border: "1px solid #9ca3af", borderStyle: "dotted" }}
                  className="rounded-md py-3 m-auto w-[50%] max-lg:w-full bg-gray-50 text-gray-600 cursor-pointer flex flex-col items-center"
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
            {fileValue.length > 0 && (
              <div className="flex items-center gap-2">
                {fileValue.length > 0 &&
                  fileValue.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-md flex items-center justify-center w-[140px] h-[140px] object-cover bg-gray-100 relative overflow-hidden"
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
              </div>
            )}
            <div className="flex items-center justify-center mt-7 mb-1 gap-3">
              <button
                onClick={() => {
                  setShow(false);
                  setTitle("");
                  setDescription("");
                  setCategoryType({});
                  setFileValue("");
                  setMediaPreview("");
                  setIsActive(false);
                }}
                style={{ border: "1px solid #D10505" }}
                className="px-3 py-1.5 rounded-3xl font-normal text-md text-black bg-gray-100 w-[120px]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  categoryHandler();
                }}
                style={{ border: "1px solid #D10505" }}
                className="px-3 py-1.5 rounded-3xl font-normal text-md text-white bg-[#D10505] w-[120px]"
              >
                Create
              </button>
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
        </Modal.Body>
      </Modal>
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
