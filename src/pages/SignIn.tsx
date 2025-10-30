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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
   
      const resultAction = await dispatch(signinUser(formData));

      // ✅ Show success alert
       if (signinUser.fulfilled.match(resultAction)) {
        await Swal.fire({
          title: "Login Successful 🎉",
          text: "Welcome back!",
          icon: "success",
          confirmButtonText: "Go to Dashboard",
          confirmButtonColor: "#2563eb",
        });

        navigate("/");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            className="w-full border rounded px-3 py-2"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
