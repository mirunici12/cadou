document.addEventListener('DOMContentLoaded', () => {
    const flame = document.getElementById('candleFlame');
    const blowButton = document.getElementById('blowButton');
    const mainContent = document.getElementById('main-content');
    const finalImageContainer = document.getElementById('finalImageContainer');
    const continueButton = document.getElementById('continueButton');
    const imageGallery = document.getElementById('imageGallery');
    const galleryInner = imageGallery.querySelector('.gallery-inner');
    const prevButton = imageGallery.querySelector('.prev-button');
    const nextButton = imageGallery.querySelector('.next-button');
    const giftButton = document.getElementById('giftButton');
    const quizContainer = document.getElementById('quizContainer');
    const quizQuestion = quizContainer.querySelector('.quiz-question');
    const quizForm = document.getElementById('quizForm');
    const quizResult = document.getElementById('quizResult');
    const submitQuizButton = document.getElementById('submitQuiz');
    const finalGifContainer = document.getElementById('finalGifContainer');
    const finalGif = document.getElementById('finalGif');

    let candleBlownOut = false;
    let currentImageIndex = 0;

    // List of images for the gallery (ADD YOUR CORRECT IMAGE PATHS HERE)
    const galleryImages = [
        '1.jpg',
        '2.jpg',
        '3.jpg',
        '4.jpg',
        '5.jpg',
        '6.jpeg'
    ];

    // Function to preload images
    function preloadGalleryImages() {
        galleryImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Function to populate the gallery with images
    function populateGallery() {
        galleryImages.forEach(src => {
            const imgElement = document.createElement('img');
            imgElement.src = src;
            imgElement.alt = "Imagine din galerie";

            const galleryItemWrapper = document.createElement('div');
            galleryItemWrapper.classList.add('gallery-item-wrapper');
            galleryItemWrapper.appendChild(imgElement);

            galleryInner.appendChild(galleryItemWrapper);
        });
    }

    // Function to display the current image
    function showImage(index) {
        currentImageIndex = index;
        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        } else if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }

        const offset = -currentImageIndex * 100;
        galleryInner.style.transform = `translateX(${offset}%)`;

        // Show "Și cadoul unde e?" button only on the last image
        if (currentImageIndex === galleryImages.length - 1) {
            giftButton.classList.remove('hidden');
        } else {
            giftButton.classList.add('hidden');
        }
    }

    // Initialize on page load
    preloadGalleryImages();
    populateGallery();
    showImage(currentImageIndex);

    // Function to extinguish the candle and start the sequence
    function extinguishCandle() {
        if (!candleBlownOut) {
            flame.classList.add('blown-out');
            candleBlownOut = true;

            blowButton.disabled = true;
            blowButton.textContent = "Yaaaaaay";
            blowButton.style.backgroundColor = '#0000CD';

            setTimeout(() => {
                mainContent.style.opacity = '0';
                setTimeout(() => {
                    mainContent.classList.add('hidden');
                    finalImageContainer.classList.remove('hidden');
                    finalImageContainer.style.opacity = '1';
                }, 1000);
            }, 2500);
        }
    }

    // Event listeners
    blowButton.addEventListener('click', extinguishCandle);

    continueButton.addEventListener('click', () => {
        finalImageContainer.style.opacity = '0';
        setTimeout(() => {
            finalImageContainer.classList.add('hidden');
            imageGallery.classList.remove('hidden');
            imageGallery.style.opacity = '1';
            showImage(0);
        }, 1000);
    });

    prevButton.addEventListener('click', () => {
        showImage(currentImageIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        showImage(currentImageIndex + 1);
    });

    // Event listener for the "Și cadoul unde e?" button
    giftButton.addEventListener('click', () => {
        imageGallery.style.opacity = '0';
        setTimeout(() => {
            imageGallery.classList.add('hidden');
            quizContainer.classList.remove('hidden');
            quizContainer.style.opacity = '1';

            // Reset quiz form on each display
            quizForm.reset();
            quizResult.classList.add('hidden'); // Hide previous result
            finalGifContainer.classList.add('hidden'); // Ensure GIF is hidden when quiz is shown

            // Ensure all form elements are visible when re-displaying
            quizQuestion.classList.remove('hidden');
            quizForm.classList.remove('hidden');
            submitQuizButton.classList.remove('hidden');
            submitQuizButton.disabled = false; // Enable submit button
        }, 1000);
    });

    // Event listener for quiz form submission (MODIFIED FOR STATIC BEHAVIOR)
    quizForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const selectedOption = document.querySelector('input[name="spiritAnimal"]:checked');

        if (selectedOption) {
            // No database call needed, directly show the final message and GIF
            quizResult.textContent = "Oricum le facem pe toate"; // The fixed message
            quizResult.classList.remove('hidden');

            // Hide form elements after submission
            quizQuestion.classList.add('hidden');
            quizForm.classList.add('hidden');
            submitQuizButton.classList.add('hidden');

            // SHOW GIF: Ensure the GIF container is visible
            finalGifContainer.classList.remove('hidden');

        } else {
            quizResult.textContent = "Te rog, alege o opțiune!";
            quizResult.classList.remove('hidden');
            finalGifContainer.classList.add('hidden'); // Hide GIF if nothing is selected
        }
    });
});