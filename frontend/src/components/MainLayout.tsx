import { Outlet } from "react-router-dom"
import { Sidebar } from "./layouts/Sidebar"
import { Footer } from "./Footer"

const MainLayout = ()=>{
    return(
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="ms-56 flex-1 flex relative ">
                <main className="flex-1">
                    <Outlet/>
                </main>
               <div className="flex-2 absolute bottom-0  w-full">
                 <Footer/>
               </div>
            </div>
        </div>
    )
}

export default MainLayout