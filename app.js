const express = require("express");
//require basicAuth
const basicAuth = require('express-basic-auth');
//require bcrypt
const bcrypt = require('bcrypt');
// set salt
const saltRounds = 2;

const {User, Item} = require('./models');
const { use } = require("bcrypt/promises");

// initialise Express
const app = express();

// specify out request bodies are json
app.use(express.json());

// routes go here
app.get('/', (req, res) => {
  res.send('<h1>App Running</h1>')
});

// Users routes
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);
  res.json(user);
});

app.post('/users', async (req, res) => {
  const { name, password } = req.body;
  const newUser = await User.create({ name, password });
  res.send('New user was created');
});

app.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  const userToUpdate = await User.findByPk(id)
  const updatedUser = userToUpdate.update(req.body)
  res.send('User was updated');
});

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  const deletedUser = await User.destroy({ where: { id: id }});
  res.send('User was deleted');
});

// Items routes
app.get('/items', async (req, res) => {
  const items = await Item.findAll();
  res.json(items);
});

app.get('/items/:id', async (req, res) => {
  const id = req.params.id;
  const item = await Item.findByPk(id);
  res.json(item);
});

app.post('/items', async (req, res) => {
  const { name } = req.body;
  const newItem = await Item.create({ name });
  res.send('New item was created');
});

app.put('/items/:id', async (req, res) => {
  const id = req.params.id;
  const itemToUpdate = await Item.findByPk(id)
  const updateditem = itemToUpdate.update(req.body)
  res.send('Item was updated');
});

app.delete('/items/:id', async (req, res) => {
  const id = req.params.id;
  const deletedItem = await Item.destroy({ where: { id: id }});
  res.send('Item was deleted');
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});