function updateCountdown() {
    const tournamentDate = new Date('2025-02-15T13:00:00+01:00');
    const now = new Date();
    const diff = tournamentDate - now;

    if (diff <= 0) {
        document.querySelector('.countdown-timer').innerHTML = '<div class="countdown-finished">Turneringen har startet!</div>';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
    document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
}

// Handle scroll behavior for mobile
const countdownTimer = document.querySelector('.countdown-timer');
const heroSection = document.querySelector('.hero');

function isInHeroSection() {
    if (!heroSection) return false;
    const heroRect = heroSection.getBoundingClientRect();
    const heroBottom = heroRect.bottom;
    return heroBottom > 0;
}

window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {  // Only for mobile
        if (!isInHeroSection()) {
            countdownTimer.classList.add('countdown-hidden');
        } else {
            countdownTimer.classList.remove('countdown-hidden');
        }
    }
});

// Initial check
if (window.innerWidth <= 768) {
    if (!isInHeroSection()) {
        countdownTimer.classList.add('countdown-hidden');
    }
}

// Update the countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);
