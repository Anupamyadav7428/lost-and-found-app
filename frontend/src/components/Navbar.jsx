import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import NotificationBell from "./NotificationBell";


const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }
    return (
        <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-sm font-bold text-blue-600 md:text-xl">
                Lost&Found
            </Link>

            {/* Right Side */}
            <div className="flex items-center gap-2 md:gap-4">
                {!user ? (
                    <>  <Link
                            to="/"
                            className="text-gray-600 hover:text-blue-600"
                        >
                            Home
                        </Link>
                        <Link
                            to="/login"
                            className="text-gray-600 hover:text-blue-600"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700"
                        >
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="text-gray-700 font-medium text-sm md:text-base mx-2">
                            Hi, {user.name}
                        </span>
                        <Link
                            to="/"
                            className="text-gray-600 hover:text-blue-600"
                        >
                            Home
                        </Link>

                        <Link
                            to="/profile"
                            className="text-gray-600 hover:text-blue-600"
                        >
                            Profile
                        </Link>
                        <NotificationBell/>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-1.5  rounded-md hover:bg-red-600"
                        >
                            Logout
                        </button>
                       
                    </>
                    
                )}
            </div>
        </nav>
    );
};

export default Navbar;