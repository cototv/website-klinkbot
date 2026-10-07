// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');

// Scroll Event for Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 11, 18, 0.95)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(10, 11, 18, 0.9)';
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.3)';
    }
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        setTimeout(() => {
            navLinks.style.opacity = '1';
            navLinks.style.transform = 'translateY(0)';
        }, 10);
    } else {
        navLinks.style.opacity = '0';
        navLinks.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            navLinks.style.display = 'none';
        }, 300);
    }
});

// Add mobile navigation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: var(--header-height);
            left: 0;
            width: 100%;
            background-color: var(--color-bg-alt);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            padding: 2rem;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
            z-index: 999;
        }
    }
`;
document.head.appendChild(style);




// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            navLinks.style.opacity = '0';
            navLinks.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                navLinks.style.display = 'none';
            }, 300);
        }
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('aos-animate');
        }
    });
}

// Initial call and scroll event listener
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Add animation classes dynamically
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    [data-aos] {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    [data-aos].aos-animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    [data-aos-delay="100"] { transition-delay: 0.1s; }
    [data-aos-delay="200"] { transition-delay: 0.2s; }
    [data-aos-delay="300"] { transition-delay: 0.3s; }
    [data-aos-delay="400"] { transition-delay: 0.4s; }
    [data-aos-delay="500"] { transition-delay: 0.5s; }
    [data-aos-delay="600"] { transition-delay: 0.6s; }
    [data-aos-delay="700"] { transition-delay: 0.7s; }
`;
document.head.appendChild(animationStyle);

// Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success-message';
            successMessage.textContent = 'Thank you! Your message has been sent.';
            successMessage.style.color = 'var(--color-success)';
            successMessage.style.padding = '1rem 0';
            successMessage.style.marginTop = '1rem';
            
            contactForm.appendChild(successMessage);
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }, 1500);
    });
}

// Code Syntax Highlighting
// Improved Code Syntax Highlighting

// Simplified code highlighting function
function highlightCode() {
    const codeElement = document.querySelector('.language-lua');
    if (!codeElement) return;
    
    // Store original code text
    const originalCode = codeElement.textContent;
    
    // Create temp element to safely handle HTML conversion
    const tempDiv = document.createElement('div');
    
    // Escape HTML first to prevent interpretation of quotes or brackets
    tempDiv.textContent = originalCode;
    const escapedCode = tempDiv.innerHTML;
    
    // Apply syntax highlighting with careful handling of quotes
    let highlightedCode = escapedCode
        // Comments
        .replace(/(--[^\n]*)/g, '<span class="comment">$1</span>')
        
        // Strings (with careful quote handling)
        .replace(/(&quot;[^&]*?&quot;)/g, '<span class="string">$1</span>')
        
        // Keywords
        .replace(/\b(function|local|end|if|then|else|return)\b/g, '<span class="keyword">$1</span>')
        
        // Numbers
        .replace(/\b(\d+)\b/g, '<span class="number">$1</span>')
        
        // Function calls
        .replace(/\b(get_[A-Za-z_][A-Za-z0-9_]*|reset_exit_time)\b(?=\s*\()/g, '<span class="function">$1</span>');
    
    // Set the highlighted HTML
    codeElement.innerHTML = highlightedCode;
}

// Call syntax highlighting on page load
window.addEventListener('load', highlightCode);

// ==========================================
// PRICING CARD HOVER EFFECTS
// ==========================================

const priceCards = document.querySelectorAll('.price-card');

// Only enable hover effects on desktop.
// On mobile, cards remain at their normal size
// to prevent overflow and layout issues.
if (window.matchMedia('(min-width: 769px)').matches) {

    priceCards.forEach(card => {

        card.addEventListener('mouseenter', () => {

            priceCards.forEach(c => {
                if (c !== card) {
                    c.style.transform = 'scale(0.98)';
                    c.style.opacity = '0.7';
                }
            });

            if (card.classList.contains('featured')) {
                card.style.transform = 'scale(1.05)';
            } else {
                card.style.transform = 'scale(1.03)';
                card.style.zIndex = '2';
            }
        });

        card.addEventListener('mouseleave', () => {

            priceCards.forEach(c => {
                c.style.transform = 'scale(1)';
                c.style.opacity = '1';
                c.style.zIndex = 'auto';
            });
        });

    });

}


// Gallery and Lightbox functionality
let galleryImages = [];
let currentImageIndex = 0;

// Initialize the gallery images array
function initGallery() {
    // Get all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length === 0) {
        console.warn('No gallery items found on the page');
        return;
    }
    
    // Reset the gallery images array
    galleryImages = [];
    
    // Loop through each gallery item and extract its data
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const captionEl = item.querySelector('.gallery-caption');
        
        if (!img) {
            console.warn('Gallery item missing image element:', item);
            return;
        }
        
        // Get the image src, making sure to use the original attribute if it exists
        const imageSrc = img.getAttribute('onclick') ? 
            img.getAttribute('onclick').match(/'([^']+)'/)[1] : 
            img.getAttribute('src');
        
        // Add the image data to the gallery array
        galleryImages.push({
            index: index,
            src: imageSrc,
            alt: img.getAttribute('alt') || '',
            caption: captionEl ? captionEl.textContent : '',
            title: img.getAttribute('alt') || (captionEl ? captionEl.textContent : ''),
            description: item.getAttribute('data-description') || 'KlinkBOT - Serviços de automação para PokeXgames',
            element: item
        });
    });
    
    console.log('Gallery initialized with', galleryImages.length, 'images');
    
    // Fix the onclick handlers
    fixGalleryClicks();
}

function fixGalleryClicks() {
    galleryImages.forEach((imageData, index) => {
        const item = imageData.element;
        const img = item.querySelector('img');
        
        if (!img) return;
        
        // Remove any existing onclick handler
        if (img.hasAttribute('onclick')) {
            img.removeAttribute('onclick');
        }
        
        // Add a new click handler to the item
        item.addEventListener('click', function(e) {
            e.preventDefault();
            openLightboxByIndex(index);
        });
    });
    
    // Also update any existing onclick attributes in the HTML
    document.querySelectorAll('img[onclick*="openLightbox"]').forEach(img => {
        const src = img.getAttribute('src');
        const index = galleryImages.findIndex(item => item.src === src);
        if (index !== -1) {
            img.setAttribute('onclick', `openLightboxByIndex(${index}); return false;`);
        }
    });
}

function openLightboxByIndex(index) {
    if (index < 0 || index >= galleryImages.length) {
        console.warn('Invalid gallery index:', index);
        return;
    }
    
    // Set the current index
    currentImageIndex = index;
    
    // Get the image data
    const imageData = galleryImages[index];
    
    // Get lightbox elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    // Set image source and metadata
    lightboxImage.src = imageData.src;
    lightboxTitle.textContent = imageData.title || '';
    lightboxCaption.textContent = imageData.caption || '';
    lightboxDescription.textContent = imageData.description || '';
    
    // Show lightbox (gallery mode with navigation)
    lightbox.classList.add('active');
    lightbox.classList.remove('standalone-mode');
    
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
    
    // Add ESC key event to close lightbox
    document.addEventListener('keydown', handleKeyPress);
}

// Open the lightbox with the selected image
function openLightbox(imageSrc, imageTitle, description) {
    // Find the index of the clicked image
    const index = galleryImages.findIndex(img => img.src === imageSrc);
    
    if (index !== -1) {
        // If we found the image in our gallery, use the index-based function
        openLightboxByIndex(index);
    } else {
        // Fallback for images not in the gallery
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxDescription = document.getElementById('lightbox-description');
        
        // Set image source and metadata
        lightboxImage.src = imageSrc;
        lightboxTitle.textContent = imageTitle || '';
        lightboxCaption.textContent = '';
        lightboxDescription.textContent = description || '';
        
        // Show lightbox in standalone (no gallery nav)
        lightbox.classList.add('active', 'standalone-mode');
        
        // Prevent body scrolling when lightbox is open
        document.body.style.overflow = 'hidden';
        
        // Add ESC key event to close lightbox
        document.addEventListener('keydown', handleKeyPress);
    }
}

// Close the lightbox
function closeLightbox() {
    // Get lightbox element
    const lightbox = document.getElementById('lightbox');
    
    // Hide lightbox
    lightbox.classList.remove('active', 'standalone-mode');
    
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
    
    // Remove ESC key event
    document.removeEventListener('keydown', handleKeyPress);
}

// Change the image in the lightbox
function changeImage(direction) {
    // Check if we have gallery images
    if (!galleryImages || galleryImages.length === 0) {
        console.warn('No gallery images available');
        return;
    }
    
    // Calculate the new index
    let newIndex = currentImageIndex + direction;
    
    // Wrap around if needed
    if (newIndex < 0) {
        newIndex = galleryImages.length - 1;
    } else if (newIndex >= galleryImages.length) {
        newIndex = 0;
    }
    
    console.log('Changing from image index', currentImageIndex, 'to', newIndex);
    
    // Update current index
    currentImageIndex = newIndex;
    
    // Get current image data
    const currentImage = galleryImages[currentImageIndex];
    if (!currentImage) {
        console.warn('Invalid gallery image at index', currentImageIndex);
        return;
    }
    
    // Update lightbox elements
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    // Check if elements exist
    if (!lightboxImage || !lightboxCaption || !lightboxTitle || !lightboxDescription) {
        console.warn('Lightbox elements not found');
        return;
    }
    
    // Animate image change
    lightboxImage.style.opacity = '0';
    
    setTimeout(() => {
        // Set new image and text content with fallbacks
        lightboxImage.src = currentImage.src || '';
        lightboxTitle.textContent = currentImage.title || '';
        lightboxCaption.textContent = currentImage.caption || '';
        lightboxDescription.textContent = currentImage.description || '';
        
        // Fade image back in
        lightboxImage.style.opacity = '1';
    }, 200);
}


// Handle keyboard navigation
function handleKeyPress(event) {
    const lightbox = document.getElementById('lightbox');
    const isStandalone = lightbox && lightbox.classList.contains('standalone-mode');

    if (event.key === 'Escape') {
        closeLightbox();
    } else if (!isStandalone && event.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (!isStandalone && event.key === 'ArrowRight') {
        changeImage(1);
    }
}

function initZoomableImages() {
    document.querySelectorAll('.zoomable-image').forEach((img) => {
        img.addEventListener('click', function () {
            const feature = this.closest('.automation-feature');
            const title = feature ? (feature.querySelector('h3')?.textContent || this.alt) : this.alt;
            const description = feature ? (feature.querySelector('p')?.textContent.trim() || '') : '';
            openLightbox(this.src, title, description);
        });
    });
}

function initFeatureImagePreviews() {
    document.querySelectorAll('.feature-card-preview[data-preview-image]').forEach((card) => {
        card.addEventListener('click', () => {
            const imageName = card.getAttribute('data-preview-image');
            const title = card.getAttribute('data-preview-title') || card.querySelector('h3')?.textContent?.trim() || 'Preview';
            const description = Array.from(card.querySelectorAll('p'))
                .map((p) => p.textContent.trim())
                .filter(Boolean)
                .join(' ');

            if (!imageName) return;

            const imageSrc = new URL(imageName, window.location.href).href;
            openLightbox(imageSrc, title, description);

            trackEvent('feature_image_open', {
                event_category: 'features',
                event_label: title
            });
        });
    });
}

// ==========================================
// GOOGLE ANALYTICS 4 - CLICK TRACKING
// ==========================================

function trackEvent(eventName, params = {}) {
    if (typeof gtag === 'function') {
        gtag('event', eventName, params);
    }
}

function initAnalyticsTracking() {
    // Contratar / WhatsApp (em breve)
    document.querySelectorAll('[data-track="contratar"]').forEach((el) => {
        el.addEventListener('click', () => {
            trackEvent('open_hire_form', {
                event_category: 'contact',
                event_label: 'contratar'
            });
        });
    });

    document.querySelectorAll('[data-track="whatsapp"]').forEach((el) => {
        el.addEventListener('click', () => {
            trackEvent('contact_whatsapp', {
                event_category: 'contact',
                event_label: 'whatsapp_em_breve'
            });
        });
    });

    document.querySelectorAll('[data-track="enviar_contratacao"]').forEach((el) => {
        el.addEventListener('click', () => {
            const plan = document.getElementById('hirePlan')?.value || '';
            trackEvent('submit_hire_form', {
                event_category: 'contact',
                event_label: plan || 'enviar_contratacao',
                plan_name: plan
            });
        });
    });

    // Discord (non-link, still track interest)
    document.querySelectorAll('[data-track="discord"]').forEach((el) => {
        el.addEventListener('click', () => {
            trackEvent('contact_discord', {
                event_category: 'contact',
                event_label: 'discord_members_only'
            });
        });
    });

    // Hero / CTA buttons
    document.querySelectorAll('.btn, .hero-cta a').forEach((btn) => {
        btn.addEventListener('click', () => {
            trackEvent('cta_click', {
                event_category: 'cta',
                event_label: btn.textContent?.trim() || btn.getAttribute('href') || 'button',
                link_url: btn.getAttribute('href') || ''
            });
        });
    });

    // Gallery image opens (thumbnail click)
    document.querySelectorAll('.gallery-item').forEach((item) => {
        item.addEventListener('click', () => {
            const caption = item.querySelector('.gallery-caption')?.textContent?.trim() || 'gallery_item';
            trackEvent('gallery_open', {
                event_category: 'gallery',
                event_label: caption
            });
        });
    });
}

function initHireModal() {
    const modal = document.getElementById('hireModal');
    const openBtn = document.getElementById('openHireModal');
    const form = document.getElementById('hireForm');
    const phoneInput = document.getElementById('hirePhone');
    const planSelect = document.getElementById('hirePlan');

    if (!modal || !openBtn) return;

    const openModal = (preselectedPlan = '') => {
        if (planSelect) {
            if (preselectedPlan) {
                planSelect.value = preselectedPlan;
                // If value didn't match any option, leave default
                if (planSelect.value !== preselectedPlan) {
                    planSelect.selectedIndex = 0;
                }
            }
        }

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        document.getElementById('hireName')?.focus();
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    openBtn.addEventListener('click', () => openModal());

    // Clicking a price card opens the hire form with that plan selected
    document.querySelectorAll('.price-card[data-plan]').forEach((card) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const planId = card.getAttribute('data-plan') || 'unknown';
            const planOption = card.getAttribute('data-plan-option') || '';
            const title = card.querySelector('h3')?.textContent?.trim() || planId;

            trackEvent('select_plan', {
                plan_id: planId,
                plan_name: title,
                event_category: 'pricing',
                event_label: planId
            });

            openModal(planOption);
        });
    });

    modal.querySelectorAll('[data-close-hire]').forEach((el) => {
        el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Simple BR phone mask: (XX) XXXXX-XXXX
    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            let digits = phoneInput.value.replace(/\D/g, '').slice(0, 11);
            if (digits.length > 6) {
                phoneInput.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
            } else if (digits.length > 2) {
                phoneInput.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
            } else if (digits.length > 0) {
                phoneInput.value = `(${digits}`;
            } else {
                phoneInput.value = '';
            }
        });
    }

    const showHireToast = (message, isError = false) => {
        const note = document.createElement('div');
        note.className = 'hire-success-toast' + (isError ? ' hire-error-toast' : '');
        note.textContent = message;
        document.body.appendChild(note);
        setTimeout(() => note.classList.add('show'), 50);
        setTimeout(() => {
            note.classList.remove('show');
            setTimeout(() => note.remove(), 300);
        }, 5000);
    };

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('hireName')?.value.trim() || '';
            const phone = document.getElementById('hirePhone')?.value.trim() || '';
            const plan = document.getElementById('hirePlan')?.value || '';
            const errorEl = document.getElementById('hireFormError');
            const submitBtn = form.querySelector('.hire-submit-btn');

            if (errorEl) {
                errorEl.hidden = true;
                errorEl.textContent = '';
            }

            if (!name || !phone || !plan) {
                if (errorEl) {
                    errorEl.hidden = false;
                    errorEl.textContent = 'Preencha nome, telefone e plano.';
                }
                return;
            }

            const phoneDigits = phone.replace(/\D/g, '');
            if (phoneDigits.length < 10 || phoneDigits.length > 11) {
                if (errorEl) {
                    errorEl.hidden = false;
                    errorEl.textContent = 'Informe um telefone válido com DDD.';
                }
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
            }

            try {
                const response = await fetch('https://formsubmit.co/ajax/supportklinkbot@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: name,
                        telefone: phone,
                        plano: plan,
                        _subject: 'Novo pedido de contratação - KlinkBOT',
                        _template: 'table',
                        _captcha: 'false'
                    })
                });

                if (!response.ok) {
                    throw new Error('Falha no envio');
                }

                form.reset();
                closeModal();
                showHireToast('Pedido enviado! A equipe KlinkBOT entrará em contato em breve.');
            } catch (err) {
                if (errorEl) {
                    errorEl.hidden = false;
                    errorEl.textContent = 'Não foi possível enviar. Tente novamente em instantes.';
                }
                showHireToast('Erro ao enviar o pedido. Tente novamente.', true);
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar pedido';
                }
            }
        });
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initZoomableImages();
    initFeatureImagePreviews();
    initAnalyticsTracking();
    initHireModal();
    
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(event) {
            // Close only if clicking on the black background (not the content)
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }
});

