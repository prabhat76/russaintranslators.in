<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <header class="header">
        <nav class="nav">
            <div class="nav-brand">
                <span class="flag">🇷🇺</span>
                <span class="brand-text">Language Liberty</span>
            </div>
            
            <div class="nav-menu">
                <a href="#home">Home</a>
                <a href="#how-it-works">How It Works</a>
                <a href="#linkedin">LinkedIn</a>
                <a href="#contact">Contact</a>
            </div>
        </nav>
    </header>

    <style>
    .header {
        position: fixed;
        top: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid #e2e8f0;
        z-index: 1000;
        transition: all 0.3s ease;
    }

    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .nav-brand {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
        font-size: 1.2rem;
        color: #2d3748;
    }

    .flag {
        font-size: 1.5rem;
    }

    .nav-menu {
        display: flex;
        gap: 2rem;
    }

    .nav-menu a {
        text-decoration: none;
        color: #4a5568;
        font-weight: 500;
        transition: color 0.3s ease;
        position: relative;
    }

    .nav-menu a:hover {
        color: #667eea;
    }

    .nav-menu a::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -5px;
        left: 0;
        background: #667eea;
        transition: width 0.3s ease;
    }

    .nav-menu a:hover::after {
        width: 100%;
    }

    @media (max-width: 768px) {
        .nav-menu {
            flex-direction: column;
            gap: 1rem;
        }
        
        .nav {
            flex-direction: column;
            padding: 1rem;
        }
    }
    </style>