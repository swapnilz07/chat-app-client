import { useQuery, useQueryClient } from "@tanstack/react-query";
import FetchChatSkeleton from "../../components/skeleton/FetchChatSkeleton";
import { fetchChats } from "../../api/chatAPI";
import GroupChatModal from "./GroupChatModal";
import { useState } from "react";
import ErrorMessage from "../../components/common/ErrorMessage";
import ChatList from "../../components/common/ChatList";
import { useNavigate } from "react-router-dom";

function GroupChat() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const { 
    data: fetchedChats,
    isError: fetchingChatError,
    error: fetchError,
    isLoading,
  } = useQuery({ queryKey: ["groupchats"], queryFn: fetchChats });

  if (fetchingChatError) {
    return (
      <div className="p-4 w-96 h-screen flex items-center justify-center text-red-500">
        Error fetching chats: {fetchError.message}
      </div>
    );
  }

  const handleCreateGroup = async () => {
    await queryClient.invalidateQueries(["groupchats"]);
    setIsModalOpen(false);
  };

  const handleChatClick = (chatId) => {
    navigate(`/messages/${chatId}`);
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
            onClose={() => setIsModalOpen(false)}
          />
        )}

        {isLoading && (
          <div className="mt-4">
            {[...Array(4)].map((_, index) => (
              <FetchChatSkeleton key={index} />
            ))}
          </div>
        )}

        {fetchingChatError && <ErrorMessage message={fetchError.message} />}

        <div className="flex-1 overflow-y-auto mt-4">
          <ChatList
            chats={fetchedChats?.filter((chat) => chat.isGroupChat)}
            authUser={authUser}
            handleChatClick={handleChatClick}
            searchMessage={"Search Group to Start a Chat."}
          />
        </div>
      </div>
    </>
  );
}

export default GroupChat;
