import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/authSlice";
import Swal from "sweetalert2";

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());

    Swal.fire({
      title: "Logged Out ✅",
      icon: "success",
    });

    navigate("/signin");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Settings Page</h2>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
}
