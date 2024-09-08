/* eslint-disable react/prop-types */
const ChatItem = ({ chat, authUser, handleChatClick }) => {
  const otherUser =
    !chat.isGroupChat && chat.users.find((user) => user._id !== authUser._id);

  const profileImg = chat.isGroupChat
    ? chat.groupChatImage ||
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    : otherUser?.profileImg ||
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
  const chatName = chat.isGroupChat ? chat.chatName : otherUser?.name;

  return (
    <div
      className="flex items-center py-3 rounded-lg shadow-md cursor-pointer hover:bg-gray-700"
      onClick={() => handleChatClick(chat._id)}
    >
      <img
        src={profileImg}
        alt={chatName}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div className="flex-1">
        <h3 className="font-bold">{chatName}</h3>
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
};

export default ChatItem;
