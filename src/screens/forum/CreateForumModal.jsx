import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import ReactQuill from "react-quill";
import uploadImage from "../../assets/upload-image.jpg";

function CreateForumModal({ show, setShow, dataValue }) {
  const [fileValue, setFileValue] = useState("");
  const [mediaPreview, setMediaPreview] = useState("");
  const [title, setTitle] = useState("");
  const [participant, setParticipant] = useState("");
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");

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
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Forum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {" "}
            <div className="w-[95%] max-lg:w-full m-auto">
              <div className="w-32 h-32 rounded-xl bg-gray-200 relative border">
                <img
                  src={uploadImage}
                  className="w-full h-full rounded-xl object-cover "
                />
                <label
                  htmlFor="upload"
                  className="absolute -bottom-1 -right-1 !bg-white  rounded-full cursor-pointer !opacity-100 flex items-center justify-center p-1"
                >
                  <Icon
                    icon="solar:camera-bold"
                    width="32"
                    height="32"
                    style={{ color: "#6418C3" }}
                  />
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="upload"
                  accept=".jpg, .png, .webp, .jpeg, .gif"
                  onChange={(e) => {
                    mediaHandler(e);
                  }}
                />
              </div>
              <div className="w-full max-xl:w-full mt-3">
                <label htmlFor="title" className="text-sm font-normal w-full">
                  <input
                    type="text"
                    placeholder="Title"
                    id="title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    className="placeholder:text-gray-600 placeholder:font-medium py-2.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                  />
                </label>
              </div>
              <div className="flex items-center justify-between gap-2 my-3">
                <div className="w-full max-xl:w-full">
                  <label htmlFor="title" className="text-sm font-normal w-full">
                    <input
                      type="text"
                      placeholder="Participants"
                      id="title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      className="placeholder:text-gray-600 placeholder:font-medium py-2.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-medium"
                    />
                  </label>
                </div>{" "}
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
              </div>
              <div className="w-full my-4">
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  className="bg-white h-[232px] editorClass "
                  placeholder="Write Content..."
                />
              </div>
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
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default CreateForumModal;
