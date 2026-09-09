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
        // Create ad containers
        const adContainers = [
            { position: 'top', class: 'hearth-ad-top' },
            { position: 'sidebar', class: 'hearth-ad-sidebar' },
            { position: 'in-content', class: 'hearth-ad-content' },
            { position: 'bottom', class: 'hearth-ad-bottom' }
        ];
        
        // Create and position ad containers
        adContainers.forEach(container => {
            const adDiv = document.createElement('div');
            adDiv.className = container.class;
            adDiv.id = `hearth-ad-${container.position}`;
            
            // Position the ad based on its type
            switch(container.position) {
                case 'top':
                    document.body.insertBefore(adDiv, document.body.firstChild);
                    break;
                case 'sidebar':
                    // You'll need to adjust this based on your site structure
                    const sidebar = document.querySelector('.sidebar') || document.body;
                    sidebar.appendChild(adDiv);
                    break;
                case 'in-content':
                    // Insert after first paragraph or main content area
                    const firstP = document.querySelector('main p') || document.querySelector('.content p');
                    if (firstP && firstP.parentNode) {
                        firstP.parentNode.insertBefore(adDiv, firstP.nextSibling);
                    } else {
                        document.body.appendChild(adDiv);
                    }
                    break;
                case 'bottom':
                    document.body.appendChild(adDiv);
                    break;
            }
            
            // Inject Adsterra ad code based on position
            switch(container.position) {
                case 'top':
                    // 728x90 banner
                    adDiv.innerHTML = `<script async="async" data-cfasync="false" src="//pl${CONFIG.adsterraKeys.banner728}/invoke.js"></script>`;
                    break;
                case 'sidebar':
                    // 300x250 banner
                    adDiv.innerHTML = `<script async="async" data-cfasync="false" src="//pl${CONFIG.adsterraKeys.banner300}/invoke.js"></script>`;
                    break;
                case 'in-content':
                    // Native ad
                    adDiv.innerHTML = `<script async="async" data-cfasync="false" src="//pl${CONFIG.adsterraKeys.native}/invoke.js"></script>`;
                    break;
                case 'bottom':
                    // Social bar ad
                    adDiv.innerHTML = `<script async="async" data-cfasync="false" src="//pl${CONFIG.adsterraKeys.social}/invoke.js"></script>`;
                    break;
            }
        });
        
        // Add popunder script
        const popunderScript = document.createElement('script');
        popunderScript.async = true;
        popunderScript.setAttribute('data-cfasync', 'false');
        popunderScript.src = `//pl${CONFIG.adsterraKeys.popunder}/popunder.js`;
        document.head.appendChild(popunderScript);
        
        // Add vignette ad (full page overlay)
        const vignetteScript = document.createElement('script');
        vignetteScript.async = true;
        vignetteScript.setAttribute('data-cfasync', 'false');
        vignetteScript.src = `//pl${CONFIG.adsterraKeys.vignette}/vignette.js`;
        document.head.appendChild(vignetteScript);
        
        console.log('All ads injected successfully');
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
