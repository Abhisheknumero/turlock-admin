import { Modal } from "react-bootstrap";
import SublyApi from "../HelperApis";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { ToCapitalize } from "../utils/CustomMethod";
import { imgBaseURL } from "../utils/StaticsData";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

function ReelsDetail({ show, setShow, topMargin, id, setLoading }) {
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
                  Subscription :
                  <span className="text-base font-semibold">
                    {" "}
                    {ToCapitalize(detailValue?.subscription) || "NA"}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between gap-2 my-2 flex-wrap">
                <p className="mb-0 text-lg font-semibold">
                  Reel Tag :
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
                Description :
                <span className="text-base font-semibold">
                  {" "}
                  {detailValue?.postContent || "NA"}
                </span>
              </p>
            </div>
            {detailValue.postMedia && (
              <div className="flex items-center gap-2 mt-7">
                <div className="border rounded-md flex items-center justify-center w-[140px] h-[140px] object-cover bg-gray-100 relative overflow-hidden">
                  <img
                    src={`${imgBaseURL}${detailValue.postMedia}`}
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

export default ReelsDetail;
