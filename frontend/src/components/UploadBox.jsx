import React, { useState } from 'react';

export default function UploadBox({
                                      files = [],
                                      onFileChange,
                                      onUpload,
                                      onRemoveFile,
                                      remainingCredits = 0,
                                      isUploadDisabled = false,
                                  }) {
    const [isDragging, setIsDragging] = useState(false);

    const handleFiles = (fileList) => {
        const selectedFiles = Array.from(fileList);
        onFileChange?.(selectedFiles);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleInputChange = (e) => {
        handleFiles(e.target.files);
        e.target.value = ''; // reset input
    };

    return (
        <div className="border border-dashed border-gray-400 p-4 rounded-md bg-white shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload files ({remainingCredits} credits left)
            </label>

            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`w-full h-32 border-2 border-dashed rounded flex items-center justify-center transition-colors 
          ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}
            >
                <div className="text-center text-sm text-gray-600">
                    <p>Drag & drop files here</p>
                    <p>or</p>
                    <input
                        type="file"
                        multiple
                        onChange={handleInputChange}
                        className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer focus:outline-none"
                    />
                </div>
            </div>

            {files.length > 0 && (
                <div className="mt-4">
                    <ul className="space-y-2 text-sm text-gray-700">
                        {files.map((file, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
                            >
                                <span className="truncate">{file.name}</span>
                                <button
                                    onClick={() => onRemoveFile?.(index)}
                                    className="text-red-500 hover:text-red-700 text-xs font-medium"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="flex justify-end mt-4">
                <button
                    onClick={onUpload}
                    disabled={isUploadDisabled || files.length === 0}
                    className={`px-4 py-2 text-white text-sm rounded ${
                        isUploadDisabled || files.length === 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    Upload
                </button>
            </div>
        </div>
    );
}
