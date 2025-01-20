import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import SublyApi from "../../HelperApis";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function PlanDetail({ topMargin, show, setShow, setLoading, planId }) {
  const { userdetail } = useSelector((state) => state.user);
  const [detailValue, setDetailValue] = useState("");

  useEffect(() => {
    if (planId && show) {
      planDetailHandle();
    }
  }, [show]);

  async function planDetailHandle() {
    setLoading(true);
    await SublyApi.fetchPlanDetail(userdetail.token, planId)
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
        <Modal.Title className="flex items-center gap-2">
          Plan Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="w-[90%] m-auto pb-3.5">
          <div className="flex items-start justify-between gap-2 flex-col">
            <div className="w-full">
              <div className="flex items-center justify-between gap-2 my-2">
                <p className="text-black font-medium">
                  <strong className="text-black text-sm">Plan Type : </strong>
                  {detailValue?.subscriptionDetails?.planType}
                </p>
                <p className="text-black font-medium">
                  <strong className="text-black text-sm">
                    Total Buyers :{" "}
                  </strong>
                  {detailValue?.subscriberCount}
                </p>
              </div>
              <p className="my-2 text-black font-medium">
                <strong className="text-black text-sm">Start Date : </strong>
                {moment(detailValue?.subscriptionDetails?.startDate).format(
                  "MMM DD, YYYY"
                )}
              </p>
              <p className="mt-2 text-black font-medium">
                <strong className="text-black text-sm">Price : </strong>$
                {detailValue?.subscriptionDetails?.price}
              </p>
              <p className="mt-2 text-black font-medium">
                <strong className="text-black text-sm">Monthly Price : </strong>
                ${detailValue?.subscriptionDetails?.monthlyPrice}
              </p>
            </div>
            <div className="w-full">
              <p className="mt-2 text-black font-medium">
                <strong className="text-black text-base">Features : </strong>
              </p>
              <div className="ml-3">
                {detailValue?.subscriptionDetails?.features?.map(
                  (item, index) => (
                    <p
                      key={index}
                      className="text-black font-medium flex items-center gap-0.5"
                    >
                      <Icon
                        icon="radix-icons:dot-filled"
                        width="20"
                        height="20"
                        style={{ color: "black" }}
                      />
                      {item}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PlanDetail;
