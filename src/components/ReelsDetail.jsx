import { Modal } from "react-bootstrap";
import SublyApi from "../HelperApis";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { ToCapitalize } from "../utils/CustomMethod";
import { imgBaseURL } from "../utils/StaticsData";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

function ReelsDetail({ show, setShow, topMargin, id, setLoading }) {
  const { token } = useSelector((state) => state.user.userdetail);
  const [detailValue, setDetailValue] = useState("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

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
        className={`${topMargin} heightClassMid p-0`}
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Body className="p-0 rounded-lg">
          <div className="videoCard rounded-lg h-[600px] flex items-center justify-center bg-black relative">
            <div className="flex items-center absolute top-4 w-full px-2">
              <Icon
                icon="ion:chevron-back"
                width="25"
                height="25"
                style={{ color: "white", cursor: "pointer" }}
                onClick={() => {
                  setShow(false);
                }}
              />
              <p className="text-lg text-white font-medium mb-0 w-full text-center pr-5">
                Reels
              </p>
            </div>
            <video
              ref={videoRef}
              autoPlay={true}
              className="videoCard__player h-[80%] object-cover "
              src={`${detailValue.postMedia}`}
              alt="IG reel video"
              loop
            />
            <div className="absolute bottom-16 left-0 flex items-end justify-between w-full px-4">
              <div className="w-[80%]">
                <p className="mb-0 text-white text-base">
                  {detailValue?.postTitle}
                </p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: detailValue?.postContent,
                  }}
                  className={`${"text-gray-100 text-sm mb-0 max-h-[80px] overflow-auto"}`}
                />
                {/* <p className="text-gray-100 text-sm mb-0">
                  {detailValue?.postContent}{" "}
                </p> */}
                {detailValue?.postTag?.map((item, index) => (
                  <span key={index} className="text-gray-300 text-sm">
                    {item}{" "}
                  </span>
                ))}
              </div>
              <div>
                <p className="mb-1 text-white text-base flex items-center gap-1 justify-end">
                  <Icon
                    icon="ic:outline-subscriptions"
                    width="18"
                    height="18"
                    style={{ color: "white" }}
                  />{" "}
                  <span className="text-sm">{detailValue?.subscription}</span>
                </p>
                <p className="mb-0 text-white text-sm">{`${moment(
                  new Date(detailValue?.updatedAt)
                ).format("MMM DD, YYYY")}`}</p>
              </div>
            </div>
            <div className="absolute bottom-4 right-0 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5 justify-end">
                <p className="mb-0 flex items-center gap-1 text-white text-lg">
                  <Icon
                    icon="lucide:heart"
                    width="20"
                    height="20"
                    style={{ color: "white" }}
                  />
                  {detailValue?.postLikes?.length}
                </p>
                <p className="mb-0 flex items-center gap-1 text-white text-lg">
                  <Icon
                    icon="material-symbols:mode-comment-outline"
                    width="20"
                    height="20"
                    style={{ color: "white" }}
                  />
                  {detailValue?.postComments?.length}
                </p>
                <p className="mb-0 flex items-center gap-1 text-white text-lg">
                  <Icon
                    icon="gravity-ui:eye"
                    width="20"
                    height="20"
                    style={{ color: "white" }}
                  />
                  {detailValue?.postComments?.length}
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default ReelsDetail;
