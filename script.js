let qrcodeObj = null;

function generateQR() {
    const text = document.getElementById("qr-text").value;
    const qrContainer = document.getElementById("qr-code");
    const downloadBtn = document.getElementById("download-btn");

    if (text.trim() === "") {
        alert("Please enter text or URL!");
        return;
    }

    // আগের কোড মুছে ফেলা
    qrContainer.innerHTML = "";

    // কনফিগারেশন আপডেট (High Quality & Quiet Zone)
    let options = {
        text: text,
        
        // ১. হাই কোয়ালিটি (আগে ২০০ ছিল, এখন ১০০০ দিলাম)
        width: 1000,
        height: 1000,
        
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
        
        // ২. এই অংশটি আপনার সমস্যার সমাধান করবে (সাদা বর্ডার)
        quietZone: 60,         // চারপাশে ৬০ পিক্সেল সাদা জায়গা থাকবে
        quietZoneColor: '#ffffff' // বর্ডারের রং সাদা
    };

    try {
        qrcodeObj = new QRCode(qrContainer, options);
        downloadBtn.style.display = "block";
    } catch (error) {
        console.error("Error generating QR:", error);
        alert("Something went wrong. Please reload.");
    }
}

function downloadQR() {
    const container = document.getElementById("qr-code");
    const canvas = container.querySelector("canvas");
    const img = container.querySelector("img");
    
    let url = null;

    if (canvas) {
        url = canvas.toDataURL("image/png");
    } else if (img) {
        url = img.src;
    }

    if (url) {
        const link = document.createElement("a");
        // ফাইলের নাম
        link.download = "hello-qr-hd-" + Date.now() + ".png";
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("Generate a QR code first!");
    }
}
