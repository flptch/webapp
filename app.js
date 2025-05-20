require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.static('public'));
app.use(express.json());

const Item = mongoose.model('Item', new mongoose.Schema({ name: String }));

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/simpledb')
  .then(() => console.log('Connected to DB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const item = new Item({ name: req.body.name });
  await item.save();
  res.json(item);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
