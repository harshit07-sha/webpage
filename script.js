"use strict";


/* =========================
   TOOL NAVIGATION
========================= */

const toolButtons =
    document.querySelectorAll(".tool-button");

toolButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const targetId =
            button.getAttribute("data-target");

        const target =
            document.getElementById(targetId);

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* =========================
   MOBILE MENU
========================= */

const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.getElementById("navLinks");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", function () {

        navLinks.classList.toggle("active");

    });

}


/* Close mobile menu after clicking */

if (navLinks) {

    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

        });

    });

}


/* =========================
   DARK MODE
========================= */

const themeButton =
    document.getElementById("themeButton");

if (themeButton) {

    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            themeButton.textContent = "☀";

        } else {

            themeButton.textContent = "☾";

        }

    });

}


/* =========================
   TOOL SEARCH
========================= */

const toolSearch =
    document.getElementById("toolSearch");

const toolCards =
    document.querySelectorAll(".tool-card");

if (toolSearch) {

    toolSearch.addEventListener("input", function () {

        const search =
            toolSearch.value.toLowerCase().trim();

        toolCards.forEach(function (card) {

            const name =
                card.getAttribute("data-name");

            if (name.includes(search)) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

}


/* =========================
   WORD COUNTER
========================= */

const wordInput =
    document.getElementById("wordInput");

const wordResult =
    document.getElementById("wordResult");

const characterResult =
    document.getElementById("characterResult");

const sentenceResult =
    document.getElementById("sentenceResult");

if (wordInput) {

    wordInput.addEventListener("input", function () {

        const text =
            wordInput.value;

        const trimmed =
            text.trim();


        characterResult.textContent =
            text.length;


        if (trimmed === "") {

            wordResult.textContent = "0";

        } else {

            wordResult.textContent =
                trimmed.split(/\s+/).length;

        }


        if (trimmed === "") {

            sentenceResult.textContent = "0";

        } else {

            sentenceResult.textContent =
                trimmed
                    .split(/[.!?]+/)
                    .filter(function (sentence) {

                        return sentence.trim() !== "";

                    })
                    .length;

        }

    });

}


/* =========================
   JSON FORMATTER
========================= */

const jsonInput =
    document.getElementById("jsonInput");

const formatJson =
    document.getElementById("formatJson");

const clearJson =
    document.getElementById("clearJson");

const jsonOutput =
    document.getElementById("jsonOutput");

if (formatJson) {

    formatJson.addEventListener("click", function () {

        const input =
            jsonInput.value.trim();

        if (!input) {

            jsonOutput.textContent =
                "Please enter JSON.";

            return;

        }

        try {

            const data =
                JSON.parse(input);

            jsonOutput.textContent =
                JSON.stringify(
                    data,
                    null,
                    4
                );

        } catch (error) {

            jsonOutput.textContent =
                "Invalid JSON:\n\n" +
                error.message;

        }

    });

}

if (clearJson) {

    clearJson.addEventListener("click", function () {

        jsonInput.value = "";

        jsonOutput.textContent = "";

    });

}


/* =========================
   PASSWORD GENERATOR
========================= */

const passwordLength =
    document.getElementById("passwordLength");

const lengthDisplay =
    document.getElementById("lengthDisplay");

const useUppercase =
    document.getElementById("useUppercase");

const useLowercase =
    document.getElementById("useLowercase");

const useNumbers =
    document.getElementById("useNumbers");

const useSymbols =
    document.getElementById("useSymbols");

const generatePassword =
    document.getElementById("generatePassword");

const passwordOutput =
    document.getElementById("passwordOutput");

const copyPassword =
    document.getElementById("copyPassword");


if (passwordLength) {

    passwordLength.addEventListener("input", function () {

        lengthDisplay.textContent =
            passwordLength.value;

    });

}


if (generatePassword) {

    generatePassword.addEventListener("click", function () {

        let characters = "";

        if (useUppercase.checked) {

            characters +=
                "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        }

        if (useLowercase.checked) {

            characters +=
                "abcdefghijklmnopqrstuvwxyz";

        }

        if (useNumbers.checked) {

            characters +=
                "0123456789";

        }

        if (useSymbols.checked) {

            characters +=
                "!@#$%^&*()_+-=[]{}|;:,.<>?";

        }

        if (!characters) {

            alert(
                "Select at least one character type."
            );

            return;

        }

        const length =
            Number(passwordLength.value);

        let password = "";

        for (
            let i = 0;
            i < length;
            i++
        ) {

            const randomIndex =
                Math.floor(
                    Math.random() *
                    characters.length
                );

            password +=
                characters[randomIndex];

        }

        passwordOutput.value =
            password;

    });

}


if (copyPassword) {

    copyPassword.addEventListener(
        "click",
        async function () {

            if (!passwordOutput.value) {

                alert(
                    "Generate a password first."
                );

                return;

            }

            try {

                await navigator.clipboard.writeText(
                    passwordOutput.value
                );

            } catch (error) {

                passwordOutput.select();

                document.execCommand("copy");

            }

            copyPassword.textContent =
                "Copied!";

            setTimeout(function () {

                copyPassword.textContent =
                    "Copy";

            }, 1500);

        }
    );

}


/* =========================
   IMAGE COMPRESSOR
========================= */

const imageInput =
    document.getElementById("imageInput");

const imagePreview =
    document.getElementById("imagePreview");

const imagePreviewContainer =
    document.getElementById(
        "imagePreviewContainer"
    );

const qualityRange =
    document.getElementById("qualityRange");

const qualityValue =
    document.getElementById("qualityValue");

const compressImage =
    document.getElementById("compressImage");

const compressionResult =
    document.getElementById(
        "compressionResult"
    );

const downloadImage =
    document.getElementById("downloadImage");


let selectedImage = null;


if (qualityRange) {

    qualityRange.addEventListener("input", function () {

        qualityValue.textContent =
            qualityRange.value + "%";

    });

}


if (imageInput) {

    imageInput.addEventListener("change", function () {

        const file =
            imageInput.files[0];

        if (!file) {

            selectedImage = null;

            return;

        }

        if (!file.type.startsWith("image/")) {

            alert("Please select an image file.");

            imageInput.value = "";

            return;

        }

        selectedImage = file;

        const reader =
            new FileReader();

        reader.onload = function (event) {

            imagePreview.src =
                event.target.result;

            imagePreviewContainer.style.display =
                "block";

        };

        reader.readAsDataURL(file);

        compressionResult.style.display =
            "none";

        downloadImage.style.display =
            "none";

    });

}


if (compressImage) {

    compressImage.addEventListener("click", function () {

        if (!selectedImage) {

            alert(
                "Please select an image first."
            );

            return;

        }

        const image =
            new Image();

        image.onload = function () {

            const canvas =
                document.createElement("canvas");

            canvas.width =
                image.width;

            canvas.height =
                image.height;

            const context =
                canvas.getContext("2d");

            context.drawImage(
                image,
                0,
                0
            );

            const quality =
                Number(qualityRange.value) / 100;

            canvas.toBlob(
                function (blob) {

                    if (!blob) {

                        alert(
                            "Unable to compress image."
                        );

                        return;

                    }

                    const originalKB =
                        (
                            selectedImage.size /
                            1024
                        ).toFixed(2);

                    const compressedKB =
                        (
                            blob.size /
                            1024
                        ).toFixed(2);

                    const reduction =
                        (
                            (
                                1 -
                                (
                                    blob.size /
                                    selectedImage.size
                                )
                            ) * 100
                        ).toFixed(1);


                    compressionResult.innerHTML = `
                        <strong>Compression Complete</strong>
                        <br><br>
                        Original Size:
                        ${originalKB} KB
                        <br>
                        Compressed Size:
                        ${compressedKB} KB
                        <br>
                        Size Reduction:
                        ${reduction}%
                    `;

                    compressionResult.style.display =
                        "block";


                    const url =
                        URL.createObjectURL(blob);

                    downloadImage.href =
                        url;

                    downloadImage.style.display =
                        "inline-block";

                },
                "image/jpeg",
                quality
            );

        };


        image.src =
            URL.createObjectURL(selectedImage);

    });

}