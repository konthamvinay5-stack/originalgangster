// import React, { useEffect, useState, useMemo } from 'react';
// import ProductCard from '../components/ProductCard';
// import { motion } from 'framer-motion';
// import { Link } from "react-router-dom";

// export default function Products({ compact = false }) {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // UI state
//   const [query, setQuery] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
//   const [page, setPage] = useState(1);
//   const pageSize = 8;

//   useEffect(() => {
//     fetch('/api/products')
//       .then(r => r.json())
//       .then(data => {
//         setProducts(data);
//         setLoading(false);
//       }).catch(err => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   const filtered = useMemo(() => {
//     let out = products.slice();
//     if (query.trim()) {
//       const q = query.toLowerCase();
//       out = out.filter(p => p.name.toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q));
//     }
//     if (maxPrice) {
//       const mp = Number(maxPrice) || 0;
//       out = out.filter(p => p.price <= mp);
//     }
//     return out;
//   }, [products, query, maxPrice]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
//   useEffect(() => {
//     if (page > totalPages) setPage(1);
//   }, [totalPages]);

//   const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

//   if (loading) return <div className="container mx-auto px-6 py-16 text-center">Loading...</div>;

//   const gridCols = compact ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`container mx-auto px-6 py-6`}>
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//         <h2 className="text-2xl font-bold">All products</h2>
//         <div className="flex gap-3 items-center">
//           <input value={query} onChange={e=>{ setQuery(e.target.value); setPage(1); }} placeholder="Search products..." className="border px-3 py-2 rounded" />
//           <input type="number" value={maxPrice} onChange={e=>{ setMaxPrice(e.target.value); setPage(1); }} placeholder="Max price" className="border px-3 py-2 rounded w-32" />
//           <button onClick={() => { setQuery(''); setMaxPrice(''); setPage(1); }} className="px-3 py-2 rounded bg-slate-100">Reset</button>
//         </div>
//       </div>

//       {/* Product grid */}
//       <div className={`grid gap-6 ${gridCols}`}>
//         {pageItems.map(p => (
//           <Link key={p.id} to={`/products/${p.id}`} className="block">
//             <ProductCard product={p} />
//           </Link>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="mt-8 flex items-center justify-between">
//         <div className="text-sm text-slate-600">{filtered.length} results</div>
//         <div className="flex items-center gap-2">
//           <button disabled={page<=1} onClick={()=> setPage(p=>Math.max(1,p-1))} className="px-3 py-2 rounded bg-slate-100">Prev</button>
//           <div>Page {page} / {totalPages}</div>
//           <button disabled={page>=totalPages} onClick={()=> setPage(p=>Math.min(totalPages,p+1))} className="px-3 py-2 rounded bg-slate-100">Next</button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// export function Products(){
//   const [products, setProducts] = useState([]);
//   const [q, setQ] = useState("");
//   const [size, setSize] = useState("");

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch("http://localhost:4000/api/products");
//         const data = await res.json();
//         setProducts(data || []);
//       } catch (e) {
//         console.error(e);
//       }
//     })();
//   }, []);

//   const filtered = products.filter(p => {
//     const matchesQ = q ? (p.name?.toLowerCase().includes(q.toLowerCase()) || p.category?.toLowerCase().includes(q.toLowerCase())) : true;
//     const matchesSize = size ? (p.sizes?.includes(size)) : true;
//     return matchesQ && matchesSize;
//   });

//   return (
//     <div className="px-6 py-10 max-w-7xl mx-auto">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold">All Products</h1>
//         <div className="flex gap-2">
//           <input value={q} onChange={(e)=>setQ(e.target.value)} className="border rounded-xl px-3 py-2 w-56" placeholder="Search" />
//           <select value={size} onChange={(e)=>setSize(e.target.value)} className="border rounded-xl px-3 py-2">
//             <option value="">All sizes</option>
//             <option value="S">S</option>
//             <option value="M">M</option>
//             <option value="L">L</option>
//             <option value="XL">XL</option>
//           </select>
//         </div>
//       </div>

//       {filtered.length === 0 && (
//         <div className="p-10 text-center text-slate-500">No products found.</div>
//       )}

//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filtered.map((p) => (
//           <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="group bg-white rounded-2xl shadow hover:shadow-md transition overflow-hidden">
//             <Link to={`/products/${p.id}`}>
//               <div className="aspect-[4/5] overflow-hidden">
//                 <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition"/>
//               </div>
//               <div className="p-4">
//                 <div className="text-slate-500 text-xs">{p.category || 'Apparel'}</div>
//                 <div className="font-semibold leading-tight">{p.name}</div>
//                 <div className="mt-1 font-bold">₹{p.price}</div>
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Products;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


export function Products(){
const [products, setProducts] = useState([]);
useEffect(() => { fetch("/api/products").then(r => r.json()).then(setProducts).catch(console.error); }, []);
return (
<div className="px-6 py-10 max-w-7xl mx-auto">
<h1 className="text-2xl md:text-3xl font-bold mb-6">All Products</h1>
<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
{products.map((p) => (
<motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="group bg-white rounded-2xl shadow hover:shadow-md transition overflow-hidden">
<Link to={`/products/${p.id}`}>
<div className="aspect-[4/5] overflow-hidden">
<img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition"/>
</div>
<div className="p-4">
<div className="text-slate-500 text-xs">{p.category || 'Apparel'}</div>
<div className="font-semibold leading-tight">{p.name}</div>
<div className="mt-1 font-bold">₹{p.price}</div>
</div>
</Link>
</motion.div>
))}
</div>
</div>
);
}


export default Products;