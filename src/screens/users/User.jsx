import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Loader } from "../../utils/Loader";
import SublyApi from "../../HelperApis";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import UserTable from "./UserTable";
import UserDetail from "./UserDetail";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

function User() {
  const { token } = useSelector((state) => state.user.userdetail);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const [userValue, setUserValue] = useState("");

  const getInitials = (userName) => {
    const names = userName.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  useEffect(() => {
    getUserList();
  }, []);
  async function getUserList() {
    setLoading(true);
    await SublyApi.fetchUserList(token)
      .then(async (response) => {
        setLoading(false);
        if (response.status == "success") {
          response.data.users.map((val, index) => {
            const initials = getInitials(val?.firstName);
            const imgvalue = `https://ui-avatars.com/api/?name=${initials}&background=6418c3b8&color=fff&bold=true`; // Set fallback image
            response.data.users[index] = {
              ...response.data.users[index],
              imgValue: imgvalue,
            };
          });
          setUserList(response.data.users);
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
    await SublyApi.deleteUser(token, id)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          toast.success("User deleted successfully.");
          getUserList();
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((err) => console.log(err));
  }

  // ====================Advance search API handler===================
  async function advanceSearch() {
    if (name) {
      setLoading(true);
      const requestData = {
        firstName: name,
        lastName: lastName,
        email: email,
        phone: phone,
      };
      await SublyApi.userAdvanceSearch(token, requestData)
        .then((response) => {
          setLoading(false);
          if (response.status == "success") {
            response.data.map((val, index) => {
              const initials = getInitials(val?.firstName);
              const imgvalue = `https://ui-avatars.com/api/?name=${initials}&background=6418c3b8&color=fff&bold=true`; // Set fallback image
              response.data[index] = {
                ...response.data[index],
                imgValue: imgvalue,
              };
            });
            setUserList(response.data);
          } else {
            toast.error(response.data.error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getUserList();
    }
  }

  return (
    <section className="h-screen ">
      <UserDetail
        topMargin={"marginClass"}
        show={show}
        setShow={setShow}
        id={userValue._id}
        setLoading={setLoading}
      />
      {loading ? <Loader /> : ""}
      <div className="xl:flex">
        <Sidebar />
        <div className="w-full z-0 h-screen overflow-auto">
          <Header />
          <div className="px-9 max-xl:px-2">
            {/* <div className="flex items-center justify-between pt-4 pb-4 flex-wrap">
              <h3 className="mb-0 text-lg font-semibold">Users</h3>
            </div>
            <div className="mb-3">
              <h3 className="text-gray-600 font-bold text-base my-3">
                Advanced Search
              </h3>
              <div className="flex items-center gap-3 max-lg:flex-wrap">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="First Name"
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
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
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
                      getUserList();
                      setName("");
                      setEmail("");
                      setPhone("");
                      setLastName("");
                    }}
                    className="w-28 text-sm rounded-md px-2 py-2 buttonClass relative font-medium hover:border-none"
                  >
                    Show All
                  </button>
                </div>
              </div>
            </div> */}
            <div className="flex items-center justify-between pt-4 pb-4 flex-wrap border-b-2">
              <h3 className="mb-0 text-lg font-semibold">User</h3>
              <div className="flex items-center gap-x-3 gap-y-2 flex-wrap">
                <div className="w-[300px]">
                  <label className="bg-white w-full rounded-lg flex items-center gap-1 py-2 pr-2 pl-3 shadow-2xl">
                    <input
                      type="text"
                      placeholder="Search Here"
                      className="bg-transparent w-full h-full focus-visible:outline-none"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <Icon
                      icon="stash:search"
                      width="25"
                      height="25"
                      style={{ color: "#6418C3", cursor: "pointer" }}
                      onClick={() => {
                        advanceSearch();
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-gray-600 font-bold text-base my-3">
                Users Count {`(${userList?.length})`}
              </h3>
              {userList?.length > 0 ? (
                <UserTable
                  list={userList}
                  deleteHandle={deleteHandle}
                  setShow={setShow}
                  setUserValue={setUserValue}
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

export default User;
