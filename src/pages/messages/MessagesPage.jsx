import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchMessages, sendMessageAPI } from "../../api/messageAPI";
import socket from "../../config/socketConfig";
import MessageHeader from "./MessageHeader";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

function MessagePage() {
  const { chatId } = useParams();
  const [messageContent, setMessageContent] = useState("");
  const queryClient = useQueryClient();

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const {
    data: fetchedMessages,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => fetchMessages(chatId),
  });

  const sendMessageMutation = useMutation({
    mutationFn: (newMessage) => sendMessageAPI(newMessage),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", chatId]);
      setMessageContent("");
    },
    onError: (error) => {
      console.error("Error sending message:", error.message);
    },
  });

  useEffect(() => {
    if (authUser?._id) {
      socket.emit("registerUser", authUser._id);
      socket.emit("joinRoom", chatId);
    }

    socket.on("messageReceived", (newMessage) => {
      if (newMessage.chatId === chatId) {
        queryClient.invalidateQueries(["messages", chatId]);
      }
    });

    return () => {
      socket.off("messageReceived");
    };
  }, [authUser?._id, chatId, queryClient]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!messageContent.trim()) {
      return;
    }

    const newMessage = {
      content: messageContent,
      chatId: chatId,
      sender: authUser?._id,
    };

    socket.emit("sendMessage", newMessage);
    sendMessageMutation.mutate(newMessage);
  };

  const chatUser = fetchedMessages?.[0]?.chat?.users?.find(
    (user) => user._id !== authUser?._id
  );

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white w-full">
      <MessageHeader chatUser={chatUser} />

      {isLoading ? (
        <div className="flex items-center justify-center h-screen bg-gray-900 w-full">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <MessageList messages={fetchedMessages} authUser={authUser} />
      )}

      {isError && (
        <div className="flex items-center justify-center h-screen bg-gray-900 w-full">
          <p className="text-red-500">
            Something Went Wrong, Please try again later...
          </p>
        </div>
      )}

      <MessageInput
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default MessagePage;
