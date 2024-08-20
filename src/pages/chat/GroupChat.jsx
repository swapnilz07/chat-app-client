import { useQuery, useQueryClient } from "@tanstack/react-query";
import FetchChatSkeleton from "../../components/skeleton/FetchChatSkeleton";
import { fetchChats } from "../../api/chatAPI";
import GroupChatModal from "./GroupChatModal";
import { useState } from "react";


function GroupChat() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: fetchedChats,
    isError: fetchingChatError,
    error: fetchError,
    isLoading,
  } = useQuery({ queryKey: ["groupchats"], queryFn: fetchChats });

  const filteredChats = fetchedChats?.filter((chat) => chat.isGroupChat);

  if (isLoading) {
    return (
      <div className="p-4 w-96 h-screen flex flex-col text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Group Chats</h1>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            Create Group
          </button>
        </div>
        <div className="mt-4">
          {[...Array(4)].map((_, index) => (
            <FetchChatSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (fetchingChatError) {
    return (
      <div className="p-4 w-96 h-screen flex items-center justify-center text-red-500">
        Error fetching chats: {fetchError.message}
      </div>
    );
  }

  // Function to handle the creation of a new group chat
  const handleCreateGroup = async () => {
    await queryClient.invalidateQueries(["groupchats"]);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="p-4 w-96 h-screen flex flex-col text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Group Chats</h1>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            Create Group
          </button>
        </div>

        {isModalOpen && (
          <GroupChatModal
            onCreateGroup={handleCreateGroup}
            onClose={() => setIsModalOpen(false)} // Pass the onClose prop
          />
        )}

        <div className="flex-1 overflow-y-auto mt-4">
          {filteredChats?.length > 0 ? (
            filteredChats?.map((chat, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center py-3 rounded-lg shadow-md cursor-pointer hover:bg-gray-700"
                >
                  <img
                    src={
                      chat?.profileImg ||
                      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                    }
                    alt={chat?.chatName}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold">{chat?.chatName}</h3>
                    <p className="text-gray-400">
                      {chat.latestMessage?.content || "No messages yet"}
                    </p>
                  </div>
                  <span className="text-gray-400">
                    {new Date(chat.updatedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No group chats available.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default GroupChat;
