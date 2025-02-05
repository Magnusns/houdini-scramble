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
let lastScrollTop = 0;
const countdownTimer = document.querySelector('.countdown-timer');

window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {  // Only for mobile
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 80) {
            // Scrolling down
            countdownTimer.classList.add('countdown-hidden');
        } else {
            // Scrolling up
            countdownTimer.classList.remove('countdown-hidden');
        }
        
        lastScrollTop = scrollTop;
    }
});

// Update the countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);
