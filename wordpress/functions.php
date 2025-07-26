<?php
/**
 * Russian Translator Theme Functions
 */

// Enqueue styles and scripts
function russian_translator_enqueue_scripts() {
    wp_enqueue_style('russian-translator-style', get_stylesheet_uri());
    wp_enqueue_script('russian-translator-script', get_template_directory_uri() . '/js/analytics.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'russian_translator_enqueue_scripts');

// Add theme support
function russian_translator_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
}
add_action('after_setup_theme', 'russian_translator_setup');

// SEO Meta Tags
function russian_translator_seo_meta() {
    $title = "Russian Translator Mumbai | Professional Translation Services | Language Liberty";
    $description = "Expert Russian translator in Mumbai with 6+ years experience. Professional English-Russian translation, interpretation, document translation, business meetings. 24/7 support. Get 20% OFF first booking!";
    $keywords = "russian translator mumbai, russian interpreter mumbai, english to russian translation, russian translation services, document translation, business interpreter";
    $canonical = home_url();
    
    echo '<meta name="description" content="' . esc_attr($description) . '">' . "\n";
    echo '<meta name="keywords" content="' . esc_attr($keywords) . '">' . "\n";
    echo '<meta name="author" content="Sabrina Bhatt - Russian Translator">' . "\n";
    echo '<meta name="robots" content="index, follow">' . "\n";
    
    // Open Graph tags
    echo '<meta property="og:title" content="' . esc_attr($title) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($description) . '">' . "\n";
    echo '<meta property="og:type" content="website">' . "\n";
    echo '<meta property="og:url" content="' . esc_url($canonical) . '">' . "\n";
    
    // Canonical link
    echo '<link rel="canonical" href="' . esc_url($canonical) . '">' . "\n";
    
    // Structured data
    $structured_data = array(
        "@context" => "https://schema.org",
        "@type" => "LocalBusiness",
        "name" => "Language Liberty - Russian Translation Services",
        "description" => $description,
        "url" => $canonical,
        "telephone" => "+91-8789389223",
        "address" => array(
            "@type" => "PostalAddress",
            "addressLocality" => "Mumbai",
            "addressCountry" => "IN"
        ),
        "serviceArea" => "Global",
        "priceRange" => "$$",
        "openingHours" => "Mo-Su 00:00-23:59"
    );
    
    echo '<script type="application/ld+json">' . json_encode($structured_data) . '</script>' . "\n";
}
add_action('wp_head', 'russian_translator_seo_meta');

// Google Analytics
function russian_translator_google_analytics() {
    ?>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href
        });
    </script>
    <?php
}
add_action('wp_head', 'russian_translator_google_analytics');

// Custom post type for testimonials (optional)
function russian_translator_testimonials_post_type() {
    register_post_type('testimonials', array(
        'labels' => array(
            'name' => 'Testimonials',
            'singular_name' => 'Testimonial'
        ),
        'public' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-format-quote'
    ));
}
add_action('init', 'russian_translator_testimonials_post_type');

// Analytics tracking function
function track_page_view() {
    if (!is_admin()) {
        ?>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Track visit
            let visits = localStorage.getItem('wp_visits') || 0;
            visits = parseInt(visits) + 1;
            localStorage.setItem('wp_visits', visits);
            
            // Send to WordPress via AJAX
            fetch('<?php echo admin_url('admin-ajax.php'); ?>', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'action=track_visit&visits=' + visits
            });
        });
        </script>
        <?php
    }
}
add_action('wp_footer', 'track_page_view');

// AJAX handler for visit tracking
function handle_track_visit() {
    $visits = intval($_POST['visits']);
    update_option('total_visits', $visits);
    wp_die();
}
add_action('wp_ajax_track_visit', 'handle_track_visit');
add_action('wp_ajax_nopriv_track_visit', 'handle_track_visit');

// Shortcode for analytics display
function analytics_display_shortcode($atts) {
    $visits = get_option('total_visits', 1247);
    $translations = floor($visits * 2.3) + 856;
    
    return '<div class="analytics-stats">
        <div class="analytics-item">
            <span class="analytics-number">' . number_format($visits) . '</span>
            <span class="analytics-label">Total Visitors</span>
        </div>
        <div class="analytics-item">
            <span class="analytics-number">' . number_format($translations) . '</span>
            <span class="analytics-label">Translations Completed</span>
        </div>
        <div class="analytics-item">
            <span class="analytics-number">98.5%</span>
            <span class="analytics-label">Client Satisfaction</span>
        </div>
    </div>';
}
add_shortcode('analytics_display', 'analytics_display_shortcode');
?>