import Button from "../../ui/Button";

function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "danger",
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        {/* Title */}
        <h3 className="text-2xl font-bold text-amber-800 mb-3">{title}</h3>

        {/* Description */}
        <p className="text-gray-600 mb-6">{description}</p>

        {/* Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={onConfirm}
            variant={confirmVariant}
            className="flex-1"
            disabled={loading}
          >
            {loading ? "Processing..." : confirmText}
          </Button>

          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1"
            disabled={loading}
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
