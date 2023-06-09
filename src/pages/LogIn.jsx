import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { url } from "../const";
import "./LogIn.scss";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { signIn } from "../authSlice";

export const LogIn = () => {
  let navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [submitResult, setSubmitResult] = useState("nothing");
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [cookies, setCookies, removeCookie] = useCookies();
  let firstPhrase = "please login first";
  if (auth) {
    firstPhrase = "you're already login";
  }
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const data = {
        email: values.email,
        password: values.password,
      };
      axios
        .post(`${url}/signin`, data)
        .then((res) => {
          console.log(`success to SignIn`);
          setToken(res.data.token);
          setCookies("token", res.data.token);
          dispatch(signIn());
          console.log(res.data.token);
          navigate("/main", {
            token: res.data.token,
          });
        })
        .catch((err) => {
          console.log(`fail to SignIn.`);
          console.log(err);
          setSubmitResult("fail to SignIn");
        });
    },
    validationSchema: schema,
  });
  return (
    <>
      <h1>This is Log In Page</h1>
      <p className="please-login">{firstPhrase}</p>
      <button
        onClick={() => {
          navigate("/main");
        }}
      >
        to main
      </button>
      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        to signup
      </button>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="e-mail"
            required
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <div className="form-errors">{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            required
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="form-errors">{errors.password}</div>
          )}
        </div>
        <input type="submit" value={"LogIn"} />
      </form>
      <p className="submit-result">Submit result: {submitResult}</p>
    </>
  );
};
