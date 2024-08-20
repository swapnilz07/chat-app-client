import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function ProfilePage() {
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong.");
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authuser"] });
      window.location.href = "/login";
    },
    onError: () => {
      toast.error("Logout failed.");
    },
  });

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  console.log("authUser in profile", authUser);

  return (
    <div className="max-w-sm p-4 bg-gray-800 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">
        <img
          className="w-32 h-32 rounded-full object-cover"
          src={
            authUser.profileImg ||
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt={authUser.name}
        />
      </div>
      <h2 className="text-2xl font-bold text-center">{authUser.name}</h2>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Email</h3>
        <p className="text-gray-400 ">{authUser.email}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">About</h3>
        <p className="text-gray-400">
          {authUser.about || "No information available."}
        </p>
      </div>
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
    </div>
  );
}

export default ProfilePage;
