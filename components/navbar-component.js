// Reusable Navbar Component
function createNavbar(activePage = '') {
    const navbarHTML = `
        <nav class="navbar">
            <div class="nav-container">
                <!-- Logo on left -->
                <div class="nav-logo-container">
                    <img src="../all-images/batts-waterfront.webp" alt="Batts Table Tennis Logo" class="nav-logo-img">
                </div>
                
                <!-- Business name centered -->
                <h1 class="nav-logo">Batts Table Tennis<br>Supplies</h1>
                
                <!-- Hamburger menu -->
                <div class="hamburger" id="hamburger">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
                
                <!-- Navigation menu -->
                <ul class="nav-menu" id="nav-menu">
                    <li class="nav-item">
                        <a href="index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a>
                    </li>
                    <li class="nav-item">
                        <a href="contact.html" class="nav-link ${activePage === 'contact' ? 'active' : ''}">Contact Us</a>
                    </li>
                    <li class="nav-item">
                        <a href="location.html" class="nav-link ${activePage === 'location' ? 'active' : ''}">Our Location</a>
                    </li>
                    <li class="nav-item">
                        <a href="https://www.battsharlow.com/" class="nav-link" target="_blank" rel="noopener noreferrer">Batts Website</a>
                    </li>
                </ul>
            </div>
        </nav>
    `;
    
    // Insert navbar into the page
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = navbarHTML;
        
        // Initialize hamburger menu functionality
        initializeHamburgerMenu();
    }
}

// Hamburger menu functionality
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Auto-load navbar when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Try to determine active page from URL
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    let activePage = '';
    
    switch(currentPage) {
        case 'index':
        case '':
            activePage = 'home';
            break;
        case 'contact':
            activePage = 'contact';
            break;
        case 'location':
            activePage = 'location';
            break;
        default:
            activePage = '';
    }
    
    createNavbar(activePage);
});
