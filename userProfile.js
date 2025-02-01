document.addEventListener("DOMContentLoaded", function(){
  let APIKEY = "67972e07f9d2bb46c9181e32";  //  67875f7d9e18b182ee6941f0  678fbb8a58174779225315d5
    let userProfileUrl = "https://experiment-d5c7.restdb.io/rest/user-profile";  //  https://tryuse-a494.restdb.io/rest/user-profile  https://fedassg2-66ea.restdb.io/rest/user-profile
    let createListingUrl = "https://experiment-d5c7.restdb.io/rest/create-listing"; //   https://tryuse-a494.restdb.io/rest/create-listing  https://fedassg2-66ea.restdb.io/rest/create-listing
     
    let header = {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    };

    let userID = sessionStorage.getItem("userID"); // Get the userID from session storage
    let userIDUrl = `${userProfileUrl}?q={"linked-userID": "${userID}"}`;

    let settings = {
        method: "GET",
        headers: header
    }

    fetch(userIDUrl, settings)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0){
            console.error("User profile not found!");
            return;
        }

        let userProfile = data[0]; 

        console.log(userProfile)
        // Update User Name
        document.getElementById("user-name").textContent = userProfile["user-username"];

        // Update User Email
        document.getElementById("user-email").textContent = userProfile["user-email"];

        let userListings = `${createListingUrl}?q={"linked-userID": "${userProfile["linked-userID"]}"}`; // https://fedassg2-66ea.restdb.io/rest/create-listing?q={"linked-userID": "${userProfile["linked-userID"]}"}

        fetch (userListings, settings)
          .then(response => response.json())
          .then(listings => {
            console.log("User Listings: ", listings);
            if (listings.length !== 0){
              let listingTitle = document.getElementById("listing-title");
              listingTitle.textContent = "Listings";
              displayListing(listings);
            }
            else{
              console.log("No listings created yet!");
            }
          })
          .catch(error => console.error("Error fetching user listing: ", error));
      })
      .catch(error => {
        console.error("Error fetching user profile: ", error);
        alert("Error loading profile. Please try again later.");
      })

    document.getElementById("edit-profile-btn").addEventListener("click", function(){
        window.location.href = "profile-setting.html";
    })

    function displayListing(data){
      let totalListings = document.getElementById("totalListings");
      totalListings.textContent = data.length;

      console.log("Display Data...");
      let listingContainer = document.getElementById("listing-container"); 

      let listingContent = "";
      data.forEach(item => {
        let imageLink = item["product-picture"];
        let listingID = item["_id"]; // Unique ID for each container, each listing
        listingContent += `  
          <div class="col-md-4" id="listing-${listingID}"> 
            <div class="listing-card">
                <div class="listing-buttons">
                    <button class="edit-listing" data-id="${listingID}">Edit</button>
                    <button class="delete-listing" data-id="${listingID}">Delete</button>
                </div>
                <img src="${imageLink}" alt="${item["product-name"]}">
                <h5 class="mt-5">${item["product-name"]}</h5>
                <p>${item["product-description"]}</p>
                <p>S$ ${item["product-price"]}</p>
            </div>
        </div>`;

      })
      listingContainer.innerHTML = listingContent

      document.querySelectorAll(".edit-listing")
        .forEach(button => {
          button.addEventListener("click", function(){
            let listingID = this.getAttribute("data-id"); // Get the listing ID
            console.log(listingID);
            sessionStorage.setItem("editingListingID", listingID);
            setTimeout(() => {
              window.location.href = "create-list.html";
            }, 100);  // Small delay (100ms) if not cannot load
          })
        })

      document.querySelectorAll(".delete-listing")
        .forEach(button => {
          button.addEventListener("click", function(){
            let listingID = this.getAttribute("data-id");
            deleteListing(listingID);
          })
        })
    }

    function deleteListing(listingID){
      if (!confirm("Are you sure you want to delete this listing?")) return

      let settings = {
        method: "DELETE",
        headers: header
      }

      fetch(`${createListingUrl}/${listingID}`, settings)
        .then(response => response.json())
        .then(() => {
          console.log(`Listing ${listingID} deleted successfully`);
          let listingElement =  document.getElementById(`listing-${listingID}`);
          if (listingElement) listingElement.remove(); // Remove from UI
          alert("Listing Removed Successfuly")
        })
        .catch(error => console.error("Error deleting listing: ", error));
    }  
})