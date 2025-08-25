import DashboardLayout from "../layout/DashboardLayout.jsx";
import {useState} from "react";
import {Copy, Download, Eye, File, Globe, Grid, List, Lock, Trash2} from "lucide-react";
import {useAuth} from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";


export default function MyFiles() {

    const [files, setFiles] = useState([]);
    const [viewMode, setViewMode] = useState("list");

    const navigate = useNavigate();

    const {getToken} = useAuth();

    const fetchFiles = async () => {
        try {
            const token = await getToken();
            const response = await axios.get('http://localhost:8080/api/files/my',
                {headers: {Authorization: `Bearer ${token}`}})
            if (response.status === 200) {
                setFiles(response.data)
            }
        } catch (error) {
            console.log("Error fetching files to the server", error)
            toast.error("Error fetching files from the server", error.message)
        }
    }


    return (
        <DashboardLayout activeMenu="My Files">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className='text-2xl font-bold'>
                        My files {files.length}
                    </h2>
                    <div className='flex items-center gap-3'>
                        <List
                            onClick={() => setViewMode("list")}
                            size={24}
                            className={`cursor-pointer transition-colors 
                        ${viewMode === 'list' ? 'text-blue-600' :
                                'text-gray-400 hover:text-gray-600'}
                        `}/>
                        <Grid
                            size={24}
                            onClick={() => setViewMode("grid")}
                            className={`cursor-pointer transition-colors 
                        ${viewMode === 'grid' ? 'text-blue-600' :
                                'text-gray-400 hover:text-gray-600'}
                        `}
                        />
                    </div>
                </div>
                {files.length === 0 ? (
                    <div className='bg-white rounded-lg shadow p-12 flex flex-col items-center justify-center'>
                        <File size={60}
                              className='text-purple-300 mb-4'
                        />
                        <h3 className='text-xl font-medium text-gray-700 mb-2'>
                            No files uploaded yet
                        </h3>
                        <p className='text-gray-500 text-center max-2-md mb-6'>
                            Start uploading files.
                        </p>
                        <button
                            onClick={() => navigate("/upload")}
                            className='px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors'>
                            Go to Upload
                        </button>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div>Grid view</div>
                ) : (
                    <div className='overflow-x-auto bg-white rounded-lg shadow'>
                        <table className='min-w-full'>
                            <thead className='bg-gray-50 border-b border-gray-200'>
                            <tr>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 ippercase tracking-wider'>Name</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 ippercase tracking-wider'>Size</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 ippercase tracking-wider'>Uploaded</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 ippercase tracking-wider'>Sharing</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 ippercase tracking-wider'>Actions</th>
                            </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200'>
                            {files.map((file) => (
                                <tr key={file.id} className='hover:bg-gray-50 transition-colors'>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                        <div className="flex items-center gap-2">
                                            <File size={20} className='text-blue-600'/>
                                            {file.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {(file.size / 1024).toFixed(1)} KB
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {new Date(file.uoloadedAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <div className='flex items-center gap-4'>
                                            <button className='flex items-center gap-2 cursor-pointer group'>
                                                {file.isPublic ? (
                                                    <>
                                                        <Globe size={16} className='text-green-500'/>
                                                        <span className='group-hover:underline'>
                                                            Public
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Lock size={16} className='text-gray-500'/>
                                                        <span className='group-hover:underline'>
                                                            Private
                                                        </span>
                                                    </>
                                                )}
                                            </button>
                                            {file.isPublic && (
                                                <button
                                                    className='flex items-center gap-2 cursor-pointer group text-blue-600'>
                                                    <Copy size={16}/>
                                                    <span className='group-hover:underline'>
                                                        Share link
                                                    </span>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 whitespae-nowrap text-sm font-medium'>
                                        <div className='grid grid-cols-3 gap-4'>
                                            <div className='flex justify-center'>
                                                <button
                                                    title="Download"
                                                    className='text-gray-500 hover:text-blue-600'
                                                >
                                                    <Download size={18}/>
                                                </button>
                                            </div>
                                            <div className='flex justify-center'>
                                                <button
                                                    title='Delete'
                                                    className='text-gray-500 hover:text-red-600'
                                                >
                                                    <Trash2 size={18}/>
                                                </button>
                                            </div>
                                            <div className='felx justify-center'>
                                                {file.isPublic ? (
                                                    <Link to={`/file/${file.id}`} className='text-gray-500 hover:text-blue-600'>
                                                        <Eye size={18}/>
                                                    </Link>
                                                ):(
                                                    <span className='w-[18px]'></span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}