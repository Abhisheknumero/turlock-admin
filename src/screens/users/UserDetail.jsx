import { Modal } from "react-bootstrap";
import SublyApi from "../../HelperApis";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { imgBaseURL } from "../../utils/StaticsData";

function UserDetail({ topMargin, show, setShow, id, setLoading }) {
  const { userdetail } = useSelector((state) => state.user);
  const [detailValue, setDetailValue] = useState("");
  const [imageValue, setImageValue] = useState("");

  useEffect(() => {
    if (id && show) {
      planDetailHandle();
    }
  }, [show]);

  const getInitials = (userName) => {
    const names = userName.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  async function planDetailHandle() {
    setLoading(true);
    await SublyApi.fetchUserDetail(userdetail.token, id)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          setDetailValue(response.data);
          const initials = getInitials(
            response.data?.firstName + " " + response.data?.lastName || "User"
          );
          const imgvalue = `https://ui-avatars.com/api/?name=${initials}&background=6418c330&color=fff&bold=true`; // Set fallback image
          setImageValue(imgvalue);
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
        <Modal.Title className="flex items-center gap-2">
          User Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="w-[90%] m-auto pb-3.5">
          <div className="flex items-start justify-between gap-2 flex-col">
            <div className="w-full">
              {/* {detailValue?.profileImage && ( */}
              <div className="w-[150px] h-[150px] mb-3">
                <img
                  src={
                    detailValue?.profileImage
                      ? `${detailValue?.profileImage}`
                      : imageValue
                  }
                  className="w-full h-full object-cover rounded-xl"
                  alt="profile"
                />
              </div>
              {/* )} */}
              <p className="text-black font-medium text-sm">
                <strong className="text-black text-sm">Name : </strong>
                {detailValue?.firstName} {detailValue?.lastName}
              </p>
              <p className="my-2 text-black font-medium text-sm">
                <strong className="text-black text-sm">Email : </strong>
                {detailValue?.email}
              </p>
              <p className="mt-2 text-black font-medium text-sm">
                <strong className="text-black text-sm">Phone : </strong>
                {detailValue?.phone}
              </p>
              <p className="mt-2 text-black font-medium text-sm border-b-2 pb-3">
                <strong className="text-black text-sm">Register Date : </strong>
                {moment(detailValue?.createdAt).format("MMM DD, YYYY")}
              </p>
              <h6 className="mt-2 text-lg mb-0">
                <strong>Subscription & Activity</strong>
              </h6>
              {detailValue?.subscriptionPlan && (
                <div className="flex items-center justify-between gap-2 mt-2.5">
                  <p className="text-black font-medium text-sm">
                    <strong className="text-black text-sm">Plan : </strong>
                    {detailValue?.subscriptionPlan?.planType}
                  </p>
                  <p className="text-black font-medium text-sm">
                    <strong className="text-black text-sm">Price : </strong>$
                    {detailValue?.subscriptionPlan?.price}
                  </p>
                </div>
              )}
              <p className="text-black font-medium text-sm mt-2">
                <strong className="text-black text-sm">Last Comment : </strong>
                {detailValue?.subscriptionPlan?.price}
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default UserDetail;
