let QrContainer = document.getElementById('Qr-container');
let exit = document.getElementById('exit');
let QR = document.getElementById('qr-code');
let loader = document.getElementById('loader');
let jpg = document.getElementById('forjpg');
let png = document.getElementById('forpng');
let svg = document.getElementById('forsvg');

const formContainer = document.getElementById('formContainer');
const qrForm = document.getElementById('qrForm');
const inputLabel = document.getElementById('inputLabel');
const inputField = document.getElementById('inputField');
const wifiNameField = document.getElementById('wifiName');
const wifiPasswordField = document.getElementById('wifiPassword');
const wifiDetailsGroup = document.querySelector('.wifi-details');
const contactDetailsGroup = document.querySelector('.contact-details');
const firstNameField = document.getElementById('firstName');
const surnameField = document.getElementById('surname');
const addressField = document.getElementById('address');
const phoneNumberField = document.getElementById('phoneNumber');

const textButton = document.getElementById('textButton');
const urlButton = document.getElementById('urlButton');
const contactButton = document.getElementById('ContactButton');
const emailButton = document.getElementById('emailButton');
const phoneButton = document.getElementById('phoneButton');
const wifiButton = document.getElementById('wifiButton');
const whatsAppButton = document.getElementById('WhatsAppButton');


function resetForm() {
    formContainer.style.display = 'none';
    inputField.style.display = 'block'; 
    wifiDetailsGroup.style.display = 'none'; 
    contactDetailsGroup.style.display = 'none'; 
    inputField.value = ''; 
}


textButton.addEventListener('click', () => {
    resetForm();
    formContainer.style.display = 'block';
    inputLabel.textContent = 'Enter Text:';
    inputField.placeholder = 'Enter your text here';
    inputField.type = 'text';
});

urlButton.addEventListener('click', () => {
    resetForm();
    formContainer.style.display = 'block';
    inputLabel.textContent = 'Enter URL:';
    inputField.placeholder = 'Enter your URL here';
    inputField.type = 'url';
});

contactButton.addEventListener('click', () => {
    resetForm();
    formContainer.style.display = 'block';
    inputLabel.textContent = 'Enter Contact Details:';
    inputField.style.display = 'none'; 
    contactDetailsGroup.style.display = 'block'; 
    firstNameField.value = ''; 
    surnameField.value = '';
    addressField.value = '';
    phoneNumberField.value = '';
});

emailButton.addEventListener('click', () => {
    resetForm();
    formContainer.style.display = 'block';
    inputLabel.textContent = 'Enter Email Address:';
    inputField.placeholder = 'Enter your email here';
    inputField.type = 'email';
});

phoneButton.addEventListener('click', () => {
    resetForm();
    formContainer.style.display = 'block';
    inputLabel.textContent = 'Enter Phone Number:';
    inputField.placeholder = 'Enter your phone number here';
    inputField.type = 'tel';
});

wifiButton.addEventListener('click', () => {
    resetForm();
    formContainer.style.display = 'block';
    inputLabel.textContent = 'Enter WiFi Details:';
    inputField.style.display = 'none'; 
    wifiDetailsGroup.style.display = 'block'; 
    contactDetailsGroup.style.display = 'none'; 
    wifiNameField.value = ''; 
    wifiPasswordField.value = '';
});

whatsAppButton.addEventListener('click', () => {
    resetForm();
    formContainer.style.display = 'block';
    inputLabel.textContent = 'Enter WhatsApp Number:';
    inputField.placeholder = 'Enter your WhatsApp number here';
    inputField.type = 'tel';
});


function generateQRCode() {
    let inputValue;

    if (wifiDetailsGroup.style.display === 'block') {
        const wifiName = wifiNameField.value.trim();
        const wifiPassword = wifiPasswordField.value.trim();
        if (wifiName === '' || wifiPassword === '') {
            inputField.classList.add('shake-horizontal');
            setTimeout(() => {
                inputField.classList.remove('shake-horizontal');
            }, 800);
            vibratePhone();
            return;
        }
        inputValue = `WIFI:S:${wifiName};T:WPA;P:${wifiPassword};;`;
    } else if (contactDetailsGroup.style.display === 'block') {
        const firstName = firstNameField.value.trim();
        const surname = surnameField.value.trim();
        const address = addressField.value.trim();
        const phoneNumber = phoneNumberField.value.trim();
        if (firstName === '' || surname === '' || address === '' || phoneNumber === '') {
            inputField.classList.add('shake-horizontal');
            setTimeout(() => {
                inputField.classList.remove('shake-horizontal');
            }, 800);
            vibratePhone();
            return;
        }
        inputValue = `BEGIN:VCARD\nFN:${firstName} ${surname}\nADR:${address}\nTEL:${phoneNumber}\nEND:VCARD`;
    } else if (emailButton.style.display === 'block') {
        const email = inputField.value.trim();
        if (email === '') {
            inputField.classList.add('shake-horizontal');
            setTimeout(() => {
                inputField.classList.remove('shake-horizontal');
            }, 800);
            vibratePhone();
            return;
        }
        inputValue = `mailto:${email}`;
    } else if (whatsAppButton.style.display === 'block') {
        const phoneNumber = inputField.value.trim();
        if (phoneNumber === '') {
            inputField.classList.add('shake-horizontal');
            setTimeout(() => {
                inputField.classList.remove('shake-horizontal');
            }, 800);
            vibratePhone();
            return;
        }
        inputValue = `https://wa.me/${encodeURIComponent(phoneNumber)}`;
    } else {
        inputValue = inputField.value.trim();
        if (inputValue === '') {
            inputField.classList.add('shake-horizontal');
            setTimeout(() => {
                inputField.classList.remove('shake-horizontal');
            }, 800);
            vibratePhone();
            return;
        }
    }



QrContainer.classList.add('exit-Qr'); 
    // loader.classList.remove('deactivate-loader'); // Show loader
    let apiLink = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=30&data=${encodeURIComponent(inputValue)}`;
    QR.src = apiLink;
}


// Handle form submission
qrForm.addEventListener('submit', function(event) {
    event.preventDefault();
    generateQRCode();
});


function vibratePhone() {
    if (navigator.vibrate) {
        navigator.vibrate(500);
    } else {
        console.log("Vibration API is not supported in your browser.");
    }
}


QR.addEventListener("load", () => {
    loader.classList.add('deactivate-loader'); 
});


function downloadQRCode(format) {
    let imgPath = `${QR.getAttribute('src')}&format=${format}`;
    let fileName = "QR_CODE";
    saveAs(imgPath, fileName); 
}


jpg.addEventListener('click', () => downloadQRCode('jpeg'));
png.addEventListener('click', () => downloadQRCode('png'));
svg.addEventListener('click', () => downloadQRCode('svg'));


exit.addEventListener('click', () => {
    QrContainer.style.display = 'none'; 
    loader.classList.add('deactivate-loader'); 
});
