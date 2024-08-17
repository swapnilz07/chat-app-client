/* eslint-disable react/prop-types */
import { useState } from "react";
import AsyncSelect from "react-select/async";
import { createGroupChat } from "../../api/chatAPI"; // Import the API function
import { fetchUsers } from "../../api/userAPI";

function GroupChatModal({ onCreateGroup, onClose }) {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  const loadOptions = async (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
      return;
    }

    try {
      const fetchedUsers = await fetchUsers(inputValue);
      const options = fetchedUsers.map((user) => ({
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

  const handleCreateGroup = async () => {
    if (!groupName || selectedUsers.length < 2) {
      alert("Please enter a group name and select at least two users.");
      return;
    }

    setIsCreating(true);
    try {
      const selectedUserIds = selectedUsers.map((user) => user.value);
      const newGroupChat = await createGroupChat(groupName, selectedUserIds);
      onCreateGroup(newGroupChat); // Callback to notify parent component
      onClose(); // Close the modal on success
    } catch (error) {
      console.error("Failed to create group chat:", error.message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Create Group Chat</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Group Name</label>
        <input
          type="text"
          className="w-full p-2 bg-gray-700 rounded-md text-white"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Select Users</label>
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
          getOptionLabel={(e) => (
            <div className="flex items-center">
              <img
                src={
                  e.profileImg ||
                  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                }
                alt={e.label}
                className="w-8 h-8 rounded-full inline-block mr-2"
              />
              <span>{e.label}</span>
            </div>
          )}
        />
      </div>

      <div className="flex justify-end">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateGroup}
          disabled={isCreating}
        >
          {isCreating ? "Creating..." : "Create Group"}
        </button>
      </div>
    </div>
  );
}

export default GroupChatModal;
