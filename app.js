const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const app = express();

//Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); //directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
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
// enable from processing 
app.use(express.urlencoded({
    extended: false
}));

// Define routes
app.get('/',(req, res) => {
    const sql = 'SELECT * FROM cart';
    // fetch data from MySQL
    connection.query(sql, (error, results) => {
        if (error){
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving students');
        }
        //render HTML page with data
        res.render('index', {cart: results});
    });
});

app.get('/subscription',(req, res) => {
    const sql = 'SELECT * FROM cart';
    // fetch data from MySQL
    connection.query(sql, (error, results) => {
        if (error){
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving students');
        }
        //render HTML page with data
        res.render('subscription', {cart: results});
    });
});

app.get('/customise',(req, res) => {
    const sql = 'SELECT * FROM cart';
    // fetch data from MySQL
    connection.query(sql, (error, results) => {
        if (error){
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving students');
        }
        //render HTML page with data
        res.render('customise', {cart: results});
    });
});

app.get('/cart', (req,res) => {
    const customersql = 'SELECT * FROM subscription ';
    connection.query(customersql, (error, results) => {
        if (error){
            console.error('Database query error :', error.message);
            return res.status(500).send('Error Retrieving subscription data. subscription could be empty');
        }
        //check if any student with the gievn ID was found
        if (results.length > 0) {
            const sql = 'SELECT * FROM cart INNER JOIN subscription ON subscription.customerid = cart.customerid WHERE cart.customerid = subscription.customerid';
            connection.query(sql, (error, sqlresults) => {
                if (error){
                    console.error('Database query error :', error.message);
                    return res.status(500).send('Error Retrieving cart data. Cart could be empty');
                }
                //check if any student with the gievn ID was found
                if (sqlresults.length > 0) {
                    //render HTML page with the student data
                    res.render('cart', {cart : sqlresults});
                } else {
                    // if no student with the given ID was found, render a 404 page or handle it accordingly
                    res.status(404).send('student not found');
                }
            });
        } else {
            // if no student with the given ID was found, render a 404 page or handle it accordingly
            res.status(404).send('student not found');
        }
    });
});

app.post('/checkout', (req,res) => {
    // extract student data from the request body
    console.log(req.body)
    const {address, postalcode, customerid,totalamount,cartorderid} = req.body;
    

    const sql  = "INSERT INTO checkout (orderdetail, orderdate, address, postalcode, totalamount, deliverydate, customerid) VALUES (?, CURRENT_DATE, ?, ?, ?, CURRENT_DATE + 7, ?)";
    // insert the new student into the database
    connection.query(sql, [cartorderid,address,postalcode,totalamount,customerid], (error, results) =>{
        if (error) {
            //handle any error that occurs during the database operation
            console.error("Error checking out:", error);
            res.status(500).send('Error checking out');
        } else {
            //send a success response 
            res.redirect('/checkout');
        }
    })
})

// app.get('/checkout', (req,res) => {
//     const cartorderId = req.params.id;
//     const sql = 'SELECT * FROM cart where cartorderId = ?';
//     // fetch data from MySQL based on the student ID
//     connection.query(sql, [cartorderId], (error, results) => {
//         if (error){
//             console.error('Database query error :', error.message);
//             return res.status(500).send('Error Retrieving cart data. Cart could be empty');
//         }
//         //check if any student with the gievn ID was found
//         if (results.length > 0) {
//             //render HTML page with the student data
//             res.render('cart', {cart : results});
//         } else {
//             // if no student with the given ID was found, render a 404 page or handle it accordingly
//             res.status(404).send('student not found');
//         }
//     });
// });

app.get('/tracking',(req, res) => {
    const sql = 'SELECT * FROM cart';
    // fetch data from MySQL
    connection.query(sql, (error, results) => {
        if (error){
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving students');
        }
        //render HTML page with data
        res.render('tracking', {cart: results});
    });
});



// // For reference
// app.get('/student/:id', (req,res) => {
//     //Extract the student ID from the request parameters
//     const studentId = req.params.id;
//     const sql = 'SELECT * FROM students WHERE studentId = ?';
//     // fetch data from MySQL based on the student ID
//     connection.query(sql, [studentId], (error, results) => {
//         if (error){
//             console.error('Database query error :', error.message);
//             return res.status(500).send('Error Retrieving student by ID');
//         }
//         //check if any student with the gievn ID was found
//         if (results.length > 0) {
//             //render HTML page with the student data
//             res.render('student', {students: results[0]});
//         } else {
//             // if no student with the given ID was found, render a 404 page or handle it accordingly
//             res.status(404).send('student not found');
//         }
//     });
// });
// app.get('/addstudent', (req,res) => {
//     res.render('addstudent');
// });
// app.post('/addstudent', upload.single('image'), (req,res) => {
//     // extract student data from the request body
//     const {name, dob, contact} = req.body;
//     let image;
//     if (req.file){
//         image = req.file.filename; // save only the file name
//     } else {
//         image = null;
//     }
//     const sql  = "INSERT INTO students (name, dob, contact, image) VALUES (?, ?, ?, ?)";
//     // insert the new student into the database
//     connection.query(sql, [name, dob, contact, image], (error, results) =>{
//         if (error) {
//             //handle any error that occurs during the database operation
//             console.error("Error adding student:", error);
//             res.status(500).send('Error adding student');
//         } else {
//             //send a success response 
//             res.redirect('/');
//         }
//     })
// })

// app.get('/editstudent/:id', (req,res) => {
//     const studentId = req.params.id;
//     const sql = 'SELECT * FROM students WHERE studentId = ?';
//     // fetch data from MySQL based on the student ID
//     connection.query(sql, [studentId], (error, results) => {
//         if (error){
//             console.error('Database query error :', error.message);
//             return res.status(500).send('Error Retrieving student by ID');
//         }
//         //check if any student with the gievn ID was found
//         if (results.length > 0) {
//             //render HTML page with the student data
//             res.render('editstudent', {student: results[0]});
//         } else {
//             // if no student with the given ID was found, render a 404 page or handle it accordingly
//             res.status(404).send('Student not found');
//         }
//     });
// })

// app.post('/editstudent/:id', upload.single('image'), (req,res) => {
//     const studentId = req.params.id;
//     // extract student data from the request body
//     const {name, dob, contact} = req.body;
//     let image;
//     if (req.file){
//         image = req.file.filename; // save only the file name
//     } 
//     const sql  = "UPDATE students SET name = ?, dob = ?, contact = ?, image = ? WHERE studentId = ?";
//     // insert the new student into the database
//     connection.query(sql, [name, dob, contact, image, studentId], (error, results) =>{
//         if (error) {
//             //handle any error that occurs during the database operation
//             console.error("Error adding student:", error);
//             res.status(500).send('Error adding student');
//         } else {
//             //send a success response 
//             res.redirect('/');
//         }
//     })
// })

// app.get('/deletestudent/:id', (req,res) => {
//     const studentId = req.params.id;
//     const sql  = "DELETE FROM students WHERE studentId = ?";
//     // insert the new student into the database
//     connection.query(sql, [studentId], (error, reults) =>{
//         if (error) {
//             //handle any error that occurs during the database operation
//             console.error("Error adding student:", error);
//             res.status(500).send('Error adding student');
//         } else {
//             //send a success response 
//             res.redirect('/');
//         }
//     })
// })
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));