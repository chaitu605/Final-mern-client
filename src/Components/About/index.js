import React from "react";

export default function About() {
  return (
    <React.Fragment>
      <div className="min-h-screen flex justify-center items-center">
        <div className="max-w-sm bg-green-500 border-3 shadow-2x1 opacity-75 border-gray-700 p-6 rounded-md tracking-wide shadow-lg">
          <div id="header" className="flex items-center mb-4">
            <img
              alt="avatar"
              className="w-20 rounded-full border-3 border-gray-700"
              src="https://i0.wp.com/www.qaiware.com/wp-content/uploads/2016/03/full-stack-developer-icon.png"
            />
            <div id="header-text" className="leading-5 ml-6 sm">
              <h4 id="name" className="text-xl font-bold text-gray-200">
                Chaitanya Prabhu
              </h4>
              <h5 id="job" className="font-semibold text-gray-200">
                Developer
              </h5>
            </div>
          </div>
          <div id="quote">
            <q className="italic text-gray-100">
              This is the Client News Crud app developed in React.js and Node.js
              with the help of MongoDB database.
            </q>
          </div>
          <div className="flex justify-evenly mt-5">
            <a href="#responsive">
              <img
                alt="icon"
                src="https://img.icons8.com/fluent/48/000000/github.png"
              />
            </a>
            <a href="#responsive">
              <img
                alt="icon"
                src="https://img.icons8.com/fluent/48/000000/linkedin.png"
              />
            </a>
            <a href="#responsive">
              <img
                alt="icon"
                src="https://img.icons8.com/color-glass/48/000000/instagram-new.png"
              />
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
