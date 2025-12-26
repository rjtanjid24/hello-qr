let generatedCanvas = null;

function generatePoster() {
    const text = document.getElementById("qr-text").value;
    const posterArea = document.getElementById("poster-area");
    const downloadBtn = document.getElementById("download-btn");

    // ফিক্সড হেডার টেক্সট
    const headerText = "SCAN ME";

    if (text.trim() === "") {
        alert("Please enter content for the QR Code!");
        return;
    }

    // ১. মেমরিতে QR কোড তৈরি
    const tempDiv = document.createElement("div");
    
    new QRCode(tempDiv, {
        text: text,
        width: 400,
        height: 400,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
        quietZone: 20,
        quietZoneColor: '#ffffff'
    });

    // ২. ৫০০ মিলিসেকেন্ড পর কার্ড আঁকা শুরু
    setTimeout(() => {
        const qrCanvas = tempDiv.querySelector("canvas");
        if (qrCanvas) {
            drawFinalCard(qrCanvas, headerText);
            posterArea.style.display = "block";
            downloadBtn.style.display = "block";
        }
    }, 500);
}

function drawFinalCard(qrCanvas, headerText) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // কার্ডের সাইজ
    canvas.width = 600;
    canvas.height = 800;

    // ১. সম্পূর্ণ ব্যাকগ্রাউন্ড সাদা
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ২. হেডার বার (এখন নীল রঙের)
    ctx.fillStyle = "#0984e3"; // Blue Color
    ctx.fillRect(0, 0, canvas.width, 150);

    // ৩. SCAN ME লেখা (সাদা)
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 60px Arial";
    ctx.textAlign = "center";
    ctx.fillText(headerText, canvas.width / 2, 100);

    // ৪. QR কোডের বর্ডার (এখন নীল রঙের)
    ctx.strokeStyle = "#0984e3"; // Blue Border matches header
    ctx.lineWidth = 10;
    ctx.strokeRect(95, 245, 410, 410);

    // ৫. QR ছবিটি বসানো
    ctx.drawImage(qrCanvas, 100, 250, 400, 400);

    // ৬. নিচের ফুটনোট
    ctx.fillStyle = "#333333";
    ctx.font = "20px Arial";
    ctx.fillText("Scan with your phone camera", canvas.width / 2, 700);

    // ৭. স্ক্রিনে দেখানো
    const posterArea = document.getElementById("poster-area");
    posterArea.innerHTML = "";
    
    // প্রিভিউ স্টাইল
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    canvas.style.borderRadius = "10px";
    
    posterArea.appendChild(canvas);
    generatedCanvas = canvas;
}

function downloadPoster() {
    if (generatedCanvas) {
        const link = document.createElement("a");
        link.download = "hello-qr-card-" + Date.now() + ".png";
        link.href = generatedCanvas.toDataURL("image/png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
