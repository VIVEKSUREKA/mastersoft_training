const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 5000; 

app.use(cors()); 
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('This is the backend of todoappMS');
});

mongoose.connect(config.mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

app.use('/auth', authRoutes);
app.use('/api', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
