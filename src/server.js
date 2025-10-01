// const express = require('express');
// const app = express();
// const fs = require('fs');
// const cors = require('cors');
// app.use(cors());
// app.use(express.json());

// app.get('/data', (req,res) => {
//     fs.readFile('data.txt','utf8',(err,data) => {
//         res.send(data || '[]');
//     });
// });

// app.post('data', (req,res) => {
//     fs.writeFile('data.txt', JSON.stringify(req.body), (err) => {
//         res.sendStatus(200);
//     });
// });

// app.listen(5000);

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const FILE_PATH = './entries.txt';

app.use(cors());
app.use(bodyParser.json());

// Read entries
app.get('/entries', (req, res) => {
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) return res.json([]);
    const entries = data ? JSON.parse(data) : [];
    res.json(entries);
  });
});

// Add entry
app.post('/entries', (req, res) => {
  const { entry } = req.body;
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    let entries = data ? JSON.parse(data) : [];
    entries.push(entry);
    fs.writeFile(FILE_PATH, JSON.stringify(entries), () => {
      res.json(entries);
    });
  });
});

// Overwrite all entries
app.put('/entries', (req, res) => {
  const { entries } = req.body;
  fs.writeFile(FILE_PATH, JSON.stringify(entries), () => {
    res.json(entries);
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));