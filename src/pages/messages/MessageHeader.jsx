/* eslint-disable react/prop-types */

import { useState } from "react";
import ProfilePage from "../profile/ProfilePage";

const MessageHeader = ({ headerData }) => {
  const { chatUser, groupChat, isGroupChat, authUser } = headerData;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="p-4 border-b border-gray-700 bg-gray-800">
        {isGroupChat ? (
          <>
            <div className="flex items-center" onClick={toggleModal}>
              <img
                src={
                  groupChat?.groupChatImage ||
                  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                }
                alt={groupChat?.chatName}
                className="w-10 h-10 rounded-full mr-3 cursor-pointer"
              />
              <div className="text-lg font-semibold text-white">
                {groupChat?.chatName}
              </div>
            </div>
            {isModalOpen && (
              <div
                className="absolute z-50 p-2 bg-gray-800 rounded-lg shadow-lg transition-transform duration-300 ease-in-out"
                style={{ position: "absolute" }}
              >
                <ProfilePage user={groupChat} authUser={authUser} />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="relative flex items-center" onClick={toggleModal}>
              <img
                src={
                  chatUser?.profileImg ||
                  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                }
                alt={chatUser?.name}
                className="w-10 h-10 rounded-full mr-3 cursor-pointer"
              />
              <div className="text-lg font-semibold text-white">
                {chatUser?.name}
              </div>
            </div>
            {isModalOpen && (
              <div
                className="absolute z-50 p-4 shadow-lg transition-transform duration-300 ease-in-out bg-gray-800"
                style={{ position: "absolute" }}
              >
                <ProfilePage user={chatUser} authUser={authUser} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MessageHeader;
