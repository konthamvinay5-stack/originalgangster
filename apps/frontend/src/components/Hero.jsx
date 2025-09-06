import React from 'react';
import { Button } from '../lib/shadcn';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero(){
  return (
    <section className="min-h-[72vh] bg-[linear-gradient(0deg,rgba(17,24,39,0.6),rgba(17,24,39,0.6)),url('https://picsum.photos/id/1018/1600/800')] bg-cover bg-center flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl font-extrabold leading-tight text-white">ErrorFit — Dress like you mean business.</h1>
            <p className="mt-4 text-lg text-slate-100/90 max-w-xl">Premium casuals & activewear — modern cuts, lasting comfort. Shop the essentials curated for motion and style.</p>
            <div className="mt-6 flex gap-4">
              <Link to="/products">
                <Button className="bg-accent text-white hover:opacity-95">Shop Now</Button>
              </Link>
              <a href="/products" className="text-white/80 self-center">Explore products →</a>
            </div>
          </motion.div>

          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="hidden md:block">
            <div className="bg-white/10 rounded-xl p-6 max-w-md">
              <img src="https://picsum.photos/id/1003/600/600" alt="promo" className="rounded-xl shadow-lg" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
// src/components/Hero.jsx
// import { motion } from "framer-motion";            

// export default function Hero() {
//   return (
//     <section className="relative w-full h-[90vh] flex items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: "url('/hero-model.jpg')" }}>
//       <div className="absolute inset-0 bg-black/40" />

//       <motion.div
//         className="relative z-10 text-center text-white max-w-2xl"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
//           ErrorFit
//         </h1>
//         <p className="text-lg md:text-xl mb-6">
//           Modern apparel designed for movement & style.
//         </p>
//         <button className="px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition">
//           Shop Now
//         </button>
//       </motion.div>
//     </section>
//   );
// }
