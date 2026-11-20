// Mobile menu
const nav = document.querySelector("nav");
const body = document.querySelector("body");
const navBar = document.querySelector(".navbar");
const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const logoOne = document.querySelector(".logo");

menuBtn.onclick = function () {
    navBar.classList.add("active");
    menuBtn.style.opacity = "0";
    menuBtn.style.pointerEvents = "none";
    body.style.overflow = "hidden";
};

cancelBtn.onclick = function () {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
    body.style.overflow = "auto";
};

// Side nevigstion bar close we click on navigation link
let navLinks = document.querySelectorAll(".menu li a");
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
        navBar.classList.remove("active");
        menuBtn.style.opacity = "1";
        menuBtn.style.pointerEvents = "auto";
        body.style.overflow = "auto";
    });
}
// Scroll fixed
window.addEventListener("scroll", function () {
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add("sticky");
        logoOne.classList.add("active");
        menuBtn.classList.add("active");
    } else {
        nav.classList.remove("sticky");
        logoOne.classList.remove("active");
        menuBtn.classList.remove("active");
    }

    // counter on scroll
    let number = 0;
    let oTop = $("#counter").offset().top - window.innerHeight;

    if (number == 0 && $(window).scrollTop() > oTop) {
        $(".counter-value").each(function () {
            let $this = $(this);
            let countTo = $this.attr("data-count");

            $({
                countNum: $this.text(),
            }).animate(
                {
                    countNum: countTo,
                },
                {
                    duration: 2000,
                    easing: "swing",
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum);
                    },
                },
            );
        });
    }
});

// silk slider testmonial
$(".testimonials").slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    cssEase: "linear",
    arrows: false,
});
