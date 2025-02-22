(function() {
    emailjs.init("2cuJ5paqCDI0a06Dg");
})();

// Popup variables
let popupShown = false;
const triggerSection = document.getElementById('Services');
const popupForm = document.getElementById('popupForm');
const popupOverlay = document.getElementById('popupOverlay');

// Navbar scroll handling
document.addEventListener('scroll', () => {
    const navvy = document.getElementById("iklotaNavbar");
    if(navvy.classList.contains("check")) {
        if (window.scrollY > 0) {
            navvy.classList.add("scrolled");
        } else {
            navvy.classList.remove("scrolled");
        }
    }

    // Check for popup display on scroll
    checkAndShowPopup();
});

// Modified function to check if element is partially in viewport
function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Show popup when element is 50% visible
    const elementHeight = rect.height;
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const percentVisible = (visibleHeight / elementHeight) * 100;
    
    return percentVisible >= 50;
}

// New function to check scroll position and show popup
function checkAndShowPopup() {
    if (!popupShown && triggerSection) {
        const rect = triggerSection.getBoundingClientRect();
        const triggerPoint = window.innerHeight * 0.5; // 50% of viewport height
        
        if (rect.top <= triggerPoint) {
            popupForm.style.display = 'block';
            popupOverlay.style.display = 'block';
            popupShown = true;
            // console.log('Popup triggered'); // Debug log
        }
    }
}

function closePopup() {
    popupForm.style.display = 'none';
    popupOverlay.style.display = 'none';
}

// Rest of your existing code remains the same
function makeSticky() {
    const navvy = document.getElementById("iklotaNavbar");
    navvy.classList.remove("check");
}

function makeHome() {
    const navvy = document.getElementById("iklotaNavbar");
    navvy.classList.add("check");
}

// Typewriter effect
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    // Initialize typewriter effect
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    
    // Add typewriter CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);

    // Initialize form submission handler
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const buttonText = submitBtn.querySelector('.button-text');
        const loadingSpinner = submitBtn.querySelector('.loading-spinner');
        
        buttonText.style.opacity = '0';
        loadingSpinner.style.display = 'block';
        submitBtn.disabled = true;
    
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            city: document.getElementById('city').value
        };
    
        emailjs.send(
            "service_lil1y6z",
            "template_m98g9sf",
            {
                from_name: formData.name,
                phone: formData.phone,
                city: formData.city
            }
        ).then(
            function(response) {
                // console.log("SUCCESS!", response.status, response.text);
                
                // Hide form and show success message
                const form = document.getElementById('contactForm');
                const successMessage = document.getElementById('successMessage');
                
                form.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Close popup after delay
                setTimeout(() => {
                    closePopup();
                    // Reset form
                    form.style.display = 'block';
                    successMessage.style.display = 'none';
                    form.reset();
                    buttonText.style.opacity = '1';
                    loadingSpinner.style.display = 'none';
                    submitBtn.disabled = false;
                }, 3000);
            },
            function(error) {
                // console.log("FAILED...", error);
                alert("Sorry, there was an error submitting your information.");
                
                // Reset button state
                buttonText.style.opacity = '1';
                loadingSpinner.style.display = 'none';
                submitBtn.disabled = false;
            }
        );
    });

    // Initialize makeHome
    makeHome();

    // Check popup on initial load
    setTimeout(checkAndShowPopup, 1000);
};

// Responsive header text
function updateHeaderText() {
    const headerH1 = document.querySelector('.header h1');
    if (headerH1) {
        if (window.innerWidth <= 500) {
            headerH1.textContent = 'Want to hook better leads with digital marketing?';
        } else {
            headerH1.textContent = 'Want to hook better leads with hard-working digital marketing and a diligent team?';
        }
    }
}

window.addEventListener('resize', updateHeaderText);
document.addEventListener('DOMContentLoaded', updateHeaderText);