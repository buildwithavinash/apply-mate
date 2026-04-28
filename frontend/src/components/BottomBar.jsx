import { useLocation, useNavigate } from "react-router-dom"
import { MdAddBox, MdDashboard, MdWork } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";

const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if(!isAuthenticated) return null;

  const items = [
    { path: "/dashboard", icon: <MdDashboard />, label: "Dashboard" },
    { path: "/createjob", icon: <MdAddBox />, label: "Add job" },
    { path: "/jobsmenu", icon: <MdWork />, label: "Jobs" },
  ];

  return (
    <div className="fixed z-40 bottom-0 right-0 left-0 bg-white/85 border-t border-zinc-200 backdrop-blur-xl h-14 flex justify-center items-center">
        <div className="w-full flex justify-around items-center">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button key={item.path} onClick={()=> navigate(item.path)} aria-label={item.label} title={item.label} className={`flex h-10 w-10 items-center justify-center rounded-md text-2xl transition ${isActive ? "bg-pale-sky-500 text-white" : "text-pale-sky-600 hover:bg-pale-sky-50"}`}>
                {item.icon}
              </button>
            )
          })}
        </div>
    </div>
  )
}

export default BottomBar
