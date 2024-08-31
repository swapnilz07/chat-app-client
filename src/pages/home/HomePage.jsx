import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { accessChat, fetchChats } from "../../api/chatAPI";
import { fetchUsers } from "../../api/userAPI";
import FetchChatSkeleton from "../../components/skeleton/FetchChatSkeleton";
import { useNavigate } from "react-router-dom";
import UserSearch from "../../components/common/UserSearch";
import ChatList from "../../components/common/ChatList";
import ErrorMessage from "../../components/common/ErrorMessage";

const HomePage = () => {
  const [, setSelectedUser] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const {
    data: fetchedChats,
    isError: fetchingChatError,
    error: fetchError,
    isLoading,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
  });

  const {
    mutate: accessChatMutation,
    isError: accessChatError,
    error: accessError,
    isLoading: isAccessingChat,
  } = useMutation({
    mutationFn: accessChat,
    onSuccess: (chat) => {
      queryClient.invalidateQueries(["chats"]);
      navigate(`/messages/${chat._id}`);
    },
  });

  const handleUserClick = (user) => {
    setSelectedUser(user);
    if (user) accessChatMutation(user.userId);
  };

  const handleChatClick = (chatId) => {
    navigate(`/messages/${chatId}`);
  };

  const loadOptions = async (inputValue, callback) => {
    if (!inputValue) return callback([]);
    try {
      const fetchedUsers = await fetchUsers(inputValue);
      const options = fetchedUsers.map((user) => ({
        label: user.name,
        userId: user._id,
        profileImg: user.profileImg,
      }));
      callback(options);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      borderColor: "#374151",
      color: "white",
      "&:hover": { borderColor: "#4b5563" },
    }),
    input: (provided) => ({ ...provided, color: "white" }),
    menu: (provided) => ({ ...provided, backgroundColor: "#1f2937" }),
    singleValue: (provided) => ({ ...provided, color: "white" }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#374151" : "#1f2937",
      color: state.isFocused ? "black" : "white",
    }),
  };

  return (
    <>
      <div className="p-4 w-96 h-screen flex flex-col text-white">
        <h1 className="text-2xl font-bold mb-4">Chats</h1>
        <UserSearch
          loadOptions={loadOptions}
          handleUserClick={handleUserClick}
          selectStyles={selectStyles}
        />
        {isLoading ? (
          <div className="mt-4">
            {[...Array(4)].map((_, index) => (
              <FetchChatSkeleton key={index} />
            ))}
          </div>
        ) : (
          <ChatList
            chats={fetchedChats?.filter(
              (chat) => !chat.isGroupChat && chat.latestMessage
            )}
            authUser={authUser}
            handleChatClick={handleChatClick}
            searchMessage={"Search User to Start a Chat."}
          />
        )}

        {isAccessingChat && (
          <div className="mt-4 text-center">
            <p className="text-blue-500">Starting chat...</p>
          </div>
        )}
        {accessChatError && <ErrorMessage message={accessError.message} />}
        {fetchingChatError && <ErrorMessage message={fetchError.message} />}
      </div>
    </>
  );
};

export default HomePage;
