const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

// let data = [
//   {
//     id : '1',
//     title : 'title1',
//     subTitle : 'subtitle1',
//     text : 'text1',
//   },
//   {
//     id : '2',
//     title : 'title2',
//     subTitle : 'subtitle2',
//     text : 'text2',
//   },
//   {
//     id : '3',
//     title : 'title3',
//     subTitle : 'subtitle3',
//     text : 'text3',
//   },
//   {
//     id : '4',
//     title : 'title4',
//     subTitle : 'subtitle4',
//     text : 'text4',
//   },
//   {
//     id : '5',
//     title : 'title51',
//     subTitle : 'subtitle5',
//     text : 'text5',
//   },
// ]


let weatherData =
  {
    main : 'rainy day',
    temp : '17',
  }


app.listen(port, function () {
  console.log(`listening on ${port}`)
});

app.use(express.static(path.join(__dirname, '/build')));

app.get('/', function (req, res) {
  console.log('asd')
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

//Read
// app.get('/api/data', (req, res) => {
//   res.json(data);
// });

app.get('/api/weather', (req, res) => {
  res.json(weatherData);
});

//
// //Delete
// app.delete('/api/delete/:id', (req, res) => {
//   const { id } = req.params;
//   const index = data.findIndex(item => item.id === id);
//   if (index !== -1) {
//     data.splice(index, 1);
//     res.status(200).json({ success: true, message: 'Item deleted successfully' });
//   } else {
//     res.status(404).json({ success: false, message: 'Item not found' });
//   }
// });
//
// //Create
// app.post('/api/create', (req, res) => {
//   if (req.body) {
//     data.push(req.body)
//     res.status(200).json({ success: true, message: 'Item deleted successfully' });
//   } else {
//     res.status(404).json({ success: false, message: 'Item not found' });
//   }
// });
//
// //Update
// app.post('/api/update', (req, res) => {
//   if (req.body) {
//     data = data.map((item)=>
//       item.id === req.body.id ? {...req.body} : item
//     )
//     res.status(200).json({ success: true, message: 'Item deleted successfully' });
//   } else {
//     res.status(404).json({ success: false, message: 'Item not found' });
//   }
// });


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});