import { Upload, Trash, UploadCloud } from "lucide-react";

export default function DashboardUpload({
                                            files,
                                            onFileChange,
                                            onUpload,
                                            uploading,
                                            onRemoveFile,
                                            remainingUploads
                                        }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Upload Files</h2>

            <input
                type="file"
                multiple
                onChange={onFileChange}
                className="mb-4"
            />

            {remainingUploads > 0 && (
                <p className="text-sm text-gray-500 mb-2">
                    You can upload {remainingUploads} more file{remainingUploads > 1 ? 's' : ''}.
                </p>
            )}

            <ul className="space-y-2 mb-4">
                {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <button onClick={() => onRemoveFile(index)}>
                            <Trash size={16} className="text-red-500" />
                        </button>
                    </li>
                ))}
            </ul>

            <button
                onClick={onUpload}
                disabled={files.length === 0 || uploading}
                className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {uploading ? (
                    <>
                        <UploadCloud size={18} className="animate-spin" />
                        Uploading...
                    </>
                ) : (
                    <>
                        <Upload size={18} />
                        Upload Files
                    </>
                )}
            </button>
        </div>
    );
}
