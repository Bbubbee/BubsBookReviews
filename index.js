
import express from "express";
import bodyParser from "express";


const port = 3000;

let app = express(); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(port, () => {
    console.log("Server is running on port ", port);
})

app.get('/', (req, res) => {
    res.render('index.ejs');
});


