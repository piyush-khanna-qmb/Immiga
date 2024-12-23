// Initialize EmailJS
(function() {
    emailjs.init("2cuJ5paqCDI0a06Dg");
})();

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.querySelector('.form-wrapper');
    const submitButton = document.getElementById('submitButton');
    const firstNameInput = document.getElementById('ijowk-3');
    const emailInput = document.getElementById('ipmgh-3');
    const phoneInput = document.getElementById('imgis-3');
    const messageInput = document.getElementById('i5vyy-3');

    // Add phone number validation on input
    phoneInput.addEventListener('input', function(e) {
        // Remove any non-digit characters
        this.value = this.value.replace(/\D/g, '');
        
        // Limit to 10 digits
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }
    });

    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Reset any previous error styling
        [firstNameInput, emailInput, phoneInput, messageInput].forEach(input => {
            input.style.borderColor = '#eeeeee';
        });

        // Validate fields
        let isValid = true;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{10}$/;  // Exactly 10 digits

        if (!firstNameInput.value.trim()) {
            firstNameInput.style.borderColor = 'red';
            isValid = false;
        }

        if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
            emailInput.style.borderColor = 'red';
            isValid = false;
        }

        // Phone validation
        if (!phonePattern.test(phoneInput.value.trim())) {
            phoneInput.style.borderColor = 'red';
            isValid = false;
            alert('Phone number must be exactly 10 digits');
            return;
        }

        if (!messageInput.value.trim()) {
            messageInput.style.borderColor = 'red';
            isValid = false;
        }

        if (!isValid) {
            alert('Please fill in all fields correctly');
            return;
        }

        // Prepare EmailJS template parameters
        const templateParams = {
            to_email: 'piyushkhannavb@gmail.com',
            from_name: firstNameInput.value,
            from_email: emailInput.value,
            phone_number: phoneInput.value,
            message: messageInput.value
        };

        // Disable button and show sending state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Send email using EmailJS
        emailjs.send(
            'service_um8nucw', 
            'template_i612x8s',
            templateParams
        )
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            // Reset form
            firstNameInput.value = '';
            emailInput.value = '';
            phoneInput.value = '';
            messageInput.value = '';
            
            submitButton.textContent = 'Sent Successfully!';
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
            }, 3000);
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            submitButton.textContent = 'Error! Try Again';
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
            }, 3000);
        });
    });

    // Add input event listeners to remove error styling
    [firstNameInput, emailInput, phoneInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '#eeeeee';
        });
    });
});