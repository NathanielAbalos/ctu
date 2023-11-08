const hamburger = document.querySelector(".hamburger");
const navMobile = document.querySelector(".navBar");

hamburger.addEventListener("click",(event)=>{
    hamburger.classList.toggle("active");
    navMobile.classList.toggle("active");
});

