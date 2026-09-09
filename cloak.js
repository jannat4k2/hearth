/**
 * Hearth & Home - Cloaking & Monetization System
 * Shows clean content to bots, monetized version to humans
 */

(function() {
    'use strict';
    
    const CONFIG = {
        verificationDelay: 5000,
        // Add your Adsterra keys here when ready
        adsterraKeys: {
            popunder: 'YOUR_POPUNDER_KEY',
            banner728: 'YOUR_BANNER_728_KEY',
            banner300: 'YOUR_BANNER_300_KEY',
            native: 'YOUR_NATIVE_KEY',
            vignette: 'YOUR_VIGNETTE_KEY',
            social: 'YOUR_SOCIAL_BAR_KEY'
        }
    };
    
    // Bot detection
    const BOT_PATTERNS = /bot|crawler|spider|pinterest|googlebot|bingbot|facebook|twitter|slurp/i;
    
    function isBot() {
        const ua = navigator.userAgent.toLowerCase();
        return BOT_PATTERNS.test(ua) || navigator.webdriver || window.callPhantom;
    }
    
    // Exit if bot - they see clean content only
    if (isBot()) {
        console.log('Bot detected - serving clean content');
        return;
    }
    
    // Human visitor - show verification then ads
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'verification-overlay';
        overlay.innerHTML = `
            <div class="hearth-verification">
                <div class="hearth-spinner"></div>
                <h2>Verifying your browser...</h2>
                <p>Securing your connection to Hearth & Home</p>
            </div>
        `;
        
        // Styles matching your site's warm theme
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(135deg, #faf6f1 0%, #f5ebe0 100%);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Georgia, serif;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .hearth-verification {
                text-align: center;
                color: #5c4a3d;
            }
            .hearth-verification h2 {
                font-size: 1.8rem;
                margin-bottom: 10px;
                color: #8b6914;
            }
            .hearth-verification p {
                color: #8b7355;
                font-size: 1rem;
            }
            .hearth-spinner {
                width: 60px;
                height: 60px;
                border: 4px solid #e8dfd0;
                border-top-color: #c9a227;
                border-radius: 50%;
                animation: hearthSpin 1s linear infinite;
                margin: 0 auto 25px;
            }
            @keyframes hearthSpin {
                to { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(style);
        return overlay;
    }
    
    function injectAds() {
        // Inject ad containers that match your site's design
        const adContainers = [
            { position: 'top', class: 'hearth-ad-top' },
            { position: 'sidebar', class: 'hearth-ad-sidebar' },
            { position: 'in-content', class: 'hearth-ad-content' },
            { position: 'bottom', class: 'hearth-ad-bottom' }
        ];
        
        // Add your Adsterra code here
        console.log('Ads would be injected here');
    }
    
    // Initialize
    function init() {
        const overlay = createOverlay();
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                overlay.remove();
                injectAds();
            }, 500);
        }, CONFIG.verificationDelay);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
