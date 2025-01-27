import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import SublyApi from "../../HelperApis";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { imgBaseURL } from "../../utils/StaticsData";

function AddLostPet({ topMargin, show, setShow, setLoader, dataValue }) {
  const { userdetail } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [fileValue, setFileValue] = useState("");
  const [mediaPreview, setMediaPreview] = useState("");
  const [phone, setPhone] = useState("");

  console.log("dataValue", dataValue);

  // =====================prefield data for edit post=======================
  useEffect(() => {
    if (dataValue) {
      setContent(dataValue?.postContent);
      setFileValue([`${dataValue?.postMedia}`]);
      setMediaPreview([`${dataValue?.postMedia}`]);
      setName(dataValue?.applicantName);
      setEmail(dataValue?.email);
      setPhone(dataValue?.phoneNumber);
    }
  }, [dataValue]);

  //   ============================================================================
  async function lostPetHandle() {
    setLoader(true);
    await SublyApi.fetchCategory(userdetail?.token)
      .then(async (response) => {
        if (response.status == "success") {
          const lostPetValue = response.data.filter(
            (ele) => ele.categoryType == "lost_pet"
          );
          const requestData = new FormData();
          requestData.append("categories", lostPetValue[0]?._id);
          requestData.append("applicantName", name);
          requestData.append("email", email);
          requestData.append("phoneNumber", phone);
          requestData.append("postContent", content);
          requestData.append("commonUpload", mediaPreview);
          await SublyApi.addLostPet(userdetail.token, requestData)
            .then((response) => {
              setLoader(false);
              if (response.status == "success") {
                setShow(false);
                setName("");
                setEmail("");
                setContent("");
                setMediaPreview("");
                setPhone("");
                setFileValue("");
                toast.success(response.message);
              } else {
                toast.error(response.data.error);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => console.log(err));
  }

  //   ============================================================================
  async function editLostPetHandle() {
    setLoader(true);
    await SublyApi.fetchCategory(userdetail?.token)
      .then(async (response) => {
        if (response.status == "success") {
          const lostPetValue = response.data.filter(
            (ele) => ele.categoryType == "lost_pet"
          );
          const requestData = new FormData();
          requestData.append("categories", lostPetValue[0]?._id);
          requestData.append("applicantName", name);
          requestData.append("email", email);
          requestData.append("phoneNumber", phone);
          requestData.append("postContent", content);
          requestData.append("commonUpload", mediaPreview);
          await SublyApi.editLostPet(
            userdetail.token,
            dataValue?._id,
            requestData
          )
            .then((response) => {
              setLoader(false);
              if (response.status == "success") {
                setShow(false);
                setName("");
                setEmail("");
                setContent("");
                setMediaPreview("");
                setPhone("");
                setFileValue("");
                toast.success(response.message);
              } else {
                toast.error(response.data.error);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => console.log(err));
  }

  async function onImageRemove() {
    setFileValue("");
    setMediaPreview("");
  }

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

  return (
    <section>
      <Modal
        className={`${topMargin}`}
        show={show}
        onHide={() => {
          setShow(false);
          setName("");
          setEmail("");
          setContent("");
          setMediaPreview("");
          setFileValue("");
          setPhone("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Lost Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="w-full max-xl:w-full">
              <label htmlFor="title" className="text-sm font-normal w-full">
                <input
                  type="text"
                  placeholder="Your Name"
                  id="title"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="placeholder:text-gray-600 placeholder:font-medium py-2.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                />
              </label>
            </div>
            <div className="w-full max-xl:w-full  my-3">
              <label htmlFor="email" className="text-sm font-normal w-full">
                <input
                  type="text"
                  placeholder="Your Email Address"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="placeholder:text-gray-600 placeholder:font-medium py-2.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                />
              </label>
            </div>
            <div className="w-full max-xl:w-full my-3">
              <label htmlFor="phone" className="text-sm font-normal w-full">
                <input
                  type="text"
                  placeholder="Your Phone Number"
                  id="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  className="placeholder:text-gray-600 placeholder:font-medium py-2.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                />
              </label>
            </div>
            <div className="w-full mb-4">
              <textarea
                placeholder="Write Content..."
                className="resize-none placeholder:text-gray-600 placeholder:font-medium py-2 px-3 border border-gray-400 w-full h-[140px] rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium text-sm"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>{" "}
            {!fileValue && (
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
                  <p className="mb-0 text-lg font-normal ">Upload Image</p>
                </label>
              </div>
            )}
            {fileValue && (
              <div className="flex items-center gap-2">
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
            <div className="flex items-center justify-center mt-10 mb-2 gap-3">
              <button
                onClick={() => {
                  setShow(false);
                  setName("");
                  setEmail("");
                  setContent("");
                  setMediaPreview("");
                  setFileValue("");
                  setPhone("");
                }}
                style={{ border: "1px solid #6418C3" }}
                className="px-3 py-2 rounded-3xl text-base font-medium text-black bg-gray-100 w-[120px]"
              >
                Cancel
              </button>
              {dataValue ? (
                <button
                  onClick={() => {
                    editLostPetHandle();
                  }}
                  style={{ border: "1px solid #6418C3" }}
                  className="px-3 py-2 rounded-3xl text-base font-medium text-white bg-[#6418C3] w-[120px]"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={() => {
                    lostPetHandle();
                  }}
                  style={{ border: "1px solid #6418C3" }}
                  className="px-3 py-2 rounded-3xl text-base font-medium text-white bg-[#6418C3] w-[120px]"
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
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default AddLostPet;
