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