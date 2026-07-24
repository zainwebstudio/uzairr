// ==========================================================
// UZAIRR — HOME PAGE SCRIPT
// 1. Mobile nav toggle
// 2. Scroll-reveal for .reveal elements
// 3. Seamless testimonial marquee loop (duplicates content)
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Mobile nav toggle ---------- */
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('is-open');
            navToggle.classList.toggle('is-open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // close mobile menu when a link is tapped
        mainNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('is-open');
                navToggle.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- Scroll reveal ---------- */
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => observer.observe(el));
    } else {
        // fallback: just show everything
        revealEls.forEach(el => el.classList.add('is-visible'));
    }

    /* ---------- Testimonial marquee: duplicate for seamless loop ---------- */
    const track = document.getElementById('marqueeTrack');

    if (track) {
        const originalItems = Array.from(track.children);
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            track.appendChild(clone);
        });
    }



    /* ---------- Contact form (works once a Formspree endpoint is set) ---------- */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalLabel = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            formStatus.textContent = '';
            formStatus.className = 'form-status';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.textContent = "Thanks — your message is on its way.";
                    formStatus.classList.add('is-success');
                    contactForm.reset();
                } else {
                    formStatus.textContent = "Something went wrong. Please try again.";
                    formStatus.classList.add('is-error');
                }
            } catch (err) {
                formStatus.textContent = "Something went wrong. Please try again.";
                formStatus.classList.add('is-error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalLabel;
            }
        });
    }

});