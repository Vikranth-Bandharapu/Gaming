
const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
});
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.getAttribute("data-target");

        const count = +counter.innerText;

        const increment = target / 100;

        if(count < target){

            counter.innerText =
            Math.ceil(count + increment);

            setTimeout(updateCounter,20);

        }else{

            counter.innerText = target + "+";

        }
    };

    updateCounter();
});

// Redirect all buttons and links to 404 page

document.querySelectorAll('a').forEach(link => {

    if(link.getAttribute('href') !== 'index.html') {

        link.addEventListener('click', function(e) {

            e.preventDefault();

            window.location.href = '404.html';

        });

    }

});

