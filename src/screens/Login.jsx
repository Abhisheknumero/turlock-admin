import { useNavigate } from "react-router-dom";
import "../assets/CommonStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { userLogin } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { Loader } from "../utils/Loader";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // function for handling Signup APi and fields handling
  const handleLogin = async (e) => {
    e.preventDefault();
    const emailCheck = email.match(
      "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}"
    );
    if (email && password) {
      if (emailCheck) {
        const requestedData = {
          email: email,
          password: password,
        };
        await dispatch(userLogin(requestedData))
          .then((responseJson) => {
            const response = responseJson.payload;
            if (response.status == "success") {
              toast.success(response.status);
              navigate("/Dashboard");
            } else {
              toast.error(response.data.error);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setErrorMessage({
          ...errorMessage,
          email: "Please enter valid email",
        });
      }
      // Redirect to home page after login
    } else {
      setErrorMessage({
        ...errorMessage,
        password: !password ? "Password field is required" : "",
        email: !email
          ? "Email field is required"
          : !emailCheck
          ? "Please enter valid email"
          : "",
      });
    }
  };


  return (
    <section className="w-full relative">
      {loading ? <Loader /> : ""}
      <div class="background">
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
      </div>
      <div className="h-screen absolute flex items-center justify-center px-28 max-lg:px-5 w-full top-0">
        <div className="w-[40%] max-lg:w-[90%]">
          {" "}
          {/* <h3 className="text-center text-white pb-10">TurlockCityNewsAdmin Panel</h3> */}
          <form
            style={styles.form}
            className="w-full px-8 py-7"
            onSubmit={handleLogin}
          >
            <div className="my-3">
              <h2 className="text-center font-bold mb-0">Welcome Back!</h2>
              <p className="flex text-xl justify-center font-semibold">
                Login to continue to Admin Panel.
              </p>
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage({
                    ...errorMessage,
                    email: "",
                  });
                }}
                className="text-black border border-black rounded-md px-2 py-2 w-full"
              />
              <p className="mb-1 text-sm text-red-600">{errorMessage?.email}</p>
            </div>
            <div className="mt-2">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage({
                    ...errorMessage,
                    password: "",
                  });
                }}
                placeholder="Enter your password"
                className="text-black border border-black rounded-md px-2 py-2 w-full"
              />
              <p className="mb-1 text-sm text-red-600">
                {errorMessage?.password}
              </p>
            </div>
            <p className="text-[#D10505] cursor-pointer font-medium text-sm text-end m-2">
              Forget password
            </p>
            <button
              type="submit"
              className="bg-[#D10505] text-white text-lg font-semibold py-2 px-3 rounded-3xl my-3"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    boxShadow: "15px 15px 15px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
  },
};

export default Login;
