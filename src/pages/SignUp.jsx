// import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import {url} from "../const.js";
import "./SignUp.scss";

export const SignUp = () => {
  const [iconThumb, setIconThumb] = useState(null);
  const [token, setToken] = useState(null);
  const [submitResult, setSubmitResult] = useState('nothing');
  let navigate = useNavigate();
  const schema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    icon: yup.mixed().required().test('fileFormat', 'only png & jpg', (value) => {
      console.log(value); return value && ['image/jpg', 'image/png'].includes(value.type);
    }),
    password: yup.string().required(),
    passwordConfirm: yup.string().required(),
  })
  const { handleChange, handleSubmit, values, errors, setFieldValue } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        icon: "",
        password: "",
        passwordConfirm: "",
      },
      onSubmit: (values) => {
        const data = {
          name: values.username,
          email: values.email,
          password: values.password
        }
        axios
          .post(`${url}/users`, data)
          .then((res) => {
            console.log(`success to SingUp. ${res}`);
            setToken(res.data.token);
            navigate("/dashboard")
          })
          .catch((err) => {
            console.log(`fail to SignUp. ${err}`);
            setSubmitResult('fail to SignUp');
          });
      },
      validationSchema: schema,
    });

  const handleIconChange = (e) => {
    const icon = e.target.value;
    console.log(icon);

    const file = e.target.files[0];
    if (!file) {
      return;
    }

    new Compressor(file, {
      convertSize: 1000000,
      success(result) {
        console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setIconThumb(reader.result);
        };
        setFieldValue('icon', file);
        console.log(result);
        console.log(result.name);
      },
      error(err) {
        console.log(err.message);
      },
    });
  };
  return (
    <>
      <h1>This is Sign Up</h1>
      <button
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        to dashboard
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
      <p className="submit-result">Submit result: {submitResult}</p>
    </>
  );
};