import React from 'react';

function ConfirmationDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="dialog-backdrop">
      <div className="dialog">
        <p>{message}</p>
        <div className="dialog-buttons">
          <button onClick={onConfirm} className="danger">Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;