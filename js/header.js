const menuBtn = document.querySelector(".mobileMenuBtn");
const headerNav = document.querySelector(".headerNav");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  headerNav.classList.toggle("active");
});
