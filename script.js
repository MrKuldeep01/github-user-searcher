function setCard(obj) {
  console.log(obj);
  const mainBox = document.querySelector(".mainbox");
  let contentToShow = `
  <div class="maincontent">
  <div class="name left">
    <div class="employimage">
      <img src="${obj["avatar_url"]}" class="img" alt="demoimg" />
    </div>
    <span class="employname">${obj["name"]}</span>
    <a href="${
      obj["html_url"]
    }" class="employrole button" title="GitHub Profile">${obj["login"]}</a>

    <span class="location">location :${obj["location"]}</span>
  </div>
  <div class="right">
    <p class="reviewpera">
      ${obj["bio"]}
      
    </p>
    <div class="leftrightbtn">
      <span class="pointer button followers" onclick="">Followers : ${
    obj["followers"]
  }</span>
      <span class="pointer button following" onclick="">Following : ${
    obj["following"]
  }</span>
    </div>
  </div>
</div>
  `;
  mainBox.innerHTML = contentToShow;
}

function getUserFromGithub() {
  const userName = document.querySelector(".userName").value;
  if(!userName){
    let message = "enter userName properly";
    console.log(message);
    alert(message)
    return
  }
  let APIUrl = "https://api.github.com/users/"+userName;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", APIUrl);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      try {
        let data = JSON.parse(this.responseText);
        setCard(data);
      } catch {
        alert("connection error");
        return;
      }
    }
  };
  xhr.send();
}
// console.log("script running");
//  git_repo: " https://github.com/MrKuldeep01/github-user-searcher.git"