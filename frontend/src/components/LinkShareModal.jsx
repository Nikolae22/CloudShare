import React, { useState } from 'react';
import Modal from './Modal.jsx';

export default function LinkShareModal({
                                           isOpen,
                                           onClose,
                                           link,
                                           title = 'Share Link',
                                           message = 'You can share this link with others:',
                                       }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!link) return;

        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            confirmText="Close"
            cancelText=""
            onConfirm={onClose}
            confirmationButtonClass="bg-blue-600 hover:bg-blue-700 text-white"
            size="md"
        >
            <p className="mb-4 text-gray-700">{message}</p>

            <div className="flex items-center space-x-2 mb-6">
                <input
                    type="text"
                    value={link}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded bg-gray-100 text-sm text-gray-800"
                />
                <button
                    onClick={handleCopy}
                    className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
        </Modal>
    );
}
