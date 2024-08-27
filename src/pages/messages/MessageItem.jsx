/* eslint-disable react/prop-types */
import { format } from "date-fns";

function MessageItem({ message, authUser }) {
  return (
    <div
      className={`chat ${
        message.sender?._id === authUser?._id ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-header">
        <span className="font-bold">{message?.sender?.name}</span>
        <time className="text-xs opacity-50 pl-1">
          {format(new Date(message?.createdAt), "HH:mm")}
        </time>
      </div>
      <div className="chat-bubble break-words max-w-[55%]">
        {message.content}
      </div>
    </div>
  );
}

export default MessageItem;
