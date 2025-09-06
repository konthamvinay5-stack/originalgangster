// // // src/pages/Home.jsx
// import Hero from "../components/Hero";
// import ProductGrid from "../components/ProductGrid";

// export default function Home() {
//   return (
//     <div>
//       <Hero />
//       <section className="py-16 px-6 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-12">Trending Now</h2>
//         <ProductGrid />
//       </section>
//     </div>
//   );
// }
// import Hero from "../components/Hero";
// import ProductGrid from "../components/ProductGrid";
// import { motion } from "framer-motion";

// export function Home() {
//   return (
//     <div>
//       <Hero />
//       <section className="py-16 px-6 max-w-7xl mx-auto">
//         <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-center mb-12">
//           Trending Now
//         </motion.h2>
//         <ProductGrid />
//       </section>

//       <section className="py-14 px-6 max-w-7xl mx-auto">
//         <div className="grid md:grid-cols-3 gap-4 text-sm">
//           <div className="p-5 rounded-2xl bg-slate-50">Free shipping over ₹999</div>
//           <div className="p-5 rounded-2xl bg-slate-50">7‑day hassle‑free returns</div>
//           <div className="p-5 rounded-2xl bg-slate-50">Secure payments</div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;

import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import { motion } from "framer-motion";


export function Home() {
return (
<div>
<Hero />
<section className="py-16 px-6 max-w-7xl mx-auto">
<motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-center mb-12">
Trending Now
</motion.h2>
<ProductGrid />
</section>
</div>
);
}


export default Home;