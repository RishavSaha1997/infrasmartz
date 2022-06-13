function loadFooter() {
  fetch("./footer.html")
    .then((response) => response.text())
    .then((text) => {
      document.getElementById("footer").innerHTML = text;
      // Changing the Year Dynamically
      const d = new Date();
      document.getElementById("demo").innerHTML = d.getFullYear();
    });
}

loadFooter();

// Changing Navbar OnScroll
const navbar = document.querySelector("header");
window.onscroll = () => {
  if (window.scrollY > 50) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};
