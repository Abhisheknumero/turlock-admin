import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Loader } from "../../utils/Loader";
import SublyApi from "../../HelperApis";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import CommentTable from "./CommentTable";
import DatePicker from "react-datepicker";

function CommentList() {
  const { token } = useSelector((state) => state.user.userdetail);
  const [loading, setLoading] = useState(false);
  const [commentList, setCommentList] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");

  //   =-====================Calling API for fetching comment list========================
  useEffect(() => {
    getComments();
  }, []);
  async function getComments() {
    setLoading(true);
    await SublyApi.fetchCommentList(token)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          setCommentList(response.data);
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => console.log(err));
  }

  //   ====================Delete category API=============================
  async function deleteHandler(id) {
    await SublyApi.deleteComment(token, id)
      .then((res) => {
        if (res.status == "success") {
          toast.success("Comment deleted successfully.");
          getComments();
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ====================Advance search API handler===================
  async function advanceSearch() {
    setLoading(true);
    const requestData = {
      comment: comment,
      userName: author,
      startDate: startDate,
      endDate: endDate,
    };
    await SublyApi.commentAdvanceSearch(token, requestData)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          setCommentList(response.data);
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="h-screen ">
      {loading ? <Loader /> : ""}
      <div className="xl:flex">
        <Sidebar />
        <div className="w-full z-0 h-screen overflow-auto">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-4 pb-4 flex-wrap">
              <h3 className="mb-0 text-lg font-semibold">Comments</h3>
            </div>
            <div className="mb-3">
              <h3 className="text-gray-600 font-bold text-base mb-3">
                Advanced Search
              </h3>
              <div className="flex items-center gap-3 max-lg:flex-wrap">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Comment"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-semibold"
                  />
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => {
                      setAuthor(e.target.value);
                    }}
                    className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-semibold"
                  />
                </div>
                <div className="flex items-center gap-3 w-full">
                  {" "}
                  <div>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      placeholderText="Start Date"
                      maxDate={new Date()}
                      dateFormat={"dd/MM/YYYY"}
                      className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-semibold"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      placeholderText="End Date"
                      maxDate={new Date()}
                      minDate={startDate}
                      dateFormat={"dd/MM/YYYY"}
                      className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-semibold overflow-hidden"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      advanceSearch();
                    }}
                    className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none"
                  >
                    Search
                  </button>
                  <button
                    onClick={() => {
                      setAuthor("");
                      setStartDate("");
                      setEndDate("");
                      setComment("");
                      getComments();
                    }}
                    className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none"
                  >
                    Show All
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-gray-600 font-bold text-base my-3">
                Comment Count {`(${commentList?.length})`}
              </h3>
              {commentList?.length > 0 ? (
                <CommentTable
                  list={commentList}
                  deleteHandler={deleteHandler}
                />
              ) : (
                <p className="text-center text-lg font-semibold text-gray-500">
                  No Record Found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommentList;
