// import React, { useState } from 'react';
// import { useCart } from '../context/CartContext';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// export default function Checkout(){
//   const { items, total, clearCart } = useCart();
//   const nav = useNavigate();
//   const [form, setForm] = useState({ name: '', address: '', city: '', pincode: '', provider: 'stripe' });
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState(null);

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   }

//   // helper to build and submit an auto-post form (for PayTM)
//   function postForm(url, params) {
//     const formEl = document.createElement('form');
//     formEl.method = 'POST';
//     formEl.action = url;
//     Object.keys(params).forEach(k => {
//       const input = document.createElement('input');
//       input.type = 'hidden';
//       input.name = k;
//       input.value = params[k];
//       formEl.appendChild(input);
//     });
//     document.body.appendChild(formEl);
//     formEl.submit();
//   }

//   async function placeOrder(e) {
//     e.preventDefault();
//     if (!form.name || !form.address) return alert('Please fill name & address');
//     setSubmitting(true);
//     const order = { customer: form, items, total, createdAt: new Date().toISOString() };

//     try {
//       if (form.provider === 'stripe') {
//         const res = await fetch('/api/payments/stripe-session', {
//           method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items, customer: form })
//         });
//         const data = await res.json();
//         if (data.url) {
//           clearCart();
//           window.location.href = data.url; // redirect to Stripe Checkout
//           return;
//         } else {
//           setMessage('Stripe error: ' + JSON.stringify(data));
//           return;
//         }
//       }

//       if (form.provider === 'paytm') {
//         // call backend to get txnToken
//         const res = await fetch('/api/payments/paytm-initiate', {
//           method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: total, items, customer: form })
//         });
//         const data = await res.json();
//         if (data.error) {
//           setMessage('PayTM error: ' + JSON.stringify(data));
//           return;
//         }
//         // Submit form to PayTM's processTransaction endpoint
//         // Required params: mid, orderId, txnToken
//         postForm(data.action, { mid: data.mid, orderId: data.orderId, txnToken: data.txnToken });
//         // Can't clear cart here because redirect will happen
//         return;
//       }

//       // Fallback: simple server-side checkout (no payments)
//       const res = await fetch('/api/checkout', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order)
//       });
//       const d = await res.json();
//       setMessage(`Order placed — ${d.orderId}`);
//       clearCart();
//       setTimeout(() => nav('/'), 1500);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to place order: ' + err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   if (items.length === 0) {
//     return (
//       <div className="container mx-auto px-6 py-20 text-center">
//         <h2 className="text-2xl font-bold">No items in cart</h2>
//       </div>
//     );
//   }

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-6 py-10">
//       <div className="grid md:grid-cols-3 gap-6">
//         <form onSubmit={placeOrder} className="md:col-span-2 bg-white p-6 rounded-2xl shadow">
//           <h3 className="text-xl font-semibold mb-4">Shipping details</h3>
//           <div className="grid gap-3">
//             <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="border p-3 rounded" />
//             <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border p-3 rounded" rows="3" />
//             <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border p-3 rounded" />
//             <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="border p-3 rounded" />
//           </div>

//           <h3 className="text-xl font-semibold mt-6 mb-3">Payment</h3>
//           <div className="grid gap-3">
//             <select name="provider" value={form.provider} onChange={handleChange} className="border p-3 rounded">
//               <option value="stripe">Stripe</option>
//               <option value="paytm">PayTM</option>
//               <option value="cod">Cash on Delivery</option>
//             </select>
//             <div className="text-sm text-slate-500">Stripe will redirect you to Stripe Checkout (needs STRIPE_SECRET_KEY in backend). PayTM requires PayTM merchant credentials (set in backend .env).</div>
//           </div>

//           <div className="mt-6 flex items-center gap-3">
//             <button disabled={submitting} type="submit" className="px-4 py-3 rounded-2xl bg-accent text-white font-semibold">
//               {submitting ? 'Processing...' : 'Place order'}
//             </button>
//             {message && <div className="text-green-600 ml-4">{message}</div>}
//           </div>
//         </form>

//         <aside className="bg-white rounded-2xl p-6 shadow">
//           <h4 className="font-semibold">Order summary</h4>
//           <div className="mt-4 space-y-3">
//             {items.map(i => (
//               <div key={i.id} className="flex justify-between">
//                 <div>
//                   <div className="font-medium">{i.name}</div>
//                   <div className="text-sm text-slate-500">Qty {i.qty}</div>
//                 </div>
//                 <div className="font-semibold">₹{i.price * i.qty}</div>
//               </div>
//             ))}
//           </div>
//           <div className="border-t mt-4 pt-4 flex justify-between font-bold">
//             <div>Total</div>
//             <div>₹{total}</div>
//           </div>
//         </aside>
//       </div>
//     </motion.div>
//   );
// }
import React, { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Checkout(){
  const { items, total, clearCart } = useCart();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", pincode: "", provider: "stripe", coupon: "" });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const fmt = useMemo(() => (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n), []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function postForm(url, params) {
    const formEl = document.createElement('form');
    formEl.method = 'POST';
    formEl.action = url;
    Object.keys(params).forEach(k => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = k;
      input.value = params[k];
      formEl.appendChild(input);
    });
    document.body.appendChild(formEl);
    formEl.submit();
  }

  const shipping = total >= 999 ? 0 : 79;
  const discount = form.coupon?.toUpperCase() === 'WELCOME10' ? Math.round(total * 0.10) : 0;
  const grandTotal = Math.max(0, total - discount) + shipping;

  async function placeOrder(e) {
    e.preventDefault();
    if (!form.name || !form.address || !form.city || !form.pincode) {
      alert('Please fill all required fields');
      return;
    }
    setSubmitting(true);

    try {
      if (form.provider === 'stripe') {
        const res = await fetch('/api/payments/stripe-session', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items, customer: form })
        });
        const data = await res.json();
        if (data.url) {
          clearCart();
          window.location.href = data.url;
          return;
        } else {
          setMessage('Stripe error: ' + JSON.stringify(data));
          return;
        }
      }

      if (form.provider === 'paytm') {
        const res = await fetch('/api/payments/paytm-initiate', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: grandTotal, items, customer: form })
        });
        const data = await res.json();
        if (data.error) { setMessage('PayTM error: ' + JSON.stringify(data)); return; }
        postForm(data.action, { mid: data.mid, orderId: data.orderId, txnToken: data.txnToken });
        return;
      }

      // COD or fallback order capture
      const res = await fetch('/api/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ customer: form, items, total: grandTotal, createdAt: new Date().toISOString() })
      });
      const d = await res.json();
      setMessage(`Order placed — ${d.orderId}`);
      clearCart();
      setTimeout(() => nav('/'), 1200);
    } catch (err) {
      console.error(err);
      alert('Failed to place order: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold">No items in cart</h2>
        <Link to="/products" className="mt-4 inline-block text-accent">Shop now</Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-3 gap-6">
        <form onSubmit={placeOrder} className="lg:col-span-2 bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-4">Shipping details</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full name*" className="border p-3 rounded" required />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-3 rounded" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-3 rounded" />
            <input name="city" value={form.city} onChange={handleChange} placeholder="City*" className="border p-3 rounded" required />
            <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode*" className="border p-3 rounded" required />
            <input name="address" value={form.address} onChange={handleChange} placeholder="Address*" className="md:col-span-2 border p-3 rounded" required />
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Payment</h3>
          <div className="grid gap-3 md:grid-cols-3">
            <select name="provider" value={form.provider} onChange={handleChange} className="border p-3 rounded md:col-span-2">
              <option value="stripe">Stripe</option>
              <option value="paytm">PayTM</option>
              <option value="cod">Cash on Delivery</option>
            </select>
            <input name="coupon" value={form.coupon} onChange={handleChange} placeholder="Coupon (e.g. WELCOME10)" className="border p-3 rounded" />
          </div>
          <div className="text-xs text-slate-500 mt-2">Stripe redirects you to secure Checkout. PayTM requires merchant creds in backend. COD captures order without online payment.</div>

          <div className="mt-6">
            <button disabled={submitting} type="submit" className="px-4 py-3 rounded-2xl bg-accent text-white font-semibold">
              {submitting ? 'Processing…' : `Pay ${fmt(grandTotal)}`}
            </button>
            {message && <div className="text-green-600 ml-4 inline-block">{message}</div>}
          </div>
        </form>

        <aside className="bg-white rounded-2xl p-6 shadow">
          <h4 className="font-semibold">Order summary</h4>
          <div className="mt-4 space-y-3">
            {items.map(i => (
              <div key={i.id} className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{i.name}</div>
                  <div className="text-xs text-slate-500">Size: {i.size || '—'} • Qty {i.qty}</div>
                </div>
                <div className="font-semibold">{fmt(i.price * i.qty)}</div>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{fmt(total)}</span></div>
            <div className="flex justify-between"><span>Discount</span><span>- {fmt(discount)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : fmt(shipping)}</span></div>
            <div className="flex justify-between font-bold text-lg pt-2"><span>Total</span><span>{fmt(grandTotal)}</span></div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}

export default Checkout;