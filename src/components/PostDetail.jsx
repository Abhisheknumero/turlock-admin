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

  return (
    <section>
      <Modal
        className={`${topMargin}`}
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
        <Modal.Body className="!pt-2">
          <div className="w-[95%] m-auto">
            <div className="pb-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-base font-semibold">{`${moment(
                  new Date(detailValue?.updatedAt)
                ).format("MMM DD, YYYY")}`}</span>
                <p className="rounded-full bg-[#6518c341] text-[#6418C3] px-3">
                  <span className="text-sm font-semibold">
                    {" "}
                    {ToCapitalize(detailValue?.subscription) || "NA"}
                  </span>
                </p>
              </div>
              <div className="flex items-start justify-between mb-1">
                {detailValue.postMedia && (
                  <div className="flex items-center gap-2 mt-2 relative">
                    <div className="border rounded-md flex items-center justify-center w-full h-[140px] object-cover bg-gray-100 relative overflow-hidden opacity-[0.8]">
                      <img src={`${detailValue.postMedia}`} alt="img" />
                    </div>
                    <p className="mb-2 flex items-center gap-1 text-lg font-semibold justify-end absolute top-1 right-1 bg-[#ffffffc5] rounded-lg px-2">
                      <Icon
                        icon="flowbite:eye-outline"
                        width="25"
                        height="25"
                      />{" "}
                      0
                    </p>
                  </div>
                )}
              </div>
              <div className="mb-2 flex items-center justify-between gap-2 flex-wrap">
                {" "}
                <p className="mb-0 text-base font-bold leading-6">
                   {detailValue?.postTitle || "NA"}
                </p>{" "}
              </div>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="mb-0 text-lg font-semibold">
                  Post Type :
                  <span className="text-base font-semibold">
                    {" "}
                    {detailValue?.postType || "NA"}
                  </span>
                </p>
              </div>
              <p className="mt-2.5 mb-3 text-lg font-semibold flex items-start gap-2 text-nowrap max-h-[300px] overflow-auto">
                <span
                  dangerouslySetInnerHTML={{
                    __html: detailValue?.postContent,
                  }}
                  className="text-base font-semibold !text-wrap"
                />{" "}
                {/* { detailValue?.postContent || "NA"} */}
              </p>
              <div className="flex items-center justify-between gap-2 my-2 flex-wrap">
                <p className="mb-0 text-lg font-semibold">
                  <span className="text-base font-semibold">
                    {" "}
                    {detailValue?.postTag || "NA"}
                  </span>
                </p>
              </div>
              {/* <div className="my-2 bg-gray-200 rounded-md py-2 px-3">
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
              </div> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default PostDetail;
