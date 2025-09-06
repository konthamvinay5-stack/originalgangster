const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '..', 'data', 'products.json');

function readProducts() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

router.get('/', (req, res) => {
  const products = readProducts();
  res.json(products);
});

router.get('/:id', (req, res) => {
  const products = readProducts();
  const p = products.find(item => String(item.id) === String(req.params.id));
  if (!p) return res.status(404).json({ error: 'Product not found' });
  res.json(p);
});

module.exports = router;
