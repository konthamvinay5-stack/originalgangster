import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash } from "lucide-react";
import { motion } from "framer-motion";


export function CartPage(){
const { items, updateQty, removeFromCart, total } = useCart();
const nav = useNavigate();


if (!items || items.length === 0) return (
<div className="container mx-auto px-6 py-20 text-center">
<h2 className="text-2xl font-bold">Your cart is empty</h2>
<Link to="/products" className="mt-6 inline-block px-4 py-2 rounded bg-accent text-white">Browse products</Link>
</div>
);


return (
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-6 py-10">
<h2 className="text-3xl font-bold mb-6">Your cart</h2>
<div className="grid lg:grid-cols-3 gap-6">
<div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow">
{items.map(item => (
<div key={item.id} className="flex gap-4 items-center border-b last:border-b-0 py-4">
<img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
<div className="flex-1">
<div className="font-semibold">{item.name}</div>
<div className="text-xs text-slate-500">Size: {item.size || "—"}</div>
<div className="text-sm text-slate-500">₹{item.price}</div>
<div className="mt-3 flex items-center gap-2">
<button onClick={()=> updateQty(item.id, Math.max(1, item.qty - 1))} className="p-2 rounded hover:bg-slate-100"><Minus size={14} /></button>
<div className="px-3 py-1 border rounded">{item.qty}</div>
<button onClick={()=> updateQty(item.id, item.qty + 1)} className="p-2 rounded hover:bg-slate-100"><Plus size={14} /></button>
</div>
</div>
<div className="text-right">
<div className="font-bold">₹{item.price * item.qty}</div>
<button onClick={()=> removeFromCart(item.id)} className="mt-2 text-sm text-red-600 flex items-center gap-2"><Trash size={14}/> Remove</button>
</div>
</div>
))}
</div>


<div className="bg-white rounded-2xl p-6 shadow flex flex-col">
<div className="text-sm text-slate-500">Order summary</div>
<div className="mt-4 text-2xl font-bold">₹{total}</div>
<div className="mt-6">
<button onClick={()=> nav('/checkout')} className="w-full px-4 py-3 rounded-2xl bg-accent text-white font-semibold">Proceed to checkout</button>
</div>
</div>
</div>
</motion.div>
);
}
export default CartPage;