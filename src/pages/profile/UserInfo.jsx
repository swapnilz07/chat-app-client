/* eslint-disable react/prop-types */
export function UserInfo({ user }) {
  return (
    <>
      <div className="">
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
  );
}
