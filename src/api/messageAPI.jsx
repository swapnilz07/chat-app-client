export const fetchMessages = async (chatId) => {
  try {
    const res = await fetch(`/api/message/${chatId}`);

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Something went wrong.");

    return data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const sendMessageAPI = async (messageData) => {
  const res = await fetch(`/api/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Something went wrong.");

  return data;
};
