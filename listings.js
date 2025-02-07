document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = " 67875f7d9e18b182ee6941f0";  //  678fbb8a58174779225315d5  67972e07f9d2bb46c9181e32
    let listingUrl = "https://tryuse-a494.restdb.io/rest/testreverbapi"; //  https://fedassg2-66ea.restdb.io/rest/reverblisting

    let header = {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    }

    let GETsettings = {
        method: "GET",
        headers: header
    }

    let listingCategory = sessionStorage.getItem("selectedCategory");
    console.log(listingCategory);
    document.getElementById("category-name").textContent = listingCategory;

    document.querySelectorAll(".listings-btn")
      .forEach(button => {
        button.addEventListener("click", function(){
            let selectedCategory = this.innerText.trim();
            console.log(selectedCategory);
            sessionStorage.setItem("selectedCategory", selectedCategory);
            window.location.href = "listings.html";
        })
      })

    fetch(listingUrl, GETsettings)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0){
            displayListings(data);
        }
        else{
            console.log("No data found");
        }
      })
      .catch(error => {
        console.error("Error fetching data from RESTDB: ", error);
      })

    function displayListings(data){
        let listingContainer = document.getElementById("listing-container");
        
        if (!listingContainer){
            console.error("Listing Container not found in DOM");
            return;
        }

        console.log("Filtering for category: ", listingCategory);
        let filteredData = [];

        for (let i = 0; i< data.length; i++){
            let item = data[i];

            if(item["reverb-category"].includes(listingCategory)){ // If the items belong to the selected category, add it to 'filteredData'
                filteredData.push(item);
            }
        }

        if (filteredData.length === 0){
            console.log(`No products found for category: ${listingCategory}`);
            return;
        }

        let listingContent = "";
        for (let index = 0; index < filteredData.length && index < 20; index ++) {
            let item = filteredData[index];
            randomDays = Math.floor(Math.random() * 30) + 1;
            let imageLink = item["reverb-links"].photo.href;
            let productName = item["reverb-title"];
            listingContent += `
                <div class="col-md-3">
                    <div class="card custom-card text-light shadow-sm">
                        <div class="d-flex align-items-center p-3 profile-info">
                            <img src="images/man.jpg" alt="User Photo" class="rounded-circle me-3" width="50" height="50">
                            <div>
                                <p class="mb-0 fw-bold profile-name">${item["reverb-shopname"]}</p>
                                <small class="text-muted join-date">${randomDays} days ago</small>
                            </div>
                        </div>
                        <a href="product-details.html" class="product-link" data-index="${index}">
                            <img src="${imageLink}" alt="${productName}" class="card-img-top">
                        </a>
                        <div class="card-body text-start">
                            <p class="card-title fw-bold mb-2">${productName}</p>
                            <p class="text-warning fw-bold">S$ ${item["reverb-price"]}</p>
                        </div>
                    </div>
                </div>
            `
        };
        listingContainer.innerHTML = listingContent;
    }
})