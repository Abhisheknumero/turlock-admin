import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

function RecentTransaction({ transaction }) {
  return (
    <div className="bg-white shadow-md rounded-lg border">
      <div className="p-3 border-b">
        <p className="mb-0 text-md font-bold text-gray-600">
          Recent Transaction
        </p>
      </div>
      <div className="p-3 w-full flex items-center justify-between border-b">
        <p className="mb-0 text-center font-bold text-gray-600 text-sm w-[15%]">
          #
        </p>
        <p className="mb-0 text-center font-bold text-gray-600 text-sm w-[30%]">
          Amount
        </p>
        <p className="mb-0 text-center font-bold text-gray-600 text-sm w-[30%]">
          Currency
        </p>
        <p className="mb-0 text-center font-bold text-gray-600 text-sm w-[25%]">
          Method
        </p>
      </div>
      <div className=" max-h-[300px] overflow-auto">
        {transaction?.map((item, index) => (
          <div
            key={index}
            className="px-3 py-2 w-full flex items-center justify-between border-b"
          >
            <p className="mb-0 text-center font-semibold text-gray-600 text-sm w-[15%]">
              {index + 1}
            </p>
            <p className="mb-0 text-center font-semibold text-gray-600 text-sm w-[30%]">
              {item?.amount}
            </p>
            <p className="mb-0 text-center font-semibold text-gray-600 text-sm w-[30%]">
              {item?.currency.toUpperCase()}
            </p>
            <p className="mb-0 text-center font-semibold text-gray-600 text-sm w-[30%]">
              {item?.paymentMethod}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTransaction;
