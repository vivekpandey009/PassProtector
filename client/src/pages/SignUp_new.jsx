import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, AlertCircle } from "lucide-react";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "An error occurred");
      navigate("/sign-in");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-violet-500 to-blue-500">
      <motion.div
        className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-lg bg-opacity-95 backdrop-blur-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="px-8 py-10">
          <motion.h2
            className="mb-8 text-3xl font-bold text-center text-gray-800"
            variants={childVariants}
          >
            Create an Account
          </motion.h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={childVariants}>
              <label
                htmlFor="username"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="relative">
                <User
                  className="absolute text-gray-400 top-3 left-3"
                  size={18}
                />
                <input
                  type="text"
                  id="username"
                  className="w-full px-3 py-2 pl-10 bg-white bg-opacity-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Enter your username"
                  onChange={handleChange}
                  required
                />
              </div>
            </motion.div>
            <motion.div variants={childVariants}>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute text-gray-400 top-3 left-3"
                  size={18}
                />
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 pl-10 bg-white bg-opacity-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                />
              </div>
            </motion.div>
            <motion.div variants={childVariants}>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute text-gray-400 top-3 left-3"
                  size={18}
                />
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 pl-10 bg-white bg-opacity-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                />
              </div>
            </motion.div>
            <motion.button
              type="submit"
              className="w-full px-4 py-2 text-white transition-all duration-300 ease-in-out rounded-md bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              disabled={loading}
              variants={childVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </motion.button>
          </form>
          {error && (
            <motion.div
              className="flex items-center p-3 mt-4 text-red-700 bg-red-100 border border-red-400 rounded-md"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <AlertCircle className="mr-2" size={18} />
              <span>{error && "Something went wrong!!"}</span>
            </motion.div>
          )}
          <motion.p
            className="mt-6 text-sm text-center text-gray-600"
            variants={childVariants}
          >
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="font-medium text-blue-600 transition-colors hover:text-violet-600"
            >
              Sign in
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
