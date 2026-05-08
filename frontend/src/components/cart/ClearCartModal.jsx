import Button from "../ui/Button";

function ClearCartModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-2xl font-bold text-amber-800 mb-4">
          Clear Your Cart?
        </h3>
        <p className="text-gray-600 mb-6">
          This will remove all items from your cart. This action cannot be
          undone.
        </p>
        <div className="flex gap-4">
          <Button onClick={onConfirm} variant="danger" className="flex-1">
            Yes, Clear Cart
          </Button>
          <Button onClick={onCancel} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ClearCartModal;
