
import express from "express";
import bodyParser from "express";
import axios from "axios";


const port = 3000;

let app = express(); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.listen(port, () => {
    console.log("Server is running on port ", port);
})


app.get('/', (req, res) => {
    res.render('index.ejs', { temp_data: {} } );
});


/* 
    The client is searching for a book based on title. 
*/
app.get('/search', async (req, res) => {
    const title = req.query.title;

    try {
        const books = await get_books(title); 
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
    const api_url = "https://openlibrary.org/search.json?q="+title;

    const response = await axios.get(api_url);
    const result = response.data.docs;  // This gets each book.

    console.log(result[0]);

    let books = []; 

    // get olid: cover_edition_key

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

        books.push(book); 
    }

    return books; 
}


app.get('/review/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    const api_url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json`

    // Get information about book. 
    try {
        const response = await axios.get(api_url); 
        const data = response.data; 
        console.log(data);

        res.render('review.ejs', { book: "" } );

    }
    catch(err) {
        console.log("Failed to get book")
    }

});


/* 

Todo: 
    - Examine the contents of the book object for relevant data. 

    Error checking: 
        - Getting book info from APi 

Notes: 

*/

