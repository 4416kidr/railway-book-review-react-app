import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../const";
import Compressor from "compressorjs";

export const SignUp = () => {
  const [name, setName] = useState("name");
  const [email, setEmail] = useState("email");
  const [icon, setIcon] = useState(null);
  const [password, setPassword] = useState("password");
  let navigate = useNavigate();
  const onSignUp = () => {
    const data = {
      name: name,
      email: email,
      password: password,
    };

    axios.post(`${url}/users`, data).then((res) => {
      const token = res.data.token;
      navigate("/");
    });
  };

  const onIconChange = (e) => {
    const icon = e.target.value;
    console.log(icon);
    
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    new Compressor(file, {
      convertSize: 1000000,
      success(result) {
        setIcon(window.URL.createObjectURL(result));
        console.log(result);
        console.log(result.name);
      },
      error(err) {
        console.log(err.meassage);
      }
    })


  }
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
          ユーザー名:{" "}
          <input type="text" name="text" placeholder="User Name" required 
          onChange={e => {setName(e.target.value)}}/>
        </div>
        <div>
          Email:{" "}
          <input type="email" name="email" placeholder="e-mail" required
          onChange={e => {setEmail(e.target.value)}} />
        </div>
        <div>
          Icon: <input type="file" accept=".jpg,.png" name="icon" required
          onChange={e => {onIconChange(e)}} />
        </div>
        <div>
          password:{" "}
          <input
            type="password"
            name="password"
            placeholder="password"
            required
          />
        </div>
        <div>
          password confirm:{" "}
          <input
            type="password"
            name="password confirm"
            placeholder="password confirm"
            required
          />
        </div>
        <input type="submit" value={"submit"} />
      </form>
      <img className="icon-preview" src={icon}/>
    </>
  );
};
