/*-----------Dark Mode------------- */

//Variables
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");
const starWarz = document.getElementById("star-wars");

//Dark / Light images
function imageMode(color) {
  image1.src = `img/rocket_${color}.svg`;
  image2.src = `img/alien_${color}.svg`;
  image3.src = `img/flat_${color}.svg`;
  starWarz.src = `img/warz_${color}.svg`;
}

//fn Dark Mode
function darkMode() {
  nav.style.backgroundColor = "rgb(0 0 0 / 50%)";
  textBox.style.backgroundColor = "rgb(255 255 255 / 50%)";
  toggleIcon.children[0].classList.replace("fa-sun", "fa-moon");
  imageMode("dark");
}

//fn Light Mode
function lightMode() {
  nav.style.backgroundColor = "rgb(255 255 255 / 50%)";
  textBox.style.backgroundColor = "rgb(0 0 0 / 50%)";
  toggleIcon.children[0].classList.replace("fa-moon", "fa-sun");
  imageMode("light");
}

//fn Switch Theme
function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    darkMode();
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    lightMode();
  }
}

//Event Listener
toggleSwitch.addEventListener("change", switchTheme);

//Check Local Storage for Theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    darkMode();
  }
}

/*-----------Nav toggle------------- */

//Variables
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const navLinksA = document.querySelectorAll(".nav-links a");

//Navbar Toggle
burger.addEventListener("click", () => {
  //burger bars animation
  burger.classList.toggle("burg-anim");
  //slide toggle fn
  navLinks.classList.toggle("nav-links-show");
});

//Close Navbar after Link is Clicked
navLinksA.forEach((link) => {
  link.addEventListener("click", closeNavbar);
});

//Close Navbar when Resizing with Nav Open
window.addEventListener("resize", () => {
  if (document.body.clientWidth > 800) {
    closeNavbar();
  }
});

function closeNavbar() {
  navLinks.classList.remove("nav-links-show");
  burger.classList.remove("burg-anim");
}

/*-----------Joke Generator------------- */

const joke = document.querySelector(".joke");
const button = document.querySelector(".primary");
const loader = document.querySelector(".loader");

//Show Loader
function showLoader() {
  loader.style.display = "block";
  joke.hidden = true;
}

//Hide Loader
function hideLoader() {
  if (!loader.hidden) {
    loader.style.display = "none";
    joke.hidden = false;
  }
}

//Get Jokes from API
async function getJoke() {
  //Show loader
  showLoader();

  //Url of used API
  const apiUrl =
    "https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes";
  //Get Jokes in JSON format
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    //Show Joke in Card
    joke.innerText = data.setup + " " + data.punchline;
    //Hide loader
    hideLoader();
    //Listen for errors
  } catch (error) {
    console.log("oh, shit", error);
    getJoke();
  }
}

//Get New Joke on Button Press
button.addEventListener("click", getJoke);

//On Load
getJoke();

/*-----------Smooth Scroll------------- */

//Cross Browser Solution
zenscroll.setup(700);
