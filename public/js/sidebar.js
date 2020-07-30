toggleMenu = () => {
  document.getElementById("aside").classList.toggle("menu");
  document.querySelector(".sidebar-toggle").classList.toggle("active");
  document
    .querySelector(".sidebar-toggle")
    .classList.toggle("sidebar-toggle-readjust");
};

window.addEventListener("resize", () => {
  if (window.matchMedia("(max-width: 992px)").matches) {
    // If media query matches
    document.getElementById("aside").classList.remove("menu");
    document.querySelector(".sidebar-toggle").classList.remove("active");
    document
      .querySelector(".sidebar-toggle")
      .classList.remove("sidebar-toggle-readjust");
  }
});
