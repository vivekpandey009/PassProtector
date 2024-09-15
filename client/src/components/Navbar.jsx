import { Link } from "react-router-dom";
import React from "react";
import "../index.css";

export default function Navbar() {
  return (
    <div className="bg-slate-950">
      <div className="flex items-center justify-between p-3 mx-auto max-w-7xl ">
        <Link to="/">
          <h1 className="font-mono text-3xl font-bold text-neutral-50 caveat-logo ">
            PassProtector
          </h1>
        </Link>

        <ul className="flex gap-8 text-xl text-neutral-300 montserrat-fontFamily">
          <Link to="/">
            <li>Home</li>
          </Link>

          <Link to="/about">
            <li>About</li>
          </Link>

          <Link to="/sign-in">
            <li>Sign-in</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
