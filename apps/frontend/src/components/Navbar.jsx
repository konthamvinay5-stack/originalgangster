// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { ShoppingCart } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import { motion } from 'framer-motion';

// export default function Navbar(){
//   const { items } = useCart();
//   const location = useLocation();

//   return (
//     <motion.nav initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.35 }} className="bg-white border-b">
//       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//         <Link to="/" className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-slate-900 flex items-center justify-center text-white font-bold">OG</div>
//           <div>
//             <div className="font-extrabold text-lg">OriginalGangster</div>
//             <div className="text-xs text-slate-500 -mt-1">Modern apparel</div>
//           </div>
//         </Link>

//         <div className="hidden md:flex gap-6 items-center">
//           <NavLink to="/" active={location.pathname === '/'}>Home</NavLink>
//           <NavLink to="/products" active={location.pathname === '/products'}>Products</NavLink>
//           <NavLink to="/checkout" active={location.pathname === '/checkout'}>Checkout</NavLink>
//         </div>

//         <div className="flex items-center gap-3">
//           <Link to="/cart" className="relative p-2 rounded-lg hover:bg-slate-100">
//             <ShoppingCart />
//             {items.length > 0 && (
//               <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
//                 {items.reduce((s,i)=>s+i.qty,0)}
//               </span>
//             )}
//           </Link>

//           <div className="md:hidden">
//             <Link to="/products" className="px-3 py-2 rounded bg-slate-100">Browse</Link>
//           </div>
//         </div>
//       </div>
//     </motion.nav>
//   );
// }

// function NavLink({ to, children, active }) {
//   return (
//     <Link to={to} className={`text-sm font-medium ${active ? 'text-accent' : 'text-slate-700 hover:text-accent'}`}>
//       {children}
//     </Link>
//   );
// }
// src/components/Navbar.jsx
// import React from "react";
// import { Link, NavLink } from "react-router-dom";
// import { ShoppingBag, User } from "lucide-react";
// import { useCart } from "../context/CartContext";

// export default function Navbar() {
//   const { items } = useCart();
//   const count = items.reduce((sum, i) => sum + i.qty, 0);

//   return (
//     <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//         <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900">
//           OriginalGangster
//         </Link>
//         <nav className="hidden md:flex gap-6 font-medium text-slate-700">
//           <NavLink to="/" className={({ isActive }) => isActive ? "text-accent" : "hover:text-accent"}>Home</NavLink>
//           <NavLink to="/products" className={({ isActive }) => isActive ? "text-accent" : "hover:text-accent"}>Shop</NavLink>
//           {/* <NavLink to="/about" className={({ isActive }) => isActive ? "text-accent" : "hover:text-accent"}>About</NavLink> */}
//           {/* <NavLink to="/contact" className={({ isActive }) => isActive ? "text-accent" : "hover:text-accent"}>Contact</NavLink> */}
//         </nav>
//         <div className="flex items-center gap-4">
//           <Link to="/cart" className="relative inline-flex">
//             <ShoppingBag className="w-6 h-6" />
//             {count > 0 && (
//               <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full px-2 py-0.5">
//                 {count}
//               </span>
//             )}
//           </Link>
//           <Link to="/account"><User className="w-6 h-6" /></Link>
//         </div>
//       </div>
//     </header>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { ShoppingBag, User } from "lucide-react";
// import { useCart } from "../context/CartContext";

// export default function Navbar() {
//   const { items } = useCart();
//   const count = items.reduce((sum, i) => sum + i.qty, 0);

//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header
//       className={`border-b bg-white sticky top-0 z-50 shadow-sm transition-all duration-300 ${
//         isScrolled ? "py-2" : "py-4"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
//         {/* Logo */}
//         <Link
//           to="/"
//           className={`font-bold tracking-tight text-slate-900 transition-all duration-300 ${
//             isScrolled ? "text-xl" : "text-2xl"
//           }`}
//         >
//           OriginalGangster
//         </Link>

//         {/* Navigation */}
//         <nav className="hidden md:flex gap-6 font-medium text-slate-700">
//           {[
//             { label: "Home", to: "/" },
//             { label: "Shop", to: "/products" },
//           ].map((link) => (
//             <NavLink
//               key={link.label}
//               to={link.to}
//               className={({ isActive }) =>
//                 `relative transition-colors ${
//                   isActive ? "text-accent" : "hover:text-accent"
//                 } after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 
//                 after:bg-accent after:transition-all after:duration-300 hover:after:w-full`
//               }
//             >
//               {link.label}
//             </NavLink>
//           ))}
//         </nav>

//         {/* Icons */}
//         <div className="flex items-center gap-4">
//           <Link to="/cart" className="relative inline-flex">
//             <ShoppingBag className="w-6 h-6" />
//             {count > 0 && (
//               <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full px-2 py-0.5">
//                 {count}
//               </span>
//             )}
//           </Link>
//           <Link to="/account">
//             <User className="w-6 h-6" />
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/products" },
  ];

  return (
    <header
      className={`border-b bg-white sticky top-0 z-50 shadow-sm transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-11xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={`font-bold tracking-tight text-slate-900 transition-all duration-300 ${
            isScrolled ? "text-xl" : "text-2xl"
          }`}
        >
          OriginalGangster
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 font-medium text-slate-700">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `relative transition-colors ${
                  isActive ? "text-accent" : "hover:text-accent"
                } after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 
                after:bg-accent after:transition-all after:duration-300 hover:after:w-full`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link to="/cart" className="relative inline-flex">
            <ShoppingBag className="w-6 h-6" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full px-2 py-0.5">
                {count}
              </span>
            )}
          </Link>

          {/* Account */}
          <Link to="/account">
            <User className="w-6 h-6" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="flex flex-col gap-4 p-4 font-medium text-slate-700">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `relative transition-colors ${
                    isActive ? "text-accent" : "hover:text-accent"
                  } after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 
                  after:bg-accent after:transition-all after:duration-300 hover:after:w-full`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Cart & Account in Drawer */}
            <Link
              to="/cart"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 hover:text-accent"
            >
              <ShoppingBag className="w-5 h-5" />
              Cart ({count})
            </Link>
            <Link
              to="/account"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 hover:text-accent"
            >
              <User className="w-5 h-5" />
              Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
