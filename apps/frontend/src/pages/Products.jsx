import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">All Products</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-white rounded-2xl shadow hover:shadow-md transition overflow-hidden"
          >
            {/* Use frontend route for React Router */}
            <Link to={`/products/${p.id}`}>
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <div className="p-4">
                <div className="text-slate-500 text-xs">
                  {p.category || "Apparel"}
                </div>
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

export default products;
