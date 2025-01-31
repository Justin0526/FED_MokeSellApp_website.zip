document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "678fbb8a58174779225315d5";
    let allUserInfoUrl = "https://fedassg2-66ea.restdb.io/rest/alluserinfo";
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

        let passwordError = document.getElementById("passwordError");
        let confirmPasswordError = document.getElementById("confirmPasswordError");
        let emailError = document.getElementById("emailError");

        passwordError.style.display = 'none';
        confirmPasswordError.style.display = 'none';
        emailError.style.display = 'none';

        if (!validateInput(userEmail, userPassword, confirmUserPassword, passwordError, confirmPasswordError, emailError)){
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
            fetch(allUserInfoUrl, settings)
                .then(response => response.json())
                .then(data => {
                    let userID = data._id;
                    console.log("UserID: ", userID);

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
        
    function validateInput(email, password, confirmPassword, passwordError, confirmPasswordError, emailError) {
        if (password.length < 6) {
            passwordError.style.display = 'block';
            return false;
        }

        if (password !== confirmPassword) {
            confirmPasswordError.style.display = 'block';
            return false;
        }

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailError.style.display = 'block';
            return false;
        }

        return true;
    }

    function checkEmailUnique(email) {
        // Construct the query URL
        const queryUrl = `${allUserInfoUrl}?q={"user-email": "${email}"}`;

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
            return null; // Return false if an error occurs
        });
    }
});