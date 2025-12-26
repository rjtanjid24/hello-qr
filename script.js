let generatedCanvas = null; // ফাইনাল কার্ডটি এখানে জমা থাকবে

function generatePoster() {
    const text = document.getElementById("qr-text").value;
    const headerText = document.getElementById("qr-header").value.toUpperCase(); // লেখা বড় হাতের করে দেবে
    const posterArea = document.getElementById("poster-area");
    const downloadBtn = document.getElementById("download-btn");

    if (text.trim() === "") {
        alert("Please enter content for the QR Code!");
        return;
    }

    // ১. প্রথমে মেমরিতে একটি QR কোড তৈরি করি
    // এটি স্ক্রিনে দেখাব না, শুধু ছবি আঁকার জন্য ব্যবহার করব
    const tempDiv = document.createElement("div");
    
    new QRCode(tempDiv, {
        text: text,
        width: 400,   // হাই কোয়ালিটি QR
        height: 400,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
        quietZone: 20,
        quietZoneColor: '#ffffff'
    });

    // QR তৈরি হতে একটু সময় লাগে, তাই আমরা একটু অপেক্ষা করে কার্ডটি আঁকব
    setTimeout(() => {
        const qrCanvas = tempDiv.querySelector("canvas");
        if (qrCanvas) {
            drawFinalCard(qrCanvas, headerText);
            posterArea.style.display = "block";
            downloadBtn.style.display = "block";
        }
    }, 500); // ৫০০ মিলিসেকেন্ড অপেক্ষা
}

function drawFinalCard(qrCanvas, headerText) {
    // ২. একটি নতুন ক্যানভাস তৈরি করি (এটিই হবে ফাইনাল কার্ড)
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // কার্ডের সাইজ নির্ধারণ (পোস্টারের মতো লম্বাটে)
    canvas.width = 600;
    canvas.height = 800;

    // ৩. ব্যাকগ্রাউন্ড রং (সাদা)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ৪. একটি রঙিন বর্ডার বা হেডার অংশ (উপরে কমলা রঙের বার)
    ctx.fillStyle = "#FF5722"; // আপনি চাইলে এই রং বদলাতে পারেন
    ctx.fillRect(0, 0, canvas.width, 150);

    // ৫. শিরোনাম লেখা (সাদা রঙের টেক্সট)
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 60px Arial";
    ctx.textAlign = "center";
    ctx.fillText(headerText, canvas.width / 2, 100);

    // ৬. QR কোডটি মাঝখানে বসানো
    // QR এর চারপাশে একটি চিকন বর্ডার দিচ্ছি যাতে সুন্দর লাগে
    ctx.strokeStyle = "#FF5722";
    ctx.lineWidth = 10;
    ctx.strokeRect(95, 245, 410, 410); // বর্ডার

    // QR ছবিটি পেস্ট করা
    ctx.drawImage(qrCanvas, 100, 250, 400, 400);

    // ৭. নিচে কিছু ফুটনোট লেখা (অপশনাল)
    ctx.fillStyle = "#333333";
    ctx.font = "20px Arial";
    ctx.fillText("Scan with your phone camera", canvas.width / 2, 700);

    // ৮. এই ফাইনাল কার্ডটি স্ক্রিনে দেখানো
    const posterArea = document.getElementById("poster-area");
    posterArea.innerHTML = ""; // আগের কিছু থাকলে মুছে ফেলবে
    
    // প্রিভিউ যাতে স্ক্রিনে ফেটে না যায়, তাই স্টাইল দিয়ে ছোট করে দেখাব
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    canvas.style.borderRadius = "10px";
    
    posterArea.appendChild(canvas);
    generatedCanvas = canvas; // ডাউনলোডের জন্য সেভ করে রাখলাম
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
