function ArticleBox() {
  return (
    <div className="bg-white shadow-md rounded-lg border">
      <div className="px-3 pt-3 border-b flex items-center justify-between">
        <p className="mb-0 text-md font-bold text-gray-600 pb-3">Recent Articles</p>
        <p className="mb-0 text-md font-normal text-[#D10505] border-b border-[#D10505] w-[10%] text-center pb-3">All</p>
      </div>
    </div>
  );
}

export default ArticleBox;
