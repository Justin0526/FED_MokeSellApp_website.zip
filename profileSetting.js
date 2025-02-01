document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "678fbb8a58174779225315d5";
    let userProfileUrl = "https://fedassg2-66ea.restdb.io/rest/user-profile";
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
    let fields = ["username", "email", "firstName", "lastName"];

    fields.forEach(field => {
        let displayElement = document.getElementById(`${field}-display`);
        let inputElement = document.getElementById(`${field}-input`);
        let editButton = document.getElementById(`edit-${field}-btn`);

        if (displayElement && inputElement && editButton){
            editButton.addEventListener("click", function(){
                console.log("Edit button clicked");
                displayElement.style.display = "none";
                inputElement.style.display = "block";
                inputElement.value = displayElement.textContent;
                inputElement.focus();
            });

            inputElement.addEventListener("blur", function(){
                displayElement.textContent = inputElement.value; // update text
                displayElement.style.display = "block";
                inputElement.style.display = "none";
            })

            inputElement.addEventListener("keypress", function(event){
                if (event.key === "Enter"){
                    event.preventDefault();
                    inputElement.blur();
                }
            })
        }
    })
        
    fetch (userIDUrl, settings)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0){
            console.error("User profile not found");
            return;
        }

        let userProfile = data[0];
        console.log(userProfile)

        // Populate fields with user data
        fields.forEach(field => {
            let displayElement = document.getElementById(`${field}-display`);
            if (displayElement){
                if (userData && userData.trim() !== ""){
                    displayElement.textContent = userProfile[`user-${field}`]
                }       
            }
        })
      })
      .catch(error => {
        console.error("Error: ", error);
        alert("Error loading profile. Please try again later");
      })
})