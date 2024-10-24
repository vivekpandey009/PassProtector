import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(false);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);

    setLoading(false);
    if (data.success === false) {
      setError(true);
      return;
    }
    navigate("/sign-in");
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="p-3 rounded-lg bg-slate-100"
          onChange={handleChange}
        ></input>

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
          {loading ? "Loading.." : "Sign Up"}
        </button>

        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500 ">Sign in</span>
        </Link>
      </div>

      <p className="p-2 m-3 text-xl text-center text-red-600 rounded-lg">
        {error ? error.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
}
