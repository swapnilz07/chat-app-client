export const fetchChats = async () => {
  try {
    const res = await fetch("/api/chat/fetchchats");
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Something went wrong.");

    return data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const accessChat = async (userId) => {
  try {
    const res = await fetch(`/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Something went wrong.");

    return data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const createGroupChat = async (groupName, selectedUsers) => {
  try {
    const res = await fetch(`/api/chat/creategroup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: groupName,
        users: JSON.stringify(selectedUsers),
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Something went wrong.");

    return data;
  } catch (error) {
    console.log(`Error in creating group chat: ${error.message}`);
    throw new Error(error.message);
  }
};

export const addMember = async ({ chatId, userId }) => {
  try {
    const res = await fetch("/api/chat/addToGroup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // The body should be stringified once and userId passed directly as an array or string
      body: JSON.stringify({
        chatId,
        userId, // Already an array, no need for JSON.stringify here
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Something went wrong.");

    return data;
  } catch (error) {
    console.error("Error in adding members to group:", error);
    throw new Error(error.response?.data?.message || "Failed to add members");
  }
};

export const removeMember = async ({ chatId, userId }) => {
  try {
    const res = await fetch(`/api/chat/removefromgroup`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId,
        userId,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Something went wrong.");

    return data;
  } catch (error) {
    console.error("Error in Removing members to group:", error);
    throw new Error(
      error.response?.data?.message || "Failed to Remove members"
    );
  }
};
