import { Link } from "react-router-dom"

export const Sidebar = () =>{
    return(
        <div className="fixed left-0 top-0 h-full w-56 bg-white border-r border-gray-100 flex flex-col z-40">
            <div className="px-5 py-5 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                    <path d="M8 21h8M12 17v4"/>
                    </svg>
                </div>
                <div>
                    <div className="text-sm font-semibold text-gray-900">POSify</div>
                    <div className="text-xs text-gray-400">Retail System</div>
                </div>
                </div>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                <div className="tag text-gray-400 px-2 mb-2">Main</div>
                    <Link to={'/cashier'} className="nav-item w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-600 font-medium  hover:bg-black hover:text-white" id="nav-cashier">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                            <rect x="2" y="3" width="20" height="14" rx="2"/>
                            <path d="M8 21h8M12 17v4"/>
                        </svg>
                        Cashier
                    </Link>
                <Link to={'/order'} className="nav-item w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-600 font-medium  hover:bg-black hover:text-white" id="nav-orders">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                    <rect x="9" y="3" width="6" height="4" rx="1"/>
                    <path d="M9 12h6M9 16h4"/>
                </svg>
                Orders
                </Link>

                <div className="tag text-gray-400 px-2 mt-4 mb-2">Admin</div>
                <Link to={'/products'} className="nav-item w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-600 font-medium hover:bg-black hover:text-white" id="nav-products" >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                </svg>
                Products
                </Link>
                <Link to={'/dashboard'}  className="nav-item w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-600 font-medium  hover:bg-black hover:text-white" id="nav-dashboard">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                    <rect x="3" y="3" width="7" height="7" rx="1"/>
                    <rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/>
                    <rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
                Dashboard
                </Link>
            </nav>

            <div className="px-3 pb-4">
                <div className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-semibold">KS</div>
                    <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">Kasem S.</div>
                    <div className="text-xs text-gray-400">Cashier</div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                    </svg>
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}