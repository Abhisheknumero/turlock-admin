import { useNavigate } from "react-router-dom";
import "../assets/CommonStyle.css";

function Login() {
  const navigate = useNavigate();
  return (
    <section className="w-full relative">
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
          <form style={styles.form} className="w-full px-8 py-7">
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
                className="text-black border border-black rounded-md px-2 py-2 w-full"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="text-black border border-black rounded-md px-2 py-2 w-full"
              />
            </div>
            <p className="text-[#D10505] cursor-pointer font-medium text-sm text-end m-2">
              Forget password
            </p>
            <button
              type="button"
              onClick={() => {
                navigate("/Dashboard");
              }}
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
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
  },
};

export default Login;
