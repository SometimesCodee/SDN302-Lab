const express = require('express');
const connectDB = require('./config/db');
const {json, urlencoded} = require('body-parser')
const cors = require('cors');
const app = express();
const rootRouter = require('./router/rootRouter');
app.use(json());
// app.use(cors())
app.use(urlencoded({extended: true}));
connectDB();

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello Word' });
});


app.listen(process.env.PORT || 9999, () => {
    console.log('Server is running on port 9999');
});

app.use('/api', rootRouter);