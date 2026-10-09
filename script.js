
// Get the website elements
const homeScreen = document.getElementById("homeScreen");
const envelopeScreen = document.getElementById("envelopeScreen");
const letterScreen = document.getElementById("letterScreen");

const envelope = document.getElementById("envelope");
const envelopeHint = document.getElementById("envelopeHint");

const flowerUpload = document.getElementById("flowerUpload");
const bouquetImage = document.getElementById("bouquetImage");

const letterHeading = document.querySelector(".letter-heading");
const letterBody = document.querySelector(".letter-body");
const letterSignature = document.querySelector(".letter-signature");

let flowerImageURL = null;
let openingLetter = false;


// Switch between screens
function showScreen(screen) {
    document.querySelectorAll(".screen").forEach(function(item) {
        item.classList.remove("active");
    });

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Continue from the flowers to the envelope
document.getElementById("continueButton").addEventListener("click", function() {
    envelope.classList.remove("open");
    openingLetter = false;

    envelopeHint.textContent = "Tap the envelope to open your letter ♡";

    showScreen(envelopeScreen);
});


// Return to the flowers
document.getElementById("backToFlowers").addEventListener("click", function() {
    showScreen(homeScreen);
});


// Open the envelope
envelope.addEventListener("click", function() {
    if (openingLetter || envelope.classList.contains("open")) {
        return;
    }

    openingLetter = true;
    envelope.classList.add("open");

    envelopeHint.textContent = "Opening your letter with love... ♡";

    setTimeout(function() {
        showScreen(letterScreen);
        openingLetter = false;
    }, 1300);
});



 // Upload a personal flower image (optional)
if (flowerUpload && bouquetImage) {
    flowerUpload.addEventListener("change", function(event) {
        const file = event.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please choose a valid image.");
            return;
        }

        if (flowerImageURL) {
            URL.revokeObjectURL(flowerImageURL);
        }

        flowerImageURL = URL.createObjectURL(file);
        bouquetImage.src = flowerImageURL;
        bouquetImage.style.objectFit = "contain";
    });
}


// Save letter text in this browser
document.getElementById("saveButton").addEventListener("click", function() {
    const letterData = {
        heading: letterHeading.innerText,
        body: letterBody.innerText,
        signature: letterSignature.innerText
    };

    try {
        localStorage.setItem(
            "flowersForYouLetter",
            JSON.stringify(letterData)
        );

        alert("Your letter has been saved! ♡");
    } catch (error) {
        alert("Unable to save the letter in this browser.");
    }
});


// Load a previously saved letter
function loadLetter() {
    try {
        const savedLetter = localStorage.getItem("flowersForYouLetter");

        if (!savedLetter) {
            return;
        }

        const letterData = JSON.parse(savedLetter);

        letterHeading.innerText = letterData.heading;
        letterBody.innerText = letterData.body;
        letterSignature.innerText = letterData.signature;
    } catch (error) {
        console.log("No saved letter was loaded.");
    }
}

loadLetter();


// Download the letter as a text file
document.getElementById("downloadButton").addEventListener("click", function() {
    const content =
        letterHeading.innerText + "\n\n" +
        letterBody.innerText + "\n\n" +
        letterSignature.innerText;

    const blob = new Blob([content], {
        type: "text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Flowers-for-you-letter.txt";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
});


// Return to the beginning
document.getElementById("restartButton").addEventListener("click", function() {
    envelope.classList.remove("open");
    envelopeHint.textContent = "Tap the envelope to open your letter ♡";

    showScreen(homeScreen);
});
