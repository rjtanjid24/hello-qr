let qrcodeObj = null;

function generateQR() {
    const text = document.getElementById("qr-text").value;
    const qrContainer = document.getElementById("qr-code");
    const downloadBtn = document.getElementById("download-btn");

    if (text.trim() === "") {
        alert("Please enter text or URL!");
        return;
    }

    // আগের QR মুছে ফেলা
    qrContainer.innerHTML = "";

    // কনফিগারেশন
    let options = {
        text: text,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    };

    // QR তৈরি করা
    try {
        qrcodeObj = new QRCode(qrContainer, options);
        // বাটন দেখানো
        downloadBtn.style.display = "block";
    } catch (error) {
        console.error("Error generating QR:", error);
        alert("Something went wrong. Please reload the page.");
    }
}

function downloadQR() {
    const container = document.getElementById("qr-code");
    // এখন আমরা চেক করব ক্যানভাস অথবা ইমেজ ট্যাগ আছে কিনা
    const canvas = container.querySelector("canvas");
    const img = container.querySelector("img");
    
    let url = null;

    if (canvas) {
        // যদি ক্যানভাস মোডে থাকে
        url = canvas.toDataURL("image/png");
    } else if (img) {
        // যদি ইমেজ মোডে থাকে
        url = img.src;
    }

    if (url) {
        const link = document.createElement("a");
        // ইউনিক নাম দেওয়ার জন্য বর্তমান সময় যোগ করা হলো, যাতে ব্রাউজার কনফিউজড না হয়
        link.download = "hello-qr-" + Date.now() + ".png";
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("No QR Code found to download! Please click Generate first.");
    }
}