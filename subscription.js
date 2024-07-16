const express = require('express');
const { request } = require('http');
const mysql = require('mysql2');
const multer = require('multer'); 
const app = express();
// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: "3000",
    database: 'flower_shop'
    });
    connection.connect((err) => {
    if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
    }
    console.log('Connected to MySQL database');
    });
    // Set up view engine
    app.set('view engine', 'ejs');
    // enable static files
    app.use(express.static('public'));
    const upload = multer({ dest: 'uploads/' });
    // enable from processing 
    app.use(express.urlencoded({
        extended: false
    }));
    // Define routes
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM subsrciption';
    // Fetch data from MySQL
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving products');
        }
        // Render HTML page with data
        res.render('index', { subscription: results });
    });
});

app.get('/customer/:id', (req, res) => {
    // Extract the customer ID from the request parameters
    const customerid = req.params.id;
    const sql = 'SELECT * FROM customers WHERE customerid = ?';
    // Fetch data from MySQL based on the customer ID
    connection.query(sql, [customerid], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving customer by ID');
        }
        // Check if any customer with the given ID was found
        if (results.length > 0) {
            // Render HTML page with the customer data
            res.render('customer', { customer: results[0] });
        } else {
            // If no customer with the given ID was found, render a 404 page or handle it accordingly
            res.status(404).send('Customer not found');
        }
    });
});

app.get('/addCustomer', (req, res) => {
    res.render('addCustomer');
});

app.post('/addCustomer', (req, res) => {
    // Extract customer data from the request body
    const { FirstName, LastName, Gender, Email, PhoneNumber, DOB } = req.body;

    const sql = "INSERT INTO customers (FirstName, LastName, Gender, Email, PhoneNumber, DOB) VALUES (?, ?, ?, ?, ?, ?)";
    // Insert the new customer into the database
    connection.query(sql, [FirstName, LastName, Gender, Email, PhoneNumber, DOB], (error, results) => {
        if (error) {
            // Handle any error that occurs during the database operation
            console.error("Error adding customer:", error);
            res.status(500).send('Error adding customer');
        } else {
            // Send a success response
            res.redirect('/');
        }
    });
});

app.get('/editCustomer/:id', (req, res) => {
    const customerid = req.params.id;
    const sql = 'SELECT * FROM subscription WHERE customerid = ?';
    // Fetch data from MySQL based on the customer ID
    connection.query(sql, [customerid], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving customer by ID');
        }
        // Check if any customer with the given ID was found
        if (results.length > 0) {
            // Render HTML page with the customer data
            res.render('editCustomer', { customer: results[0] });
        } else {
            // If no customer with the given ID was found, render a 404 page or handle it accordingly
            res.status(404).send('Customer not found');
        }
    });
});

app.post('/editCustomer/:id', upload.single('image'), (req, res) => {
    const customerid = req.params.id;
    // Extract customer data from the request body
    const { FirstName, LastName, Gender, Email, PhoneNumber, DOB } = req.body;

    let sql = "UPDATE subscription SET FirstName = ?, LastName = ?, Gender = ?, Email = ?, PhoneNumber = ?, DOB = ? WHERE customerid = ?";
    // Update the customer in the database
    connection.query(sql, [FirstName, LastName, Gender, Email, PhoneNumber, DOB, customerid], (error, results) => {
        if (error) {
            // Handle any error that occurs during the database operation
            console.error("Error updating customer:", error);
            res.status(500).send('Error updating customer');
        } else {
            // Send a success response
            res.redirect('/');
        }
    });
});

app.get('/deleteCustomer/:id', (req, res) => {
    const customerid = req.params.id;
    const sql = "DELETE FROM subscription WHERE customerid = ?";
    // Delete the customer from the database
    connection.query(sql, [customerid], (error, results) => {
        if (error) {
            // Handle any error that occurs during the database operation
            console.error("Error deleting customer:", error);
            res.status(500).send('Error deleting customer');
        } else {
            // Send a success response
            res.redirect('/');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));