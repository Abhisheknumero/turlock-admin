import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Loader } from "../../utils/Loader";

function Reporters() {
  const [loading, setLoading] = useState(false);
  return (
    <section className="h-screen ">
      {loading ? <Loader /> : ""}
      <div className="xl:flex">
        <Sidebar />
        <div className="w-full z-0 h-screen overflow-auto">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-4 pb-4 flex-wrap">
              <h3 className="mb-0 text-lg font-semibold">Reporters</h3>
            </div>
            <div>
              <h3 className="text-gray-600 font-bold text-base my-3">
                Reporters Count {0}
              </h3>
              {/* {commentList?.length > 0 ? (
                <CommentTable
                  list={commentList}
                  //   deleteHandler={deleteHandler}
                />
              ) : (
                <p className="text-center text-lg font-semibold text-gray-500">
                  No Record Found
                </p>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reporters;
