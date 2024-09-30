const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const storeRoutes = require('./routes/store');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
const uri = 'mongodb+srv://myAtlasDBUser:Vikas123@myatlasclusteredu.dvip7ju.mongodb.net/MVP?retryWrites=true&w=majority';
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run(){
await mongoose.connect(uri, clientOptions);
}
run();
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
});

// Use authentication routes
app.use('/api', authRoutes);
app.use('/api',storeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
