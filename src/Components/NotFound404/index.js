import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <React.Fragment>
      <div id="notFound">
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
          <img
            className="w-full"
            src="https://kicksdigitalmarketing.com/wp-content/uploads/2019/09/iStock-1142986365.jpg"
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Sorry? Page not Found </div>
            <p className="text-gray-700 text-base">
              Please{" "}
              <Link className="bg-red-200" to="/">
                {" "}
                click here
              </Link>{" "}
              to go to Login Page
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
