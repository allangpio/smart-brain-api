const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

//  EXPRESS SET UP
// const port = 3000;
const app = express();

// DB SAMPLE
const database = {
  users: [
    {
      id: '123',
      name: 'John',
      password: 'cookies',
      email: 'john@gmail.com',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'Sally',
      password: 'bananas',
      email: 'sally@gmail.com',
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'john@gmail.com',
    },
  ],
};

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  console.log(res.json());
  return res.send(database.users);
});

app.post('/signin', (req, res) => {
  //   // Load hash from your password DB.
  //   bcrypt.compare('bacon', hash, function (err, res) {
  //     // res == true
  //   });
  //   bcrypt.compare('veggies', hash, function (err, res) {
  //     // res = false
  //   });
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
});

app.post('/register', (req, res) => {
  const {email, name, password} = req.body;
  //   bcrypt.hash(password, null, null, function (err, hash) {
  //     // Store hash in your password DB.
  //     console.log(hash);
  //   });
  database.users.push({
    id: '125',
    name,
    email,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
  const {id} = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.send(user);
    }
  });
  if (!found) {
    res.status(404).json('not found');
  }
});

app.put('/image', (req, res) => {
  const {id} = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;

      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json('not found');
  }
});

app.listen(3000, () => {
  console.log('listening at port 3000');
});

/*
/ -->  res = this is working
/signin --> POST = success / fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/