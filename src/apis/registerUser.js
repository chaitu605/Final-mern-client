import axios from "axios";
import { apis } from "../constant";
let data = null;
export const registerUser = async (username, email, password, roles) => {
  await axios
    .post(`${apis.register}`, {
      username,
      email,
      password,
      roles,
    })
    .then((res) => {
      console.log(res);
      data = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
