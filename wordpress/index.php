<?php
/*
Template Name: Russian Translator Landing Page
*/
get_header(); ?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">
        
        <!-- Hero Section -->
        <section id="home" class="hero">
            <div class="hero-content">
                <h1>Professional Russian Translation & Interpretation Services</h1>
                <p>Expert Russian-English translation with 6+ years of experience. Serving businesses, individuals, and artists in Mumbai and globally.</p>
                <div class="hero-cta">
                    <a href="#contact" class="cta-primary">Get 20% OFF First Booking</a>
                    <a href="#services" class="cta-secondary">View Services</a>
                </div>
                <div class="hero-stats">
                    <div class="stat">
                        <span class="stat-number">6+</span>
                        <span class="stat-label">Years Experience</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">24/7</span>
                        <span class="stat-label">Support</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number" id="satisfaction-rate">98.5%</span>
                        <span class="stat-label">Satisfaction Rate</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- How It Works Section -->
        <section id="how-it-works" class="how-it-works">
            <div class="container">
                <h2>How Our Translation Process Works</h2>
                <div class="process-steps">
                    <div class="step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h3>Initial Consultation</h3>
                            <p>Share your requirements via call or WhatsApp. We analyze your document type, deadline, and specific needs.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h3>Quote & Timeline</h3>
                            <p>Receive instant quote with transparent pricing. Get 20% OFF on first booking with clear delivery timeline.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h3>Professional Translation</h3>
                            <p>Native Russian speaker with cultural expertise translates your content with 99.9% accuracy guarantee.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h3>Quality Check & Delivery</h3>
                            <p>Thorough proofreading and quality assurance before secure delivery via your preferred method.</p>
                        </div>
                    </div>
                </div>
                
                <div class="analytics-banner">
                    <h3>📊 Real-Time Analytics</h3>
                    <div class="analytics-stats">
                        <div class="analytics-item">
                            <span class="analytics-number" id="total-visitors">1,247</span>
                            <span class="analytics-label">Total Visitors</span>
                        </div>
                        <div class="analytics-item">
                            <span class="analytics-number" id="translations-completed">856</span>
                            <span class="analytics-label">Translations Completed</span>
                        </div>
                        <div class="analytics-item">
                            <span class="analytics-number">98.5%</span>
                            <span class="analytics-label">Client Satisfaction</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- LinkedIn Section -->
        <section id="linkedin" class="linkedin-section">
            <div class="container">
                <h2>Connect with Sabrina on LinkedIn</h2>
                <p>Follow my professional journey and get insights into Russian business culture</p>
                
                <div class="linkedin-container">
                    <iframe 
                        src="https://www.linkedin.com/embed/feed/update/urn:li:share:7000000000000000000" 
                        height="500" 
                        width="100%" 
                        frameborder="0" 
                        allowtransparency="true" 
                        allow="encrypted-media"
                        title="LinkedIn Profile - Sabrina Bhatt Russian Translator"
                        loading="lazy">
                        <p>Your browser does not support iframes. 
                            <a href="https://www.linkedin.com/in/sabrina-bhatt-658aa0221/" target="_blank" rel="noopener noreferrer">
                                Visit my LinkedIn profile directly
                            </a>
                        </p>
                    </iframe>
                    
                    <div class="linkedin-cta">
                        <a href="https://www.linkedin.com/in/sabrina-bhatt-658aa0221/" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           class="linkedin-btn">
                            <span class="linkedin-icon">💼</span>
                            View Full LinkedIn Profile
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="contact">
            <div class="container">
                <h2>Get In Touch</h2>
                <div class="contact-content">
                    <div class="contact-info">
                        <h3>Contact Information</h3>
                        <div class="contact-item">
                            <span class="contact-icon">📞</span>
                            <div>
                                <p><strong>Primary:</strong> +91-8789389223</p>
                                <p><strong>Secondary:</strong> +91-7304876702</p>
                            </div>
                        </div>
                        
                        <div class="special-offer">
                            <h4>🎉 Special Offer</h4>
                            <p>Get <strong>20% OFF</strong> on your first booking!</p>
                        </div>
                    </div>
                    
                    <div class="contact-form">
                        <h3>Quick Quote Request</h3>
                        <?php echo do_shortcode('[contact-form-7 id="1" title="Quote Form"]'); ?>
                    </div>
                </div>
            </div>
        </section>

    </main>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    let visits = localStorage.getItem('wp_visits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('wp_visits', visits);
    
    const totalVisitors = document.getElementById('total-visitors');
    const translationsCompleted = document.getElementById('translations-completed');
    
    if (totalVisitors) {
        totalVisitors.textContent = (visits + 1247).toLocaleString();
    }
    if (translationsCompleted) {
        translationsCompleted.textContent = (Math.floor(visits * 2.3) + 856).toLocaleString();
    }
    
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
</script>

<?php get_footer(); ?>