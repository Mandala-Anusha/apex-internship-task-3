// Mobile menu

const menuBtn = document.getElementById("menuBtn");

const navLinks = document.getElementById("navLinks");


menuBtn.addEventListener("click", function() {

    navLinks.classList.toggle("show");

});


// Close menu after clicking a link

const links = document.querySelectorAll("#navLinks a");

links.forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.classList.remove("show");

    });

});


// Contact form

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    formMessage.textContent =
        "Thank you, " + name +
        "! Your message has been received.";

    contactForm.reset();

});