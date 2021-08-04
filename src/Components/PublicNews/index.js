import React from "react";
import { useState, useEffect } from "react";
import { getNews } from "../../apis/getNews";

export default function PublicNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getNews();
      console.log(data);
      setNews(data);
    };
    getData();
  }, []);

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
            <div className="flex justify-end items-center">
              <span className="font-light text-gray-700 font-bold">
                {item.published}
              </span>
            </div>
            <div className="mt-2">
              <p className="text-2xl text-gray-700 font-bold hover:text-gray-600">
                {item.title}
              </p>
              <p className="mt-2 text-gray-600">{item.news}</p>
            </div>
            <div className="flex justify-end items-center mt-4">
              <div className="flex  items-center">
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
        <h2 className="mt-3 text-center text-gray-100 font-serif  xl:text-3xl">
          Please Wait...{" "}
        </h2>
      )}
    </div>
  );
}
