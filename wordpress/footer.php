    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <h3>Language Liberty</h3>
                    <p>Professional Russian Translation & Interpretation Services</p>
                </div>
                
                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <a href="#home">Home</a>
                    <a href="#how-it-works">How It Works</a>
                    <a href="#linkedin">LinkedIn</a>
                    <a href="#contact">Contact</a>
                </div>
                
                <div class="footer-contact">
                    <h4>Contact</h4>
                    <p>📞 +91-8789389223</p>
                    <p>📞 +91-7304876702</p>
                    <p>📍 Mumbai, India</p>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> Language Liberty. All rights reserved.</p>
                <p>Russian Translation & Interpretation Services | Mumbai | 24/7 Support</p>
            </div>
        </div>
    </footer>

    <style>
    .footer {
        background: #2d3748;
        color: white;
        padding: 3rem 0 1rem;
    }

    .footer-content {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
    }

    .footer-brand h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    .footer-links h4,
    .footer-contact h4 {
        margin-bottom: 1rem;
        color: #e2e8f0;
    }

    .footer-links a {
        display: block;
        color: #a0aec0;
        text-decoration: none;
        margin-bottom: 0.5rem;
        transition: color 0.3s ease;
    }

    .footer-links a:hover {
        color: white;
    }

    .footer-contact p {
        margin-bottom: 0.5rem;
        color: #a0aec0;
    }

    .footer-bottom {
        border-top: 1px solid #4a5568;
        padding-top: 1rem;
        text-align: center;
        color: #a0aec0;
        font-size: 0.9rem;
    }

    @media (max-width: 768px) {
        .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
    }
    </style>

    <?php wp_footer(); ?>
</body>
</html>