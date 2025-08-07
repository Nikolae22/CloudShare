import {useUser} from "@clerk/clerk-react";
import Navbar from "../components/Navbar.jsx";
import SideMenu from "../components/SideMenu.jsx";

export default function DashboardLayout({children,activeMenu}) {

    const {user} = useUser();


    return (
        <div>
            {/*Navabar components*/}
            <Navbar activeMenu={activeMenu}/>
            {user && (
                <div className='flex'>
                    <div className='max-[1080px]:hidden'>
                        {/*Side menu*/}
                        <SideMenu activeMenu={activeMenu}/>
                    </div>
                    <div className='grow mx-5'>{children}</div>
                </div>
            )}

        </div>
    )
}