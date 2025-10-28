import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signup } from "../api/auth";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
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
      const data = await signup(formData);
      console.log("Signup successful:", data);
      // ✅ show success alertco
      await Swal.fire({
        title: "Account Created 🎉",
        text: "You have successfully signed up!",
        icon: "success",
        confirmButtonText: "Continue",
        confirmButtonColor: "#2563eb", // Tailwind blue-600
      });

      // Redirect after closing the alert
      navigate("/signin");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || err.message || "Signup failed";

      // ❌ show error alert
      Swal.fire({
        title: "Signup Failed",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#ef4444", // Tailwind red-500
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name"
            className="w-full border rounded px-3 py-2"
            required
          />
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
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
