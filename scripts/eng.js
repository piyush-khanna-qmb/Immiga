$('.counting').each(function() {
    var $this = $(this),
        countTo = $this.attr('data-count');
    
    $({ countNum: $this.text()}).animate({
      countNum: countTo
    },
  
    {
  
      duration: 3000,
      easing:'linear',
      step: function() {
        $this.text(Math.floor(this.countNum));
      },
      complete: function() {
        $this.text(this.countNum + "+");
        //alert('finished');
      }
  
    });  
  });

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

window.addEventListener('resize', function () {
  const headerH1 = document.querySelector('.header h1');
  if (window.innerWidth <= 500) {
      headerH1.textContent = 'Want to hook better leads with digital marketing?';
  } else {
      headerH1.textContent = 'Want to hook better leads with hard-working digital marketing and a diligent team?'; // Replace with the default text
  }
});

// Ensure the text updates on page load too
document.addEventListener('DOMContentLoaded', function () {
  const headerH1 = document.querySelector('.header h1');
  if (window.innerWidth <= 500) {
      headerH1.textContent = 'Want to hook better leads with digital marketing?';
  }
});