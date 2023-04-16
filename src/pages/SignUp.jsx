import axios from "axios";
import {url} from "../const";



export const SignUp = () => {
  const [name, setName] = useState("name");
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("password");
  const onSignUp = () => {
    const data = {
      name: name,
      email: email,
      password: password,
    };
  
    axios
      .post(`${url}/users`. data)
  };
}