import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  BeakerIcon,
  LightBulbIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify"; // Import toast for notifications
import { Link } from "react-router-dom";

const navigation = [
  { name: "How It Works", href: "/how-it-works", icon: LightBulbIcon },
  { name: "Watermark Tools", href: "/upload-section", icon: BeakerIcon },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false); // New state for user dropdown
  const { user } = useAuth(); // Get user from AuthContext
  const dropdownRef = useRef(null); // Ref for dropdown to handle clicks outside

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.info("Logged out successfully!"); // Show success toast on logout
      setShowUserDropdown(false); // Close dropdown on logout
    } catch (error) {
      toast.error("Error logging out: " + error.message); // Show error toast if logout fails
    }
  };

  // Functions to manage modal visibility and switching
  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleSwitchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
    setMobileMenuOpen(false); // Close mobile menu if open
  };

  const handleSwitchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
    setMobileMenuOpen(false); // Close mobile menu if open
  };

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex items-center justify-between py-4 lg:py-6"
            aria-label="Global"
          >
            {/* Logo */}
            <div className="flex lg:flex-1">
              <a href="/" className="-m-1.5 p-1.5 flex items-center">
                <span className="sr-only">Watermark Challenger</span>
                <span className="text-2xl font-bold text-blue-600 hover:text-blue-500 transition-colors duration-200">
                  Watermark Challenger
                </span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="size-6" aria-hidden="true" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900 flex items-center group hover:text-blue-600 hover:underline transition-all duration-200"
                >
                  <item.icon className="size-5 mr-2 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" />
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Login/User Info */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-4">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  {" "}
                  {/* Added relative and ref */}
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition focus:outline-none"
                  >
                    Hello, {user.displayName || user.email}
                    <svg
                      className={`ml-1 h-5 w-5 transform transition-transform ${
                        showUserDropdown ? "rotate-180" : "rotate-0"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                      >
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600"
                          role="menuitem"
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 hover:underline transition"
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </button>
                  <button
                    onClick={() => setShowSignup(true)}
                    className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 transition hover:scale-105"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>

        {/* Mobile Slide Menu */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Watermark Challenger</span>
                <span className="text-2xl font-bold text-blue-600">
                  Watermark Challenger
                </span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="size-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center"
                    >
                      <item.icon className="size-6 mr-3 text-gray-500" />
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  {user ? (
                    <>
                      <span className="block text-base font-semibold leading-6 text-gray-900">
                        Hello, {user.displayName || user.email}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="mt-2 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-red-600 hover:bg-red-500 text-center w-full"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleSwitchToLogin} // Use handleSwitchToLogin
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 w-full text-left"
                      >
                        Log in
                      </button>
                      <button
                        onClick={handleSwitchToSignup} // Use handleSwitchToSignup
                        className="mt-2 -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-blue-600 hover:bg-blue-500 text-center w-full"
                      >
                        Sign up
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Modals */}
      {showLogin && (
        <LoginModal
          onClose={closeModals}
          onSwitchToSignup={handleSwitchToSignup} // Pass function to switch to signup
        />
      )}
      {showSignup && (
        <SignupModal
          onClose={closeModals}
          onSwitchToLogin={handleSwitchToLogin} // Pass function to switch to login
        />
      )}
    </>
  );
}

export default Header;
