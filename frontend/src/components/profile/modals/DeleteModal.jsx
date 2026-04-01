function DeleteModal({
  showDeleteConfirm,
  setShowDeleteConfirm,
  onDeleteAccount,
}) {
  if (!showDeleteConfirm) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-2xl font-bold text-red-600 mb-4">
          Delete Account?
        </h3>
        <p className="text-gray-600 mb-6">
          This action cannot be undone. All your data, orders, and saved
          addresses will be permanently removed.
        </p>
        <div className="flex gap-4">
          <button
            onClick={onDeleteAccount}
            className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
