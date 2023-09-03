import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import axios from "axios";

function Login() {
  const INITIAL_LOGIN_OBJ = {
    password: "",
    emailId: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (loginObj.emailId.trim() === "")
      return setErrorMessage("Email Id is required! (use any value)");
    if (loginObj.password.trim() === "")
      return setErrorMessage("Password is required! (use any value)");
    else {
      setLoading(true);
      try {
        const data = {
          nik: loginObj.emailId.trim(),
          password: loginObj.password.trim(),
        };
        const response = await axios.post(
          "/APIHaloKominfoInternal/api/Login",
          data
        );

        localStorage.setItem("token", response.data.data.token);
        setLoading(false);
        window.location.href = "/app/welcome";
      } catch (err) {
        setLoading(false);
        if (!err?.response) {
          return setErrorMessage("No Server Response");
        } else {
          return setErrorMessage("NIK atau password anda salah");
        }
      }
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-violet-700 flex items-center">
      <div className="card mx-auto w-full max-w-sm  shadow-xl bg-slate-600">
        <div className="py-11 px-5">
          <img src="/logo.png" className="w-1/2 mx-auto" alt="logo" />

          <h2 className="text-2xl font-semibold mb-2 text-center">
            Login Halo Kominfo
          </h2>
          <form onSubmit={(e) => submitForm(e)}>
            <div className="mb-4">
              <InputText
                type="emailId"
                defaultValue={loginObj.emailId}
                updateType="emailId"
                containerStyle="mt-4"
                labelTitle="NIK"
                updateFormValue={updateFormValue}
              />

              <InputText
                defaultValue={loginObj.password}
                type="password"
                updateType="password"
                containerStyle="mt-4"
                labelTitle="Password"
                updateFormValue={updateFormValue}
              />
            </div>
            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
            <button
              type="submit"
              className={
                "btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
              }
            >
              Login
            </button>

            {/* <div className="text-center mt-4">
              Don't have an account yet?{" "}
              <Link to="/register">
                <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                  Register
                </span>
              </Link>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
