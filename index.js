import express from "express";
import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "123456",
    port: 5432,
});

db.connect();

//Middlware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// One route to test any EJS file
// server.js (or routes file)

app.get("/", async (req, res) => {
  try {
    let query = 'SELECT * FROM books';
    
    // Handle sorting based on URL parameter
    switch(req.query.sort) {
      case 'recent':
        query += ' ORDER BY id DESC'; // Assuming newer books have higher IDs
        break;
      case 'rating':
        query += ' ORDER BY rating DESC NULLS LAST';
        break;
      case 'title':
        query += ' ORDER BY title ASC';
        break;
      default:
        query += ' ORDER BY id DESC'; // Default sort
    }
    const result = await db.query(query);
    res.render("index", { books: result.rows });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).send("Server Error");
  }
});

app.get('/add', (req, res) => {
    res.render('add-book'); // Renders add-book.ejs
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});