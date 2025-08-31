import { useState } from "react";
import {
    Menu,
    X,
    Home,
    User,
    LogOut,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const menuItems = [
        { icon: Home, label: "Dashboard", path: "/dashboard" },
        { icon: User, label: "Productos", path: "/products", badge: "" }
    ];

    const toggleSidebar = () => setIsOpen(!isOpen);
    const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

    return (
        <div>
            {/* Overlay para móvil */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleMobileSidebar}
                />
            )}

            {/* Botón hamburguesa para móvil */}
            <button
                onClick={toggleMobileSidebar}
                className="fixed top-4 left-4 z-50 p-2 bg-white shadow-lg rounded-lg lg:hidden hover:bg-gray-50 transition-colors"
            >
                <Menu className="w-6 h-6 text-gray-600" />
            </button>

            {/* Sidebar */}
            <aside
                className={`
        fixed top-0 left-0 z-50 h-full bg-white shadow-xl border-r border-gray-200
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-16"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div
                        className={`flex items-center space-x-3 transition-opacity duration-200 ${!isOpen && "opacity-0 lg:hidden"
                            }`}
                    >
                        {/* <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">A</span>
                        </div> */}
                        <img src="src/assets/tia-logo.png" alt="logo-tia" className="h-8" />
                        <h1 className="font-semibold text-gray-800">Market Project</h1>
                    </div>

                    {/* Botón colapsar - solo desktop */}
                    <button
                        onClick={toggleSidebar}
                        className="hidden lg:block p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {isOpen ? (
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        ) : (
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        )}
                    </button>

                    {/* Botón cerrar - solo móvil */}
                    <button
                        onClick={toggleMobileSidebar}
                        className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Navegación */}
                <nav className="p-4 space-y-2">
                    {menuItems.map((item, index) => {
                        const IconComponent = item.icon;

                        return (
                            <NavLink
                                key={index}
                                to={item.path}
                                onClick={() => setIsMobileOpen(false)}
                                className={({ isActive }) => `
    flex items-center space-x-3 px-3 py-2.5 rounded-lg w-full text-left
    transition-all duration-200 group relative
    ${isActive
                                        ? "bg-blue-50 text-blue-600 shadow-sm"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }
  `}
                            >
                                {({ isActive }) => (
                                    <>
                                        {/* Indicador activo */}
                                        {isActive && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
                                        )}

                                        <IconComponent
                                            className={`w-5 h-5 transition-colors ${isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"
                                                }`}
                                        />

                                        <span
                                            className={`font-medium transition-opacity duration-200 ${!isOpen && "opacity-0 lg:hidden"
                                                }`}
                                        >
                                            {item.label}
                                        </span>

                                        {item.badge && (
                                            <span
                                                className={`
            ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full
            transition-opacity duration-200
            ${!isOpen && "opacity-0 lg:hidden"}
          `}
                                            >
                                                {item.badge}
                                            </span>
                                        )}

                                        {/* Tooltip para sidebar colapsado */}
                                        {!isOpen && (
                                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                                                {item.label}
                                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-r-4 border-r-gray-900 border-t-2 border-b-2 border-t-transparent border-b-transparent" />
                                            </div>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <button
                        onClick={() => console.log("Cerrando sesión...")}
                        className={`
              flex items-center space-x-3 px-3 py-2.5 rounded-lg w-full text-left
              hover:bg-red-50 transition-colors group text-gray-700 hover:text-red-600 relative
            `}
                    >
                        <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
                        <span
                            className={`font-medium transition-opacity duration-200 ${!isOpen && "opacity-0 lg:hidden"
                                }`}
                        >
                            Cerrar Sesión
                        </span>

                        {/* Tooltip para cerrar sesión */}
                        {!isOpen && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                                Cerrar Sesión
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-r-4 border-r-gray-900 border-t-2 border-b-2 border-t-transparent border-b-transparent" />
                            </div>
                        )}
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
