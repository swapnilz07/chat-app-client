/* eslint-disable react/prop-types */
export function RemoveMemberModal({
  userToRemove,
  handleRemoveUser,
  setShowModal,
}) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="p-3 rounded-lg shadow-lg bg-black/50">
        <h3 className="text-lg font-semibold">remove {userToRemove?.name}</h3>
        <div className="flex justify-end gap-4">
          <button
            className="btn btn-xs btn-outline btn-error"
            onClick={handleRemoveUser}
          >
            Remove
          </button>
          <button
            className="btn btn-xs btn-outline"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
