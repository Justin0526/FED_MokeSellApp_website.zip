document.addEventListener("DOMContentLoaded", function(){
    const APIKEY = "678fbb8a58174779225315d5";
    const loginAPI = "https://fedassg2-66ea.restdb.io/rest/login";

    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault();
    
        // Retrieve form data
        let userEmail = document.getElementById("user-email").value;
        let userPassword = document.getElementById("user-password").value;
    
        // Validate inputs
        if (!validateInput(userPassword)) {
            console.log("Validation failed!");
            return;
        }
    
        // Prepare data for API call
        let jsondata = {
            "userEmail": userEmail,
            "userPassword": userPassword
        };
    
        // Create settings for Fetch API
        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsondata)
        };
    
        // Disable login button while processing
        const loginButton = document.getElementById("user-login");
        loginButton.disabled = true;
    
        // Send Fetch request
        fetch(loginAPI, settings)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to log in. Check your credentials.");
                }
                return response.json();
            })
            .then(data => {
                console.log("Login successful:", data);
    
                // Redirect after successful login
                alert("Login successful!");
                window.location.href = "home.html";
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred while logging in. Please try again.");
            })
            .finally(() => {
                loginButton.disabled = false; // Re-enable the login button
            });

            function validateInput(password){
                if (password.length < 6){
                    alert("Password must be at least 6 characters long.");
                    return false;
                }
                return true;
            }
    })
})