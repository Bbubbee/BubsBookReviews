
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
            console.log(book); 
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
    console.log(api_url);

    const response = await axios.get(api_url);
    const result = response.data.docs;  // This gets each book.

    // console.log(result[0]);

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
    const value = req.params.isbn;

    /* 
        Determine if this is a new review or an old review the client wants to see. 
        We do that by checking what is passed into this function.
        Either ISBN or ID. 
        If the number is >= 4, it's ISBN. If not, ID. 

        If the ISBN is used, it means the client is making a new review. 
        If ID, the client wants to see an old review.
    */

    // ISBN 
    if (value.length >= 4) {
        try {
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
            const result = await db.query("SELECT * FROM books_reviewed WHERE id = $1", [value]);
            const book = result.rows[0];
            console.log(book);

            res.render('modify.ejs', { book: book, new: false } );
        }
        catch (err) {
            res.render('modify.ejs');
        }
    }

    
});

app.get('/view/:id', (req, res) => {
    res.render('view.ejs');
});

app.post('/add', async (req, res) => {
    const title = req.body.title 
    console.log(title); 

    res.redirect('/');
})



/* 

    Todo: 
        - Examine the contents of the book object for relevant data. 

        Error checking: 
            - Getting book info from APi 

    Notes: 

*/

