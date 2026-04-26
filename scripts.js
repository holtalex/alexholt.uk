const contactForm = document.getElementById('contact-form-one');

// Variables to prevent people from spamming the send button on the contact form
const submitDelay = 10000;
let contactLastSubmitted = 0;


// Initialise EmailJS
emailjs.init({
    publicKey: "CA6WH1JEU4aQhS4zM",
});


// Function to reset the contact button back to default
function resetContactBtn() {
    document.getElementById('contact-form-one').classList.remove("contact-success"),
    document.getElementById('button-text-one').textContent = 'send.',
    document.getElementById('button-icon-one').textContent = ''
}


// Handles the submission of the contact form
function contactFormSubmit() {
    if (contactLastSubmitted >= (Date.now() - submitDelay)) {
        console.warn('Email attempted to be sent before cooldown.')
        document.getElementById('button-text-one').textContent = 'try again in a moment.';

        setTimeout(() => {
            resetContactBtn();
        }, 5000);
    }
    else {
        contactLastSubmitted = Date.now();

        emailjs.sendForm('service_ho9mgsl', 'contact_form', '#contact-form-one').then(
            (response) => {
                console.log('Email message sent successfully:', response.status, response.text);
                document.getElementById('contact-form-one').classList.add("contact-success")
                document.getElementById('button-text-one').textContent = 'sent.';
                document.getElementById('button-icon-one').textContent = ' ✓';
                document.getElementById('contact-form-one').reset();

                setTimeout(() => {
                    resetContactBtn();
                }, 5000);
            },
            (error) => {
                console.error('Email message failed to send:', error);
                document.getElementById('button-text-one').textContent = 'failed';
                document.getElementById('button-icon-one').textContent = ' ✗';

                setTimeout(() => {
                    resetContactBtn();
                }, 5000);
            },
        );
    }
};