// Product data

const products = [

    {
        name: "Wireless Headphones",
        category: "electronics",
        price: 1999,
        rating: 4.7,
        icon: "🎧"
    },

    {
        name: "Smart Watch",
        category: "electronics",
        price: 2499,
        rating: 4.5,
        icon: "⌚"
    },

    {
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 999,
        rating: 4.2,
        icon: "🔊"
    },

    {
        name: "Cotton T-Shirt",
        category: "fashion",
        price: 499,
        rating: 4.1,
        icon: "👕"
    },

    {
        name: "Running Shoes",
        category: "fashion",
        price: 1899,
        rating: 4.6,
        icon: "👟"
    },

    {
        name: "Backpack",
        category: "fashion",
        price: 799,
        rating: 4.3,
        icon: "🎒"
    },

    {
        name: "Table Lamp",
        category: "home",
        price: 699,
        rating: 4.4,
        icon: "💡"
    },

    {
        name: "Coffee Mug",
        category: "home",
        price: 299,
        rating: 4.0,
        icon: "☕"
    },

    {
        name: "Wall Clock",
        category: "home",
        price: 599,
        rating: 4.2,
        icon: "🕐"
    },

    {
        name: "Java Programming",
        category: "books",
        price: 699,
        rating: 4.8,
        icon: "📘"
    },

    {
        name: "Clean Code",
        category: "books",
        price: 999,
        rating: 4.9,
        icon: "📕"
    },

    {
        name: "Web Development Guide",
        category: "books",
        price: 799,
        rating: 4.5,
        icon: "📗"
    }

];


// Get HTML elements

const productContainer =
    document.getElementById("products");

const search =
    document.getElementById("search");

const category =
    document.getElementById("category");

const price =
    document.getElementById("price");

const sort =
    document.getElementById("sort");

const resultCount =
    document.getElementById("resultCount");


// Display products

function displayProducts() {

    // Copy original products

    let result = [...products];


    // Search

    const searchText =
        search.value
            .toLowerCase()
            .trim();


    if (searchText !== "") {

        result =
            result.filter(function(product) {

                return product.name
                    .toLowerCase()
                    .includes(searchText);

            });

    }


    // Category filter

    if (category.value !== "all") {

        result =
            result.filter(function(product) {

                return product.category ===
                    category.value;

            });

    }


    // Price filter

    if (price.value !== "all") {

        const maxPrice =
            Number(price.value);

        result =
            result.filter(function(product) {

                return product.price <= maxPrice;

            });

    }


    // Sorting

    if (sort.value === "priceLow") {

        result.sort(function(a, b) {

            return a.price - b.price;

        });

    }


    if (sort.value === "priceHigh") {

        result.sort(function(a, b) {

            return b.price - a.price;

        });

    }


    if (sort.value === "ratingHigh") {

        result.sort(function(a, b) {

            return b.rating - a.rating;

        });

    }


    if (sort.value === "ratingLow") {

        result.sort(function(a, b) {

            return a.rating - b.rating;

        });

    }


    // Number of products

    resultCount.textContent =
        result.length +
        " product(s) found";


    // Clear old products

    productContainer.innerHTML = "";


    // No products

    if (result.length === 0) {

        productContainer.innerHTML = `

            <div class="no-results">

                <h2>No Products Found</h2>

                <p>
                    Try changing your search
                    or filters.
                </p>

            </div>

        `;

        return;

    }


    // Display products

    result.forEach(function(product) {

        const card =
            document.createElement("article");


        card.className = "product";


        card.innerHTML = `

            <div class="icon">
                ${product.icon}
            </div>

            <h3>
                ${product.name}
            </h3>

            <p class="category">
                ${product.category}
            </p>

            <p class="price">
                ₹${product.price.toLocaleString("en-IN")}
            </p>

            <p class="rating">
                ⭐ ${product.rating}
            </p>

        `;


        productContainer.appendChild(card);

    });

}


// Search

search.addEventListener(
    "input",
    displayProducts
);


// Category

category.addEventListener(
    "change",
    displayProducts
);


// Price

price.addEventListener(
    "change",
    displayProducts
);


// Sort

sort.addEventListener(
    "change",
    displayProducts
);


// Initial display

displayProducts();