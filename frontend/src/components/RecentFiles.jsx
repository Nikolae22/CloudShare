
import { FileText } from "lucide-react";

export default function RecentFiles({ files }) {
    if (!files || files.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
                No recent files uploaded.
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Files</h2>

            <ul className="space-y-3">
                {files.map((file) => (
                    <li
                        key={file.id}
                        className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded"
                    >
                        <div className="flex items-center gap-2">
                            <FileText className="text-purple-500" size={18} />
                            <span className="text-sm text-gray-800">{file.originalName}</span>
                        </div>
                        <span className="text-xs text-gray-400">
                            {new Date(file.uploadedAt).toLocaleDateString()}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
