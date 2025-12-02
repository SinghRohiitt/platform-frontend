import React, { useEffect, useState } from "react";
import { User, Mail, Save, Camera, UserCheck2 } from "lucide-react";
import { getCurrentUser, updateProfile } from "../api/auth";
import { toast } from "react-toastify";

const EditProfile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setForm({
          name: data.name,
          email: data.email,
          image: data.image || "",
          role: data.role || "",
        });
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };
    fetchUser();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Only send allowed fields
      const payload = {
        name: form.name,
        email: form.email,
        image: form.image,
      };

        const res = await updateProfile(payload);
        console.log("Update Response:", res);

      toast.success("Profile updated!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Edit Profile
          </h1>
          <p className="text-gray-600">Update your personal information</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Gradient Header */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

          {/* Profile Image Section */}
          <div className="relative px-6 pb-6">
            <div className="flex justify-center -mt-16 mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-400">
                      <User className="w-16 h-16 text-white" />
                    </div>
                  )}
                </div>

                {/* Upload Button (Future Feature) */}
                <button className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-full shadow-lg transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-6">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Role (Read Only) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserCheck2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="role"
                    value={form.role}
                    readOnly
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 bg-gray-100 text-gray-500 rounded-xl cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">i</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900 mb-1">
                Profile Tips
              </h3>
              <p className="text-sm text-blue-700">
                Use a clear profile picture and keep your information updated.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditProfile;
