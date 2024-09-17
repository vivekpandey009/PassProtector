import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      dispatch(signInSuccess(data));

      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="p-3 rounded-lg bg-slate-100"
          onChange={handleChange}
        ></input>

        <input
          type="password"
          placeholder="Password"
          id="password"
          className="p-3 rounded-lg bg-slate-100"
          onChange={handleChange}
        ></input>

        <button
          disabled={loading}
          className="p-3 text-white uppercase bg-indigo-500 rounded-lg hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading.." : "Sign In"}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Do not have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500 ">Sign up</span>
        </Link>
      </div>

      <p className="p-2 m-3 text-xl text-center text-red-600 rounded-lg">
        {error ? error.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
}
