
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

    // Use API to fetch cover of book. 

    res.render('index.ejs', { temp_data: {} } );
});


