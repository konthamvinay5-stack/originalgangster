/**
 * payments.js
 *
 * - Stripe Checkout Session: POST /api/payments/stripe-session
 *   Request body: { items: [{ id, name, price, qty }], customer: { name, address... } }
 *   Response: { url } (hosted checkout url)
 *
 * - PayTM initiate: POST /api/payments/paytm-initiate
 *   Request body: { amount, customer, items }
 *   Response: { mid, orderId, txnToken, action }  (frontend will build and submit form to action)
 *
 * - PayTM callback: POST /api/payments/paytm-callback
 *   PayTM will send POST to this route (configure in merchant dashboard)
 */

const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const axios = require('axios');
const PaytmChecksum = require('paytmchecksum');

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY || '';
const stripe = STRIPE_SECRET ? Stripe(STRIPE_SECRET) : null;

// PayTM config from env
const PAYTM_MID = process.env.PAYTM_MID || '';
const PAYTM_KEY = process.env.PAYTM_KEY || '';
const PAYTM_WEBSITE = process.env.PAYTM_WEBSITE || 'WEBSTAGING';
const PAYTM_CHANNEL_ID = process.env.PAYTM_CHANNEL_ID || 'WEB';
const PAYTM_INDUSTRY_TYPE_ID = process.env.PAYTM_INDUSTRY_TYPE_ID || 'Retail';
const PAYTM_CALLBACK_URL = process.env.PAYTM_CALLBACK_URL || 'http://localhost:4000/api/payments/paytm-callback';

// Stripe checkout session
router.post('/stripe-session', async (req, res) => {
  const { items = [], customer = {} } = req.body || {};
  try {
    if (!stripe) {
      return res.status(500).json({ error: 'Stripe not configured (set STRIPE_SECRET_KEY in .env)' });
    }

    const line_items = (items || []).map(i => ({
      price_data: {
        currency: 'inr',
        product_data: { name: i.name, images: [i.image || ''] },
        unit_amount: Math.round((i.price || 0) * 100)
      },
      quantity: i.qty || 1
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${req.headers.origin || 'http://localhost:3000'}/?success=1`,
      cancel_url: `${req.headers.origin || 'http://localhost:3000'}/?canceled=1`,
      metadata: { customer: JSON.stringify(customer || {}) }
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error', err);
    res.status(500).json({ error: err.message });
  }
});

// PayTM initiateTransaction (staging/production)
router.post('/paytm-initiate', async (req, res) => {
  const { amount, customer = {}, items = [] } = req.body || {};
  if (!PAYTM_MID || !PAYTM_KEY) {
    return res.status(500).json({ error: 'PayTM not configured (set PAYTM_MID and PAYTM_KEY)' });
  }

  try {
    const orderId = `ORDER_${Date.now()}`;
    const txnAmount = String(Number(amount || (items.reduce((s,i)=>s + (i.price||0)*(i.qty||1),0)) || 0));

    const requestBody = {
      requestType: 'Payment',
      mid: PAYTM_MID,
      websiteName: PAYTM_WEBSITE,
      orderId,
      txnAmount: {
        value: txnAmount,
        currency: 'INR'
      },
      userInfo: {
        custId: (customer.email || `CUST_${Date.now()}`)
      },
      callbackUrl: PAYTM_CALLBACK_URL
    };

    // signature needs stringified body
    const checksum = await PaytmChecksum.generateSignature(JSON.stringify(requestBody), PAYTM_KEY);

    const body = {
      head: {
        signature: checksum
      },
      body: requestBody
    };

    // Initiate transaction (staging URL)
    const url = `https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${PAYTM_MID}&orderId=${orderId}`;
    const resp = await axios.post(url, body, { headers: { 'Content-Type': 'application/json' }, timeout: 10000 });

    // resp.data.body.txnToken is the txnToken
    const txnToken = resp?.data?.body?.txnToken;
    if (!txnToken) {
      console.error('PayTM initiate failed', resp.data);
      return res.status(500).json({ error: 'Failed to get txnToken', details: resp.data });
    }

    // action URL for front-end form post
    const action = `https://securegw-stage.paytm.in/theia/processTransaction`;

    return res.json({
      mid: PAYTM_MID,
      orderId,
      txnToken,
      action
    });
  } catch (err) {
    console.error('PayTM initiate error', err?.response?.data || err.message || err);
    return res.status(500).json({ error: 'paytm_error', details: err?.response?.data || err.message });
  }
});

// PayTM callback route (POST) - PayTM will call here after payment completion
router.post('/paytm-callback', express.urlencoded({ extended: true }), async (req, res) => {
  // PayTM posts form-encoded data to this route after payment
  // You should validate checksum and the transaction status here.
  const body = req.body || {};
  // For demo we just log and respond a simple page.
  console.log('PayTM callback raw body:', body);
  // Ideally validate using PaytmChecksum.verifySignature with head.signature
  res.send(`<html><body><h2>PayTM callback received</h2><pre>${JSON.stringify(body,null,2)}</pre></body></html>`);
});

module.exports = router;
