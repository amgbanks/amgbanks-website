// Lazy load images
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    //lazyImage.srcset = lazyImage.dataset.srcset;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});



// Lightbox modal
function openModal() {
    document.getElementById('gallery-modal').style.display = "grid";
}

function closeModal() {
    document.getElementById('gallery-modal').style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls

document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
        //plusSlides(-1)
        document.getElementById("prev-arrow").click();
    } else if (e.keyCode == '39') {
        //plusSlides(1)
        document.getElementById("next-arrow").click();
    }
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName('img--in-grid')
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    var mod = document.getElementById('modal-image')
    mod.src = slides[slideIndex-1].dataset.modal
    mod.alt = slides[slideIndex-1].alt

    var loc = document.getElementById('modal-location')
    loc.textContent = slides[slideIndex-1].alt
}


