/* eslint-disable react/prop-types */
function MessageInput({
  messageContent,
  setMessageContent,
  handleSendMessage,
}) {
  return (
    <form
      onSubmit={handleSendMessage}
      className="sticky bottom-0 z-10 p-4 bg-gray-800 border-t border-gray-700 flex"
    >
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
  );
}

export default MessageInput;
