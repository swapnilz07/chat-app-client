/* eslint-disable react/prop-types */
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "../../api/authAPI";
import { addMember } from "../../api/chatAPI";
import { fetchUsers } from "../../api/userAPI";
import toast from "react-hot-toast";
import AsyncSelect from "react-select/async";
import { AiOutlineUserAdd } from "react-icons/ai";

function ProfilePage({ user, authUser }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const queryClient = useQueryClient();

  const { mutate: addToGroup } = useMutation({
    mutationKey: ["addmember"],
    mutationFn: ({ chatId, userId }) => addMember({ chatId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      toast.success("Users added to the group!");
    },
    onError: () => {
      toast.error("Failed to add users to the group.");
    },
  });

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

  const handleAddMembers = () => {
    if (selectedUsers.length > 0) {
      const userIds = selectedUsers.map((user) => user.value);
      addToGroup({ chatId: user._id, userId: userIds });
    } else {
      toast.error("Please select at least one user.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const loadOptions = async (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
      return;
    }
    try {
      const fetchedUsers = await fetchUsers(inputValue);
      const existingUserIds = new Set(
        user.users.map((groupUser) => groupUser._id)
      );
      const options = fetchedUsers
        .filter((user) => !existingUserIds.has(user._id))
        .map((user) => ({
          label: user.name,
          value: user._id,
          profileImg: user.profileImg,
        }));
      callback(options);
    } catch (error) {
      console.error("Error fetching users:", error);
      callback([]);
    }
  };

  return (
    <div className="px-4 rounded-lg shadow-lg">
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
      <h2 className="text-2xl font-bold text-center underline italic">
        {user?.isGroupChat ? user?.chatName : user?.name}
      </h2>
      <p className="text-xs text-center text-white/50">
        Created by {user?.groupAdmin?.name || "Unknown Admin"},{" "}
        {formatDate(user.createdAt)}
      </p>

      {user?.isGroupChat && (
        <div className="py-2">
          <h3 className="text-lg">Members</h3>
          {authUser?._id === user?.groupAdmin?._id && (
            <div className="py-2">
              <AsyncSelect
                isMulti
                cacheOptions
                loadOptions={loadOptions}
                onChange={setSelectedUsers}
                defaultOptions
                placeholder="Search and select users..."
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "transparent",
                    borderColor: "#374151",
                    color: "white",
                    "&:hover": {
                      borderColor: "#4b5563",
                    },
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: "white",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: "#1f2937",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "white",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? "#374151" : "#1f2937",
                    color: state.isFocused ? "black" : "white",
                  }),
                }}
              />
              <div className="flex justify-center items-center">
                <button
                  className="btn btn-sm btn-outline btn-success text-white text-xs rounded-lg"
                  onClick={handleAddMembers}
                >
                  <AiOutlineUserAdd size={15} /> Add
                </button>
              </div>
            </div>
          )}

          <ul className="h-44 overflow-auto">
            {user?.users?.map((groupUser) => (
              <li
                key={groupUser._id}
                className="flex items-center gap-3 py-1 max-h-12 overflow-y-auto"
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
        </div>
      )}
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
      {user?._id === authUser?._id && (
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
