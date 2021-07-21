require('dotenv').config();
const express = require('express');
const UserRouter = require('./Routers/UserRouter.js');
const BlogsRouter = require('./Routers/BlogsRouter.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('./Database/DatabaseConnection/databaseCon');
const port = process.env.PORT || 8000;


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: true, credentials: true}));
app.use(UserRouter);
app.use(BlogsRouter);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});