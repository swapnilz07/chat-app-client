/* eslint-disable react/prop-types */
import ChatItem from "./ChatItem";

const ChatList = ({ chats, authUser, handleChatClick, searchMessage }) => {
  if (chats?.length === 0) {
    return (
      <div className="flex items-center justify-center flex-1">
        <p className="text-gray-500 font-semibold">{searchMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto mt-4 max-w-full">
      {chats?.map((chat, index) => (
        <ChatItem
          key={index}
          chat={chat}
          authUser={authUser}
          handleChatClick={handleChatClick}
        />
      ))}
    </div>
  );
};

export default ChatList;
