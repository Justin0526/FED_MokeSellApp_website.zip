document.addEventListener("DOMContentLoaded", function(){
  let APIKEY = "67875f7d9e18b182ee6941f0";  // (tryuse) 678fbb8a58174779225315d5(fedassg2) 67972e07f9d2bb46c9181e32(experiment)
  let leaderboard = "https://experiment-d5c7.restdb.io/rest/leaderboard";  // https://tryuse-a494.restdb.io/rest/leaderboard https://fedassg2-66ea.restdb.io/rest/leaderboard
  let userProfileUrl = "https://experiment-d5c7.restdb.io/rest/user-profile";  //  https://tryuse-a494.restdb.io/rest/user-profile https://fedassg2-66ea.restdb.io/rest/user-profile

  let userID = sessionStorage.getItem("userID");
  let userName = sessionStorage.getItem("userName");

  let hiddenCoinIndex = Math.floor(Math.random() * 6);
  let attempts = 0;
  let coinsEarned = 0;

  const header = {
      "Content-Type": "application/json",
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache"
  };

  let GETsettings = {
      method: "GET",
      headers: header
  };

  document.querySelectorAll(".box").forEach((box, index) => {
      box.addEventListener("click", () => checkBox(index));
  });
  document.querySelector('.restart-btn').addEventListener('click', resetGame);

  displayScoreboard();

  function checkBox(index) {
      if (attempts >= 2) return;
      
      let boxes = document.querySelectorAll('.box');
      if (index === hiddenCoinIndex) {
          boxes[index].textContent = '💰';
          coinsEarned = Math.floor(Math.random() * (10-3+1)) + 3; // Earn random coins between 3 and 10
          boxes[index].classList.add('opened', 'correct');
          document.getElementById('message').textContent = `Congratulations! You found ${coinsEarned} coins!`;
          attempts = 2; // End game immediately

          console.log(`${coinsEarned} coins earned!`);
          saveScore(coinsEarned);
      } else {
          boxes[index].textContent = '❌';
          boxes[index].classList.add('opened', 'wrong');
          attempts++;
          if (attempts === 2) {
              document.getElementById('message').textContent = 'Game Over! Try Again.';
          }
      }
  }

  function resetGame() {
      hiddenCoinIndex = Math.floor(Math.random() * 6);
      attempts = 0;
      let boxes = document.querySelectorAll('.box');
      boxes.forEach(box => {
          box.textContent = '?';
          box.classList.remove('opened', 'correct', 'wrong');
      });
      document.getElementById('message').textContent = '';
  }

  function saveScore(coins){
      if (!userID) return;
      console.log("You won coins!");
      
      fetch(leaderboard, GETsettings)
        .then(response => response.json())
        .then(data => {
          let existingUser = data.find(user => user["user-id"] === userID);
          console.log(existingUser);
          if (existingUser){
              let updatedScore = existingUser["user-score"] + coins;
              console.log(`Updated Score: ${updatedScore}`);
              let PUTsettings = {
                  method: "PUT",
                  headers: header,
                  body: JSON.stringify({"user-score": updatedScore})
              };

              fetch(`${leaderboard}/${existingUser._id}`, PUTsettings)
                .then(() =>{
                  updateUserProfile(updatedScore);
                  displayScoreboard();
                })
                .catch(error => console.error("Error updating score: ", error));
          }
          else{
              console.log("add user");
              console.log(`${userName}: ${userID}, Coins earned: ${coins}`);
              // New user
              let newUser = {
                  "user-id": userID,
                  "user-name": userName,
                  "user-score": coins
              };
              let POSTsettings = {
                  method: "POST",
                  headers: header,
                  body: JSON.stringify(newUser)
              };
              fetch(leaderboard, POSTsettings)
                .then(() => {
                  updateUserProfile(coins);
                  displayScoreboard();
                })
                .catch(error => console.error("Error creating new user: ", error));
          }
        })
        .catch(error => console.error("Error fetching leaderboard data: ", error));
  }
  function updateUserProfile(totalCoins){
      fetch(`${userProfileUrl}?q={"linked-userID":"${userID}"}`, GETsettings)
        .then(response => response.json())
        .then(data => {
          let userProfile = data[0];
          console.log(userProfile);
          let PUTsettings = {
              method: "PUT",
              headers: header,
              body: JSON.stringify({"user-coins": totalCoins})
          };
          fetch(`${userProfileUrl}/${userProfile._id}`, PUTsettings)
            .then(() => {
              console.log(`Total coins for ${userProfile["user-username"]} is ${totalCoins}`);
            })
            .catch(error => console.error("Error fetcching user profile: ", error));
          });
      
  }

  function displayScoreboard(){
      fetch(leaderboard, GETsettings)
        .then(response => response.json())
        .then(data => {
          let scoreboard = document.getElementById("scoreboard");
          scoreboard.innerHTML = "";
          data.sort((a,b) => b["user-score"] - a["user-score"]);
          data.forEach((player, index) => {
              let row = 
              `<tr class="player-info">
                <td class="no-column">${index + 1}</td>
                <td>${player["user-name"]}</td>
                <td>${player["user-score"]}</td>
                </tr>`;
                scoreboard.innerHTML += row;
          });
        });
  }
});
