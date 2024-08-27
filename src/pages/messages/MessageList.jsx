/* eslint-disable react/prop-types */
import MessageItem from "./MessageItem";

function MessageList({ messages, authUser }) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages?.map((message) => (
        <MessageItem key={message._id} message={message} authUser={authUser} />
      ))}
    </div>
  );
}

export default MessageList;
