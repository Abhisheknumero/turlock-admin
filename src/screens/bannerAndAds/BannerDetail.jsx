import { Modal } from "react-bootstrap";
import SublyApi from "../../HelperApis";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment";
import { imgBaseURL } from "../../utils/StaticsData";

function BannerDetail({ show, setShow, topMargin, id, setLoading }) {
  const { token } = useSelector((state) => state.user.userdetail);
  const [detailValue, setDetailValue] = useState("");

  //   ==================Fetch category detail API=========================
  async function fetchDetailHandle() {
    setLoading(true);
    await SublyApi.getBannerDetail(token, id)
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
    <Modal
      className={`${topMargin}`}
      show={show}
      onHide={() => {
        setShow(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="flex items-center gap-2">
          Banner Detail
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
                  {detailValue?.title || "NA"}
                </span>
              </p>{" "}
              <p className="mb-0 text-lg font-semibold">
                Banner Type :
                <span className="text-base font-semibold">
                  {" "}
                  {detailValue?.bannerType || "NA"}
                </span>
              </p>
            </div>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <p className="mb-0 text-lg font-semibold">
                Navigation Link :
                <span className="text-base font-semibold">
                  {" "}
                  {detailValue?.imageNavLink || "NA"}
                </span>
              </p>
            </div>
            <div className="flex items-center justify-between gap-2 my-2 flex-wrap">
              <p className="mb-0 text-lg font-semibold">
                Start Date :{" "}
                <span className="text-base font-semibold">{`${moment(
                  new Date(detailValue?.startDate)
                ).format("MMM DD, YYYY")}`}</span>
              </p>
              <p className="mb-0 text-lg font-semibold">
                End Date :{" "}
                <span className="text-base font-semibold">{`${moment(
                  new Date(detailValue?.endDate)
                ).format("MMM DD, YYYY")}`}</span>
              </p>
            </div>
          </div>
          {detailValue.bannerImage && (
            <div className="flex items-center gap-2 mt-7">
              <div className="border rounded-md flex items-center justify-center w-[140px] h-[140px] object-cover bg-gray-100 relative overflow-hidden">
                <img
                  src={`${detailValue.bannerImage}`}
                  alt="img"
                />
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default BannerDetail;
