// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import { useCart } from "../context/CartContext";  // ✅ import cart context

// // const ProductDetails = () => {
// //   const { id } = useParams(); 
// //   const [product, setProduct] = useState(null);
// //   const { addToCart } = useCart();  // ✅ get addToCart function

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         const res = await fetch(`http://localhost:4000/api/products/${id}`);
// //         const data = await res.json();
// //         setProduct(data);
// //       } catch (err) {
// //         console.error("Error fetching product details:", err);
// //       }
// //     };

// //     fetchProduct();
// //   }, [id]);

// //   if (!product) return <p>Loading...</p>;

// //   return (
// //     <div className="p-6 max-w-4xl mx-auto">
// //       <div className="flex flex-col md:flex-row gap-6">
// //         <img
// //           src={product.image || "https://via.placeholder.com/300"}
// //           alt={product.name}
// //           className="w-full md:w-1/2 rounded-lg shadow-lg"
// //         />
// //         <div className="flex-1">
// //           <h2 className="text-2xl font-bold">{product.name}</h2>
// //           <p className="text-gray-600 mt-2">{product.description}</p>
// //           <p className="text-lg font-semibold mt-4">₹ {product.price}</p>

// //           {/* Use addToCart onClick */}
// //           <button
// //             onClick={() => addToCart(product, 1)}
// //             className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
// //           >
// //             Add to Cart
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductDetails;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useCart } from "../context/CartContext";  // ✅ import cart context

// const ProductDetails = () => {
//   const { id } = useParams(); 
//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(""); // ✅ track size
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`http://localhost:4000/api/products/${id}`);
//         const data = await res.json();
//         setProduct(data);
//       } catch (err) {
//         console.error("Error fetching product details:", err);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <div className="flex flex-col md:flex-row gap-8">
        
//         {/* Product Image */}
//         <img
//           src={product.image || "https://via.placeholder.com/400"}
//           alt={product.name}
//           className="w-full md:w-1/2 rounded-lg shadow-lg object-cover"
//         />
        
//         {/* Product Info */}
//         <div className="flex-1">
//           <h2 className="text-3xl font-bold">{product.name}</h2>
//           <p className="text-gray-600 mt-3">{product.description}</p>
//           <p className="text-xl font-semibold mt-4">₹ {product.price}</p>

//           {/* ✅ Size Chart */}
//           <div className="mt-6">
//             <h3 className="font-semibold mb-2">Select Size</h3>
//             <div className="flex gap-3">
//               {["S", "M", "L", "XL"].map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-4 py-2 border rounded-lg ${
//                     selectedSize === size
//                       ? "bg-black text-white"
//                       : "bg-white text-black hover:bg-gray-200"
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//             {selectedSize === "" && (
//               <p className="text-sm text-red-500 mt-2">
//                 Please select a size before adding to cart
//               </p>
//             )}
//           </div>

//           {/* ✅ Add to Cart */}
//           <button
//             onClick={() => {
//               if (!selectedSize) return;
//               addToCart({ ...product, size: selectedSize }, 1);
//             }}
//             className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
//             disabled={!selectedSize}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>

//       {/* ✅ Extra Details */}
//       <div className="mt-12">
//         <h3 className="text-2xl font-bold mb-4">Product Details</h3>
//         <ul className="list-disc ml-6 space-y-2 text-gray-700">
//           <li>Material: 100% Cotton</li>
//           <li>Fit: Regular</li>
//           <li>Wash Care: Machine wash cold, do not bleach</li>
//           <li>Delivery: Usually delivered in 4-5 business days</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// // export default ProductDetails;
// import React, { useEffect, useMemo, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { motion } from "framer-motion";
// import { Star, ShieldCheck, Truck, ArrowLeft } from "lucide-react";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState("");
//   const [qty, setQty] = useState(1);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     let isMounted = true;
//     (async () => {
//       try {
//         const res = await fetch(`http://localhost:4000/api/products/${id}`);
//         const data = await res.json();
//         if (isMounted) setProduct(data);
//       } catch (err) {
//         console.error("Error fetching product details:", err);
//       }
//     })();
//     return () => { isMounted = false; };
//   }, [id]);

//   const priceFmt = useMemo(() => (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n), []);

//   if (!product) return <div className="p-10 text-center text-slate-500">Loading…</div>;

//   const sizes = product?.sizes?.length ? product.sizes : ["S", "M", "L", "XL"];

//   function handleAdd() {
//     if (!selectedSize) return;
//     const cartItem = {
//       ...product,
//       // composite id ensures S and M become separate lines in cart
//       id: `${product.id}-${selectedSize}`,
//       productId: product.id,
//       size: selectedSize,
//       image: product.image,
//       name: product.name,
//       price: product.price,
//     };
//     addToCart(cartItem, qty);
//   }

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 py-8 max-w-7xl mx-auto">
//       {/* Breadcrumb */}
//       <nav className="text-sm text-slate-500 flex items-center gap-2 mb-6">
//         <Link to="/" className="hover:text-slate-800">Home</Link>
//         <span>/</span>
//         <Link to="/products" className="hover:text-slate-800">Products</Link>
//         <span>/</span>
//         <span className="text-slate-700">{product.name}</span>
//       </nav>

//       <div className="grid md:grid-cols-2 gap-10 items-start">
//         <motion.img
//           key={product.image}
//           src={product.image || "https://via.placeholder.com/600x700"}
//           alt={product.name}
//           className="w-full rounded-2xl shadow object-cover"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//         />

//         <div>
//           <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
//           <div className="mt-2 flex items-center gap-3 text-sm">
//             <span className="inline-flex items-center gap-1 text-amber-600"><Star size={16} /> 4.6</span>
//             <span className="text-slate-400">•</span>
//             <span className="text-slate-600">{product.category || "Apparel"}</span>
//           </div>
//           <div className="mt-4 text-3xl font-extrabold">{priceFmt(product.price)}</div>

//           <p className="mt-4 text-slate-700 leading-relaxed">{product.description || "Premium cotton with a soft, breathable finish. Designed for daily comfort with a modern fit."}</p>

//           {/* Sizes */}
//           <div className="mt-6">
//             <div className="flex items-center justify-between">
//               <h3 className="font-semibold">Select Size</h3>
//               <Link to="#" className="text-sm text-accent hover:underline">Size Guide</Link>
//             </div>
//             <div className="mt-3 flex flex-wrap gap-3">
//               {sizes.map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-4 py-2 rounded-xl border transition ${selectedSize === size ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-900 hover:bg-slate-50"}`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//             {!selectedSize && <div className="text-xs text-red-500 mt-2">Please select a size to continue.</div>}
//           </div>

//           {/* Qty + CTA */}
//           <div className="mt-6 flex items-center gap-4">
//             <div className="flex items-center border rounded-xl overflow-hidden">
//               <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2">-</button>
//               <div className="w-10 text-center select-none">{qty}</div>
//               <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2">+</button>
//             </div>
//             <button disabled={!selectedSize} onClick={handleAdd} className="px-5 py-3 rounded-2xl bg-accent text-white font-semibold disabled:opacity-50">
//               Add to Cart
//             </button>
//             <Link to="/cart" className="px-4 py-3 rounded-2xl border">View Cart</Link>
//           </div>

//           {/* Trust & Shipping */}
//           <div className="mt-8 grid sm:grid-cols-3 gap-3 text-sm">
//             <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50"><Truck size={18}/> Free delivery over ₹999</div>
//             <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50"><ShieldCheck size={18}/> 7‑day easy returns</div>
//             <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50"><ArrowLeft size={18}/> COD available</div>
//           </div>
//         </div>
//       </div>

//       {/* Details */}
//       <div className="mt-12 grid md:grid-cols-2 gap-10">
//         <div>
//           <h3 className="text-xl font-bold mb-3">Product Details</h3>
//           <ul className="list-disc pl-5 space-y-2 text-slate-700">
//             <li>Material: 100% Cotton</li>
//             <li>Fit: Regular / true to size</li>
//             <li>Care: Machine wash cold, do not bleach</li>
//             <li>Country of Origin: India</li>
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-xl font-bold mb-3">Why you'll love it</h3>
//           <p className="text-slate-700">Breathable fabric, refined silhouette, and durable stitching that keeps its shape wash after wash.</p>
//         </div>
//       </div>

//       <div className="mt-16">
//         <Link to="/products" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"><ArrowLeft size={16}/> Back to products</Link>
//       </div>
//     </motion.div>
//   );
// }

// npm install --save-dev vite


import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Truck, ArrowLeft } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/products/${id}`); // Relative path
        const data = await res.json();
        if (isMounted) setProduct(data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const priceFmt = useMemo(
    () => (n) =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(n),
    []
  );

  if (!product)
    return <div className="p-10 text-center text-slate-500">Loading…</div>;

  const sizes = product?.sizes?.length ? product.sizes : ["S", "M", "L", "XL"];

  function handleAdd() {
    if (!selectedSize) return;
    const cartItem = {
      ...product,
      id: `${product.id}-${selectedSize}`,
      productId: product.id,
      size: selectedSize,
      image: product.image,
      name: product.name,
      price: product.price,
    };
    addToCart(cartItem, qty);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-6 py-8 max-w-7xl mx-auto"
    >
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 flex items-center gap-2 mb-6">
        <Link to="/" className="hover:text-slate-800">
          Home
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:text-slate-800">
          Products
        </Link>
        <span>/</span>
        <span className="text-slate-700">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <motion.img
          key={product.image}
          src={product.image || "https://via.placeholder.com/600x700"}
          alt={product.name}
          className="w-full rounded-2xl shadow object-cover"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        />

        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {product.name}
          </h1>
          <div className="mt-2 flex items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1 text-amber-600">
              <Star size={16} /> 4.6
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">{product.category || "Apparel"}</span>
          </div>
          <div className="mt-4 text-3xl font-extrabold">{priceFmt(product.price)}</div>

          <p className="mt-4 text-slate-700 leading-relaxed">
            {product.description ||
              "Premium cotton with a soft, breathable finish. Designed for daily comfort with a modern fit."}
          </p>

          {/* Sizes */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Select Size</h3>
              <Link to="#" className="text-sm text-accent hover:underline">
                Size Guide
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-xl border transition ${
                    selectedSize === size
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <div className="text-xs text-red-500 mt-2">
                Please select a size to continue.
              </div>
            )}
          </div>

          {/* Qty + CTA */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border rounded-xl overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2"
              >
                -
              </button>
              <div className="w-10 text-center select-none">{qty}</div>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2"
              >
                +
              </button>
            </div>
            <button
              disabled={!selectedSize}
              onClick={handleAdd}
              className="px-5 py-3 rounded-2xl bg-accent text-white font-semibold disabled:opacity-50"
            >
              Add to Cart
            </button>
            <Link to="/cart" className="px-4 py-3 rounded-2xl border">
              View Cart
            </Link>
          </div>

          {/* Trust & Shipping */}
          <div className="mt-8 grid sm:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50">
              <Truck size={18} /> Free delivery over ₹999
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50">
              <ShieldCheck size={18} /> 7‑day easy returns
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50">
              <ArrowLeft size={18} /> COD available
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mt-12 grid md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-xl font-bold mb-3">Product Details</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>Material: 100% Cotton</li>
            <li>Fit: Regular / true to size</li>
            <li>Care: Machine wash cold, do not bleach</li>
            <li>Country of Origin: India</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">Why you'll love it</h3>
          <p className="text-slate-700">
            Breathable fabric, refined silhouette, and durable stitching that
            keeps its shape wash after wash.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={16} /> Back to products
        </Link>
      </div>
    </motion.div>
  );
}
