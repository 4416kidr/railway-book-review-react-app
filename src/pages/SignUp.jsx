// import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { url } from "../const";
import Compressor from "compressorjs";
import { useFormik } from "formik";
import * as yup from 'yup';
import "./SignUp.scss";

export const SignUp = () => {
  const [iconThumb, setIconThumb] = useState(null);
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
        t_e_s_t: "",
      },
      onSubmit: (values) => {
        console.log(values);
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
        to login
      </button>
      <form>
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
        <input type="submit" value={"submit"} />
      </form>
      <div>
        <p>icon preview</p>
        <img className="icon-preview" src={iconThumb} alt={values.icon} />
      </div>
    </>
  );
};
