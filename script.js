document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select all elements with the animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Experience Modal Logic
    const modal = document.getElementById('experienceModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const clickableCards = document.querySelectorAll('.clickable-card');

    if (modal && modalBody && modalClose) {
        clickableCards.forEach(card => {
            card.addEventListener('click', () => {
                const detailsContent = card.querySelector('.project-details-content');
                if (detailsContent) {
                    modalBody.innerHTML = detailsContent.innerHTML;
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                }
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        };

        modalClose.addEventListener('click', closeModal);

        // Close when clicking outside the modal content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});