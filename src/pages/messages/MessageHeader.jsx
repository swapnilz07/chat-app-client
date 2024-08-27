/* eslint-disable react/prop-types */
function MessageHeader({ chatUser }) {
  return (
    <div className="sticky top-0 z-10 p-4 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center">
        <img
          src={chatUser?.profileImg || "/default-profile.png"}
          alt={chatUser?.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h1 className="text-lg font-bold pl-2">{chatUser?.name}</h1>
        </div>
      </div>
    </div>
  );
}

export default MessageHeader;
