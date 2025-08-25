import DashboardLayout from "../layout/DashboardLayout.jsx";
import {useEffect, useState} from "react";
import {
    Copy,
    Download,
    Eye,
    File,
    FileIcon,
    FileText,
    Globe,
    Grid,
    Image,
    List,
    Lock,
    Music,
    Trash2,
    Video
} from "lucide-react";
import {useAuth} from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import FileCard from "../components/FileCard.jsx";
import {apiEndPoints} from "../util/apiEndpoints.js";
import ConfirmationDialog from "../components/ConfirmationDialog.jsx";
import LinkShareModal from "../components/LinkShareModal.jsx";


export default function MyFiles() {

    const [files, setFiles] = useState([]);
    const [viewMode, setViewMode] = useState("list");
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        isOpen: false,
        fileId: null
    })

    const [shareModal, setShareModal] = useState({
        isOpen: false,
        fileId: null,
        link: ''
    })

    const navigate = useNavigate();

    const {getToken} = useAuth();

    //Fetching files for a logged in user
    const fetchFiles = async () => {
        try {
            const token = await getToken();
            const response = await axios.get(apiEndPoints.FETCH_FILES,
                {headers: {Authorization: `Bearer ${token}`}})
            if (response.status === 200) {
                setFiles(response.data)
            }
        } catch (error) {
            console.log("Error fetching files to the server", error)
            toast.error("Error fetching files from the server", error.message)
        }
    }

    // Toggles the public/private status of a file
    const togglePublic = async (fileToUpdate) => {
        try {
            const token = await getToken();
            await axios.patch(apiEndPoints.TOGGLE_FILE(fileToUpdate.id),
                {}, {headers: {Authorization: `Bearer ${token}`}})
            setFiles(files.map((file) => file.id === fileToUpdate.id ? {...file, isPublic: !file.isPublic} : file))
        } catch (e) {
            console.log(e)
            toast.error('Error toggling file status', e.message)
        }
    }

    //handle file download
    const handleDownload = async (file) => {
        try {
            const token = getToken()
            const response = await axios.get(apiEndPoints.DOWNLOAD_FILE(file.id),
                {
                    headers: {Authorization: `Bearer ${token}`},
                    responseType: 'blob'
                });

            //create a blob url and triggere download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", file.name);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url) //clean up the object url
        } catch (e) {
            console.log(e);
            toast.error("Error downloading the file", e.message)
        }
    }

    //closes the delete confirmation
    const closeDeleteConfirmation = () => {
        setDeleteConfirmation({
            isOpen: false,
            fileId: null
        })
    }

    // opens the delete confirmation modal
    const openDeleteConfirmation = (fileId) => {
        setDeleteConfirmation({
            isOpen: true,
            fileId
        })
    }

    //delete a file after confirmation
    const handleDelete = async () => {
        const filedId = deleteConfirmation.fileId;
        if (!filedId) return;

        try {
            const token = await getToken();
            const response = await axios.delete(apiEndPoints.DELETE_FILE(filedId), {
                headers: {Authorization: `Bearer ${token}`}
            })
            if (response.status === 204) {
                setFiles(files.filter((file) => file.id !== filedId))
                setDeleteConfirmation();
            }
        } catch (e) {
            console.log(e)
            toast.error("Something went wrong" + e.message)
        }
    }

    //opens the share link modal
    const openShareModal = (fileId) => {
        const link = `${window.location.origin}/file/${fileId}`;
        setShareModal({
            isOpen: true,
            fileId,
            link
        })
    }

    //close the share link modal
    const closeShareModal = () => {
        setShareModal({
            isOpen: false,
            fileId: null,
            link: ''
        })
    }

    useEffect(() => {
        fetchFiles()
    }, [getToken()])

    const getFileIcon = (file) => {
        const extension = file.name.split('.').pop().toLowerCase();
        console.log(extension)
        if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
            return <Image size={24} className='text-purple-500'/>
        }

        if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(extension)) {
            return <Video size={24} className='text-blue-500'/>
        }
        if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extension)) {
            return <Music size={24} className='text-green-500'/>
        }

        if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension)) {
            return <FileText size={24} className='text-amber-500'/>
        }

        return <FileIcon size={24} className='text-purple-500'/>
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
                    <div className='grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {files.map((file) => (
                            <FileCard key={file.id}
                                      file={file}
                                      onDelete={openDeleteConfirmation}
                                      onTogglePuublic={togglePublic}
                                      onDownload={handleDownload}
                                      onShareLink={openShareModal}
                            />
                        ))}
                    </div>
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
                                            {getFileIcon(file)}
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
                                            <button
                                                onClick={() => togglePublic(file)}
                                                className='flex items-center gap-2 cursor-pointer group'>
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
                                                    onClick={() => openShareModal(file.id)}
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
                                                    onClick={() => handleDownload(file)}
                                                    title="Download"
                                                    className='text-gray-500 hover:text-blue-600'
                                                >
                                                    <Download size={18}/>
                                                </button>
                                            </div>
                                            <div className='flex justify-center'>
                                                <button
                                                    onClick={() => openDeleteConfirmation(file.id)}
                                                    title='Delete'
                                                    className='text-gray-500 hover:text-red-600'
                                                >
                                                    <Trash2 size={18}/>
                                                </button>
                                            </div>
                                            <div className='felx justify-center'>
                                                {file.isPublic ? (
                                                    <a href={`/file/${file.id}`}
                                                       title='View File'
                                                       target='_blank'
                                                       rel='noreferrer'
                                                       className='text-gray-500 hover:text-blue-600'>
                                                        <Eye size={18}/>
                                                    </a>
                                                ) : (
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
                {/*Delete confirmation dialog*/}
                <ConfirmationDialog
                    isOpen={deleteConfirmation.isOpen}
                    onClose={closeDeleteConfirmation}
                    title='Delete file'
                    message='Are you sure want to delete this file. This action cannot be undone'
                    confirmText='Delete'
                    cancelText='Cancel'
                    onConfirm={handleDelete}
                    confirmationButtonClass='bg-red-600 hover:bg-red-700'
                />

                {/*Share link modal*/}
                <LinkShareModal
                    isOpen={shareModal.isOpen}
                    onClose={closeShareModal}
                    link={shareModal.link}
                    title='Share File'
                />
            </div>
        </DashboardLayout>
    )
}