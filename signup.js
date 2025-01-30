document.addEventListener("DOMContentLoaded", function(){
    const APIKEY = "67972e07f9d2bb46c9181e32";
    const apiUrl = "https://experiment-d5c7.restdb.io/rest/trysignup";
    let header = {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    }

    // Get the form element and attach the event listener
    document.getElementById("signup-form").addEventListener("submit", function(e){
        e.preventDefault();

        let signupForm = document.getElementById("signup-form");
        let userName = document.getElementById("user-name").value;
        let userEmail = document.getElementById("user-email").value;
        let userPassword = document.getElementById("user-password").value;
        let confirmUserPassword = document.getElementById("confirm-user-password").value;

        if (!validateInput(userEmail, userPassword, confirmUserPassword)){
            console.log("Validation failed!");
            return;
        }

        checkEmailUnique(userEmail).then(isUnique => {
            if (!isUnique) {
                alert("This email is already registered. Please use a different email.");
                return;
            }

            let jsondata = {
                "user-name": userName,
                "user-email": userEmail,
                "user-password": userPassword
            };

            let settings = {
                method: "POST",
                headers: header,
                body: JSON.stringify(jsondata)
            };

            // Disable sign-up button while processing
            let signupButton = document.getElementById("user-signup");
            signupButton.disabled = true;

            // Send the Fetch request
            fetch(apiUrl, settings)
                .then(response => response.json())
                .then(data => {
                    console.log("Signup successful", data);
                    window.location.href = "home.html";
                    alert(`Signup Successful! Hi ${userName}`);
                    signupForm.reset();
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("An error occurred while signing up. Please try again.");
                })
                .finally(() => {
                    // Re-enable the sign-up button
                    signupButton.disabled = false;

                });
        });
    });
        
    function validateInput(email, password, confirmPassword) {
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return false;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return false;
        }

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        return true;
    }

    function checkEmailUnique(email) {
        // Construct the query URL
        const queryUrl = `${apiUrl}?q={"user-email": "${email}"}`;

        return fetch(queryUrl, {
            method: "GET",
            headers: header
        })
        .then(response => response.json())
        .then(data => {
            return data.length === 0; // If data is empty, email is unique
        })
        .catch(error => {
            console.error("Error checking email:", error);
            return false; // Return false if an error occurs
        });
    }
});