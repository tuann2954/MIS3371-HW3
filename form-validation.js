/*
    Program name: form-validation.js
    Author: Tuan Nguyen
    Date created: 02/25/2025
    Date last edited: 3/2025
    Version: 1.0
    Description: this form is created for patients to fill in their information
*/

const d = new Date();
document.getElementById("today").innerHTML = d.toLocaleDateString();

function validatePhone() 
{
    var phoneInput = document.getElementById("phone");
    var phoneValue = phoneInput.value.replace(/\D/g, ""); 

    if (phoneValue.length === 10) {
        phoneInput.value = phoneValue.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"); // Auto-format
        document.getElementById("phone-error").innerHTML = "";
    } else if (phoneValue.length > 10) {
        document.getElementById("phone-error").innerHTML = "Phone number cannot exceed 10 digits.";
    } else {
        document.getElementById("phone-error").innerHTML = "Enter a valid phone number (123-456-7890)";
    }
}


document.getElementById("phone").addEventListener("input", validatePhone);

function validatePword() {
    var password = document.getElementById("pword").value;
    var confirmPassword = document.getElementById("password").value;
    var userID = document.getElementById("uid").value.toLowerCase();
    var messages = [];

    if (password.length < 8 || password.length > 30) {
        messages.push("Password must be 8-30 characters");
    }
    if (!/[a-z]/.test(password)) {
        messages.push("Password must contain at least 1 lowercase letter");
    }
    if (!/[A-Z]/.test(password)) {
        messages.push("Password must contain at least 1 uppercase letter");
    }
    if (!/[0-9]/.test(password)) {
        messages.push("Password must contain at least 1 number");
    }
    if (!/[!@#\$%\^&\*\(\)_\-\+=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        messages.push("Password must contain at least 1 special character");
    }
    if (password !== confirmPassword) {
        messages.push("Passwords DO NOT match");
    }

    if (password.toLowerCase().includes(userID) && userID.length > 0) {
        messages.push("Password cannot contain the User ID.");
    }

    document.getElementById("pword2-error").innerHTML = messages.join("<br>");
}

document.getElementById("pword").addEventListener("input", validatePword);
document.getElementById("password").addEventListener("input", validatePword);

function validateZcode() {
    let zipInput = document.getElementById("zipcode");
    let zip = zipInput.value.replace(/[^\d-]/g, "").slice(0, 10);
    let message = document.getElementById("zcode-error");

    if (!zip.match(/^\d{5}(-\d{4})?$/)) {
        message.innerHTML = "Invalid ZIP code format";
    } else {
        message.innerHTML = "";
        zipInput.value = zip;
    }
}

function validateFname() {
    let input = document.getElementById("fname").value;
    let error = document.getElementById("fname-error");
    error.innerHTML = /^[a-zA-Z'-]{2,30}$/.test(input) ? "" : "Only letters, apostrophes, and dashes allowed, min 2 chars";
}

function validateMini() {
    let input = document.getElementById("mini").value;
    let error = document.getElementById("mini-error");
    error.innerHTML = input.length === 0 || /^[a-zA-Z]$/.test(input) ? "" : "Middle initial must be a single letter";
}

function validateLname() {
    let input = document.getElementById("lname").value;
    let error = document.getElementById("lname-error");
    error.innerHTML = /^[a-zA-Z'-]{2,30}$/.test(input) ? "" : "Only letters, apostrophes, and dashes allowed, min 2 chars";
}

function validateDob() {
    let today = new Date();
    let minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);

    let birthdate = new Date(document.getElementById("dob").value);
    let message = document.getElementById("dob-error");

    if (birthdate > today) {
        message.innerHTML = "Birthdate cannot be in the future";
    } else if (birthdate < minDate) {
        message.innerHTML = "Birthdate cannot be more than 120 years ago";
    } else {
        message.innerHTML = "";
    }
}

function validateEmail() {
    let input = document.getElementById("email").value;
    let error = document.getElementById("email-error");
    error.innerHTML = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input) ? "" : "Invalid email format (use name@domain.tld)";
}

function validateState() {
    let input = document.getElementById("state").value;
    let error = document.getElementById("state-error");
    error.innerHTML = input === "" ? "Please choose a state" : "";
}

function validateUid() 
{
    let input = document.getElementById("uid").value;
    let error = document.getElementById("uid-error");

    if (input.length < 5 || input.includes(" ") || !/^[a-zA-Z][a-zA-Z0-9_-]{4,29}$/.test(input)) {
        error.innerHTML = "Invalid User ID (5-30 chars, starts with a letter, no spaces)";
        error.style.display = "block";
    } 
    else 
    {
        error.innerHTML = "";
        error.style.display = "none";
        document.getElementById("uid").value = input.toLowerCase();
    }
}

function validateCity() {
    let input = document.getElementById("city").value.trim();
    let error = document.getElementById("city-error");

    console.log("Validating city:", input); // Debugging

    if (input.length < 2 || input.length > 30) {
        error.innerHTML = "City must be between 2 and 30 characters.";
    } else if (!/^[a-zA-Z\s'-]+$/.test(input)) {
        error.innerHTML = "City can only contain letters, spaces, apostrophes, and dashes.";
    } else {
        error.innerHTML = "";
    }
}


document.addEventListener("DOMContentLoaded", function () {
    var slider = document.getElementById("healthlevel");
    var output = document.getElementById("healthdisplay");

    output.innerHTML = slider.value;
    slider.oninput = function () {
        output.innerHTML = this.value;
    };
});

document.getElementById("fname").addEventListener("input", validateFname);
document.getElementById("mini").addEventListener("input", validateMini);
document.getElementById("lname").addEventListener("input", validateLname);
document.getElementById("dob").addEventListener("change", validateDob);
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("state").addEventListener("change", validateState);
document.getElementById("uid").addEventListener("input", validateUid);
document.getElementById("zipcode").addEventListener("input", validateZcode);
document.getElementById("city").addEventListener("input", validateCity);
document.getElementById("city").addEventListener("blur", validateCity);

function getcustomerinformation() {
    var form = document.querySelector("form"); 
    if (!form) {
        console.error("Form not found.");
        return;
    }

    var formData = new FormData(form);
    var formoutput = "<table class='output'><tr><th>Requested Information</th><th>Customer Input</th></tr>";

    formData.forEach((value, key) => {
        if (key.toLowerCase().includes("password")) {
            value = "********";
        }

        let element = document.querySelector(`[name="${key}"]`);
        if (element && element.type === "checkbox") {
            value = element.checked ? "Checked" : "Unchecked";
        }

        formoutput += `<tr><td>${key}</td><td>${value}</td></tr>`;
    });

    formoutput += "</table>";
    
    document.getElementById("showInput").innerHTML = formoutput;
}



