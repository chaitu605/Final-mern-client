import axios from "axios";
let data = null;
export const loginUser = async (username, password) => {
  await axios
    .post("http://localhost:5000/api/auth/signin", {
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
