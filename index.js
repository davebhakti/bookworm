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
app.get("/", (req, res) =>{
  res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});