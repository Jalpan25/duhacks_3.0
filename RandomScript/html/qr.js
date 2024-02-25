function generateQR() {
    var inputValue = document.getElementById("urlInput").value;

    if (inputValue.trim() === "") {
        alert("Please enter a valid URL");
        return;
    }

    var qrCodeImg = document.getElementById("qrCodeImg");
    qrCodeImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + inputValue;

    var qrCodeContainer = document.getElementById("qrCodeContainer");
    qrCodeContainer.classList.remove("hidden");
    qrCodeContainer.classList.add("show");
}
