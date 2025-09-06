// import React from 'react';
// import { Facebook, Instagram, Twitter } from 'lucide-react';

// export default function Footer(){
//   return (
//     <footer className="bg-slate-50 border-t mt-12">
//       <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-start gap-6">
//         <div>
//           <div className="font-bold text-lg">ErrorFit</div>
//         </div>

//         <div className="flex gap-4">
//           <a className="p-2 rounded hover:bg-slate-100"><Facebook /></a>
//           <a className="p-2 rounded hover:bg-slate-100"><Instagram /></a>
//           <a className="p-2 rounded hover:bg-slate-100"><Twitter /></a>
//         </div>
//       </div>
//     </footer>
//   );
// }
// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">OriginalGangster</h3>
          <p className="text-sm text-slate-400">Premium clothing for everyday comfort and style.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products" className="text-slate-400">All Products</Link></li>
            <li><Link to="/products?cat=men" className="text-slate-400">Men</Link></li>
            <li><Link to="/products?cat=women" className="text-slate-400">Women</Link></li>
            <li><Link to="/products?cat=new" className="text-slate-400">New Arrivals</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="text-slate-400">About Us</Link></li>
            <li><Link to="/contact" className="text-slate-400">Contact</Link></li>
            <li><Link to="/returns" className="text-slate-400">Returns</Link></li>
            <li><Link to="/policy" className="text-slate-400">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400"><Facebook/></a>
            <a href="#" className="text-slate-400"><Instagram/></a>
            <a href="#" className="text-slate-400"><Twitter/></a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-700 text-center py-4 text-sm text-slate-400">
        © {new Date().getFullYear()} OriginalGangster. All rights reserved.
      </div>
    </footer>
  );
}
// import React from "react";
// import { Link } from "react-router-dom";
// import { Facebook, Instagram, Twitter } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="bg-slate-900 text-slate-200 mt-12 text-sm">
//       {/* Accent top border */}
//       <div className="h-1 bg-accent w-full"></div>

//       {/* Top Footer */}
//       <div className="max-w-7xl mx-auto px-6 py-6 grid gap-6 md:grid-cols-4">
        
//         {/* Brand */}
//         <div>
//           <h3 className="text-lg font-bold mb-2">OriginalGangster</h3>
//           <p className="text-slate-400 text-xs">
//             Premium clothing for everyday comfort and style.
//           </p>
//         </div>

//         {/* Shop Links */}
//         <div>
//           <h4 className="font-semibold mb-2">Shop</h4>
//           <ul className="space-y-1">
//             {[
//               { label: "All Products", to: "/products" },
//               { label: "Men", to: "/products?cat=men" },
//               { label: "Women", to: "/products?cat=women" },
//               { label: "New Arrivals", to: "/products?cat=new" },
//             ].map((link) => (
//               <li key={link.label}>
//                 <Link
//                   to={link.to}
//                   className="relative text-slate-200 hover:text-accent transition-colors 
//                              after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 
//                              after:bg-accent after:transition-all after:duration-300 
//                              hover:after:w-full"
//                 >
//                   {link.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Company Links */}
//         <div>
//           <h4 className="font-semibold mb-2">Company</h4>
//           <ul className="space-y-1">
//             {[
//               { label: "About Us", to: "/about" },
//               { label: "Contact", to: "/contact" },
//               { label: "Returns", to: "/returns" },
//               { label: "Privacy Policy", to: "/policy" },
//             ].map((link) => (
//               <li key={link.label}>
//                 <Link
//                   to={link.to}
//                   className="relative text-slate-200 hover:text-accent transition-colors 
//                              after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 
//                              after:bg-accent after:transition-all after:duration-300 
//                              hover:after:w-full"
//                 >
//                   {link.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Newsletter + Socials */}
//         <div>
//           <h4 className="font-semibold mb-2">Stay Updated</h4>
//           <form className="flex gap-2">
//             <input
//               type="email"
//               placeholder="Your email"
//               className="px-2 py-1 rounded bg-slate-800 text-xs w-full focus:outline-none focus:ring-2 focus:ring-accent"
//             />
//             <button
//               type="submit"
//               className="px-3 py-1 bg-accent text-white rounded text-xs hover:bg-accent/90"
//             >
//               Join
//             </button>
//           </form>
//           <div className="flex gap-3 mt-3 text-slate-200">
//             <a href="#" className="hover:text-accent transition-colors"><Facebook size={16}/></a>
//             <a href="#" className="hover:text-accent transition-colors"><Instagram size={16}/></a>
//             <a href="#" className="hover:text-accent transition-colors"><Twitter size={16}/></a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-slate-700 text-center py-3 text-xs text-slate-400">
//         © {new Date().getFullYear()} OriginalGangster. All rights reserved.
//       </div>
//     </footer>
//   );
// }
