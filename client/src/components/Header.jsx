import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  Film, 
  Ticket, 
  Heart, 
  User, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X,
  Compass,
  CreditCard,
  Search,
  Sparkles
} from "lucide-react";

const Header = () => {
  const { user, role, isAdmin, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#00050d]/95 backdrop-blur-md border-b border-[#1f2e46] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo (Clean iMovies branding with Film Icon, no prime logo) */}
          <Link to={isAuthenticated ? "/home" : "/landing"} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#00a8e1]/15 text-[#00a8e1] flex items-center justify-center border border-[#00a8e1]/30 group-hover:bg-[#00a8e1] group-hover:text-slate-950 transition-all shadow-md shadow-[#00a8e1]/15">
              <Film className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center">
                i<span className="text-[#00a8e1]">Movies</span>
              </span>
              <span className="text-[9px] tracking-widest text-[#8197a4] uppercase -mt-1 hidden sm:block font-bold">
                Tickets Made Simple
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/home"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                isActive("/home")
                  ? "bg-[#00a8e1]/15 text-[#00a8e1] border border-[#00a8e1]/30 font-bold"
                  : "text-slate-300 hover:text-white hover:bg-[#1a2436]/60"
              }`}
            >
              <Compass className="w-4 h-4 text-[#00a8e1]" />
              Explore Movies
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/favoriteshows"
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                    isActive("/favoriteshows")
                      ? "bg-[#00a8e1]/15 text-[#00a8e1] border border-[#00a8e1]/30 font-bold"
                      : "text-slate-300 hover:text-white hover:bg-[#1a2436]/60"
                  }`}
                >
                  <Heart className="w-4 h-4 text-rose-400" />
                  Watchlist
                </Link>

                <Link
                  to="/bookings"
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                    isActive("/bookings")
                      ? "bg-[#00a8e1]/15 text-[#00a8e1] border border-[#00a8e1]/30 font-bold"
                      : "text-slate-300 hover:text-white hover:bg-[#1a2436]/60"
                  }`}
                >
                  <Ticket className="w-4 h-4 text-[#00a8e1]" />
                  My Tickets
                </Link>

                {isAdmin && (
                  <>
                    <Link
                      to="/admin"
                      className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                        isActive("/admin")
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                          : "text-amber-300 hover:text-white hover:bg-amber-500/10"
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      Admin Dashboard
                    </Link>

                    <Link
                      to="/admin/transactions"
                      className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                        isActive("/admin/transactions")
                          ? "bg-[#00a8e1]/20 text-[#00a8e1] border border-[#00a8e1]/30"
                          : "text-slate-300 hover:text-white hover:bg-[#1a2436]/60"
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-[#00a8e1]" />
                      Refunds & Razorpay
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#1a2436] border border-[#1f2e46] hover:border-[#00a8e1]/60 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#00a8e1]/20 text-[#00a8e1] flex items-center justify-center font-bold text-xs uppercase border border-[#00a8e1]/30">
                    {user?.username?.charAt(0) || "U"}
                  </div>
                  <span className="text-sm font-medium text-slate-200 pr-1">
                    {user?.username}
                  </span>
                  {isAdmin && (
                    <span className="text-[10px] uppercase font-black tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Admin
                    </span>
                  )}
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-[#8197a4] hover:text-rose-400 hover:bg-[#1a2436] transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-bold text-slate-200 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg text-sm font-black bg-[#00a8e1] hover:bg-[#1a98ff] text-slate-950 transition-all shadow-md shadow-[#00a8e1]/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a2436]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1f2e46] bg-[#0a0e17] px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/home"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-[#1a2436]"
          >
            Explore Movies
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/favoriteshows"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-[#1a2436]"
              >
                Watchlist
              </Link>
              <Link
                to="/bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-[#1a2436]"
              >
                My Tickets
              </Link>
              {isAdmin && (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-amber-300 hover:bg-amber-500/10"
                  >
                    Admin Dashboard
                  </Link>
                  <Link
                    to="/admin/transactions"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#00a8e1] hover:bg-[#1a2436]"
                  >
                    Refunds & Transactions
                  </Link>
                </>
              )}
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-[#1a2436]"
              >
                Profile ({user?.username})
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-500/10"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center rounded-lg text-sm font-bold bg-[#1a2436] text-white"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center rounded-lg text-sm font-black bg-[#00a8e1] text-slate-950"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
