// import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { url } from "../const";
import Compressor from "compressorjs";
import { useFormik } from "formik";
import "./SignUp.scss";

export const SignUp = () => {
  const [iconThumb, setIconThumb] = useState(null);
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "入力が必須の項目です。";
    }

    if (!values.email) {
      errors.email = "入力が必須の項目です。";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "正しいメールアドレスの形式ではありません。";
    }

    if (!values.password) {
      errors.password = "入力が必須の項目です。";
    }

    if (!values.passwordConfirm) {
      errors.passwordConfirm = "入力が必須の項目です。";
    } else if (values.password !== values.passwordConfirm) {
      errors.passwordConfirm = "パスワードが一致しません。";
    }
    return errors;
  };
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
      validate,
    });

  // console.log(errors);

  let navigate = useNavigate();
  // const onSignUp = () => {
  //   const data = {
  //     name: name,
  //     email: email,
  //     password: password,
  //   };

  //   axios.post(`${url}/users`, data).then((res) => {
  //     const token = res.data.token;
  //     navigate("/");
  //   });
  // };

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
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setIconThumb(reader.result);
        };
        console.log(result);
        console.log(result.name);
      },
      error(err) {
        console.log(err.meassage);
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
            value={values.icon}
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
      <img className="icon-preview" src={iconThumb} alt={values.icon} />
    </>
  );
};
