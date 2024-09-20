/* eslint-disable react/prop-types */
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "../../api/authAPI";
import { addMember, removeMember } from "../../api/chatAPI";
import { fetchUsers } from "../../api/userAPI";
import toast from "react-hot-toast";
import { ProfileImage } from "./UserProfileImage";
import { GroupInfo } from "./GroupInfo";
import { GroupMembers } from "./GroupMembers";
import { AddMembers } from "./AddMembers";
import { UserInfo } from "./UserInfo";
import { LogOutButton } from "./LogOutButton";
import { RemoveMemberModal } from "./RemoveMemberModal";

function ProfilePage({ user, authUser }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userToRemove, setUserToRemove] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  const { mutate: removeFromGroup } = useMutation({
    mutationKey: ["removemember"],
    mutationFn: ({ chatId, userId }) => removeMember({ chatId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      toast.success("User removed from the group!");
      setUserToRemove(null);
    },
    onError: () => {
      toast.error("Failed to remove user from the group.");
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
      console.log("userIds==>.", userIds);
      addToGroup({ chatId: user._id, userId: userIds });
    } else {
      toast.error("Please select at least one user.");
    }
  };

  const handleRemoveUser = () => {
    removeFromGroup({ chatId: user._id, userId: userToRemove._id });
    setShowModal(false);
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
      <ProfileImage
        profileImg={user?.profileImg}
        altText={user?.name || "Profile Image"}
      />
      <GroupInfo user={user} formatDate={formatDate} />
      {user?.isGroupChat && (
        <>
          <h3 className="text-xl font-semibold text-center underline">
            Members
          </h3>
          <GroupMembers
            user={user}
            setUserToRemove={setUserToRemove}
            setShowModal={setShowModal}
          />

          {authUser._id === user?.groupAdmin?._id && (
            <AddMembers
              setSelectedUsers={setSelectedUsers}
              handleAddMembers={handleAddMembers}
              loadOptions={loadOptions}
            />
          )}
        </>
      )}
      {!user?.isGroupChat && <UserInfo user={user} />}
      {authUser?._id === user?.groupAdmin?._id && showModal && (
        <RemoveMemberModal
          userToRemove={userToRemove}
          handleRemoveUser={handleRemoveUser}
          setShowModal={setShowModal}
        />
      )}

      {user?._id === authUser?._id && <LogOutButton logout={logout} />}
    </div>
  );
}

export default ProfilePage;
