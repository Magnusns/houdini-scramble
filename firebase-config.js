// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVGQtrw0NVKe1xsD67Yvn_BI_KISLJPTg",
    authDomain: "houdini-scramble.firebaseapp.com",
    projectId: "houdini-scramble",
    storageBucket: "houdini-scramble.firebasestorage.app",
    messagingSenderId: "160168818445",
    appId: "1:160168818445:web:fe2e6dace431f82978a244"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const handicapValue = parseFloat(document.getElementById('handicap').value);
            
            // Validate handicap range
            if (handicapValue < -54 || handicapValue > 54) {
                alert('Handicap må være mellom -54 og 54');
                return;
            }

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                handicap: handicapValue,
                invitationCode: document.getElementById('invitationCode').value,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };

            try {
                // Add registration to Firestore
                await db.collection('registrations').add(formData);
                
                // Show success message
                const notification = document.createElement('div');
                notification.className = 'success-notification';
                notification.innerHTML = `
                    <div class="notification-content">
                        <span class="notification-icon">✓</span>
                        <span class="notification-text">Gratulerer, du er påmeldt! Vi tar snart kontakt med deg for videre detaljer.</span>
                    </div>
                `;
                document.body.appendChild(notification);
                setTimeout(() => {
                    notification.classList.add('fade-out');
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 500);
                }, 3000);
                registrationForm.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Beklager, det oppstod en feil. Vennligst prøv igjen senere.');
            }
        });
    }
});
