document.addEventListener("DOMContentLoaded", function(){
    const APIKEY = "678fbb8a58174779225315d5";
    let loginAPIUrl = "https://fedassg2-66ea.restdb.io/rest/login";
    let signupAPIUrl = "https://fedassg2-66ea.restdb.io/rest/signup";
    let header = {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    }

    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Retrieve form data
        let userEmail = document.getElementById("user-email").value;
        let userPassword = document.getElementById("user-password").value;

        let emailError = document.getElementById("emailError");
        let passwordError = document.getElementById("passwordError");
        // Validate inputs
        if (!validateInput(userEmail)) {
            console.log("Validation failed!");
            return;
        }

        checkEmailExists(userEmail).then(userData => {
            if (!userData){           
                emailError.style.display = 'block';
                return;
            }

            emailError.style.display = 'none';
            passwordError.style.display = 'none';
            let userName = userData["user-name"];
            let correctPassword = userData["user-password"];

            if (userPassword === correctPassword){
                alert(`Welcome back ${userName}`);
                // Prepare data for API call
                let jsondata = {
                    "userEmail": userEmail,
                    "userPassword": userPassword
                }
                // Create settings for Fetch API
                let settings = {
                    method: "POST",
                    headers: header,
                    body: JSON.stringify(jsondata)
                };
            
                // Disable login button while processing
                let loginButton = document.getElementById("user-login");
                loginButton.disabled = true;
            
                // Send Fetch request
                fetch(loginAPIUrl, settings)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Login successful:", data);
                        window.location.href = "home.html";
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        alert("An error occurred while logging in. Please try again.");
                    })
                    .finally(() => {
                        loginButton.disabled = false; // Re-enable the login button
                    });
            }
            else{
                passwordError.style.display = 'block';
            }           
        })

            // A regular expression (emailRegex) ensures that the email follows a basic structure
            // /^[^\s@]+: Begins with one or more non-whitespace and non @characters
            // @[^\s@]+: Includes an @ symbol followed by one or more valid characters
            // \.[^\s@]+$/: Ends with a dot and a valid domain (eg: .com, .org)
            function validateInput(email){
                let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                // test() returns true if the string matches the pattern defined by the regular expression, false otherwise
                if (!emailRegex.test(email)){
                    alert ("Please enter a valid email address.");
                    return false;
                }
                
                return true;
            }

            function checkEmailExists(email){
                const queryUrl = `${signupAPIUrl}?q={"user-email": "${email}"}`;

                return fetch(queryUrl, {
                    method: "GET",
                    headers: header
                })
                .then(response => response.json())
                .then(data => {
                    if (data.length === 0){
                        return null;
                    }
                    return data[0];
                })
                .catch(error =>{
                    console.error("Error checking email: ", error);
                    return null;
                })
            }
    })
})