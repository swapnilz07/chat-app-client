import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { accessChat, fetchChats } from "../../api/chatAPI";
import { fetchUsers } from "../../api/userAPI";
import AsyncSelect from "react-select/async";
import FetchChatSkeleton from "../../components/skeleton/FetchChatSkeleton";
import { useNavigate } from "react-router-dom";
import socket from "../../config/socketConfig";

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

  useEffect(() => {
    // Join the user's chat room
    if (authUser) {
      socket.emit("registerUser", authUser._id);
    }

    // Listen for incoming messages
    socket.on("messageReceived", (message) => {
      // Fetch chats again to refresh the latest messages
      queryClient.invalidateQueries(["chats"]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off("messageReceived"); // Remove the listener
    };
  }, [authUser, queryClient]);

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

  if (isLoading) {
    return (
      <div className="p-4 w-96 h-screen flex flex-col text-white">
        <h1 className="text-2xl font-bold mb-4">Chats</h1>
        <div className="relative">
          <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            onChange={handleUserClick}
            defaultOptions
            placeholder="Search for users..."
            isClearable
            styles={selectStyles}
            getOptionLabel={(e) => (
              <div className="flex items-center">
                <img
                  src={
                    e.profileImg ||
                    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  }
                  alt={e.label}
                  className="w-8 h-8 rounded-full inline-block mr-2"
                />
                <span>{e.label}</span>
              </div>
            )}
          />
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

  const filteredChats = fetchedChats?.filter((chat) => !chat.isGroupChat);

  return (
    <>
      <div className="p-4 w-96 h-screen flex flex-col text-white">
        <h1 className="text-2xl font-bold mb-4">Chats</h1>
        <div className="relative">
          <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            onChange={handleUserClick}
            defaultOptions
            placeholder="Search for users..."
            isClearable
            styles={selectStyles}
            getOptionLabel={(e) => (
              <div className="flex items-center">
                <img
                  src={
                    e.profileImg ||
                    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  }
                  alt={e.label}
                  className="w-8 h-8 rounded-full inline-block mr-2"
                />
                <span>{e.label}</span>
              </div>
            )}
          />
        </div>
        <div className="flex-1 overflow-y-auto mt-4 max-w-full">
          {filteredChats?.length > 0 ? (
            filteredChats.map((chat, index) => {
              const otherUser = chat.users.find(
                (user) => user._id !== authUser._id
              );
              return (
                <div
                  key={index}
                  className="flex items-center py-3 rounded-lg shadow-md cursor-pointer hover:bg-gray-700"
                  onClick={() => handleChatClick(chat._id)} // Navigate to MessagePage on click
                >
                  <img
                    src={
                      otherUser?.profileImg ||
                      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                    }
                    alt={otherUser?.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold">{otherUser?.name}</h3>
                    <p className="text-gray-400 break-words whitespace-pre-wrap">
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
            <div className="flex items-center justify-center flex-1">
              <p className="text-gray-500">
                Search for a user to start a chat.
              </p>
            </div>
          )}
        </div>
        {isAccessingChat && (
          <div className="mt-4 text-center">
            <p className="text-blue-500">Starting chat...</p>
          </div>
        )}
        {accessChatError && (
          <div className="mt-4 text-center">
            <p className="text-red-500">
              Error starting chat: {accessError.message}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
