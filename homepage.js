const http = require('http');
const url = require("url");
const fs = require("fs");

 // Set up view engine
 app.set('view engine', 'ejs');
 // enable static files
 app.use(express.static('public'));
 const upload = multer({ dest: 'uploads/' });
 // enable from processing 
 app.use(express.urlencoded({
     extended: false
 }));

  // Render HTML page with data
  res.render('index', { subscription: results });

const routeHandlers = {
    "/" : homeHandler,
    "/project" : projectHandler,
    "/contact" : contactHandler
};


const server = http.createServer((req,res)=>{
    const parsedUrl = url.parse(req.url,true);
    const path = parsedUrl.pathname;
    const handler = routeHandlers[path] || notFoundHandler;
    handler(req,res);
});

function homeHandler(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream("homepage.html").pipe(res);
}

function homeHandler(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream("customise.html").pipe(res);
}


    // Get all card elements
    const cards = document.querySelectorAll('.card');

    // Function to handle search input
    document.getElementById('searchInput').addEventListener('input', function() {
        const searchText = this.value.toLowerCase().trim();

        cards.forEach(card => {
            const title = card.querySelector('.card-title').innerText.toLowerCase();

            if (title.includes(searchText)) {
                card.style.display = 'block';  // Show matching cards
            } else {
                card.style.display = 'none';   // Hide non-matching cards
            }
        });
    });

    // Customize button 
    document.querySelectorAll('.btn-secondary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Perform action for customization, such as opening a modal or redirecting
            alert('Customize this flower arrangement!');
        });
    });

    // Cart functionality
    let cart = [];

    // Function to update the cart display
    function updateCart() {
        const cartContainer = document.getElementById('cartContainer');
        cartContainer.innerHTML = ''; // Clear existing cart items

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.title} - $${item.price}`;
            cartContainer.appendChild(itemElement);
        });
    }

    // Add to Cart button click event
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const title = button.getAttribute('data-title');
            const price = button.getAttribute('data-price');

            // Add item to cart
            const item = { title, price };
            cart.push(item);

            // Update the cart display
            updateCart();

            // Show an alert or some feedback
            alert(`${title} has been added to your cart.`);
        });
    });

    // Create cart container
    const cartContainer = document.createElement('div');
    cartContainer.id = 'cartContainer';
    document.body.appendChild(cartContainer);

    const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));