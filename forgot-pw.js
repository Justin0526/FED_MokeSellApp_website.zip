document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "678fbb8a58174779225315d5";  // 67875f7d9e18b182ee6941f0
    let allUserInfoUrl = "https://fedassg2-66ea.restdb.io/rest/alluserinfo";   // https://tryuse-a494.restdb.io/rest/alluserinfo 
    const header = {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    };

    document.getElementById("OTP-form").addEventListener("submit", function(e){
        e.preventDefault();

        let userEmail = document.getElementById("user-email").value;

        checkEmailExists(userEmail)
          .then(userdata => {
            console.log(userdata);
            if(!userdata){
                alert("This email is not registered. Please signup first!");
                return;
            }

            let sendButton = document.getElementById("sendOTP");
            sendButton.disabled = true;
            alert("Your reset symphony is on its way! Check your email for the OTP 🎼");
          })
          .finally(()=> {
            document.getElementById("OTP-form").reset();
          });

        function checkEmailExists(email){
            let queryUrl = `${allUserInfoUrl}?q={"user-email": "${email}"}`;
    
            let settings = {
                method: "GET",
                headers: header
            };
            return fetch(queryUrl, settings)
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
            });
        }
    });
});