const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./config/database');
const postsRouter = require("./routes/posts")

sequelize.sync({force:true});
app.use(express.json());
app.use('/posts', postsRouter);

app.get("/", (req, res) => {
    res.send("Practice: validation and exception")
})

app.listen(port,()=>{
    console.log(`서버가 실행됩니다. http://localhost:${port}`);
})