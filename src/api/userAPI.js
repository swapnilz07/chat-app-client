export const fetchUsers = async (term) => {
  try {
    const res = await fetch(`/api/users/search?name=${term}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Something went wrong.");

    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong.");
  }
};

export const getAllUsers = async () => {
  try {
    const res = await fetch(`/api/users/getallusers`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Something went wrong.");

    return data;
  } catch (error) {
    console.log("Error fetching users", error.message);
    throw new Error(error.message || "Something went wrong.");
  }
};
