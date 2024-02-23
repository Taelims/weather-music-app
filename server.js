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
    password: '123'
  }
]

let boardData = [
  {
    id : '1',
    title: 'title',
    text: 'textextext',
    comment: [
      'comment1-1',
      'comment1-2',
      'comment1-3',
    ],
    views: 1,
    addDate: '2024-02-23'
  },
  {
    id : '2',
    title: 'title2',
    text: 'textextext',
    comment: ['comment2'],
    views: 2,
    addDate: '2024-02-21'
  },
  {
    id : '3',
    title: 'title3',
    text: 'textextext',
    comment: ['comment3'],
    views: 3,
    addDate: '2024-02-15'
  },
  {
    id : '4',
    title: 'title4',
    text: 'textextext',
    comment: ['comment4'],
    views: 0,
    addDate: '2024-02-27'
  },
  {
    id : '5',
    title: 'title5',
    text: 'textextext',
    comment: ['comment5'],
    views: 2,
    addDate: '2024-02-23'
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
    console.log(userData)
    const user = userData.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, 'secret-key', { expiresIn: '1H' });
    res.json({ token });

    res.status(200).json({ success: true, message: 'login Success' });
  } else {
    res.status(404).json({ success: false, message: 'not found' });
  }
});

app.get('/api/user', verifyToken, (req, res) => {
  const { userId } = req.user;
  const auth = userData.find(u => u.id === userId);
  // res.json(auth);
  res.send(true);
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    jwt.verify(req.token, 'secret-key', (err, user) => {
      if (err) {
        // res.sendStatus(403);
        res.send(false);
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    // res.sendStatus(403);
    res.send(false);
  }
}

app.get('/api/board', (req, res) => {
  res.json(boardData);
});

//Create
app.post('/api/board/create', (req, res) => {
  if (req.body) {
    boardData.push(req.body)
    res.status(200).json({ success: true, message: 'Item created successfully' });
  } else {
    res.status(404).json({ success: false, message: 'Item not found' });
  }
});

//Update
app.post('/api/board/update', (req, res) => {
  if (req.body) {
    boardData = boardData.map((item)=>
      item.id === req.body.id ? {...req.body} : item
    )
    res.status(200).json({ success: true, message: 'Item updated successfully' });
  } else {
    res.status(404).json({ success: false, message: 'Item not found' });
  }
});

//Delete
app.delete('/api/board/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = boardData.findIndex(item => item.id === id);
  if (index !== -1) {
    boardData.splice(index, 1);
    res.status(200).json({ success: true, message: 'Item deleted successfully' });
  } else {
    res.status(404).json({ success: false, message: 'Item not found' });
  }
});



app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});