// Reusable Footer Component
function createFooter() {
    const footerHTML = `
        <footer class="footer">
            <p>&copy; 2025 Batts Table Tennis Supplies</p>
            <p>Contact us for expert advice on equipment selection</p>
        </footer>
    `;
    
    // Insert footer into the page
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }
}

// Auto-load footer when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    createFooter();
});
