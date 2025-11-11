import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { signin } from "../api/auth";
import { useDispatch } from "react-redux";
import { signinUser } from "../redux/authSlice";
import type { AppDispatch } from "../redux/store";

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
   const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
   
      const resultAction = await dispatch(signinUser(formData));

      // ✅ Show success alert
        navigate("/");
         if (signinUser.fulfilled.match(resultAction)) {
        await Swal.fire({
          title: "Login Successful 🎉",
          text: "Welcome back!",
          icon: "success",
          confirmButtonText: "Go to Dashboard",
          confirmButtonColor: "#2563eb",
        });
      } else {
        throw new Error("Login failed");
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || err.message || "Login failed";

      await Swal.fire({
        title: "Login Failed",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen bg-linear-to-br  flex items-center justify-center px-4">
    <div className=" w-full grid md:grid-cols-2 gap-10 bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-gray-100">

      {/* Left Illustration */}
      <div className="hidden md:flex flex-col justify-center items-center text-center px-6">
        <img
          src="https://illustrations.popsy.co/white/dashboard.svg"
          alt="Login Illustration"
          className="w-72 mb-6"
        />
        <h1 className="text-3xl font-semibold text-gray-800">
          Welcome Back
        </h1>
        <p className="text-gray-500 mt-2 leading-relaxed">
          Sign in to continue managing your dashboard, projects and more.
        </p>
      </div>

      {/* Right Form */}
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              type="email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          <div className="relative">
  <label className="text-sm text-gray-600">Password</label>
  <input
    name="password"
    value={formData.password}
    onChange={handleChange}
    placeholder="Enter your password"
    type={showPassword ? "text" : "password"}
    required
    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
  >
    {showPassword ? (
      // Eye Open (Hide Password)
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ) : (
      // Eye Closed (Show Password)
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 3l18 18M9.88 9.88A3 3 0 0114.12 14.12M6.1 6.1C4.44 7.54 3.26 9.61 2.458 12c1.274 4.057 5.065 7 9.542 7a9.985 9.985 0 004.9-1.356M17.9 17.9c1.66-1.44 2.84-3.51 3.64-5.9-1.274-4.057-5.065-7-9.542-7a9.985 9.985 0 00-4.9 1.356" />
      </svg>
    )}
  </button>
</div>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  </div>
);

}
