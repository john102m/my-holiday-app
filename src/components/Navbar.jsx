// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        // <nav className="fixed top-0 left-0 w-full bg-blue-600 p-4 text-white flex space-x-6">
        <nav className="fixed top-0 left-0 w-full bg-blue-600 p-4 text-white flex space-x-6 z-50 shadow-md">

            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                }
            >
                Home
            </NavLink>
            <NavLink
                to="/package/1"
                className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                }
            >
                Sample Package
            </NavLink>

            <NavLink
                to="/reservations"
                className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                }
            >
                Reservations
            </NavLink>

            {/* Add more nav links here */}
        </nav>
    )
}

export default Navbar
