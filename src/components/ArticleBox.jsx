import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

function ArticleBox({ recentArticle }) {
  return (
    <div className="bg-white shadow-md rounded-lg border">
      <div className="px-3 pt-3 border-b flex items-center justify-between">
        <p className="mb-0 text-md font-bold text-gray-600 pb-3">
          Recent Articles
        </p>
        {/* <p className="mb-0 text-md font-normal text-[#6418C3] border-b-2 border-[#6418C3] w-[10%] text-center pb-3">
          All
        </p> */}
      </div>
      <div className="pb-3 max-h-[350px] overflow-auto">
        {" "}
        {/* <div className="flex items-center justify-between gap-2 px-3 pt-3">
          <Icon
            icon="gg:arrow-down-o"
            width="20"
            height="20"
            style={{ color: "#6418C3" }}
            className="w-[10%]"
          />
          <div className="w-[40%]">
            <p className="mb-0 font-semibold text-gray-600 text-sm">
              Technologies
            </p>
            <p className="mb-0 text-xs font-normal text-gray-600">
              Since Last Week
            </p>
          </div>
          <div className="w-[30%]">
            <p className="mb-0 font-semibold text-gray-600 text-sm">70K</p>
            <p className="mb-0 text-xs font-normal text-gray-600">Views</p>
          </div>
          <p className="bg-[#94a3b854] flex items-center justify-center mb-0 w-max rounded-sm px-2 py-1 text-xs cursor-pointer">
            View
          </p>
        </div> */}
        {recentArticle?.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-2 px-3 pt-2"
          >
            <Icon
              icon="gg:arrow-up-o"
              width="20"
              height="20"
              style={{ color: "#009678" }}
              className="w-[10%]"
            />
            <div className="w-[40%]">
              <p className="mb-0 font-semibold text-gray-600 text-sm">
                {item?.postType}
              </p>
              {/* <p className="mb-0 text-xs font-normal text-gray-600">
                Since Last Week
              </p> */}
            </div>
            <div className="w-[30%]">
              <p className="mb-0 font-semibold text-gray-600 text-sm">
                {item?.postViews?.length}
              </p>
              <p className="mb-0 text-xs font-normal text-gray-600">Views</p>
            </div>
            <p className="bg-[#94a3b854] flex items-center justify-center mb-0 w-max rounded-sm px-2 py-1 text-xs cursor-pointer">
              View
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleBox;
