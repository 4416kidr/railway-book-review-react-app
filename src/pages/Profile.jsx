import { useEffect, useState } from "react";
import { RawGetBooks } from "components/Api";
import { useCookies } from "react-cookie";
import { Header } from "components/Header";
import { useFormik } from "formik";
import * as yup from "yup";
import { UpdateUser, useGetUserName } from "components/Api";
import { Link, useNavigate } from "react-router-dom";

export const Profile = () => {
  const [cookies, setCookies, removeCookie] = useCookies();
  const navigate = useNavigate();
  const redirectTime = 2;
  const [submitResult, setSubmitResult] = useState("editing");
  const {username, iconUrl, getUserName} = useGetUserName();
  const schema = yup.object({
    username: yup.string().required(),
  })
  const {handleChange, handleSubmit, values, errors, setFieldValue} = 
    useFormik({
      initialValues: {
        username: "", 
        iconUrl: "", 
      }, 
      onSubmit: async (values) => {
        console.log("submitting...")
        const res = await UpdateUser(cookies.token, values.username);
        if (res.status === 200) {
          console.log("success to change");
          setSubmitResult("success to change");
          setTimeout(() => {
            navigate('/main');
          }, redirectTime*1000);
        } else {
          console.log("fail to change");
          setSubmitResult("fail to change");
        }
      },
      validationSchema: schema,
  });
  const updateUserData = (token) => {
    getUserName(token);
    setFieldValue("username", username);
    setFieldValue("iconUrl", iconUrl);
  }
  useEffect(() => {
    updateUserData(cookies.token);
  }, [username])


  if (cookies.token == null) {
    return (
    <>
      <h1>You are not login</h1>
      <Link to="/">Home</Link>
    </>);
  }
  else {
    return (
    <>
      <header>
        <Header></Header>
      </header>
      <p>{submitResult}</p>
      <h1>This is Profile Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">User Name</label>
          <input
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
        </div>
        <div>
          {values.iconUrl==null ? 
            <p>no imgage</p>
            :
            <img src={values.iconUrl} alt="user icon"/>}
        </div>
        <input type="submit" value="Change User Name"/>
      </form>
    </>
    );
  }
};
