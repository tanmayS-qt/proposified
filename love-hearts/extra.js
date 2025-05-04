// Music player functionality
const audio = document.getElementById('bgMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

// Auto play music when user interacts with the page
document.addEventListener('click', function() {
    if (!isPlaying) {
        togglePlay();
    }
}, { once: true });

// Card animation sequence
const cards = document.querySelectorAll('.card');
let currentCard = 0;

// Show first card after a slight delay
setTimeout(() => {
    showCard(0);
}, 1000);

function showCard(index) {
    // Hide all cards
    cards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Show the current card
    cards[index].classList.add('active');
    
    // Set up the next card if not the last one
    if (index < cards.length - 1) {
        setTimeout(() => {
            showCard(index + 1);
        }, 4000); // 3 second delay between cards
    }
}

// Redirect to heart.html when button is clicked
function redirectToHeart() {
    // Add a nice transition effect
    document.body.style.opacity = 0;
    
    // Redirect after transition
    setTimeout(() => {
        window.location.href = 'edit.html';
    }, 500);
}

// Apply transition when page loads
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = 0;
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = 1;
    }, 100);
});

// Apply glassmorphism to the cards and music player
const glassElements = document.querySelectorAll('.card, .music-player');
glassElements.forEach(el => {
    el.classList.add('glass');
});