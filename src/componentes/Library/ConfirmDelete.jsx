const ConfirmDelete = ({ isOpen, onConfirm, onCancel, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 font-sf">
      <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-6 w-1/3 h-80 flex items-center justify-center">
        <div className="w-full text-center">
          <h2 className="text-white text-4xl mb-4 font-bold">{title}</h2>
          <p className="text-white/80 text-lg mb-8">{message}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onCancel}
              className="px-6 py-2 rounded-full transition-all duration-300 button-filters font-bold"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="rounded-full button2 text-white px-6 font-bold"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
