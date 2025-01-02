// JS code for mouse pointer
const coords = {
    x: 0,
    y: 0
    };
    const circles = document.querySelectorAll(".circle");
    const colors = [
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000"
    ];
    circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index % colors.length];
    });
    window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
    });
    
    function animateCircles() {
    let x = coords.x;
    let y = coords.y;
    circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";
        circle.style.scale = (circles.length - index) / circles.length;
        circle.x = x;
        circle.y = y;
        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });
    requestAnimationFrame(animateCircles);
    }
    animateCircles();

// // JS code for navbar
// var lastScrollTop = 0;
// var navbar = document.getElementById("navbar");

// window.addEventListener("scroll", function () {
//   var scrollTop = window.scrollY || document.documentElement.scrollTop;

//   // Detect screen width
//   var isPhone = window.innerWidth <= 576;

//   if (scrollTop > lastScrollTop) {
//     // Scrolling down: hide navbar
//     navbar.style.top = isPhone ? "-250px" : "-100px";
//   } else if(scrollTop < 50) {
//     // Scrolling up: only show navbar if near the top
//       navbar.style.top = "0";
//   }

//   lastScrollTop = scrollTop;
// });

// document.addEventListener("DOMContentLoaded", function () {
//     var menu_bar = document.getElementById("menu-bar");
//     var menus = document.getElementsByClassName("menu");
//     var about_us = document.getElementsByClassName("about-section")[0];

//     menu_bar.addEventListener("click", function (event) {
//         event.stopPropagation();
//         if (about_us) { // Check if about_us is defined
//             for (var i = 0; i < menus.length; i++) {
//                 if (window.getComputedStyle(menus[i]).display === "none") {
//                     menus[i].style.display = "block";
//                     about_us.style.padding = "900px 0 0 0";
//                 } else {
//                     menus[i].style.display = "none";
//                     about_us.style.padding = "750px 0 0 0"; // Set padding when the menu is hidden
//                 }
//             }
//         }
//     });
// });
// JS code for navbar
var lastScrollTop = 0;
var navbar = document.getElementById("navbar");

// Add smooth transition to navbar
navbar.style.transition = "top 0.3s ease-out";

window.addEventListener("scroll", function () {
  var scrollTop = window.scrollY || document.documentElement.scrollTop;

  // Detect screen width
  var isPhone = window.innerWidth <= 576;

  if (scrollTop > lastScrollTop) {
    // Scrolling down: hide navbar
    navbar.style.top = isPhone ? "-250px" : "-100px";
  } else if(scrollTop < 50) {
    // Scrolling up: only show navbar if near the top
    navbar.style.top = "0";
  }

  lastScrollTop = scrollTop;
});

document.addEventListener("DOMContentLoaded", function () {
    var menu_bar = document.getElementById("menu-bar");
    var menus = document.getElementsByClassName("menu");
    var about_us = document.getElementsByClassName("about-section")[0];

    // Add transitions to menus and about section
    if (about_us) {
        about_us.style.transition = "padding 0.3s ease-out";
    }
    for (var i = 0; i < menus.length; i++) {
        menus[i].style.transition = "all 0.3s ease-out";
    }

    menu_bar.addEventListener("click", function (event) {
        event.stopPropagation();
        if (about_us) {
            for (var i = 0; i < menus.length; i++) {
                if (window.getComputedStyle(menus[i]).display === "none") {
                    menus[i].style.display = "block";
                    about_us.style.padding = "850px 0 0 0";
                } else {
                    menus[i].style.display = "none";
                    about_us.style.padding = "400px 0 0 0";
                }
            }
        }
    });
});