document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("register");
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value;
        const birthday = document.getElementById("birthday").value;
        const specialRequest = document.getElementById("Request").value;
        const passwordLength = parseInt(document.getElementById("passwordLength").value);

        const generatedPassword = generatePassword(name, birthday, specialRequest, passwordLength);
        drawPassword(generatedPassword);
    });

    function generatePassword(name, birthday, specialRequest, length) {
        let password = '';
        
        // Extracting 2 or 3 continuous letters from name
        const nameLetters = name.replace(/[^a-zA-Z]/g, '').substring(0, Math.random() > 0.5 ? 2 : 3);
    
        // Extracting 2 or 3 continuous letters from special request
        const requestLetters = specialRequest.replace(/[^a-zA-Z]/g, '').substring(0, Math.random() > 0.5 ? 2 : 3);
    
        // Extracting digits from birthdate
        const birthDigits = birthday.match(/\d/g).join('');
    
        // Generating a random special character
        const specialCharacters = ['@', '#', '_'];
        const randomSpecialChar = specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
    
        // Calculate remaining length for random numbers
        const remainingLength = length - (nameLetters.length + requestLetters.length + birthDigits.length + 1); // 1 for special character
    
        // Generate random numbers
        const randomNumbers = Math.floor(Math.random() * (10 ** remainingLength));
    
        // Combining the extracted components to form the password
        password = nameLetters + requestLetters + birthDigits + randomSpecialChar + randomNumbers;
        
        // Limiting password length
        if (password.length > length) {
            password = password.slice(0, length);
        }
    
        // Ensuring password contains at least one special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            password += randomSpecialChar;
        }
    
        return password;
    }
    

    function drawPassword(password) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white"; // Change "white" to the desired color
        ctx.font = "20px Arial";
        ctx.fillText(password, 10, 50);

        // Update copy button functionality
        const copyButton = document.getElementById("copyButton");
        copyButton.addEventListener("click", function() {
            copyToClipboard(password);
        });
    }

    function copyToClipboard(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("Password copied to clipboard!");
    }
});
