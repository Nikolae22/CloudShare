import {BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Upload from "./pages/Upload.jsx";
import MyFiles from "./pages/MyFiles.jsx";
import Subscription from "./pages/Subscription.jsx";
import Transactions from "./pages/Transactions.jsx";


export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Landing/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/upload' element={<Upload/>}/>
                <Route path='/my-files' element={<MyFiles/>}/>
                <Route path='/subscriptions' element={<Subscription/>}/>
                <Route path='/transactions' element={<Transactions/>}/>
            </Routes>
        </BrowserRouter>
    )
}