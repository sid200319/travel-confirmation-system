const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api', bookingRoutes);

// Default route
app.get('/', (req, res) => {
    res.send("Server Running");
});

// Server start
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running`);
});