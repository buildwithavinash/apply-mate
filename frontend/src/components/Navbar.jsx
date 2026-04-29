import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { MdKeyboardArrowDown, MdLogout, MdPerson, MdSettings } from "react-icons/md";
import Container from "./Container"
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import ConfirmDialog from "./ConfirmDialog";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { showToast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    logout();
    showToast("Signed out successfully", "success");
    setLogoutDialogOpen(false);
    setMenuOpen(false);
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
          <div className="relative">
            <button onClick={() => setMenuOpen((open) => !open)} className="flex items-center gap-2 rounded-md border border-zinc-200 px-2 py-1.5 text-zinc-700 transition hover:bg-zinc-50" aria-label="Open user settings">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-pale-sky-100 text-pale-sky-700">
                <MdPerson />
              </span>
              <span className="hidden max-w-28 truncate text-sm font-medium sm:block">{user?.name}</span>
              <MdKeyboardArrowDown className={`transition ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-md border border-zinc-200 bg-white p-2 shadow-lg">
                <div className="border-b border-zinc-100 px-2 py-2">
                  <p className="text-sm font-semibold text-zinc-900">{user?.name}</p>
                  <p className="truncate text-xs text-zinc-500">{user?.email}</p>
                </div>

                <div className="px-2 py-2 text-xs font-medium uppercase text-zinc-400 flex items-center gap-1">
                  <MdSettings />
                  Settings
                </div>

                <button onClick={() => setLogoutDialogOpen(true)} className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50">
                  <MdLogout className="text-lg" />
                  Sign out
                </button>
              </div>
            )}

            {logoutDialogOpen && (
              <ConfirmDialog
                title="Sign out?"
                message="You will need to log in again to manage your applications."
                confirmText="Sign out"
                danger
                onCancel={() => setLogoutDialogOpen(false)}
                onConfirm={handleLogout}
              />
            )}
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
