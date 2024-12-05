import { Modal } from "react-bootstrap";
import SublyApi from "../HelperApis";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { ToCapitalize } from "../utils/CustomMethod";
import { imgBaseURL } from "../utils/StaticsData";

function CategoryDetail({ show, setShow, topMargin, id, setLoading }) {
  const { token } = useSelector((state) => state.user.userdetail);
  const [detailValue, setDetailValue] = useState("");

  //   ==================Fetch category detail API=========================
  async function fetchDetailHandle() {
    setLoading(true);
    await SublyApi.detailCategory(token, id).then((response) => {
      setLoading(false);
      if (response.status == "success") {
        setDetailValue(response.data);
      } else {
        toast.error(response.data.error);
      }
    });
  }
  useEffect(() => {
    fetchDetailHandle();
  }, [show]);

  console.log(detailValue);

  return (
    <section>
      <Modal
        className={`${topMargin} widthClass`}
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="flex items-center gap-2">
            Category Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-2 w-[90%] m-auto">
            <div className="border-b pb-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="mb-0 text-lg font-semibold">
                  Category Name :
                  <span className="text-base font-semibold">
                    {" "}
                    {detailValue?.categoryName}
                  </span>
                </p>
                <p className="mb-0 text-lg font-semibold">
                  Status :
                  <span className="text-base font-semibold">
                    {" "}
                    {ToCapitalize(detailValue?.categoryStatus)}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between gap-2 my-2 flex-wrap">
                <p className="mb-0 text-lg font-semibold">
                  Date :{" "}
                  <span className="text-base font-semibold">{`${moment(
                    new Date(detailValue?.createdAt)
                  ).format("MMM DD, YYYY")}`}</span>
                </p>
                <p className="mb-0 text-lg font-semibold">
                  Category Type :
                  <span className="text-base font-semibold">
                    {" "}
                    {detailValue?.categoryType}
                  </span>
                </p>
              </div>
              <p className="mt-2.5 text-lg font-semibold mb-2">
                Description :
                <span className="text-base font-semibold">
                  {" "}
                  {detailValue?.categoryDescription}
                </span>
              </p>
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

export default CategoryDetail;
