
/* =========================
   Booster IT2 - script.js
========================= */

/* ===== Mobile Menu ===== */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if(menuToggle && mainNav){

    const menuIcon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click",()=>{

        mainNav.classList.toggle("active");

        if(menuIcon){

            menuIcon.classList.toggle("fa-bars");
            menuIcon.classList.toggle("fa-xmark");

        }

    });

    mainNav.querySelectorAll("a").forEach(link=>{

        link.addEventListener("click",()=>{

            mainNav.classList.remove("active");

            if(menuIcon){
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }

        });

    });

}

/* ===== Promo Slider ===== */

const sliderTrack = document.querySelector(".slider-track");

if(sliderTrack){

    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    setInterval(()=>{

        currentSlide = (currentSlide + 1) % slides.length;

        sliderTrack.style.transform =
            `translateX(-${currentSlide*100}%)`;

    },3000);

}


/* ===== Scroll Reveal ===== */

const reveals=document.querySelectorAll(".reveal");

function revealSections(){

    reveals.forEach(section=>{

        const top=section.getBoundingClientRect().top;

        if(top<window.innerHeight-100){
            section.classList.add("active");
        }

    });

}

window.addEventListener("scroll",revealSections);
revealSections();

/* ===== Counter Animation ===== */

const counters=document.querySelectorAll(".counter");

counters.forEach(counter=>{

    let count=0;
    const target=+counter.dataset.target;

    const update=()=>{

        count+=Math.ceil(target/60);

        if(count>=target){

            counter.innerText=target+"+";

        }else{

            counter.innerText=count;
            requestAnimationFrame(update);

        }

    };

    update();

});

/* ===== Active Navbar ===== */

const sections=document.querySelectorAll("section[id]");
const navLinks=document.querySelectorAll("#mainNav a[href^='#']");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        if(window.scrollY>=section.offsetTop-120){
            current=section.id;
        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});


/* ===== Customer Review Infinite Slider ===== */

const reviewTrack = document.querySelector(".review-track");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

if (reviewTrack && prevBtn && nextBtn) {

    const gap = 20;
    const originalCards = [...reviewTrack.children];

    function visibleCards() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }

    let show = visibleCards();

    function buildSlider() {

        reviewTrack.innerHTML = "";

        const first = originalCards
            .slice(0, show)
            .map(card => card.cloneNode(true));

        const last = originalCards
            .slice(-show)
            .map(card => card.cloneNode(true));

        last.forEach(card => reviewTrack.appendChild(card));
        originalCards.forEach(card => reviewTrack.appendChild(card));
        first.forEach(card => reviewTrack.appendChild(card));
    }

    buildSlider();

    let index = show;

    function cardWidth() {
        return reviewTrack.children[show].offsetWidth + gap;
    }

    function move(animate = true) {
        reviewTrack.style.transition =
            animate ? "transform .6s ease" : "none";

        reviewTrack.style.transform =
            `translateX(-${index * cardWidth()}px)`;
    }

    move(false);

    function nextReview() {
        index++;
        move();
    }

    function prevReview() {
        index--;
        move();
    }

    reviewTrack.addEventListener("transitionend", () => {

        if (index >= originalCards.length + show) {
            index = show;
            move(false);
        }

        if (index < show) {
            index = originalCards.length + show - 1;
            move(false);
        }

    });

    nextBtn.addEventListener("click", nextReview);
    prevBtn.addEventListener("click", prevReview);

    let auto = setInterval(nextReview, 2000);

    reviewTrack.addEventListener("mouseenter", () => clearInterval(auto));
    reviewTrack.addEventListener("mouseleave", () => {
        auto = setInterval(nextReview, 2000);
    });

    /* Mobile Swipe */

    let startX = 0;

    reviewTrack.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    reviewTrack.addEventListener("touchend", e => {

        const endX = e.changedTouches[0].clientX;

        if (startX - endX > 50) nextReview();
        if (endX - startX > 50) prevReview();

    });

    window.addEventListener("resize", () => {

        show = visibleCards();
        buildSlider();
        index = show;
        move(false);

    });

}
const year = new Date().getFullYear();

document.getElementById("copyright").innerHTML =
`© ${year} Booster IT2
<br>"আজাদ®" আর্কাইভে সর্বস্বত্ব সংরক্ষিত।`;