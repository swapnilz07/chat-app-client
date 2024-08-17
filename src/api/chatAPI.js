export const fetchChats = async () => {
  try {
    const res = await fetch("/api/chat/fetchchats");
    if (!res.ok) throw new Error(data.error || "Something went wrong.");

    const data = await res.json();
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

    if (!res.ok) throw new Error(data.error || "Something went wrong.");

    const data = await res.json();
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

    if (!res.ok) throw new Error(data.error || "Something went wrong.");

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
