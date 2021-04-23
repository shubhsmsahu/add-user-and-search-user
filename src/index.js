const api = `https://randomuser.me/api`;
const addUser = document.getElementById("user-btn");
const dscSortButton = document.getElementById("sort-btn-dsc");
const ascSortButton = document.getElementById("sort-btn-asc");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");
const appState = [];
class User {
  constructor(title, firstname, lastname, gender, email) {
    this.name = `${title} ${firstname} ${lastname}`;
    this.email = email;
    this.gender = gender;
  }
}
addUser.addEventListener("click", async () => {
  const response = await fetch(api, {
    method: "GET"
  });
  const userData = await response.json();
  console.log(userData.results[0]);
  const user = userData.results[0];
  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );
  appState.push(classUser);
  console.log(appState);
  domRenderer(appState);
});

const domRenderer = (startArr) => {
  userList.innerHTML = null;
  startArr.forEach((userObj) => {
    // const userEl = document.createElement("div");
    userList.innerHTML += `<div>
    ${userObj.name}
    <ol>
    <li>${userObj.gender}</li>
    <li>${userObj.email}</li>
    </ol>
    </div>`;
    // userList.appendChild(userEl);
  });
};
const searchEventHandler = (e) => {
  console.log(e, searchInput.value);
  const filteredAppState = appState.filter(
    (user) =>
      user.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  domRenderer(filteredAppState);
};
searchInput.addEventListener("keyup", searchEventHandler);

dscSortButton.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name > b.name ? 1 : -1));
  domRenderer(appStateCopy);
});

ascSortButton.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name < b.name ? 1 : -1));
  domRenderer(appStateCopy);
});
