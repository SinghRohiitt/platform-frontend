import banner from "../assets/banner.png";
import { TrendingUp, CheckCircle, Star, Eye } from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Open Rate",
    value: "83%",
    icon: TrendingUp,
    bgColor: "bg-gradient-to-br from-yellow-400 to-orange-400",
    iconBg: "bg-yellow-300/30",
  },
  {
    id: 2,
    title: "Complete",
    value: "77%",
    icon: CheckCircle,
    bgColor: "bg-gradient-to-br from-purple-600 to-indigo-600",
    iconBg: "bg-purple-500/30",
  },
  {
    id: 3,
    title: "Unique Views",
    value: "91",
    icon: Star,
    bgColor: "bg-gradient-to-br from-pink-500 to-rose-500",
    iconBg: "bg-pink-400/30",
  },
  {
    id: 4,
    title: "Total Views",
    value: "126",
    icon: Eye,
    bgColor: "bg-gradient-to-br from-purple-300 to-indigo-300",
    iconBg: "bg-purple-200/40",
  },
];

export default function Dashboard() {
  return (
    <div>
      <img
        src={banner}
        alt=" Dashboard Banner"
        className="w-full h-80 mb-2"
      />

      <div className="">
        <h2 className="text-2xl font-bold text-gray-400 mb-3">Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
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
