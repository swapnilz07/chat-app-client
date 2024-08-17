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
      body: JSON.stringify({ userId }), // Send the selected user's _id
    });

    if (!res.ok) throw new Error(data.error || "Something went wrong.");

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
