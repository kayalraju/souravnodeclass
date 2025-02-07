const expresss = require('express');
const ejs=require('ejs');
const dotenv = require('dotenv');
const connectDb = require('./app/config/db');
const  path = require('path');
const app = expresss();
dotenv.config();
connectDb()
//setup view engine

app.set('view engine','ejs');
app.set('views','views');

//parse incoming request
app.use(expresss.json());
app.use(expresss.urlencoded({extended:true}));


//create a static folder
app.use(expresss.static('./public'));
app.use('/uploads',expresss.static(path.join(__dirname,'/uploads')))
app.use('/uploads',expresss.static('uploads'))

//define router
const homeRouter = require('./app/router/homeRouter'); 
const aboutRouter = require('./app/router/aboutRouter');
const csvRouter = require('./app/router/csvRouter');
app.use(csvRouter)
app.use(homeRouter)
app.use(aboutRouter)

//api router
const apiRouter = require('./app/router/ApiRoute');
app.use('/api',apiRouter);

const port = 3006;

app.listen(port,()=>{
    console.log(`server running port:  http://localhost:${port}`);
    
})
