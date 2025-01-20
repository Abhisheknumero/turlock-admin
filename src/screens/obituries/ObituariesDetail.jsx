import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import SublyApi from "../../HelperApis";
import { useSelector } from "react-redux";
import { imgBaseURL } from "../../utils/StaticsData";

function ObituariesDetail({ topMargin, show, setShow, id, setLoading }) {
  const { userdetail } = useSelector((state) => state.user);
  const [detailValue, setDetailValue] = useState("");

  useEffect(() => {
    if (show) {
      obituariesDetail();
    }
  }, [show]);

  async function obituariesDetail() {
    setLoading(true);
    await SublyApi.fetchPetDetail(userdetail.token, id)
      .then((response) => {
        console.log(response);
        setLoading(false);
        if (response.status == "success") {
          setDetailValue(response.data);
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Modal
      className={`${topMargin}`}
      show={show}
      onHide={() => {
        setShow(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="flex items-center gap-2">Lost Pet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="w-[90%] m-auto pb-3.5">
          <div className="flex items-start justify-between gap-2 flex-col">
            <div className="w-full">
              <p className="text-black font-medium text-sm">
                <strong className="text-black text-sm">
                  Applicant Name :{" "}
                </strong>
                {detailValue?.applicantName}
              </p>
              <p className="my-2 text-black font-medium text-sm">
                <strong className="text-black text-sm">Email : </strong>
                {detailValue?.email}
              </p>
              <p className="mt-2 text-black font-medium text-sm">
                <strong className="text-black text-sm">Phone : </strong>
                {detailValue?.phoneNumber}
              </p>
              <p className="mt-2 text-black font-medium text-sm">
                <strong className="text-black text-sm">Date : </strong>
                {moment(detailValue?.createdAt).format("MMM DD, YYYY")}
              </p>
              <p className="mt-2 text-black font-medium text-sm">
                <strong className="text-black text-sm">Content : </strong>
                <span
                  dangerouslySetInnerHTML={{
                    __html: detailValue?.postContent,
                  }}
                  className="text-sm font-semibold !text-wrap"
                />{" "}
              </p>
            </div>
            <div className="w-full">
              {detailValue.postMedia && (
                <div className="flex items-center gap-2 mt-4">
                  <div className="border rounded-md flex items-center justify-center w-[140px] h-[140px] object-cover bg-gray-100 relative overflow-hidden">
                    <img
                      src={`${imgBaseURL}${detailValue.postMedia}`}
                      alt="img"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ObituariesDetail;
