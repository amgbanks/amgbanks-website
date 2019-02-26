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
    } else {
        var lazyImages = document.querySelectorAll(".lazy");
        lazyImages.forEach(function(img) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
});



// Lightbox modal
var modalWindow = document.getElementById('gallery-modal')
var modalImage = document.getElementById('modal-image')
var starttime

function animateDisplay(timestamp, el, scale, opacity, duration) {
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime
    var progress = runtime / duration
    progress = Math.min(progress, 1)

    if (el.style.opacity < opacity) {
        el.style.transform = "scale(" + (scale * progress).toFixed(2) + ")"
        el.style.opacity = (opacity * progress).toFixed(2)
    } else if (el.style.opacity > opacity) {
        el.style.transform = "scale(" + (1 - ((1 - scale) * progress)).toFixed(2)
        el.style.opacity = (1 - ((1 - opacity) * progress)).toFixed(2)
    }

    if (runtime < duration) {
        requestAnimationFrame(function(timestamp) {
            animateDisplay(timestamp, el, scale, opacity, duration)
        })
    }
}

function openModal() {
    modalWindow.style.display = "grid";
    requestAnimationFrame(function(timestamp) {
        starttime = timestamp || new Date().getTime()
        animateDisplay(timestamp, modalWindow, 1, 1, 250)
    })

    setTimeout(function() {
        for (i = 0; i < controls.length; i++) {
            controls[i].style.opacity = 0
        }
    }, 3000);
}

function closeModal() {
    requestAnimationFrame(function(timestamp) {
        starttime = timestamp || new Date().getTime()
        animateDisplay(timestamp, modalWindow, 0, 0, 250)
    })
    setTimeout(function() {
        modalWindow.style.display = "none";
    }, 300);
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls

document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == '27') {
        closeModal()
    } else if (e.keyCode == '37') {
        plusSlides(-1)
    } else if (e.keyCode == '39') {
        plusSlides(1)
    }
}

function slideTransition(timestamp, el, n, duration) {
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime
    var progress = runtime / duration
    progress = Math.min(progress, 1)
    var opacity = 0
    el.style.opacity = (1 - ((1 - opacity) * progress)).toFixed(2)

    if (runtime < duration) {
        requestAnimationFrame(function(timestamp) {
            slideTransition(timestamp, el, n, duration)
        })
    } else {
        function nextSlide(timestamp, el, duration) {
            var timestamp = timestamp || new Date().getTime()
            var runtime = timestamp - starttime
            var progress = runtime / duration
            progress = Math.min(progress, 1)
            var opacity = 1
            el.style.opacity = (opacity * progress).toFixed(2)

            if (runtime < duration) {
                requestAnimationFrame(function(timestamp) {
                    nextSlide(timestamp, el, duration)
                })
            }
        }

        setTimeout(function() {
            modalImage.onload = requestAnimationFrame(function(timestamp) {
                starttime = timestamp || new Date().getTime()
                nextSlide(timestamp, el, duration)
            })
        }, 100);

        showSlides(slideIndex += n)
    }
}


function plusSlides(n) {
    requestAnimationFrame(function(timestamp) {
        starttime = timestamp || new Date().getTime()
        slideTransition(timestamp, modalImage, n, 250)
    })
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName('img--in-grid')
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    modalImage.src = slides[slideIndex-1].dataset.modal
    modalImage.alt = slides[slideIndex-1].alt

    var loc = document.getElementById('modal-location')
    loc.textContent = slides[slideIndex-1].alt
}

// Controls fade in and out
var controls = modalWindow.querySelectorAll('.control');
var timeout;

modalWindow.addEventListener('mousemove', function() {
    /*for (i = 0; i < controls.length; i++) {
        requestAnimationFrame(function(timestamp) {
            starttime = timestamp || new Date().getTime()
            animateDisplay(timestamp, controls[i], 1, 1, 500)
        })
    }*/

    /*controls.forEach(function(el) {
        requestAnimationFrame(function(timestamp) {
            starttime = timestamp || new Date().getTime()
            animateDisplay(timestamp, el, 1, 1, 500)
        })
    })*/
    
    for (var i = 0; i < controls.length; i++) {
        controls[i].style.opacity = 1
    }

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(mouseStop, 3000);
});

function mouseStop() {
    /*for (i = 0; i < controls.length; i++) {
        requestAnimationFrame(function(timestamp) {
            starttime = timestamp || new Date().getTime()
            animateDisplay(timestamp, controls[i], 1, 0, 500)
        })
    }*/

    /*controls.forEach(function(el) {
        requestAnimationFrame(function(timestamp) {
            starttime = timestamp || new Date().getTime()
            animateDisplay(timestamp, el, 1, 0, 500)
        })
    })*/

    for (var i = 0; i < controls.length; i++) {
        controls[i].style.opacity = 0
    }
}
