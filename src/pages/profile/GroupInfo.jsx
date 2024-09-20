/* eslint-disable react/prop-types */
export function GroupInfo({ user, formatDate }) {
  return (
    <>
      <h2 className="text-2xl font-bold text-center underline italic">
        {user?.isGroupChat ? user?.chatName : user?.name}
      </h2>
      <p className="text-xs text-center text-white/50">
        Created by {user?.groupAdmin?.name || "Unknown Admin"},{" "}
        {formatDate(user.createdAt)}
      </p>
    </>
  );
}
