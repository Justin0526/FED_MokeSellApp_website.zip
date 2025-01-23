document.addEventListener("DOMContentLoaded", function(){
    const APIKEY = "678fbb8a58174779225315d5";
    
    // ---- Login API ---- //
    // Step 1: Create login listener
    document.getElementById("user-login").addEventListener("click", function(e){
        e.preventDefault();

        // Retrieve form data 
        // Remember to do data validation !!!!!!!!!!!!!!!!!!!!!!!
        let userEmail = document.getElementById("user-email").value;
        let userPassword = document.getElementById("user-password").value;

        // Get form values when the user clicks on send
        // Adapted from restdb API
        let jsondata ={
            "userEmail": userEmail,
            "userPassword": userPassword
        };

        // Create AJAX settings. Take not of API key
        let settings = {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsondata)
            // beforeSend: function(){
            //     // can add loading bar
            //     // disable the button or show loading bar
            //     document.getElementById("user-login").disabled = true;
            // }
        }

        // Step 5: Send AJAX request over to the DB and print response of the RESTDB storage to console
        fetch("https://fedassg2-66ea.restdb.io/rest/login", settings)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            document.getElementById("user-submit").disabled = false;

          })

        
    });
    // ------------------  // 
})