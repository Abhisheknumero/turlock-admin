import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import SublyApi from "../../HelperApis";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function CommentDetail({ topMargin, show, setShow, detailValue }) {
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
          Comment Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="w-[90%] m-auto pb-3.5">
          <div className="flex items-start justify-between gap-2 flex-col">
            <div className="w-full">
              <p className="text-black font-medium text-sm">
                <strong className="text-black text-sm">User Name : </strong>
                {detailValue?.userId?.firstName} {detailValue?.userId?.lastName}
              </p>
              <p className="my-2 text-black font-medium text-sm">
                <strong className="text-black text-sm">User Email : </strong>
                {detailValue?.userId?.email}
              </p>
              <p className="mt-2 text-black font-medium text-sm">
                <strong className="text-black text-sm">Date : </strong>
                {moment(detailValue?.createdAt).format("MMM DD, YYYY")}
              </p>
              <p className="mt-2 text-black font-medium text-sm pb-2.5">
                <strong className="text-black text-sm">Comment : </strong>
                {detailValue?.commentText}
              </p>
              <div className="border-t pt-2.5">
                <p className="mt-0 text-black font-medium text-sm">
                  <strong className="text-black text-sm">Post Type : </strong>
                  {detailValue?.postId?.postType}
                </p>
                <p className="mt-2 text-black font-medium text-sm">
                  <strong className="text-black text-sm">Post Title : </strong>
                  {detailValue?.postId?.postTitle}
                </p>
              </div>
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

export default CommentDetail;
