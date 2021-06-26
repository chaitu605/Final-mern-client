import axios from "axios";

let data = null;

export const deleteNews = async (e) => {
  const id = e.target.id;
  await axios
    .delete(`http://localhost:5000/api/news/${id}`)
    .then((res) => {
      console.log(res.data);
      data = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};
