import React from "react";

const GlobalModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // don't render if closed

  return (
    <div className="modal modal-open">
      <div className="modal-box w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>

        {/* Body (dynamic content) */}
        <div className="space-y-4">{children}</div>

        {/* Footer */}
        <div className="modal-action">
          <button onClick={onClose} className="btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalModal;
