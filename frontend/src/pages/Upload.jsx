import DashboardLayout from "../layout/DashboardLayout.jsx";
import {useContext, useState} from "react";
import {useAuth} from "@clerk/clerk-react";
import {UserCreditsContext} from "../context/UserCreditsContext.jsx";
import {AlertCircle} from "lucide-react";
import axios from "axios";
import {apiEndPoints} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import UploadBox from "../components/UploadBox.jsx";


export default function Upload() {

    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('') //suc \\ error
    const {getToken} = useAuth();
    const {credits, setCredits} = useContext(UserCreditsContext);

    const MAX_FILES = 5;

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        if (files.length + selectedFiles.length > MAX_FILES) {
            setMessage(`You can upload ${MAX_FILES} items at time`)
            setMessage('error');
            return;
        }

        //add the new files into the existsing files

        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        setMessage('');
        setMessageType('');

    }

    const handleRemoveFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        setMessageType('');
        setMessage('');

    }

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
            const response =await axios.post(apiEndPoints.UPLOAD_FILE, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data && response.data.remainingCredits !== undefined){
                setCredits( response.data.remainingCredits);
            }

            setMessage('Files uploaded succ');
            setMessageType('success');
            setFiles([])
        }catch (e){
            console.log('error uploading file'+ e)
            toast.error( "Something went wrong",e.message)
            setMessage(e.response?.data?.message || 'Error uploading files')
            setMessageType('error');
        }finally {
            setUploading(false);
        }
    }

    const isUploadDisable = files.length === 0 || files.length > MAX_FILES || credits <= 0 || files.length > credits;

    return (
        <DashboardLayout activeMenu="Upload">
            <div className="p-6">
                {message && (
                    <div
                        className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${messageType === 'error' ? 'bg-red-50 text-red-700' :
                            messageType === 'success' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                        {messageType === 'error' && <AlertCircle size={20}/>}
                        {message}
                    </div>
                )}
                <UploadBox
                    files={files}
                    onFileChange={handleFileChange}
                    onUpload={handleUpload}
                    onRemoveFile={handleRemoveFile}
                    remainingCredits={credits}
                    isUploadDisabled={isUploadDisable}
                />
            </div>
        </DashboardLayout>
    )
}