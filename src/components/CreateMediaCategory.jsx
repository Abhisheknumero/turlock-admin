import { useState } from "react";
import { Modal } from "react-bootstrap";
import SublyApi from "../HelperApis";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function CreateMediaCategory({ setShow, show, topMargin, setLoading }) {
  const { token } = useSelector((state) => state.user.userdetail);
  const [title, setTitle] = useState("");

  //   =====================API for create category for media======================
  async function createCategoryMedia() {
    setLoading(true);
    const requestData = {
      categoryName: title,
    };
    await SublyApi.createMediaCategory(token, requestData)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          toast.success("Media category successfully");
          setShow(false);
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section>
      <Modal
        className={`${topMargin}`}
        show={show}
        onHide={() => {
          setShow(false);
          setTitle("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
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
            </div>
            <div className="flex items-center justify-center mt-7 mb-1 gap-3">
              <button
                onClick={() => {
                  setShow(false);
                  setTitle("");
                }}
                style={{ border: "1px solid #D10505" }}
                className="px-3 py-1.5 rounded-3xl font-normal text-md text-black bg-gray-100 w-[120px]"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  createCategoryMedia();
                }}
                style={{ border: "1px solid #D10505" }}
                className="px-3 py-1.5 rounded-3xl font-normal text-md text-white bg-[#D10505] w-[120px]"
              >
                Add
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default CreateMediaCategory;
