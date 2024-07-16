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
    const sql = 'SELECT * FROM flower';
    // fetch data from MySQL
    connection.query(sql, (error, results) => {
        if (error){
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving students');
        }
        //render HTML page with data
        res.render('index', {flower: results});
    });
});

app.get('/cart',(req, res) => {
    const sql = 'SELECT * FROM cart';
    // fetch data from MySQL
    connection.query(sql, (error, results) => {
        if (error){
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving students');
        }
        //render HTML page with data
        res.render('cart', {cart: results});
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

// app.get('/customise',(req, res) => {
//     const sql = 'SELECT * FROM flower';
//     // fetch data from MySQL
//     connection.query(sql, (error, results) => {
//         if (error){
//             console.error('Database query error:', error.message);
//             return res.status(500).send('Error Retrieving students');
//         }
//         //render HTML page with data
//         res.render('customise', {cart: results});
//     });
// });

app.get('/customise/:id', (req,res) => {
    //Extract the student ID from the request parameters
    const flower_id = req.params.id;
    const sql = 'SELECT * FROM flower WHERE flower_id = ?';
    // fetch data from MySQL based on the student ID
    connection.query(sql, [flower_id], (error, results) => {
        if (error){
            console.error('Database query error :', error.message);
            return res.status(500).send('Error Retrieving student by ID');
        }
        //check if any student with the gievn ID was found
        if (results.length > 0) {
            //render HTML page with the student data
            res.render('customise', {flower: results[0]});
        } else {
            // if no student with the given ID was found, render a 404 page or handle it accordingly
            res.status(404).send('student not found');
        }
    });
});

// app.post('/checkout', (req,res) => {
//     // extract student data from the request body
//     const {address, postalcode, customerid,totalamount,cartorderid} = req.body;
    

//     const sql  = "INSERT INTO checkout (orderdetail, orderdate, address, postalcode, totalamount, deliverydate, customerid) VALUES (?, CURRENT_DATE, ?, ?, ?, CURRENT_DATE + 7, ?)";
//     // insert the new student into the database
//     connection.query(sql, [cartorderid,address,postalcode,totalamount,customerid], (error, results) =>{
//         if (error) {
//             //handle any error that occurs during the database operation
//             console.error("Error checking out:", error);
//             res.status(500).send('Error checking out');
//         } else {
//             //send a success response 
//             res.redirect('checkout');
//         }
//     })
// })

app.post('/checkout', (req,res) => {
    // extract student data from the request body
    const {address, postalcode, customerid,totalamount,cartorderid} = req.body;
    const sql  = "INSERT INTO checkout (cartorderId, orderdate, address, postalcode, totalamount, deliverydate, customerid) VALUES (?, CURRENT_DATE, ?, ?, ?, CURRENT_DATE + 7, ?)";
    // insert the new student into the database
    connection.query(sql, [cartorderid,address,postalcode,totalamount,customerid], (error, results) =>{
        if (error) {
            //handle any error that occurs during the database operation
            console.error("Error adding student:", error);
            res.status(500).send('Error adding student');
        } else {
            //send a success response 
            res.redirect('checkout');
        }
    })
})

app.get('/checkout',(req, res) => {
    const sql = 'SELECT * FROM checkout';
    // fetch data from MySQL
    connection.query(sql, (error, results) => {
        if (error){
            console.error('Database query error :', error.message);
            return res.status(500).send('Error Retrieving student by ID');
        }
        //check if any student with the gievn ID was found
        if (results.length > 0) {
            //render HTML page with the student data
            res.render('checkout', {checkout: results[0]});
        } else {
            // if no student with the given ID was found, render a 404 page or handle it accordingly
            res.status(404).send('student not found');
        }
    });
});

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

app.get('/addflower',(req, res) => {

        //render HTML page with data
        res.render('addflower');
});

app.post('/addflower', (req,res) => {
    // extract student data from the request body
    const {title,img,descript,price} = req.body;
    const sql  = "INSERT INTO flower (title, img, description, price) VALUES (?, ?, ?, ?)";
    // insert the new student into the database
    connection.query(sql, [title,img,descript,price], (error, results) =>{
        if (error) {
            //handle any error that occurs during the database operation
            console.error("Error adding student:", error);
            res.status(500).send('Error adding student');
        } else {
            //send a success response 
            res.redirect('/addflower');
        }
    })
})

app.post('/payment', (req,res) => {
    // extract student data from the request body
    const {price, address, postal, date} = req.body;
    const sql  = "DELETE FROM checkout WHERE orderdate = ? AND address = ? AND postalcode = ? AND totalamount = ?";
    // insert the new student into the database
    connection.query(sql, [date,address,postal,price], (error, results) =>{
        if (error) {
            //handle any error that occurs during the database operation
            console.error("Error adding student:", error);
            res.status(500).send('Error adding student');
        } else {
            //send a success response 
            res.redirect('payment');
        }
    })
})

app.get('/payment',(req, res) => {

    //render HTML page with data
    res.render('payment');
});

app.post('/addcart', (req,res) => {
    // extract student data from the request body
    console.log(req.body)
    const {product,image,price, stuffedtoys, special_request, chocolates, special_message_opt, special_message, special_packaging, special_packaging_way } = req.body;
    const sql  = "INSERT INTO cart (image, product, price, quantity, cartorderid, customerid, stuffedtoys, special_request, chocolates, special_message_opt, special_message, special_packaging, special_packaging_way) VALUES (?, ?, ?, 1, 0, 0, ?, ?, ?, ?, ?, ?, ?)";
    // insert the new student into the database
    connection.query(sql, [image, product, price, stuffedtoys, special_request, chocolates, special_message_opt, special_message, special_packaging, special_packaging_way], (error, results) =>{
        if (error) {
            //handle any error that occurs during the database operation
            console.error("Error adding student:", error);
            res.status(500).send('Error adding student');
        } else {
            //send a success response 
            res.redirect('/addflower');
        }
    })
})

app.get('/editProduct/:id', (req,res) => {
    const cartid = req.params.id;
    const sql = 'SELECT * FROM cart WHERE cartid = ?';
    // fetch data from MySQL based on the student ID
    connection.query(sql, [cartid], (error, results) => {
        if (error){
            console.error('Database query error :', error.message);
            return res.status(500).send('Error Retrieving student by ID');
        }
        //check if any student with the gievn ID was found
        if (results.length > 0) {
            //render HTML page with the student data
            res.render('editProduct', {cart: results[0]});
        } else {
            // if no student with the given ID was found, render a 404 page or handle it accordingly
            res.status(404).send('Student not found');
        }
    });
})

app.post('/editProduct/:id', (req,res) => {
    const cartid = req.params.id;
    // extract student data from the request body
    const {quantity} = req.body;
    const sql  = "UPDATE cart SET quantity = ? WHERE cartid = ?";
    // insert the new student into the database
    connection.query(sql, [quantity,cartid], (error, results) =>{
        if (error) {
            //handle any error that occurs during the database operation
            console.error("Error adding student:", error);
            res.status(500).send('Error adding student');
        } else {
            //send a success response 
            res.redirect('/cart');
        }
    })
})

app.get('/deleteProduct/:id', (req,res) => {
    const cartid = req.params.id;
    const sql  = "DELETE FROM cart WHERE cartid = ?";
    // insert the new student into the database
    connection.query(sql, [cartid], (error, reults) =>{
        if (error) {
            //handle any error that occurs during the database operation
            console.error("Error adding student:", error);
            res.status(500).send('Error adding student');
        } else {
            //send a success response 
            res.redirect('/cart');
        }
    })
})

app.post('/addsub', (req,res) => {
    // extract student data from the request body
    const {fname,lname,gender,email,phone,dob} = req.body;
    const sql  = "INSERT INTO subscription (fname, last, gender, email, number, dob) VALUES (?, ?, ?, ?, ?, ?)";
    // insert the new student into the database
    connection.query(sql, [fname,lname,gender,email,phone,dob], (error, results) =>{
        if (error) {
            //handle any error that occurs during the database operation
            console.error("Error adding student:", error);
            res.status(500).send('Error adding student');
        } else {
            //send a success response 
            res.redirect('/subscription');
        }
    })
})

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