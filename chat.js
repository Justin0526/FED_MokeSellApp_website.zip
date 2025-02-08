document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "67875f7d9e18b182ee6941f0";  // 678fbb8a58174779225315d5 67972e07f9d2bb46c9181e32
    let allUserInfoUrl = "https://tryuse-a494.restdb.io/rest/alluserinfo";   //  https://fedassg2-66ea.restdb.io/rest/alluserinfo https://experiment-d5c7.restdb.io/rest/alluserinfo
    let duckduckGoUrl = "https://api.duckduckgo.com";
    let userID = sessionStorage.getItem("userID");

    let header = {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    }
})