const menuBtn = document.querySelector(".mobileMenuBtn");
const headerNav = document.querySelector(".headerNav");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  headerNav.classList.toggle("active");
});

for (let i = 1; i <= 4; i++) {
  const headerLink = document.querySelector(`#headerLink${i}`);

  headerLink.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    headerNav.classList.toggle("active");
  });
}
