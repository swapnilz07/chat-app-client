import { useState } from "react";
import { FaUser, FaUserGroup } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProfilePage from "../../pages/profile/ProfilePage";

function Sidebar() {
  const [isCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className={`h-screen bg-gray-700 rounded-lg px-4 py-5 flex flex-col justify-between transition-all duration-300 ${
          isCollapsed ? "w-96" : "w-16"
        }`}
      >
        <div>
          <div className="flex flex-col items-start space-y-5">
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
          <img
            src={
              authUser?.profileImg ||
              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            }
            alt={authUser?.name}
            className="w-12 h-8 rounded-full cursor-pointer"
            onClick={toggleModal}
          />
        </div>
      </div>

      {/* Modal positioned at bottom */}
      {isModalOpen && (
        <div
          className="absolute bottom-12 left-20 z-50 p-4 bg-gray-800 rounded-lg shadow-lg transition-transform duration-300 ease-in-out"
          // style={{
          //   bottom: "7%", // Fix it to the bottom of the screen
          //   left: "17%", // Center it horizontally
          //   transform: "translateX(-50%)", // Align it properly
          // }}
        >
          <ProfilePage user={authUser} authUser={authUser} />
        </div>
      )}
    </>
  );
}

export default Sidebar;
