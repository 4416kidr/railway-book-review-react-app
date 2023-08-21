import axios from "axios";
import { url } from "const";
import { useState, useCallback } from "react";

export const useGetUserName = () => {
  const [username, setUserName] = useState(null);
  const [iconUrl, setIconUrl] = useState(null);
  const getUserName = useCallback(
    async (token) => {
      console.log("getUser");
      await axios({
        method: "get",
        url: "/users",
        baseURL: `${url}`,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("success to get user name");
        console.log(res);
        setUserName(res.data.name);
        setIconUrl(res.data.iconUrl);
      })
      .catch((err) => {
        console.log("fail to get user name");
        console.log(err);
      });
    }, []
  );
  return {username, iconUrl, setUserName, getUserName}
};

export const GetUser = async (token) => {
  return axios({
    method: "get",
    url: "/users",
    baseURL: `${url}`,
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((res) => {
    console.log("success to get user");
    console.log(res);
    return res;
  })
  .catch((err) => {
    console.log("fail to get user");
    console.log(err);
    return err;
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
      return res
    })
    .catch((err) => {
      console.log(`fail to SignIn.`);
      console.log(err);
      return err
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

export const UpdateUser = async (token, name) => {
  const data = {
    name: name,
  };
  return await axios({
    method: "put",
    url: "/users",
    baseURL: `${url}`,
    headers: { Authorization: `Bearer ${token}` },
    data: data,
  })
  .then((res) => {
    console.log("success to Update.");
    console.log(res);
    return res;
  })
  .catch((err) => {
    console.log("fail to Update.");
    console.log(err);
    return err;
  });
}
