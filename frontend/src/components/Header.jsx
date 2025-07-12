// src/components/Header.jsx
"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  BeakerIcon,
  LightBulbIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

const navigation = [
  { name: "How It Works", href: "#how-it-works", icon: LightBulbIcon },
  { name: "Watermark Tools", href: "#upload-section", icon: BeakerIcon },
  { name: "Contact", href: "#contact", icon: PhoneIcon },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    // Applied backdrop-blur, slight opacity, and shadow for a modern, high-level look
    <header className="absolute inset-x-0 top-0 z-4">
      {/* Container added to align header content with main page content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Global"
          className="flex items-center justify-between py-4 lg:py-6" // Slightly reduced vertical padding for sleekness
        >
          {/* Logo/App Title */}
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5 flex items-center">
              <span className="sr-only">Watermark Challenger</span>
              <span className="text-2xl font-bold text-blue-600 hover:text-blue-500 transition-colors duration-200">
                Watermark Challenger
              </span>
            </a>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 flex items-center group hover:text-blue-600 hover:underline transition-all duration-200" // Added hover:underline
              >
                <item.icon
                  className="size-5 mr-2 text-gray-500 group-hover:text-blue-600 transition-colors duration-200"
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Login/Signup Buttons */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-4">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 hover:underline transition-colors duration-200 flex items-center"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200 transform hover:scale-105" // Added transform hover:scale-105
            >
              Sign up
            </a>
          </div>
        </nav>
      </div>
      {/* Mobile Dialog (Slide-over menu) */}
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
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
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
                    <item.icon
                      className="size-6 mr-3 text-gray-500"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
                <a
                  href="#"
                  className="mt-2 -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-blue-600 hover:bg-blue-500 text-center rounded-md"
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default Header;
