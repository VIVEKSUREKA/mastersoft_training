const mongoose = require('mongoose');
const Task = require('./models/taskModel');

// Connect to MongoDB
mongoose.connect('mongodb+srv://vksureka912:pass123@cluster0.tnic7r7.mongodb.net/');
const db = mongoose.connection;

// Wait for the connection to be established
db.once('open', async () => {
  // Define dummy data
  const dummyTasks = [
    {
      userId: 'user1',
      title: 'Task 1',
      description: 'Description for Task 1',
      dueDate: new Date('2023-12-31'),
    },
    {
      userId: 'user1',
      title: 'Task 2',
      description: 'Description for Task 2',
      dueDate: new Date('2023-12-31'),
    },
    {
      userId: 'user2',
      title: 'Task 2',
      description: 'Description for Task 2',
      dueDate: new Date('2023-12-31'),
    },
  ];

  // Function to populate dummy data
  const populateDummyData = async () => {
    try {
      await Task.insertMany(dummyTasks);
      console.log('Dummy data populated successfully.');
    } catch (error) {
      console.error('Error populating dummy data:', error);
    } finally {
      // Close the MongoDB connection after data is inserted
      mongoose.connection.close();
    }
  };

  // Run the function to populate dummy data
  populateDummyData();
});

// Handle MongoDB connection errors
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
