import { useEffect, useState } from "react";
// import { getMyProject } from "../api/projects";
import axios from "axios";

export default function UserProject() {
  const [,setMembers] = useState([]);

  const fetchUserProject = async () => {
    try {
      const res = await axios
        .get("http://localhost:5000/api/projects/myproject", {
          withCredentials: true,
        })
        .then((response) => response.data);
      // console.log("Members:", res);
      setMembers(res);
    } catch (error) {
      console.error("Error fetching members", error);
    }
  };

  useEffect(() => {
    fetchUserProject();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold">Project Members</h2>

      <ul className="mt-4 space-y-2">
        {/* {members.map((m) => (
          <li key={m.id} className="text-gray-600">
            {m.name}
          </li>
        ))} */}
      </ul>
    </div>
  );
}
