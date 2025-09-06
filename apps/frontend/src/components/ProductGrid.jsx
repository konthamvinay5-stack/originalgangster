// apps/frontend/src/components/ProductGrid.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const sampleProducts = [
  {
    id: 1,
    name: "OG Tee",
    price: "₹999",
    image:
      "https://theogwear.com/cdn/shop/files/13.png?v=1755866489&width=1600",
  },
  {
    id: 2,
    name: "OG Comfort Slim Fit Shirt",
    price: "₹1,499",
    image:
      "https://theogwear.com/cdn/shop/files/18.png?v=1755866710&width=1600",
  },
  {
    id: 3,
    name: "OG Signature Hoodie",
    price: "₹1,899",
    image:
      "https://theogwear.com/cdn/shop/files/7.png?v=1755866763&width=1600",
  },
  {
    id: 4,
    name: "Killing It Up Brutal Hoodie",
    price: "₹799",
    image:
      "https://theogwear.com/cdn/shop/files/2_b2facaca-d3cb-44ff-ab0d-47df02230810.png?v=1755866554&width=1600",
  },
];

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {sampleProducts.map((product) => (
        <Link key={product.id} to={`/products/${product.id}`}>
          <motion.div
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-primary font-bold">{product.price}</p>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
