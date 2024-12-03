import { ToastContainer } from "react-toastify";
import "./App.css";
import Router from "./Router";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router />
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
