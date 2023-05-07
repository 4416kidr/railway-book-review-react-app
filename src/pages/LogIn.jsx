import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import "./LogIn.scss";

export const LogIn = () => {
  let navigate = useNavigate();
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  const { handleChange, handleSubmit, values, errors} =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        console.log(values);
      },
      validationSchema: schema,
    });
  return (
    <>
      <h1>This is Log In Page</h1>
      <button
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        to dashboard
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
    </>
  );
};
