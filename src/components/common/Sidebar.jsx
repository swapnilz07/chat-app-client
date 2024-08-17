import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [isCollapsed] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div
        className={`h-screen bg-gray-700 rounded-lg px-4 py-5 flex flex-col justify-between transition-all duration-300 ${
          isCollapsed ? "w-96" : "w-16"
        }`}
      >
        <div>
          <div className="flex flex-col items-start space-y-5">
            {/* <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="btn btn-circle btn-sm md:hidden"
            >
              <FaBars size={20} />
            </button> */}
            <button
              className="btn btn-circle btn-sm"
              onClick={() => navigate("/")}
            >
              <FaUser size={20} />
            </button>
            <button
              className="btn btn-circle btn-sm"
              onClick={() => navigate("/group-chat")}
            >
              <FaUserGroup size={20} />
            </button>
          </div>
        </div>

        <div>
          <FaUserCircle
            className="btn btn-circle btn-sm"
            size={20}
            onClick={() => navigate("/profile/:username")}
          />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
