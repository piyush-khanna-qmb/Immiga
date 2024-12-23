document.addEventListener('scroll', () => {
    const navvy= document.getElementById("iklotaNavbar");
    if(navvy.classList.contains("check"))
    {
        if (window.scrollY > 0) {
            navvy.classList.add("scrolled");
        } else {
            navvy.classList.remove("scrolled");
        }
    }
})

makeHome()

function makeSticky() {
    const navvy= document.getElementById("iklotaNavbar");
    navvy.classList.remove("check")
}

function makeHome() {
    const navvy= document.getElementById("iklotaNavbar");
    navvy.classList.add("check")
}

$(document).ready(function() {
    $('#testimonial4').on('slide.bs.carousel', function(e) {
      e.stopPropagation();
    });
  });
