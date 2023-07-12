import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { signIn } from "authSlice.js";
import "./SignUp.scss";
import { SingUpWithNameEmailPassword, UploadUserIcon } from "components/Api.jsx";

export const SignUp = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isSignIn);
  const [iconThumb, setIconThumb] = useState(null);
  const [submitResult, setSubmitResult] = useState("nothing");
  const [redirectDelaySecond, setRedirectDelaySecond] = useState(0);
  const [cookies, setCookies, removeCookie] = useCookies();

  const schema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    icon: yup
      .mixed()
      .required()
      .test("fileFormat", "only png & jpg", (value) => {
        return (
          value && ["image/jpg", "image/png", "image/jpeg"].includes(value.type)
        );
      }),
    password: yup.string().required(),
    passwordConfirm: yup.string().required(),
  });
  const UploadIcon = async (token) => {
    const res = await UploadUserIcon(token, values.icon);
    if (res.status !== 200) {
      setSubmitResult("fail to Upload Icon");
    } else {
      setSubmitResult("success to Upload Icon");
      setCookies("token", token);
      dispatch(signIn());
      navigate("/main");
    }
  };

  const { handleChange, handleSubmit, values, errors, setFieldValue } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        icon: "",
        password: "",
        passwordConfirm: "",
      },
      onSubmit: async (values) => {
        const res = await SingUpWithNameEmailPassword(values.username, values.email, values.password)
        if (res.status !== 200) {
          setSubmitResult("fail to SingUp");
        } else {
          setSubmitResult("success to SingUp");
          UploadIcon(res.data.token);
        }
      },
      validationSchema: schema,
    });

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    new Compressor(file, {
      convertSize: 1000000,
      success(result) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setIconThumb(reader.result);
        };
        setFieldValue("icon", file);
        console.log(result);
      },
      error(err) {
        console.log(err);
      },
    });
  };
  useEffect(() => {
    if (redirectDelaySecond > 0) {
      setInterval(() => {
        setRedirectDelaySecond(redirectDelaySecond - 1);
      }, 1000);
    }
  }, [redirectDelaySecond]);

  if (auth) {
    if (redirectDelaySecond <= 0) {
      setRedirectDelaySecond(5);
    }
    setTimeout(() => {
      navigate("/main");
    }, 5000);
    return (
      <>
        <h1>This is Sing Up Page</h1>
        <p>You are already Log In</p>
        <p>
          You will be redirected to Main Page after {redirectDelaySecond}{" "}
          seconds.
        </p>
      </>
    );
  }
  return (
    <>
      <h1>This is Sign Up</h1>
      <button
        onClick={() => {
          navigate("/main");
        }}
      >
        to main
      </button>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        to logIn
      </button>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">User Name</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="UserName"
            required
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && (
            <div className="form-errors">{errors.username}</div>
          )}
        </div>
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
          <label htmlFor="icon">Icon</label>
          <input
            id="icon"
            type="file"
            accept=".jpg,.png"
            name="icon"
            required
            onChange={handleIconChange}
          />
          {errors.icon && <div className="form-errors">{errors.icon}</div>}
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
        <div>
          <label htmlFor="passwordConfirm">Password Confirm</label>
          <input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            placeholder="passwordConfirm"
            required
            value={values.passwordConfirm}
            onChange={handleChange}
          />
          {errors.passwordConfirm && (
            <div className="form-errors">{errors.passwordConfirm}</div>
          )}
        </div>
        <input type="submit" value={"SignUp"} />
      </form>
      <div>
        <p>icon preview</p>
        <img className="icon-preview" src={iconThumb} alt={values.icon} />
      </div>
      <div className="request-result">
        <p className="submit-result">Submit result: {submitResult}</p>
        <p className="get-user-result">Submit result: {submitResult}</p>
      </div>
    </>
  );
};
