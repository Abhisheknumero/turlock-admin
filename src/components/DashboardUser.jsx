function DashboardUser() {
  return (
    <div className="bg-white shadow-md rounded-lg border">
      <div className="p-3 border-b">
        <p className="mb-0 text-md font-bold text-gray-600">Users</p>
      </div>
      <div className="p-3 w-full flex items-center justify-between border-b">
        <p className="mb-0 text-center font-bold text-gray-600 text-sm w-[15%]">
          #
        </p>
        <p className="mb-0 text-center font-bold text-gray-600 text-sm w-[30%]">
          First Name
        </p>
        <p className="mb-0 text-center font-bold text-gray-600 text-sm w-[30%]">
          Last Name
        </p>
        <p className="mb-0 text-center font-bold text-gray-600 text-sm w-[25%]">
          Action
        </p>
      </div>
      <div className="p-3 w-full flex items-center justify-between border-b">
        <p className="mb-0 text-center font-semibold text-gray-600 text-sm w-[15%]">
          1
        </p>
        <p className="mb-0 text-center font-semibold text-gray-600 text-sm w-[30%]">
          Mark
        </p>
        <p className="mb-0 text-center font-semibold text-gray-600 text-sm w-[30%]">
          Otto
        </p>
        <p className="mb-0 text-center font-semibold text-gray-600 w-[25%] flex items-center justify-center">
          <p className="bg-[#94a3b854] flex items-center justify-center mb-0 w-max rounded-sm px-2 py-1 text-xs cursor-pointer">
            View
          </p>
        </p>
      </div>
    </div>
  );
}

export default DashboardUser;
