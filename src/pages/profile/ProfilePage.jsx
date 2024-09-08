/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { logOut } from "../../api/authAPI";

function ProfilePage({ user, authUser }) {
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authuser"] });
      window.location.href = "/login";
    },
    onError: () => {
      toast.error("Logout failed.");
    },
  });

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(dateString)
      .toLocaleString("en-US", options)
      .replace(",", "");
  };

  return (
    <div className="w-72 p-4 bg-gray-800 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">
        <img
          className="w-20 h-20 rounded-full object-cover"
          src={
            user?.profileImg ||
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt={user?.name || user?.chatName}
        />
      </div>
      {/* Displaying group chat name if it's a group chat */}
      <h2 className="text-2xl font-bold text-center">
        {user?.isGroupChat ? user?.chatName : user?.name}
      </h2>

      {user?.isGroupChat && (
        <>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Members</h3>
            <ul className="text-gray-400">
              {user?.users?.map((groupUser) => (
                <li
                  key={groupUser._id}
                  className="flex items-center gap-3 py-1 max-h-12 overflow-y-auto border-b border-gray-500"
                >
                  <img
                    className="w-9 h-9 rounded-full object-cover"
                    src={
                      groupUser?.profileImg ||
                      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                    }
                    alt={groupUser?.name}
                  />
                  {/* Check if the user is the group admin */}
                  <h5>
                    {groupUser.name}
                    {groupUser._id === user?.groupAdmin?._id && " (Admin)"}
                  </h5>
                </li>
              ))}
            </ul>
          </div>
          {/* Display group creation time */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Created At</h3>
            <p className="text-gray-400">{formatDate(user.createdAt)}</p>
          </div>
        </>
      )}

      {/* Display individual user info if it's not a group chat */}
      {!user?.isGroupChat && (
        <>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Email</h3>
            <p className="text-gray-400 ">{user?.email}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-gray-400">
              {user?.about || "No information available."}
            </p>
          </div>
        </>
      )}

      {/* Log out button for the authenticated user */}
      {user?._id === authUser?._id && ( // Check if the logged-in user is the same as the profile user
        <div className="mt-6 text-center">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
