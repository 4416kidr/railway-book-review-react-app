import axios from "axios";
import { url } from "const";

export const GetUser = (auth, token) => {
    console.log("--- this is GetUser ---");
    return axios({
      method: "get",
      url: "/users",
      baseURL: `${url}`,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log("success to get users.");
      console.log(res);
    })
    .catch((err) => {
      console.log("fail to get users");
      console.log(err);
    })
}
export const GetBooks = (token, offset) => {
  console.log("--- this is GetBooks ---");
  return axios
  .get(`${url}/books`, {
    params: {
      offset: offset,
    },
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((res) => {
    console.log("success to get book list");
    console.log(res);
  })
  .catch((err) => {
    console.log("fail to get book list");
    console.log(err);
  });
}
export const LogInWithEmailPassword = (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  return axios
    .post(`${url}/signin`, data)
    .then((res) => {
      console.log(`success to SignIn`);
      console.log(res);
    })
    .catch((err) => {
      console.log(`fail to SignIn.`);
      console.log(err);
    });
}
export const SingUpWithNameEmailPassword = (username, email, password) => {
  const data = {
    name: username,
    email: email,
    password: password,
  };
  return axios
    .post(`${url}/users`, data)
    .then((res) => {
      console.log("success to SignUp.");
      console.log(res);
    })
    .catch((err) => {
      console.log("fail to SignUp.");
      console.log(err);
    });
}
export const UploadUserIcon = (token, icon) => {
  const data = new FormData();
  data.append("icon", icon);
  return axios
    .post(`${url}/uploads`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log("success to Upload Icon.");
      console.log(res);
    })
    .catch((err) => {
      console.log("fail to Upload Icon.");
      console.log(err);
    });
}

