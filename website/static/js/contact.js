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
var contactBtn = document.getElementById('contact-button')
var contactModal = document.getElementById('contact')
var contactWrapper = document.getElementById('contact-wrapper')
var contactForm = document.getElementById('contact-form')
var contactMessage = document.getElementById('contact-message')
var contactClose = document.getElementById('contact-close')
var navToggle = document.getElementById('nav-toggle')
var starttime

function animateContactForm(timestamp, open, bg, wrap, opacity, pos, duration) {
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime
    var progress = runtime / duration
    progress = Math.min(progress, 1)

    if (open == true) {
        bg.style.backgroundColor = "rgba(41, 40, 36, " + (opacity * progress).toFixed(2) + ")"
        wrap.style.left = (50 - ((50 - pos) * progress).toFixed(2)) + "%"
    } else {
        bg.style.backgroundColor = "rgba(41, 40, 36, " + (0.5 - ((0.5 - opacity) * progress)).toFixed(2) + ")"
        wrap.style.left = (pos * progress).toFixed(2) + "%"
    }

    if (runtime < duration) {
        requestAnimationFrame(function(timestamp) {
            animateContactForm(timestamp, open, bg, wrap, opacity, pos, duration)
        })
    }
}

function openContactForm() {
    contactModal.style.display = "flex";
    navToggle.checked = false;
    requestAnimationFrame(function(timestamp) {
        starttime = timestamp || new Date().getTime()
        animateContactForm(timestamp, true, contactModal, contactWrapper, 0.5, 0, 250)
    })
    contactBtn.setAttribute("onClick", "closeContactForm();")
}

function closeContactForm() {
    requestAnimationFrame(function(timestamp) {
        starttime = timestamp || new Date().getTime()
        animateContactForm(timestamp, false, contactModal, contactWrapper, 0, 50, 250)
    })
    setTimeout(function() {
        contactModal.style.display = "none";
        contactBtn.setAttribute("onClick", "openContactForm();")
    }, 300);
}

function animateContactSuccess(timestamp, wrap, height, duration) {
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime
    var progress = runtime / duration
    progress = Math.min(progress, 1)

    wrap.style.height = (100 - ((100 - height) * progress)).toFixed(2) + "%"

    if (runtime < duration) {
        requestAnimationFrame(function(timestamp) {
            animateContactSuccess(timestamp, wrap, height, duration)
        })
    }
}

function contactSuccess() {
    contactForm.style.overflow = "hidden";
    contactForm.style.display = "none";
    contactWrapper.style.justifyContent = "center";
    contactWrapper.style.alignItems = "center";
    contactWrapper.style.background = "linear-gradient(#d3d4d7, #e1e1e3, #d3d4d7)"
    contactMessage.style.fontSize = "2rem";
    contactMessage.style.color = "#202824";
    contactClose.style.color = "#202824";
    requestAnimationFrame(function(timestamp) {
        starttime = timestamp || new Date().getTime()
        animateContactSuccess(timestamp, contactWrapper, 25, 300)
    })

    setTimeout(function() {
        closeContactForm()
    }, 5300);
}
