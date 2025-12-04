import { useEffect, useState } from "react";
import banner from "../assets/banner.png";
import { TrendingUp, CheckCircle, Star, User2 } from "lucide-react";
import { gettaskLength } from "../api/tasks"; // your API function
import { getUserLength } from "../api/auth";
import { getProjectLength } from "../api/projects";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  const [user, setUser] = useState(0);
  const [project, setProject] = useState(0);
  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await gettaskLength();
        setStats({
          total: data.total,
          completed: data.completed,
          pending: data.pending,
        });
        // console.log("Dashboard stats:", data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    }

    fetchStats();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUserLength();
        setUser(data.totalUsers);
        // console.log("Dashboard stats:", data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProjectLength();
        setProject(data.totalProjects);
        // console.log("Dashboard stats:", data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    }

    fetchProject();
  }, []);

  const cards = [
    {
      id: 1,
      title: "Total Users",
      value: user,
      icon: User2,
      bgColor: "bg-gradient-to-br from-yellow-400 to-orange-400",
      iconBg: "bg-yellow-300/30",
    },
    {
      id: 2,
      title: "Total Projects",
      value: project,
      icon: Star,
      bgColor: "bg-gradient-to-br from-purple-600 to-indigo-600",
      iconBg: "bg-purple-500/30",
    },
    {
      id: 3,
      title: "Pending Tasks",
      value: stats.pending,
      icon: TrendingUp,
      bgColor: "bg-gradient-to-br from-pink-500 to-rose-500",
      iconBg: "bg-pink-400/30",
    },
    {
      id: 4,
      title: "Completion Rate",
      value:
        stats.total === 0
          ? "0%"
          : Math.round((stats.completed / stats.total) * 100) + "%",
      icon: CheckCircle,
      bgColor: "bg-gradient-to-br from-purple-300 to-indigo-300",
      iconBg: "bg-purple-200/40",
    },
  ];

  return (
    <div>
      <img src={banner} alt="Dashboard Banner" className="w-full h-80 mb-2" />

      <div>
        <h2 className="text-2xl font-bold text-gray-400 mb-3">Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={`${stat.bgColor} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.iconBg} p-3 rounded-xl`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <h3 className="text-4xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-white/90 text-sm font-medium">
                    {stat.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
