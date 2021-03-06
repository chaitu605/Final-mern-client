import axios from "axios";
import { apis } from "../constant";

let data = null;

export const deleteNews = async (e) => {
  const id = e.target.id;
  await axios
    .delete(`${apis.delete}${id}`)
    .then((res) => {
      console.log(res);
      data = res;
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};
