export const signupUser = async ({ name, email, password }) => {
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to create account.");

    return data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const LoginUser = async ({ email, password }) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to Login.");

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getMe = async () => {
  try {
    const res = await fetch("/api/auth/me");
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Something went wrong.");

    // console.log("AuthUser ==>>", data);
    return data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
