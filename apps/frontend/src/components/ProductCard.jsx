
import React from "react";
import { Card } from "../lib/shadcn";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.div whileHover={{ y: -6 }} className="w-full">
      <Card className="h-full">
        <div className="flex flex-col h-full">
          {/* Wrap image + title inside Link to navigate to details */}
          <Link to={`/products/${product.id}`} className="rounded-lg overflow-hidden block">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover"
            />
          </Link>

          <div className="mt-4 flex-1 flex flex-col">
            <div className="flex justify-between items-start">
              <Link to={`/products/${product.id}`}>
                <h3 className="font-semibold text-lg hover:underline">{product.name}</h3>
              </Link>
              <div className="text-sm text-slate-500">⭐ {product.rating}</div>
            </div>

            <p className="text-slate-600 mt-2 text-sm flex-1 line-clamp-2">
              {product.description}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-xl font-bold">₹{product.price}</div>
                <div className="text-xs text-slate-500">Inclusive of taxes</div>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={() => addToCart(product, 1)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent text-white hover:opacity-95"
              >
                <ShoppingCart size={16} />
                Add
              </button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
