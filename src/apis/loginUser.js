import axios from "axios";
import { apis } from "../constant";
let data = null;
export const loginUser = async (username, password) => {
  await axios
    .post(`${apis.login}`, {
      username,
      password,
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
