/* eslint-disable react/prop-types */
export function LogOutButton({ logout }) {
  return (
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
  );
}
