import { useState, useRef, useEffect } from "react";
import { FaUser, FaUserGroup } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProfilePage from "../../pages/profile/ProfilePage";

function Sidebar() {
  const [isCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const profilePicRef = useRef(null);

  const navigate = useNavigate();

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClickOutside = (event) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      !profilePicRef.current.contains(event.target)
    ) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen && modalRef.current && profilePicRef.current) {
      const profilePicRect = profilePicRef.current.getBoundingClientRect();
      modalRef.current.style.top = `${profilePicRect.top - 445}px`;
      modalRef.current.style.left = `${profilePicRect.left }px`;
    }
  }, [isModalOpen]);

  if (isLoading) {
    return <div>Loading...</div>; // Handle loading state
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

        <div ref={profilePicRef}>
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

      {/* Custom Modal */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className="absolute z-50 p-4 bg-gray-800 rounded-lg shadow-lg transition-transform duration-300 ease-in-out"
          style={{ position: "absolute" }}
        >
          <ProfilePage />
        </div>
      )}
    </>
  );
}

export default Sidebar;
