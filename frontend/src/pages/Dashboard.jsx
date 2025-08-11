import DashboardLayout from "../layout/DashboardLayout.jsx";
import {useAuth} from "@clerk/clerk-react";
import {useEffect} from "react";


export default function Dashboard() {

    const {getToken} = useAuth();

    useEffect(() => {
        const displayToken = async () => {
            const token = await getToken();
            console.log(token);
        }
        displayToken()
    }, [])

    return (
        <div>
            <DashboardLayout activeMenu="Dashboard">
                <div>
                    Dashbord contetn
                </div>
            </DashboardLayout>
        </div>
    )
}