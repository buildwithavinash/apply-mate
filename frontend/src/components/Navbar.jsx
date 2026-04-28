import { Link, useNavigate } from "react-router-dom"
import { MdLogout } from "react-icons/md";
import Container from "./Container"
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-b-zinc-200 bg-white/85 py-2 shadow-xs backdrop-blur-lg">
        <Container>
            <div className="flex items-center justify-between">

        <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-2xl font-semibold text-pale-sky-500">
            ApplyMate
        </Link>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-zinc-600 sm:block">{user?.name}</span>
            <button onClick={handleLogout} className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-lg text-zinc-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600" aria-label="Log out">
              <MdLogout />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm font-medium">
            <Link to="/login" className="text-zinc-600 transition hover:text-pale-sky-600">Log in</Link>
            <Link to="/signup" className="rounded-md bg-pale-sky-500 px-3 py-1.5 text-white transition hover:bg-pale-sky-600">Sign up</Link>
          </div>
        )}
            </div>
        </Container>
    </header>
  )
}

export default Navbar
