import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getNews } from "../../apis/getNews";
import { deleteNews } from "../../apis/deleteNews";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

export default function DisplayNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getNews();
      console.log(data);
      setNews(data);
    };
    getData();
  }, []);

  const { addToast } = useToasts();

  const history = useHistory();
  const onSubmit = async (e) => {
    try {
      const data = await deleteNews(e);
      console.log(data);
      if (data.status === 200) {
        addToast("Deleted Successfully", {
          appearance: "success",
          autoDismiss: true,
        });

        history.push({
          pathname: "/dashboard",
        });
      }
    } catch (e) {
      console.log(e);
      addToast("Something went wrong", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="bg-gray-300">
      <h2 className="underline text-center text-black font-serif  uppercase text-4xl xl:text-5xl">
        Recent Articles
      </h2>
      {news != null && news.length ? (
        news.map((item, index) => (
          <div
            key={index}
            className="px-10 my-12 py-6 rounded shadow-xl bg-green-200 w-3/4 mx-auto"
          >
            <div className="flex justify-between items-center">
              <span className="font-light text-gray-600">{item.published}</span>
              <div className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500">
                <Link to={`/dashboard/edit/${item.id}`}>Edit</Link>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-2xl text-gray-700 font-bold hover:text-gray-600">
                {item.title}
              </p>
              <p className="mt-2 text-gray-600">{item.news}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                id={item.id}
                onClick={onSubmit}
                className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
              >
                Delete
              </button>
              <div className="flex items-center">
                <img
                  className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                  src="https://cdn2.vectorstock.com/i/1000x1000/38/21/male-face-avatar-logo-template-pictograph-vector-11333821.jpg"
                  alt="avatar"
                />
                <h1 className="text-gray-700 font-bold">{item.author}</h1>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h2 className="text-left text-gray-100 font-serif  uppercase text-4xl xl:text-5xl">
          Loading...{" "}
        </h2>
      )}
    </div>
  );
}
