import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { registerUser } from "../../apis/registerUser";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const roles = ["user", "user"];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addToast } = useToasts();

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    console.log(target.value);
    if (name === "username") {
      setUsername(target.value);
    }
    if (name === "password") {
      setPassword(target.value);
    }
    if (name === "email") {
      setEmail(target.value);
    }
  };

  const submitData = async () => {
    setLoading(true);
    console.log(username, email, password, roles);
    try {
      const data = await registerUser(username, email, password, roles);
      console.log(data);
      if (data.status === 200) {
        addToast("Registered Successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      addToast("Something went wrong", {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  const button = loading ? (
    <button
      type="submit"
      className="animate-wiggle mb-4 w-full py-4 bg-green-600 hover:bg-green-700 rounded text-sm font-bold text-gray-50"
    >
      Registering...
    </button>
  ) : (
    <button
      type="submit"
      className="mb-4 w-full py-4 bg-green-600 hover:bg-green-700 rounded text-sm font-bold text-gray-50"
    >
      Sign Up
    </button>
  );

  return (
    <section>
      <div className="flex flex-wrap">
        <div className="pt-20 lg:pt-20 pb-6 w-full ">
          <div className="max-w-md mx-auto">
            <div>
              <div className="mb-6 px-3">
                <span className="text-gray-500">Sign Up</span>
                <h3 className="text-2xl font-bold">Create an account</h3>
              </div>
              <form onSubmit={handleSubmit(submitData)}>
                <div className="mb-3 flex p-4 mx-2 bg-gray-50 rounded">
                  <input
                    name="username"
                    {...register("username", { required: true })}
                    onChangeCapture={handleInputChange}
                    className="w-full text-xs bg-gray-50 outline-none"
                    type="text"
                    placeholder="Enter Username"
                  />
                  <p className="text-red-400 p-2">
                    {errors.username && "Username is required"}
                  </p>
                </div>
                <div className="mb-3 flex p-4 mx-2 bg-gray-50 rounded">
                  <input
                    name="email"
                    {...register("email", { required: true })}
                    onChangeCapture={handleInputChange}
                    className="w-full text-xs bg-gray-50 outline-none"
                    type="email"
                    placeholder="name@email.com"
                  />
                  <p className="text-red-400 p-2">
                    {errors.email && "Email is required"}
                  </p>
                </div>
                <div className="mb-6 flex p-4 mx-2 bg-gray-50 rounded">
                  <input
                    name="password"
                    {...register("password", { required: true })}
                    onChangeCapture={handleInputChange}
                    className="w-full text-xs bg-gray-50 outline-none"
                    type="password"
                    placeholder="Enter your password"
                  />
                  <p className="text-red-400 p-2">
                    {errors.password && "Password is required"}
                  </p>
                </div>
                <div className="px-3 text-center">
                  {button}
                  <span className="text-gray-400 text-xs">
                    <span>Already have an account?</span>
                    <Link className="text-green-600 hover:underline" to="/">
                      Sign In
                    </Link>
                  </span>
                  <p className="mt-16 text-xs text-gray-400">
                    <a className="underline hover:text-gray-500" href="/">
                      Policy privacy
                    </a>{" "}
                    and{" "}
                    <a className="underline hover:text-gray-500" href="/">
                      Terms of Use
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
