/* eslint-disable react/prop-types */
export function GroupMembers({ user, setUserToRemove, setShowModal }) {
  return (
    <ul className="h-44 overflow-auto">
      {user?.users?.map((groupUser) => (
        <li
          key={groupUser._id}
          className="flex items-center gap-3 py-1 max-h-12 overflow-y-auto"
          onClick={() => {
            setUserToRemove(groupUser);
            setShowModal(true);
          }}
        >
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={
              groupUser?.profileImg ||
              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            }
            alt={groupUser?.name}
          />
          <h5 className="w-full flex justify-between items-center">
            {groupUser.name}
            {groupUser._id === user?.groupAdmin?._id && (
              <button className="bg-green-500 rounded-md text-[10px] px-1">
                Group Admin
              </button>
            )}
          </h5>
        </li>
      ))}
    </ul>
  );
}
