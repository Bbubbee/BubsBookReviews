
import express from "express";
import bodyParser from "express";
import axios from "axios";
import pg from "pg";


const port = 3000;

let app = express(); 
let books = []; 
/* This stores an array of books the user can review.
It displays them on the screen in '/search'.
When a books is pressed, information about the book can be retrieved using
the id and this book_storage array. This is used in '/review'. 
Once a book is reviewed, we add it to the database. */


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database
const db = new pg.Client({
    user: "postgres",
    host: "localhost", 
    database: "bookreviews", 
    password: "booty", 
    port: 5432
})
db.connect(); 


app.listen(port, () => {
    console.log("Server is running on port ", port);
})


app.get('/', async (req, res) => {
    let books_reviewed = [];

    // Get reviewed books from the database.
    try {
        const result = await db.query("SELECT * FROM books_reviewed");

        result.rows.forEach(book => {
            books_reviewed.push(book); 
        });
    }
    catch (err) {
        books_reviewed = []; 
    }

    res.render('index.ejs', { books: books_reviewed } );
});


/* 
    The client is searching for a book based on title. 
    Show a list of books relating to the title. 

    INSERT INTO books_reviewed (title, cover_url, isbn, rating)
VALUES ('Harry Potter and the Deathly Hallows', 
	   'https://covers.openlibrary.org/b/id/10110415-L.jpg', 
	   8498387000, 
	   78)
*/
app.get('/search', async (req, res) => {
    const title = req.query.title;

    try {
        books = []; 
        books = await get_books(title); 
        res.render('search.ejs', { books: books, title: title });
    }
    catch (err) {
        console.log("Failed to get book using title");
        res.render('search.ejs', { err: true } );
    }
});


/* 
    Temp way of showing search page when the user hasn't searched for anything. 
*/
app.get('/search-page', async (req, res) => {

    // Fetch info about book from API. 
    res.render('search.ejs');
});


/* 
    Fetches an array of books for a given title. 
*/
async function get_books(title) {
    const api_url = "https://openlibrary.org/search.json?q="+title+"&limit=20";
    const response = await axios.get(api_url);
    const result = response.data.docs;  // This gets each book.

    let books_array = []; 

    for (var i = 0; i < 10; i++) {

        let cover_url = "";
        if (result[i].cover_i != null) {
            cover_url = "https://covers.openlibrary.org/b/id/"+result[i].cover_i+"-L.jpg";
        }
        else {
            cover_url = "./images/no-img.jpeg";
        }

        const book = {
            isbn: result[i].isbn[0],
            title: result[i].title,
            cover_url: cover_url
        }

        books_array.push(book); 
    }

    return books_array; 
}


/*
    A user selects a book to review. 
    Uses it's isbn to fetch the book from the array in memory. 
*/
app.get('/modify/:isbn', async (req, res) => {
    let value = req.params.isbn;

    // Check if review exists in database. 
    // If it does, view the review instead of creating a new review.
    if (value.length >= 4) {  // ISBN. 
        // Check database if ISBN exists. 
        const result = await db.query("SELECT * FROM books_reviewed WHERE isbn=$1", [value]);
        const review = result.rows[0];
        if (review) { 
            res.redirect('/view/'+review.id); 
        }
    }

    // ISBN 
    if (value.length >= 4) {
        try {
            console.log("This is a new review")
            // Check for book in books array. 
            const book = await books.find(book => book.isbn == value);
            res.render('modify.ejs', { book: book, new: true } );
        }
        catch (err) {
            res.render('modify.ejs');
        }
    }
    // ID
    else {
        // Fetch the book from the database using the ID. 
        try {
            console.log("This is an old review")

            const result = await db.query("SELECT * FROM books_reviewed WHERE id = $1", [value]);
            const book = result.rows[0];

            res.render('modify.ejs', { book: book, new: false } );
        }
        // Failed to get the review from the database. 
        catch (err) {
            res.render('modify.ejs');
        }
    }

    
});

app.get('/view/:id', async (req, res) => {
    // Get the review from the database using the id
    const id = req.params.id; 
    try {
        const result = await db.query("SELECT * FROM books_reviewed WHERE id = $1", [id]);
        const book = result.rows[0];

        res.render('view.ejs', { book: book } );
    }
    catch (err) {
        res.render('view.ejs');
    }
});

app.post('/add', async (req, res) => {
    // Get review info
    const title = req.body.title;
    const cover_url = req.body.cover_url; 
    const rating = parseInt(req.body.rating); 
    const review = req.body.review; 
    const isbn = req.body.isbn;

    // Try and put reviewed book into database. 
    try {
        await db.query("INSERT INTO books_reviewed (title, cover_url, rating, isbn, review) VALUES ($1, $2, $3, $4, $5)", 
        [title, cover_url, rating, isbn, review] );
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
        res.redirect('/');
    }
})

app.post('/review', async (req, res) => {
    console.log("Patch this data");
    // Get review info
    const title = req.body.title;
    const cover_url = req.body.cover_url; 
    const rating = parseInt(req.body.rating); 
    const review = req.body.review; 
    const isbn = req.body.isbn;
    const id = req.body.id;


    // Try and put reviewed book into database. 
    try {
        await db.query("UPDATE books_reviewed SET title=$1, cover_url=$2, rating=$3, isbn=$4, review=$5 WHERE id=$6", 
        [title, cover_url, rating, isbn, review, id] );
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
        res.redirect('/');
    }
})

app.get('/delete/:id', async (req, res) => {
    const id = req.params.id

    try {
        await db.query("DELETE FROM books_reviewed WHERE id=$1", [id])
    }
    catch (err) {
        console.log(err)
    }

    res.redirect('/');
})



/* 

    Todo: 
        - Examine the contents of the book object for relevant data. 

        Error checking: 
            - Getting book info from APi 

    Notes: 

*/

