import axios from "axios";

let data = null;
export const findNewsById = async () => {
  await axios
    .get(`http://localhost:5000/api/news`)
    .then((res) => {
      console.log(res.data);
      data = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
