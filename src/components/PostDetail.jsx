import { Modal } from "react-bootstrap";
import SublyApi from "../HelperApis";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { ToCapitalize } from "../utils/CustomMethod";
import { imgBaseURL } from "../utils/StaticsData";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

function PostDetail({ show, setShow, topMargin, id, setLoading }) {
  const { token } = useSelector((state) => state.user.userdetail);
  const [detailValue, setDetailValue] = useState("");

  //   ==================Fetch category detail API=========================
  async function fetchDetailHandle() {
    setLoading(true);
    await SublyApi.fetchPostDetail(token, id)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          setDetailValue(response.data);
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    if (show) {
      fetchDetailHandle();
    }
  }, [show]);

  console.log("detailValue", detailValue);

  return (
    <section>
      <Modal
        className={`${topMargin} widthClassMid`}
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="flex items-center gap-2">
            Post Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-2 w-[90%] m-auto">
            <div className="border-b pb-3">
              <div className="mb-2 flex items-center justify-between gap-2 flex-wrap">
                {" "}
                <p className="mb-0 text-lg font-semibold">
                  Title :
                  <span className="text-base font-semibold">
                    {" "}
                    {detailValue?.postTitle || "NA"}
                  </span>
                </p>
                <p className="mb-0 flex items-center gap-1 text-lg font-semibold">
                  <Icon icon="flowbite:eye-outline" width="25" height="25" /> 0
                </p>
              </div>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="mb-0 text-lg font-semibold">
                  Post Category :
                  <span className="text-base font-semibold">
                    {" "}
                    {detailValue?.postCategory || "NA"}
                  </span>
                </p>
                <p className="mb-0 text-lg font-semibold">
                  Subscription :
                  <span className="text-base font-semibold">
                    {" "}
                    {ToCapitalize(detailValue?.subscription) || "NA"}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between gap-2 my-2 flex-wrap">
                <p className="mb-0 text-lg font-semibold">
                  Post Tag :
                  <span className="text-base font-semibold">
                    {" "}
                    {detailValue?.postTag || "NA"}
                  </span>
                </p>
                <p className="mb-0 text-lg font-semibold">
                  Date :{" "}
                  <span className="text-base font-semibold">{`${moment(
                    new Date(detailValue?.updatedAt)
                  ).format("MMM DD, YYYY")}`}</span>
                </p>
              </div>
              <p className="mt-2.5 mb-3 text-lg font-semibold">
                Post Content :
                <span className="text-base font-semibold">
                  {" "}
                  {detailValue?.postContent || "NA"}
                </span>
              </p>
              <div className="my-2 bg-gray-200 rounded-md py-2 px-3">
                <p className="mb-0 text-xl font-semibold border-b border-gray-300 pb-2">
                  External Links
                </p>
                <p className="mb-0 text-lg font-semibold mt-1">
                  Title :
                  <span className="text-base font-semibold">
                    {" "}
                    {detailValue?.externalLink?.title || "NA"}
                  </span>
                </p>
                <p className="mb-0 text-lg font-semibold mt-1">
                  Link :
                  <span className="text-base font-semibold">
                    {" "}
                    {detailValue?.externalLink?.link || "NA"}
                  </span>
                </p>
              </div>
            </div>
            {detailValue.categoryThumbnail && (
              <div className="flex items-center gap-2 mt-7">
                <div className="border rounded-md flex items-center justify-center w-[140px] h-[140px] object-cover bg-gray-100 relative overflow-hidden">
                  <img
                    src={`${imgBaseURL}${detailValue.categoryThumbnail}`}
                    alt="img"
                  />
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default PostDetail;
