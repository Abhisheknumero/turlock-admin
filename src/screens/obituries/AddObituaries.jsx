import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useState } from "react";
import { Modal } from "react-bootstrap";

function AddObituaries({ topMargin, show, setShow }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [fileValue, setFileValue] = useState("");
  const [mediaPreview, setMediaPreview] = useState("");
  const [phone, setPhone] = useState("");
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
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Obituaries</Modal.Title>
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
                }}
                style={{ border: "1px solid #d01505" }}
                className="px-3 py-2 rounded-3xl text-base font-medium text-black bg-gray-100 w-[120px]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  lostPetHandle();
                }}
                style={{ border: "1px solid #d01505" }}
                className="px-3 py-2 rounded-3xl text-base font-medium text-white bg-[#d01505] w-[120px]"
              >
                Create
              </button>
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

export default AddObituaries;
