const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
const uri = "mongodb+srv://admin:admin@cluster0.qza1qg0.mongodb.net/KFUPM_Events?retryWrites=true&w=majority&appName=Cluster0";

// Allow JSON data in requests
app.use(express());
app.use(cors({
    origin: 'http://localhost:3001', // or your frontend port
    credentials: true
}));
app.use(bodyParser.json());
app.use('api/users', userRoutes);

// Connect to MongoDB (no fancy options, just connect)
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB error:', err));

// Allow all CORS requests (for easy frontend testing)
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST');
//     next();
// });
//
app.get('/', (req, res) => {
    res.send('Backend is running!');
});
//
// User signup route
app.use('/api/users', userRoutes);

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});