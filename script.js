function setCard(obj) {
  console.log(obj);
  const mainBox = document.querySelector(".mainbox");
  let contentToShow = `
  <div class="maincontent">
  <div class="name left">
    <div class="employimage">
      <img src="${obj["avatar_url"]}" class="img" alt="demoimg" />
    </div>
    <span class="employname"> <i class="ri-user-2-fill"></i> ${obj["name"]}</span>
    <a target="_blank" href="${obj["html_url"]}" class="employrole button" title="GitHub Profile"><i class="ri-github-fill"></i> ${obj["login"]}</a>

    <span class="location"><i class="ri-map-pin-user-line"></i> ${obj["location"]}</span>
  </div>
  <div class="right">
    <p class="reviewpera">
      ${obj["bio"]}
      
    </p>
    <div class="leftrightbtn">
      <span class="pointer button followers" title="Followers" > <i class="ri-user-received-fill"></i> Followers ${obj["followers"]}</span>
      <a class="button" title="following page" target="_blank" href="https://github.com/${obj["login"]}?tab=following">
       <i class="ri-user-shared-fill"></i> Following ${obj["following"]}
       </a>


      <a class="button" title="Repositories page" target="_blank" href="https://github.com/${obj["login"]}?tab=repositories">
       <i class="ri-file-fill"></i> Repositories
       </a>


    </div>
  </div>
</div>
  `;
  mainBox.innerHTML = contentToShow;
}

function getUserFromGithub() {
  const userName = document.querySelector(".userName").value;
  if (!userName) {
    let message = "enter userName properly";
    console.log(message);
    alert(message);
    return;
  }
  let APIUrl = "https://api.github.com/users/" + userName;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", APIUrl);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      try {
        let data = JSON.parse(this.responseText);
        console.log(data);
        setCard(data);
        document.querySelector(".followers").addEventListener("click", (e) => {
          showFollowers(data["followers_url"]);
        });
        // showFollowing(data["following_url"]);
      } catch {
        alert("connection error");
        return;
      }
    }
  };
  xhr.send();
}

// function showFollowers(arr) {
//   arr.map((obj, index) => {
//     let follower = `
//   <div class="followerCard">
//   <div class="employimage">
//     <img src="${obj["avatar_url"]}" class="img" alt="demoimg" />
//   </div>
//   <span class="employname"> <i class="ri-user-2-fill"></i> ${obj["name"]}</span>
//   <a target="_blank" href="${obj["html_url"]}" class="employrole button" title="GitHub Profile"><i class="ri-github-fill"></i> ${obj["login"]}</a>

//   <span class="location"><i class="ri-map-pin-user-line"></i> ${obj["location"]}</span>
// </div>
//   `;
//   });
// }
// function showFollowing(url) {
function showFollowers(url) {
  let arr = [];
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      arr = res;
      console.log(res);

      let followersContainer = document.querySelector(".followersContainer");
      followersContainer.innerHTML = `
      
      <button class="backbtn button">Go Back</button>
      `;
      arr.map((obj, index) => {
        let follower = `
  <div class="followerCard">
  <div class="employimage">
    <img src="${obj["avatar_url"]}" class="img" alt="demoimg" />
  </div>
  <a target="_blank" href="${obj["html_url"]}" class="employrole button" title="GitHub Profile"><i class="ri-github-fill"></i> ${obj["login"]}</a>
</div>
  `;
        followersContainer.style.left = 0;
        followersContainer.innerHTML += follower;
      });

      document.querySelector(".backbtn").addEventListener("click", (e) => {
        console.log("clicked");
        followersContainer.style.left = "-100%";
        //  let follower = document.querySelector(".follower").remove();
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// console.log("script running");
//  git_repo: " https://github.com/MrKuldeep01/github-user-searcher.git"

