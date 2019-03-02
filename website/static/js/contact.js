// Ajax contact form submission to stay on same page
$(document).ready(function() {
    $("#contact-form").submit(function(event) {
        event.preventDefault();
        $.ajax({
            data: $(this).serialize(),
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            success: function(response) {
                console.log(response);
                if(response['success']) {
                    $("#contact-message").html("<div class='success'>Thank you for your message!</div>");
                    contactSuccess();
                }
                if(response['validation-error']) {
                    $("#contact-message").html("<div class='error'>" + response['validation-error'][Object.keys(response['validation-error'])[0]] + "</div>");
                }
                if(response['submission-error']) {
                    $("#contact-message").html("<div class='error'>" + response['submission-error'] + "</div>");
                }
            },
            error: function (request, status, error) {
                console.log(request.responseText);
            }
        });
    });
})


// Open contact form
var contactModal = document.getElementById('contact')
var contactWrapper = document.getElementById('contact-wrapper')
var contactForm = document.getElementById('contact-form')
var contactMessage = document.getElementById('contact-message')
var contactClose = document.getElementById('contact-close')
var navToggle = document.getElementById('nav-toggle')
var starttime

function animateContactForm(timestamp, bg, form, opacity, pos, duration) {
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime
    var progress = runtime / duration
    progress = Math.min(progress, 1)

    if (bg.style.opacity < opacity) {
        bg.style.opacity = (opacity * progress).toFixed(2)
        form.style.left = (50 - ((50 - pos) * progress).toFixed(2)) + "%"
    } else if (bg.style.opacity > opacity) {
        bg.style.opacity = (1 - ((1 - opacity) * progress)).toFixed(2)
        form.style.left = (pos * progress).toFixed(2) + "%"
    }

    if (runtime < duration) {
        requestAnimationFrame(function(timestamp) {
            animateContactForm(timestamp, bg, form, opacity, pos, duration)
        })
    }
}

function openContactForm() {
    contactModal.style.display = "flex";
    navToggle.checked = false;
    requestAnimationFrame(function(timestamp) {
        starttime = timestamp || new Date().getTime()
        animateContactForm(timestamp, contactModal, contactWrapper, 1, 0, 250)
    })
}

function closeContactForm() {
    requestAnimationFrame(function(timestamp) {
        starttime = timestamp || new Date().getTime()
        animateContactForm(timestamp, contactModal, contactWrapper, 0, 50, 250)
    })
    setTimeout(function() {
        contactModal.style.display = "none";
    }, 300);
}

function animateContactSuccess(timestamp, form, wrap, h1, h2, duration) {
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime
    var progress = runtime / duration
    progress = Math.min(progress, 1)

    form.style.height = (100 - ((100 - h1) * progress)).toFixed(2) + "%"
    wrap.style.height = (100 - ((100 - h2) * progress)).toFixed(2) + "%"

    if (runtime < duration) {
        requestAnimationFrame(function(timestamp) {
            animateContactSuccess(timestamp, form, wrap, h1, h2, duration)
        })
    }
}

function contactSuccess() {
    contactForm.style.overflow = "hidden";
    contactWrapper.style.justifyContent = "center";
    contactWrapper.style.alignItems = "center";
    contactWrapper.style.background = "linear-gradient(#d3d4d7, #e1e1e3, #d3d4d7)"
    contactMessage.style.fontSize = "2rem";
    contactMessage.style.color = "#202824";
    contactClose.style.color = "#202824";
    requestAnimationFrame(function(timestamp) {
        starttime = timestamp || new Date().getTime()
        animateContactSuccess(timestamp, contactForm, contactWrapper, 0, 25, 300)
    })

    setTimeout(function() {
        closeContactForm()
    }, 5300);
}
