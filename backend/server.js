const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const goalsRoutes = require('./routes/goalRoutes.js');
const {errorHandler} = require('../backend/middleware/errorMiddleware.js')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', goalsRoutes)

app.use(errorHandler)

app.listen(port, ()=>console.log(`server started on port: ${port}`))