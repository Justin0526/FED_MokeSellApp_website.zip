document.addEventListener("DOMContentLoaded", function(){
    const APIKEY = "678fbb8a58174779225315d5";
    const reverbApiUrl = "https://api.reverb.com/api/listings/?page=1&per_page=1";
    const listingUrl = "https://fedassg2-66ea.restdb.io/rest/reverblisting";

    const header = {
        "Content-Type": "application/hal+json",
        "Accept": "application/hal+json",
        "Accept-Version": "3.0"
    };

    getReverbData();
    // get and display data when the page loads
    getAndDisplayRestDBData();

    // Function to fetch data from Reverb API
    function getReverbData() {
        let settings = {
            method: "GET",
            headers: header,
        };

        fetch(reverbApiUrl, settings)
            .then(response => response.json())
            .then(data => {
            if (data.listings && data.listings.length > 0) {
                // Proceed to fetch data from RestDB
                getRestDBData(data.listings);
            } else {
                console.log("No listings found in Reverb API.");
            }
            })
            .catch(error => {
            console.error(error.message)
            })
    }

    // Function to fetch existing data from RestDB
    function getRestDBData(reverbListings) {
        fetch(listingUrl, {
            method: "GET", // HTTP method
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Parse the JSON response
            })
            .then(restDbData => {
                const existingIds = restDbData.map(record => record["reverb-id"]); // Extract existing product IDs
                insertNewDataToRestDB(reverbListings, existingIds); // Insert new data
            })
            .catch(error => {
                console.error("Error fetching data from RestDB:", error);
            });
    }

    // Function to insert New data into restDB
    function insertNewDataToRestDB(reverbListings, existingIds) {
        reverbListings.forEach(listing => {
            const productId = listing.id; // Unique product ID
            if (!existingIds.includes(productId)) {
                // Convert price to a numeric value
                let price = 0;
                if (listing.price && listing.price.display) {
                    // Extract numeric value from the price string (e.g., "$500.00" -> 500.00)
                    price = parseFloat(listing.price.display.replace(/[^0-9.-]+/g, '')) || 0;
                }
    
                // Generate random quantity as a number
                const quantity = Math.floor(Math.random() * 100) + 1;
    
                // Build product data for insertion
                const productData = {
                    "reverb-id": productId,
                    "reverb-title": listing.title || "No title",
                    "reverb-price": price, // Converted price as a number
                    "reverb-availability": "Available", // Default value
                    "reverb-quantity": quantity, // Numeric quantity
                    "reverb-details": listing.description || "No description",
                    "reverb-condition": listing.condition ? listing.condition.display_name : "Unknown",
                    "reverb-shopname": listing.shop_name || "Unknown",
                    "reverb-category": listing.categories
                        ? listing.categories.map(c => c.full_name).join(", ")
                        : "Uncategorized",
                    "reverb-links": listing._links || {} // Save links for later use
                };
    
                // Log the product data being sent
                console.log("Product Data Being Sent:", productData);
    
                // Insert the product into RestDB using Fetch API
                fetch(listingUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-apikey": APIKEY
                    },
                    body: JSON.stringify(productData) // Stringify the product data
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        console.log("Inserted new product:", productId);
                    })
                    .catch(error => {
                        console.error("Error inserting data into RestDB:", error);
                    });
            } else {
                console.log("Product already exists in RestDB:", productId);
            }
        });
    }

    // Function to fetch and display data from RestDB
    function getAndDisplayRestDBData() {
        fetch(listingUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Parse the JSON response
            })
            .then(data => {
                if (data.length > 0) {
                    displayGalleryData(data);
                }
                else {
                    console.log("No data found in RestDB.");
                    document.getElementById("product-list").innerHTML = "<p>No products found.</p>";
                }
            })
            .catch(error => {
                console.error("Error fetching data from RestDB:", error);
                document.getElementById("product-list").innerHTML = "<p>Error fetching data from RestDB.</p>";
            });
    }

    // Function to display data for home page
    function displayGalleryData(data) {
        trendingContainer = document.getElementById("trending-items-gallery");
        recommendContainer = document.getElementById("recommended-items-gallery");
    
        if (!trendingContainer || !recommendContainer) {
            console.error("Trending or Recommended gallery not found in the DOM.");
            return;
        }
    
        // Shuffle data 
        shuffledData = data.sort(() => Math.random() - 0.5);
    
       // Trending Item Container
        let trendingCardsHTML = "";
        shuffledData.slice(0,4).forEach(item => {
            const imageLink = item["reverb-links"]?.photo?.href || "default-placeholder.jpg";
            trendingCardsHTML += `
                <div class="col-md-3">
                    <div class="card custom-card text-light shadow-sm">
                        <div class="d-flex align-items-center p-3">
                            <img src="images/man.jpg" alt="User Photo" class="rounded-circle me-3" width="50" height="50">
                            <div>
                                <p class="mb-0 fw-bold">${item["reverb-shopname"]}</p>
                                <small class="text-muted">20 days ago</small>
                            </div>
                        </div>
                        <a href="product-details.html">
                            <img src="${imageLink}" alt="${item["reverb-title"]}" class="card-img-top">
                        </a>
                        <div class="card-body text-start">
                            <p class="card-title fw-bold mb-2">${item["reverb-title"]}</p>
                            <p class="text-warning fw-bold">S$${item["reverb-price"]} </p>
                        </div>
                    </div>
                </div>
            `;
        });
        trendingContainer.innerHTML = trendingCardsHTML;
    
        // Recommended Items container
        let recommendCardsHTML = "";
        shuffledData.slice(4,8).forEach(item => {
            const imageLink = item["reverb-links"]?.photo?.href || "default-placeholder.jpg";
            recommendCardsHTML += `
                <div class="col-md-3">
                    <div class="card custom-card text-light shadow-sm">
                        <div class="d-flex align-items-center p-3">
                            <img src="images/man.jpg" alt="User Photo" class="rounded-circle me-3" width="50" height="50">
                            <div>
                                <p class="mb-0 fw-bold">sustainable_thr</p>
                                <small class="text-muted">20 days ago</small>
                            </div>
                        </div>
                        <a href="product-details.html">
                            <img src="${imageLink}" alt="${item["reverb-title"]}" class="card-img-top">
                        </a>
                        <div class="card-body text-start">
                            <p class="card-title fw-bold mb-2">${item["reverb-title"]}</p>
                            <p class="text-warning fw-bold">S$${item["reverb-price"]} </p>
                        </div>
                    </div>
                </div>
            `;
        });
        recommendContainer.innerHTML = recommendCardsHTML;
    }        

})