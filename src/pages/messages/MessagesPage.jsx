import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchMessages, sendMessageAPI } from "../../api/messageAPI";
import socket from "../../config/socketConfig";
import { format } from "date-fns";

function MessagePage() {
  const { chatId } = useParams(); // Get the chatId from the URL
  const [messageContent, setMessageContent] = useState(""); // State to hold message content
  const queryClient = useQueryClient(); // React Query's query client

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  console.log("authUser ==>>", authUser);

  // Fetch existing messages for the chat
  const {
    data: messages,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => fetchMessages(chatId),
  });

  // Define the mutation for sending a message
  const sendMessageMutation = useMutation({
    mutationFn: (newMessage) => sendMessageAPI(newMessage),
    onSuccess: () => {
      // Update the messages list with the new message
      queryClient.invalidateQueries(["messages", chatId]);
      setMessageContent(""); // Clear the input box
    },
    onError: (error) => {
      console.error("Error sending message:", error.message);
    },
  });

  useEffect(() => {
    // Join the chat room for this chatId
    socket.emit("joinRoom", chatId);

    // Listen for incoming messages
    socket.on("messageReceived", (newMessage) => {
      console.log("Message received on client:", newMessage);
      if (newMessage.chatId === chatId) {
        // If the message is for the current chat, invalidate the messages query
        queryClient.invalidateQueries(["messages", chatId]);
      }
    });

    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("messageReceived"); // Remove the listener
    };
  }, [chatId, queryClient]);

  // Handle form submission to send a message
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!messageContent.trim()) {
      return; // Prevent sending empty messages
    }

    // Create the message object to send
    const newMessage = {
      content: messageContent,
      chatId: chatId,
      senderId: authUser?._id,
    };

    // Emit the message to the server
    socket.emit("sendMessage", newMessage); // Emit here first

    // Call the mutation to send the message
    sendMessageMutation.mutate(newMessage);
  };

  console.log("messages==>>", messages);

  return (
    <div className="flex-1 h-screen overflow-auto p-4 bg-gray-900 text-white">
      <h1 className="text-lg font-bold">Messages for Chat ID: {chatId}</h1>

      {/* Render loading state, error state, or messages */}
      {isLoading && <p>Loading messages...</p>}
      {isError && <p>Error loading messages: {error.message}</p>}
      {!isLoading && !isError && (
        <div className="mt-4">
          {messages?.map((message) => (
            <div
              key={message._id}
              className={`chat ${
                message.sender._id === authUser?._id ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-header">
                <span className="font-bold">{message.sender.name}</span>
                <time className="text-xs opacity-50 pl-1">
                  {format(new Date(message.createdAt), "HH:mm")}
                </time>
              </div>
              <div className="chat-bubble break-words max-w-[55%] ">
                {message.content}
              </div>
              {/* <div className="chat-footer opacity-50">Seen at {format(new Date(), "HH:mm")}</div> */}
            </div>
          ))}
        </div>
      )}

      {/* Input box for typing a new message */}
      <form onSubmit={handleSendMessage} className="mt-4 flex">
        <input
          type="text"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-l bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 p-2 rounded-r text-white hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default MessagePage;
