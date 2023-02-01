const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware.js')
const connectDB = require('./config/db');
connectDB();

const app = express();
app.set('port', process.env.PORT || 6000);

// Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

// Routes
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Server frontend
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolver(__dirname, '../','frontend','build','index.html'));
  })
};

// Starting server
app.listen(app.get('port'), () => console.log(`Server listening in port ${app.get('port')}`));
