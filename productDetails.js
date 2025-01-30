document.addEventListener("DOMContentLoaded", function(){
    const restDBUrl = "https://tryuse-a494.restdb.io/rest/testreverbapi";
    const APIKEY = "67875f7d9e18b182ee6941f0";

    const header ={
        "Content-Type": "application/hal+json",
        "Accept": "application/hal+json",
        "Accept-Version": "3.0"
    };

   let settings = {
       method: "GET",
       headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
       }
   }
})