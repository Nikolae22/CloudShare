import React from 'react';
import ReactDOM from 'react-dom';

const SIZE_CLASSES = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
};

export default function Modal({
                                  isOpen,
                                  onClose,
                                  title = '',
                                  children,
                                  confirmText = 'Confirm',
                                  cancelText = 'Cancel',
                                  onConfirm,
                                  confirmationButtonClass = 'bg-blue-600 hover:bg-blue-700 text-white',
                                  size = 'md'
                              }) {
    if (!isOpen) return null;

    const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES['md'];

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`bg-white rounded shadow-lg w-full ${sizeClass} p-6 relative`}>
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl leading-none"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>

                {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

                <div className="mb-6">
                    {children}
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded"
                        onClick={onClose}
                    >
                        {cancelText}
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${confirmationButtonClass}`}
                        onClick={() => {
                            onConfirm?.();
                            onClose();
                        }}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}
