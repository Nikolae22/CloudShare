import DashboardLayout from "../layout/DashboardLayout.jsx";
import {useAuth} from "@clerk/clerk-react";
import {useContext, useEffect, useState} from "react";
import {UserCreditsContext} from "../context/UserCreditsContext.jsx";
import axios from "axios";
import {apiEndPoints} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import {Loader2} from "lucide-react";
import RecentFiles from "../components/RecentFiles.jsx";
import DashboardUpload from "../components/DashboardUpload.jsx";


export default function Dashboard() {

    const [files, setFiles] = useState([])
    const [uploadFiles, setUploadFiles] = useState([])
    const [uploading, setuploading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMesasge] = useState('')
    const [messageType, setMessageType] = useState('')
    const [remainingUploads, setRemainingUploads] = useState(5);
    const {getToken} = useAuth();

    const {fetchUserCredits} = useContext(UserCreditsContext);

    const MAX_FILES = 5;

    useEffect(() => {
        const fetchRecentFiles = async () => {
            setLoading(true);
            try {
                const token = await getToken();
                //use the existing endpoint
                const res = await axios.get(apiEndPoints.FETCH_FILES, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                //sort by uploadedat and take only the 5 most recent files

                const sortedFiles = res.data
                    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
                    .slice(0, 5);

                setFiles(sortedFiles);
            } catch (e) {
                console.error("Error fetching recent files ", e)
            } finally {
                setLoading(false)
            }
        }
        fetchRecentFiles();
    }, [getToken])

    const handleFileCahnge = (e) => {
        const selectedFiles = Array.from(e.target.files);

        //check if adding these files would exceed the limit
        if (uploadFiles.length + selectedFiles.length > MAX_FILES) {
            setMesasge(`You can only upload a maximum of ${MAX_FILES} files at ones`);
            setMessageType("error");
            return;
        }

        //add the new file to the existing files
        setUploadFiles(prevFiles => [...prevFiles, ...selectedFiles]);
        setMessageType("")
        setMesasge('')
    }

    //remove file ftom the uploaded list
    const handleRemoveFile = (index) => {
        setUploadFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        setMesasge('')
        setMessageType('')
    }


    //remaingong uploades
    useEffect(() => {
        setRemainingUploads(MAX_FILES - uploadFiles.length)
    }, [uploadFiles])


    //handle file upload
    const handleUpload = async () => {
        if (files.length === 0) {
            setMessageType('error');
            setMessage('Please select at least 1 file to upload');
            return;
        }

        if (files.length > MAX_FILES) {
            setMessage(`Only ${MAX_FILES} files at the time`)
            setMessageType('error');
        }
        setUploading(true);
        setMessage('Uploading files...')
        setMessageType('info');

        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));

        try {
            const token = await getToken();
            await axios.post(apiEndPoints.UPLOAD_FILE, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            })

            setMessage('Files uploaded succ');
            setMessageType('success');
            setFiles([])

            //refresh rhe recent files list
            const res = await axios.get(apiEndPoints.FETCH_FILES, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const sortedFiles = res.data
                .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
                .slice(0, 5);

            setFiles(sortedFiles);

            //refesh user credits imediately after succes upload
            await fetchUserCredits();

        } catch (e) {
            console.log('error uploading file' + e)
            toast.error("Something went wrong", e.message)
            setMessage(e.response?.data?.message || 'Error uploading files')
            setMessageType('error');
        } finally {
            setUploading(false);
        }
    }

    // useEffect(() => {
    //     const displayToken = async () => {
    //         const token = await getToken();
    //         console.log(token);
    //     }
    //     displayToken()
    // }, [])

    return (
        <div>
            <DashboardLayout activeMenu="Dashboard">
               <div className="p-6">
                   <h1 className="text-2xl font-bold mb-6">My Drive</h1>
                   <p className="text-gray-600 mb-6">Upload, manage, and share files</p>
                   {message && (
                       <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                           messageType === 'error' ? 'bg-red-50 text-red-700':
                               messageType === 'success' ? 'bg-green-50 text-green-700':
                                   'bg-purple-50 text-purple-700'
                       }`}>
                           {message}
                       </div>
                   )}
                   <div className="flex flex-col md:flex-row gap-6">
                       {/*left column*/}
                       <div className="w-full md:w-[40%]">
                           <DashboardUpload
                           files={uploadFiles}
                           onFileChange={handleFileCahnge}
                           onUpload={handleUpload}
                           uploading={uploading}
                           onRemoveFile={handleRemoveFile}
                           remainingUploads={remainingUploads}
                           />
                       </div>

                       {/*right column*/}
                       <div className="w-full md:w-[60%]">
                           {loading ? (
                               <div className="bg-white rounded-lg shadow p-8 flex items-center justify-center gap-3">
                                   <Loader2 size={40} className="text-purple-500 animate-spin" />
                                   <p className="text-gray-500">Loading your files...</p>
                               </div>
                           ) : (
                               <RecentFiles files={files} />
                           )}
                       </div>

                   </div>
               </div>
            </DashboardLayout>
        </div>
    )
}