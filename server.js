const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
const cors = require('cors');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());


let userData = [
  {
    id: 'qwe',
    pw: '2541'
  }
]


app.listen(port, function () {
  console.log(`listening on ${port}`)
});

app.use(express.static(path.join(__dirname, '/build')));

app.get('/', function (req, res) {
  console.log('asd')
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.post('/api/create/account', (req, res) => {
  if (req.body) {
    userData.push(req.body)
    console.log(userData)
    res.status(200).json({ success: true, message: 'Item deleted successfully' });
  } else {
    res.status(404).json({ success: false, message: 'Item not found' });
  }
});

app.post('/api/login', (req, res) => {
  if (req.body) {
    const { username, password } = req.body;
    const user = userData.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, 'secret-key', { expiresIn: '1h' });
    res.json({ token });

    res.status(200).json({ success: true, message: 'Item deleted successfully' });
  } else {
    res.status(404).json({ success: false, message: 'Item not found' });
  }
});


app.get('/api/auth', verifyToken, (req, res) => {
  res.json({ message: '인증 성공' });
});


function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    jwt.verify(req.token, 'secret-key', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});