import axios from "axios";
import { url } from "const";
import { useState, useCallback } from "react";

export const GetUser = async (token) => {
  try {
    console.log("--- this is GetUser ---");
    console.log(token);
    const res = await axios({
      method: "get",
      url: "/users",
      baseURL: `${url}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("success to get users.");
    console.log(res);
    return res.data;
  } catch (err) {
    console.log("fail to get users");
    console.log(err);
  }
};

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
export const useGetBooks = () => {
  console.log("useGetBooks");
  const [bookList, setBookList] = useState(null);
  const getBookList = useCallback(
    async (token, offset) => {
      console.log("getBookList");
      await axios({
        method: "get", 
        url: "books", 
        baseURL: `${url}`, 
        headers: { Authorization: `Bearer ${token}` }, 
        params: {
          offset: offset, 
        }
      })
      .then((res) => {
        console.log("success to get book list");
        console.log(res);
        setBookList(res.data);
      })
      .catch((err) => {
        console.log("fail to get book list");
        console.log(err);
      });
    }, []
   );
  return {bookList, setBookList, getBookList}
};

export const RawGetBooks = (token, offset) => {
  return axios({
    method: "get",
    url: "books",
    baseURL: `${url}`,
    headers: { Authorization: `Bearer ${token}` },
    params: {
      offset: offset,
    }
  }).then(res => {
    return res;
  });
};
