import { useEffect, useState } from "react";
import { getMyProject } from "../api/projects";


export default function UserProject() {

  const [members, setMembers] = useState([]);

  const fetchUserProject = async () => {
    try {
       
      const res = await getMyProject();
      console.log("Members:", res);
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
