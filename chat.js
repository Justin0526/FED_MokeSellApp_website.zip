document.addEventListener("DOMContentLoaded", function(){
    let APIKEY = "678fbb8a58174779225315d5";  //    67972e07f9d2bb46c9181e32 67875f7d9e18b182ee6941f0
    let userProfileUrl = "https://fedassg2-66ea.restdb.io/rest/user-profile";  //  https://experiment-d5c7.restdb.io/rest/user-profile https://tryuse-a494.restdb.io/rest/user-profile
    let chatUrl = "https://fedassg2-66ea.restdb.io/rest/chat"; // https://tryuse-a494.restdb.io/rest/chat
    let duckduckGoUrl = "https://api.duckduckgo.com";
    let userID = sessionStorage.getItem("userID");
    let sendChat = document.getElementById("sendButton");

    const header = {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    };

    let chatInformation = sessionStorage.getItem("chatInformation");

    chatInfo = JSON.parse(chatInformation);
    console.log(chatInfo.receiverID);
    console.log(userID);

    if (!chatInfo || !chatInfo.receiverID){
        console.log("No receiverID found in session storage");
        startInstantAnswerChat();
        return;
    };

    let receiverID = chatInfo.receiverID;

    const GETsettings = {
        method: "GET",
        headers: header
    };

    const chatList = document.getElementById("chatList");

    let users = [];
    fetch(userProfileUrl, GETsettings)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0){
            data.forEach(user => {
                users.push(user);
            })
        }
        else{
            console.log("You are the only user, time for some sad music. Meow meow meow meow");
        }
      })
      .catch(error => {
        console.error("Error fetching users from RestDB: ", error);
      })

    users.forEach(user => {
        let chatItem = document.createElement("li");
        let image = user["user-profile-picture"] ? user["user-profile-picture"] : "images/man.jpg"
        let username = user["user-username"]
        chatItem.innerHTML = `
            <img src="${image}" alt="${username}" class="chat-avatar">
            <span>${username}</span>
        `;

        chatItem.addEventListener("click", () => loadChat(username, image));
        chatList.appendChild(chatItem);
    })

    sendChat.addEventListener("click", sendMessage())

    function sendMessage(){
        let userName = document.getElementById("chatUsername").innerText;
        let userInput = document.getElementById("userInput");
        let messageText = userInput.value.trim();
        let chatbox = document.getElementById("chatBox");

        if (messageText && userName !== "Select a Chat"){
            let message = {
                "senderID": userID,
                "receiverID": receiverID,
                "message": messageText
            };
            const POSTsettings = {
                method: "POST",
                headers: header,
                body: JSON.stringify(message)
            };

            fetch(chatUrl, POSTsettings)
              .then(response => response.json())
              .then(data => {
                console.log("Data being sent: ", data)
                const messageBox = document.createElement("div");
                messageBox.className = "message user";
                messageBox.innerHTML = `<span>${messageText}</span>`;
                chatbox.ATTRIBUTE_NODE.appendChild(messageBox);
              })
              .catch(error => console.error("Error: ", error));
        }

        userInput.value = "";
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    function loadChat(username, imgUrl){
        document.getElementById("chatUsername").innerText = username;
        document.getElementById("chatHeaderImg").src = imgUrl;

        let chatBox = document.getElementById("chatBox");
        chatBox.innerHTML = "";

        fetch(chatUrl, GETsettings)
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error("Error fetching chat history: ", error);
          })
    }
})