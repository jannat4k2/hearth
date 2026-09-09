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
            popunder: '1dbd5ebe1a368411ad2e5516ef8e28b2',
            banner728: '82c5cd0a5e66ed8a4506322eb5dcabe6',
            banner300: 'a16e0a50d324a0f76a48b9c0ac14ab53',
            native: '0b47e264c54dcdd189ae8ade9488c831',
            vignette: 'e4cc9221b1fdf9169e495dd070072d5d',
            social: 'f27f8c4e7ac5ca05244122659bddba7d'
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
