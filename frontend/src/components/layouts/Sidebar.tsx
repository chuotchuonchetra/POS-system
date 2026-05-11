import { LayoutDashboard, LogOut, Package, ReceiptText, Settings, ShoppingCart } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { getCurrentUser, hasAllowedRole, type UserRole } from "../../lib/auth"

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "owner"] },
  { to: "/cashier", label: "Cashier", icon: ShoppingCart, roles: ["admin", "owner", "cashier"] },
  { to: "/order", label: "Orders", icon: ReceiptText, roles: ["admin", "owner", "cashier"] },
  { to: "/products", label: "Products", icon: Package, roles: ["admin", "owner"] },
]

export const Sidebar = () =>{
  const navigate = useNavigate();
  const user = getCurrentUser();
  const visibleNavItems = navItems.filter((item) => hasAllowedRole(item.roles as UserRole[], user?.role));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return(
    <aside className="fixed inset-x-0 bottom-0 z-40 flex h-16 border-t border-slate-200 bg-white lg:inset-y-0 lg:left-0 lg:h-screen lg:w-64 lg:flex-col lg:border-r lg:border-t-0">
      <div className="border-b border-slate-200 px-5 py-5">
        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white">
            <ShoppingCart size={21} />
          </div>
          <div>
            <div className="text-base font-semibold leading-tight text-slate-950">POSify</div>
            <div className="text-xs font-medium text-slate-500">Retail operations</div>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 items-center justify-around overflow-x-auto px-2 py-2 lg:block lg:space-y-6 lg:overflow-y-auto lg:px-3 lg:py-5">
        <div className="w-full lg:w-auto">
          <div className="hidden px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 lg:block">Workspace</div>
          <div className="flex justify-around gap-1 lg:block lg:space-y-1">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex min-w-16 flex-col items-center gap-1 rounded-lg px-2 py-2 text-[11px] font-medium transition lg:min-w-0 lg:flex-row lg:gap-3 lg:px-3 lg:py-2.5 lg:text-sm ${
                      isActive
                        ? "bg-slate-950 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">System</div>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950">
            <Settings size={18} />
            Settings
          </button>
        </div>
      </nav>

      <div className="hidden border-t border-slate-200 p-4 lg:block">
        <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
            {(user?.name ?? "U").slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-slate-900">{user?.name ?? "Store User"}</div>
            <div className="truncate text-xs capitalize text-slate-500">{user?.role ?? "staff"}</div>
          </div>
          <button onClick={handleLogout} className="rounded-md p-2 text-slate-400 hover:bg-white hover:text-slate-700">
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </aside>
  )
}
