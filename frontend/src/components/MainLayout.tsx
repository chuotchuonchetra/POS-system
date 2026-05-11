import { Outlet } from "react-router-dom"
import { Sidebar } from "./layouts/Sidebar"

const MainLayout = ()=>{
    return(
        <div className="min-h-screen bg-slate-50 text-slate-950">
            <Sidebar />
            <div className="pb-16 lg:pl-64 lg:pb-0">
                <main className="min-h-screen">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}

export default MainLayout
