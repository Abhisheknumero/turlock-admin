import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Loader } from "../../utils/Loader";
import Header from "../../components/Header";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import CreateForumModal from "./CreateForumModal";

function Forum() {
  const [loading, setLoading] = useState(false);
  const [forumList, setForumList] = useState("");
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  return (
    <section className="h-screen ">
      <CreateForumModal show={show} setShow={setShow} />
      {loading ? <Loader /> : ""}
      <div className="xl:flex">
        <Sidebar />
        <div className="w-full z-0 h-screen overflow-auto">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-4 pb-4 flex-wrap border-b-2">
              <h3 className="mb-0 text-lg font-semibold">Forum</h3>
              <div className="flex items-center gap-x-3 gap-y-2 flex-wrap">
                <div className="w-[300px]">
                  <label className="bg-white w-full rounded-lg flex items-center gap-1 py-2 pr-2 pl-3 shadow-2xl">
                    <input
                      type="text"
                      placeholder="Search Here"
                      className="bg-transparent w-full h-full focus-visible:outline-none"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                    <Icon
                      icon="stash:search"
                      width="25"
                      height="25"
                      style={{ color: "#6418C3", cursor: "pointer" }}
                      //   onClick={() => {
                      //     advanceSearch();
                      //   }}
                    />
                  </label>
                </div>
                <button
                  onClick={() => {
                    setShow(true);
                  }}
                  className={`${"bg-[#6418C3] text-white"} ${"w-[160px] text-base rounded-md px-2 py-2 font-medium hover:border-[#6418C3] flex items-center justify-center gap-2"}`}
                >
                  <Icon icon="mdi:forum-plus-outline" width="25" height="25" />
                  Add Forum
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-gray-600 font-bold text-base my-3">
                Forum Count {`(${forumList?.length})`}
              </h3>
              {/* {forumList?.length > 0 ? (
                <ForumTable
                  list={forumList}
                  //   deleteHandle={deleteHandle}
                  //   setShow={setShow}
                  //   setUserValue={setUserValue}
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

export default Forum;
