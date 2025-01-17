import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Loader } from "../../utils/Loader";
import SublyApi from "../../HelperApis";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LostPetTable from "./LostPetTable";
import DatePicker from "react-datepicker";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import AddLostPet from "./AddLostPet";

function LostPet() {
  const { token } = useSelector((state) => state.user.userdetail);
  const [loading, setLoading] = useState(false);
  const [petList, setPetList] = useState("");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    getCategory();
  }, [show]);

  async function getCategory() {
    setLoading(true);
    await SublyApi.fetchCategory(token)
      .then((response) => {
        if (response.status == "success") {
          const lostPetValue = response.data.filter(
            (ele) => ele.categoryType == "lost_pet"
          );
          getPetList(lostPetValue);
        } else {
          setLoading(false);
          toast.error(response.data.error);
        }
      })
      .catch((err) => console.log(err));
  }

  async function getPetList(lostPetValue) {
    await SublyApi.fetchPetLost(token, lostPetValue[0]._id)
      .then(async (response) => {
        setLoading(false);
        if (response.status == "success") {
          setPetList(response.data);
        } else {
          toast.dismiss();
          toast.error(response.data.error);
        }
      })
      .catch((err) => console.log(err));
  }

  // ===========================Calling API for delete post============================
  async function deleteHandle(id) {
    setLoading(true);
    await SublyApi.deletePet(token, id)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          toast.success("Lost pet deleted successfully.");
          getCategory();
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => console.log(err));
  }

  // ====================Advance search API handler===================
  async function advanceSearch() {
    setLoading(true);
    const requestData = {
      applicantName: name,
      phoneNumber: phone,
      email: email,
      startDate: startDate,
      endDate: endDate,
    };
    await SublyApi.fetchCategory(token)
      .then(async (response) => {
        if (response.status == "success") {
          const lostPetValue = response.data.filter(
            (ele) => ele.categoryType == "lost_pet"
          );
          await SublyApi.petAdvanceSearch(
            token,
            requestData,
            lostPetValue[0]?._id
          )
            .then((response) => {
              setLoading(false);
              if (response.status == "success") {
                setPetList(response.data);
              } else {
                toast.error(response.data.error);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className="h-screen ">
      {loading ? <Loader /> : ""}
      <div className="xl:flex">
        <AddLostPet
          topMargin={""}
          show={show}
          setShow={setShow}
          setLoader={setLoading}
        />
        <Sidebar />
        <div className="w-full z-0 h-screen overflow-auto">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-4 pb-4 flex-wrap">
              <h3 className="mb-0 text-lg font-semibold">Lost Pet</h3>
              <button
                onClick={() => {
                  setShow(true);
                }}
                className="w-38 text-base rounded-md px-2 py-2 relative font-medium hover:border-none border-none flex items-center gap-2 hover:text-[#D10505] createBtn"
              >
                <Icon icon="ion:add-outline" width="30" height="27" />
                Add Lost Pet
              </button>
            </div>
            <div className="mb-3">
              <h3 className="text-gray-600 font-bold text-base my-3">
                Advanced Search
              </h3>
              <div className="flex items-center gap-3 max-lg:flex-wrap">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Applicant Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-semibold"
                  />
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-semibold"
                  />
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
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
                      dateFormat={"dd/MM/YYYY"}
                      maxDate={new Date()}
                      className="placeholder:text-gray-600 placeholder:font-semibold py-1.5 px-3 border border-gray-400 w-full rounded-md bg-white focus-visible:outline-none text-gray-600 font-semibold"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      placeholderText="End Date"
                      dateFormat={"dd/MM/YYYY"}
                      maxDate={new Date()}
                      minDate={startDate}
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
                      getCategory();
                      setEmail("");
                      setPhone("");
                      setStartDate("");
                      setEndDate("");
                      setName("");
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
                Lost Pet Count {`(${petList?.length})`}
              </h3>
              {petList?.length > 0 ? (
                <LostPetTable list={petList} deleteHandle={deleteHandle} />
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

export default LostPet;
