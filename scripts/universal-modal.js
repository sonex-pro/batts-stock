/**
 * UNIVERSAL PRODUCT MODAL SYSTEM
 * Handles all product types: Rubbers, Bats, Blades, Accessories
 * Mobile-first design with touch gestures and swipe navigation
 * 
 * HOW TO USE:
 * 1. Include this script in your HTML: <script src="../scripts/universal-modal.js"></script>
 * 2. Call initializeModal(productType) in your page script
 * 3. Add product data to the appropriate section below
 */

class UniversalProductModal {
    constructor(productType = 'rubber') {
        this.productType = productType; // 'rubber', 'bat', 'blade', 'accessory'
        this.currentProductIndex = 0;
        this.products = [];
        this.isOpen = false;
        this.touchStartY = 0;
        this.touchStartX = 0;
        this.isDragging = false;
        this.modalElement = null;
        this.overlayElement = null;
        this.isScrolling = false;
        this.scrollStartTime = 0;
        this.initialScrollTop = 0;
        
        this.init();
    }

    init() {
        this.createModalHTML();
        this.bindEvents();
        this.loadProductData();
    }

    createModalHTML() {
        // Create modal overlay with universal structure
        this.overlayElement = document.createElement('div');
        this.overlayElement.className = 'modal-overlay';
        this.overlayElement.innerHTML = `
            <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <div class="modal-header">
                    <div class="modal-drag-handle"></div>
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
                
                <div class="modal-content">
                    <div class="modal-loading">
                        <div class="modal-spinner"></div>
                    </div>
                </div>
                
                <button class="modal-nav modal-nav-prev" aria-label="Previous product">‹</button>
                <button class="modal-nav modal-nav-next" aria-label="Next product">›</button>
                
                <div class="modal-swipe-indicator">Swipe to navigate</div>
            </div>
        `;
        
        document.body.appendChild(this.overlayElement);
        this.modalElement = this.overlayElement.querySelector('.modal');
    }

    bindEvents() {
        // Close modal events
        this.overlayElement.querySelector('.modal-close').addEventListener('click', () => this.close());
        this.overlayElement.addEventListener('click', (e) => {
            if (e.target === this.overlayElement) this.close();
        });

        // Navigation events
        this.overlayElement.querySelector('.modal-nav-prev').addEventListener('click', () => this.previousProduct());
        this.overlayElement.querySelector('.modal-nav-next').addEventListener('click', () => this.nextProduct());

        // Touch events for mobile
        this.modalElement.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.modalElement.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        this.modalElement.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        
        // Scroll event to detect scrolling behavior
        this.modalElement.addEventListener('scroll', () => {
            this.isScrolling = true;
            // Clear scrolling flag after scroll stops
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                this.isScrolling = false;
            }, 150);
        }, { passive: true });

        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Product card click events
        document.querySelectorAll('.read-more-btn').forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.open(index);
            });
        });
    }

    loadProductData() {
        // Load products from DOM elements (existing approach)
        this.products = Array.from(document.querySelectorAll('.product-card')).map(card => {
            const name = card.querySelector('.product-name');
            const img = card.querySelector('.product-image');
            const description = card.querySelector('.product-description');
            const price = card.querySelector('.product-price');
            const pricing = card.querySelector('.product-pricing');
            
            // Handle both old single price format and new pricing structure
            let priceData = '';
            let oldPrice = '';
            let currentPrice = '';
            
            if (pricing) {
                // New pricing structure with old and current prices
                const oldPriceElement = pricing.querySelector('.price-old');
                const currentPriceElement = pricing.querySelector('.price-current');
                oldPrice = oldPriceElement ? oldPriceElement.textContent.trim() : '';
                currentPrice = currentPriceElement ? currentPriceElement.textContent.trim() : '';
                priceData = currentPrice; // For backward compatibility
            } else if (price) {
                // Old single price format
                priceData = price.textContent.trim();
                currentPrice = priceData;
            }
            
            return {
                name: name ? name.textContent.trim() : '',
                image: img ? img.src : '',
                imageAlt: img ? img.alt : '',
                description: description ? description.textContent.trim() : '',
                price: priceData,
                oldPrice: oldPrice,
                currentPrice: currentPrice,
                fullDescription: this.getFullProductDescription(name ? name.textContent.trim() : ''),
                specs: this.getProductSpecs(name ? name.textContent.trim() : ''),
                colors: this.getProductColors(name ? name.textContent.trim() : ''),
                thickness: this.getProductThickness(name ? name.textContent.trim() : '')
            };
        });
    }

    /**
     * ========================================
     * PRODUCT DESCRIPTIONS SECTION
     * ========================================
     * TO ADD NEW PRODUCTS: Add entries to the appropriate product type section
     * FORMAT: 'Product Name': { title: 'DISPLAY TITLE', content: 'Description text...' }
     */
    getFullProductDescription(productName) {
        // RUBBER DESCRIPTIONS - Add new rubber descriptions here
        const rubberDescriptions = {
            'Tibhar K3 Pro': {
                title: 'TIBHAR HYBRID K3 PRO',
                content: `Perfectly adapted to the game of the uncompromising offensive player. With its increased sponge hardness and the resulting enhanced power and energy, this rubber enables the player to act even more uncompromisingly.

Hybrid K3 Pro shows its full potential, especially in the opening and when countering the opponent's attacking strokes: extremely high quality and precision. The rubber is also convincing when playing from half distance.

The high ball trajectory gives you the necessary confidence and control to play very powerful and decisive topspins despite the increased distance from the table.

In serve/return actions, the adhering surface and higher ball adhesion to the rubber allow you to generate significantly more spin and to optimally prepare your attacking strokes.

These qualities make Hybrid K3 Pro a rubber of its own and the first choice of many players under TIBHAR contract.`
            },
            'Tibhar K3': {
                title: 'TIBHAR HYBRID K3',
                content: `The rubber HYBRID K3 combines characteristics that did not appear to be combinable until now.

Despite its enormous tackiness, HYBRID K3 convinces by its high dynamic and powerful catapult effect. The hard sponge represents the basis of high speeds.

The pimple in rubber gives you the sensation that you will be able to counter immediately and effortless your adversary's balls – whether undercut or spin loaded topspins. Because fast rubbers often represent a challenge when it comes to optimal control and good placement, with K3 you will definitely master it.

Experience unlimited possibilities with HYBRID K3.`
            },
            'Tibhar MX-P': {
                title: 'TIBHAR EVOLUTION MX-P',
                content: `Right after its introduction the rubber MX-P was among the classical attacking rubbers.

Thanks to the perfect adjustment of the pimple geometry we managed to produce a rubber that confers more energy with all attacking balls, hence it is perfectly adapted to any player's game.

You can feel the prolonged ball/bat contact time of the MX-P, which for a rubber with hard sponge confers more sensation. EVOLUTION MX-P chosen by most topspin players willing to feel the necessary pressure of their strokes at the table and at half distance.`
            },
            'Tibhar FX-P': {
                title: 'TIBHAR EVOLUTION FX-P',
                content: `FX-P is the most flexible and soft version of the EVOLUTION rubber family. This rubber confers a lot of sensation and control in any playing situation.

FX-P is a high-performing rubber proven by the enormous sound resulting from topspin strokes. The rubber surface is rich in spins and its soft sponge with high catapult effect gives the sufficient power necessary for a variable topspin game.

The player who likes to attack near the table and is not willing to concede any ball while playing a risky game will be delighted by the fine tuning of the rubber surface with the soft sponge of the EVOLUTION FX-P.

Thanks to the perfect adjustment of the pimple geometry we managed to produce a rubber that confers more energy with all attacking balls, hence it is perfectly adapted to any player's game.`
            },
            'Joola Fire': {
                title: 'JOOLA RHYZEN FIRE',
                content: `Add a flame to your game with this latest generation offensive rubber.

Geared for an intricate balance of power and spin, the JOOLA Rhyzen FIRE combines a medium sponge and offers a high ball trajectory for heavy topspin and power looping.

The Sweetzone technology ensures a consistent ball bounce, feeling and exceptional control for your offensive strokes – as well as deftness of touch for subtle plays in serve and return.

It's time to turn up the heat on your opponents with the JOOLA Rhyzen Fire! ☯☯`
            },
            'Joola Ice': {
                title: 'JOOLA RHYZEN ICE',
                content: `A variable all-round rubber for absolute coolness at the table JOOLA RHYZEN ICE has a coarse-pored 40° MOMENTUM sponge for excellent control and ball feel.

The ENHANCED TRACTION top rubber impresses with a strong grip and pronounced spin generation. The innovative SWEETZONE technology ensures a consistent ball bounce, which increases the consistency and safety of your shots.

Key facts: Optimal balance: Balance between speed and control High flight curve: The spin-oriented pimple structure creates a high flight curve that dramatically increases your hit rate and gives you security.

Sweetzone technology: Increases the optimal hitting area on the surface and ensures a forgiving bounce Catapult effect: The coarse-pored MOMENTUM sponge allows the ball to sink deep at impact and then accelerate strongly. The JOOLA RHYZEN ICE is perfect for variable all-round play.

The particularly soft sponge has sufficient energy reserves to support you with attacking shots h passive shots and short-short play, the surface is generally very calm and controlled, so that returns and blocks can be played with particular precision. This ensures enormous security in the shots and dramatically increases the enjoyment of the game.

Ice cold - always keep a cool head with RHYZEN ICE.‍`
            },
            'Joola Zack': {
                title: 'JOOLA ZACK',
                content: `With the ZACK rubber, JOOLA is launching a classic rubber from German production that is specifically designed for all players who want to do without extreme catapult and extreme speed.

It is therefore a high-quality all-round rubber that impresses with good control, placement accuracy and rotation tolerance. Outstanding durability and an extremely good price-performance ratio make the JOOLA ZACK a rubber that lovers of classic rubbers. Produced with the latest German technology, you should not miss out on.

Why you'll love it: The JOOLA ZACK table tennis rubber is the perfect choice for all-round players looking for a rubber that offers control and versatility. With its outstanding durability and production in Germany, it offers excellent value for money.

Enjoy precise ball placement, reliable control and consistent performance in every game. Experience the perfect balance between control and versatility with the JOOLA ZACK - your ideal all-round rubber for every match!`
            },
            'Friendship 729': {
                title: 'FRIENDSHIP 729',
                content: `The 729 is a medium 43°sponge, controllable, chinese spinny rubber. Its spin generation is great if you brush the ball correctly and your technique is sound.

As the rubber is sticky instead of grippy, it's very easy to ignore incoming spin and put your own on the ball. However, it's not a quick rubber and it also doesn't generate "easy spin". This rubber forces you to perfect your techniques, play actively and think about tactics to use it effectively.

This rubber is perfect for learning the sport and developing a spin-oriented style, whether it might be defensive, all-round, or offensive attack.

Perfect For: Beginners and intermediates looking to develop their skills.`
            }
            // ADD MORE RUBBER DESCRIPTIONS HERE
        };

        // BAT DESCRIPTIONS - Add new bat descriptions here
        const batDescriptions = {
            'Tibhar Carbon Attack': {
                title: 'TIBHAR CARBON ATTACK',
                content: `Tibhar Rapid Carbon light blade, fitted with Joola Rhyzen Fire and Ice, red and black rubbers. The blade combines the lightness and extraordinary playing sensation of Balsa heart veneers with the power and precision of high-tech carbon fibres.

It is a lightweight blade enabling a good control, even at high speed. Its strengths are fast and powerful strokes close to the table and at half distance away from the table.

Due to the lightweight (75grams) and the two carbon layers, players have the necessary decisiveness close or away from the table to play a brilliant offensive game.

What sets the 'Tibhar Carbon Attack' apart from other similar priced bats? Each bat has its rubbers glued and cut in house with edging tape applied to protect the rubbers and blade from accidental damage. When the rubbers wear out simply replace with new ones – this is not possible with most factory made bats.

The Tibhar Carbon Attack is an advanced bat with very good spin, speed and control.`
            },
            'Chila Spin Attack': {
                title: 'TIBHAR CHILA SPIN ATTACK',
                content: `Tibhar Chila blade, fitted with Joola Zack 'Max' red and black rubbers.

A quality blade used by the former European champion Patrick Chila.

What sets the 'Chila Spin Attack' apart from other similar priced bats? Each bat has its rubbers glued and cut in house with edging tape applied to protect the rubbers and blade from accidental damage.

When the rubbers wear out simply replace with new ones – this is not possible with most factory made bats.

The Chila Spin attack is an advanced bat with very good spin and also control when needed.`
            },
            'Bribar Winning Loop': {
                title: 'BRIBAR WINNING LOOP',
                content: `All-round Tibhar blade, fitted with Friendship 729 rubber, the rubber has medium speed, but high levels of control and spin.

What sets the Winning Loop apart from other similar priced bats? Each bat has its rubbers glued and cut in house with edging tape applied to protect the rubbers and blade from accidental damage.

When the rubbers wear out simply replace with new ones – this is not possible with most factory made bats.

Bribar have selected a great blade and rubber combination that is used time and again by clubs and coaches to teach the game.

The price – saving over £30.00 on the separate items.

Available with flared handle.`
            },
            'Yinhe Sunray': {
                title: 'BRIBAR YINHE SUNRAY BAT AND CASE',
                content: `Excellent value-for-money bat for a new player learning the basics of the sport.

All-round blade fitted with spiny, tacky 2.0mm Yinhe rubbers.

The bat offers excellent control and spin capabilities, play loaded chops and feel confident when blocking or attacking.

Good control, good spin, not too fast.

Available with flared handle.`
            }
            // ADD MORE BAT DESCRIPTIONS HERE
        };

        // BLADE DESCRIPTIONS - Add new blade descriptions here
        const bladeDescriptions = {
            'Tibhar Felix Lebrun Hyper Inner Carbon Table Tennis Blade': {
                title: 'TIBHAR FELIX LEBRUN HYPER INNER CARBON',
                content: `The blade Felix Lebrun Hyper Carbon is as extraordinary as its homonym. Developed with the experts from TIBHAR according to the wishes of the young penholder player from France.

The blended fabric of layers of synthetic carbon fibres placed directly around the core veneer provides the high stiffness that a fast-attacking blade requires. This positioning, however, results in a longer and more sensitive contact with the ball, in contrast to the outer layers of fabric.

This blade is perfectly adapted to players who privilege a fast and attacking game. The blade is ideal for a powerful attacking driving and looping game allowing you to both dominate and counter attack your opponent with total confidence and freedom.

Perfect for advanced players seeking maximum power and precision in their offensive game.`
            },
            'Tibhar Rapid Carbon Light': {
                title: 'TIBHAR RAPID CARBON LIGHT',
                content: `The blade combines the lightness and extraordinary playing sensation of Balsa heart veneers with the power and precision of high-tech carbon fibres.

It is a lightweight blade enabling a good control, even at high speed. Its strengths are fast and powerful strokes close to the table and at half distance away from the table.

Due to the lightweight (75grams) and the two carbon layers, players have the necessary decisiveness close or away from the table to play a brilliant offensive game.

The perfect balance of speed, control, and lightweight design makes this blade ideal for aggressive players who demand both power and precision.`
            },
            'Tibhar Chila Offensive': {
                title: 'TIBHAR CHILA OFFENSIVE',
                content: `The Tibhar Chila Offense is one of our most popular selling blade. Now offered to you at an unbelievable price.

Extra light and offensive in pace the Chila Offense is used by the former European Champion, Patrick Chila. A real lightweight in terms of grams (75g) but a true heavyweight in performance.

The balsa core and high speed wood plys are bonded using a special gluing process which create a speedy weapon with good feeling.

You won't have to compromise on speed or on ball feeling with the Tibhar Chila Offensive! Perfect for players seeking professional-level performance at an exceptional value.`
            },
            'Impact Precise Light': {
                title: 'IMPACT PRECISE LIGHT',
                content: `There has been a move towards light blades and the Precise Light is part of the IMPACT PRO range of blades.

A superb allround attacking blade, very light in weight, with excellent feeling and most importantly optimum balance.

'A really good option for a player who has progressed and wants to upgrade from a pre-made bat, to a custom set-up with a higher quality blade, but still wants to maintain high levels of control.'

The Precise Light offers the perfect stepping stone for developing players who want to enhance their game without sacrificing the control they need to continue improving.`
            },
            'Impact Pure Allround': {
                title: 'IMPACT PURE ALLROUND',
                content: `The Pure Allround forms part of the IMPACT PURE range, combining top quality materials with great styling.

Impact deliberately went for a heavier than normal blade to increase stability and control. Thanks to the perfect balance the blade doesn't feel weighty. The limba outer veneers ensure optimum feel.

'A really good option for a player who has progressed beyond the beginner stage and wants to upgrade from a pre-made bat, to a custom set-up with a higher quality blade, but still wants to maintain high levels of control.'

Ideal for players who value consistency and control while still having the capability for attacking shots when opportunities arise.`
            }
        };

        // ACCESSORY DESCRIPTIONS - Add new accessory descriptions here
        const accessoryDescriptions = {
            // ADD ACCESSORY DESCRIPTIONS HERE
            // 'Accessory Name': { title: 'DISPLAY TITLE', content: 'Description...' }
        };

        // Select appropriate description based on product type
        let descriptions;
        switch(this.productType) {
            case 'bat': descriptions = batDescriptions; break;
            case 'blade': descriptions = bladeDescriptions; break;
            case 'accessory': descriptions = accessoryDescriptions; break;
            default: descriptions = rubberDescriptions; break;
        }
        
        return descriptions[productName] || {
            title: productName.toUpperCase(),
            content: 'High-quality table tennis equipment designed for competitive play. Contact us for detailed specifications and recommendations.'
        };
    }

    /**
     * ========================================
     * PRODUCT SPECIFICATIONS SECTION
     * ========================================
     * TO ADD NEW PRODUCTS: Add entries to the appropriate product type section
     * Each product type has different spec fields
     */
    getProductSpecs(productName) {
        // RUBBER SPECS - Speed, Spin, Control, Strategy, Hardness
        const rubberSpecs = {
            'Tibhar K3 Pro': {
                speed: '125', spin: '130', control: '90', strategy: 'OFF+', hardness: '55°'
            },
            'Tibhar K3': {
                speed: '118', spin: '130', control: '100', strategy: 'OFF+', hardness: '53°'
            },
            'Tibhar MX-P': {
                speed: '125', spin: '120', control: '80', strategy: 'OFF+', hardness: '47°'
            },
            'Tibhar FX-P': {
                speed: '115', spin: '120', control: '90', strategy: 'OFF', hardness: '41°'
            },
            'Joola Fire': {
                speed: '98', spin: '116', control: '80', strategy: 'OFF', hardness: '45°'
            },
            'Joola Ice': {
                speed: '92', spin: '115', control: '88', strategy: 'OFF', hardness: '40°'
            },
            'Joola Zack': {
                speed: '75', spin: '100', control: '103', strategy: 'ALL-ROUND', hardness: '42°'
            },
            'Friendship 729': {
                speed: '50', spin: '102', control: '100', strategy: 'ALL-ROUND', hardness: '43°'
            }
            // ADD MORE RUBBER SPECS HERE
        };

        // BAT SPECS - Rubbers, Strategy, Plys, Handle
        const batSpecs = {
            'Tibhar Carbon Attack': {
                rubbers: 'Joola Rhyzen Fire 2.0mm<br>Joola Rhyzen Ice 2.0mm',
                strategy: 'Offensive',
                plys: '5',
                handle: 'Flare'
            },
            'Chila Spin Attack': {
                rubbers: 'Joola Zack Max red<br>Joola Zack Max black',
                strategy: 'Offensive',
                plys: '5',
                handle: 'Flare'
            },
            'Bribar Winning Loop': {
                rubbers: 'Friendship 2.0mm red<br>Friendship 2.0mm black',
                strategy: 'All-Round +',
                plys: '5',
                handle: 'Flare'
            },
            'Yinhe Sunray': {
                rubbers: 'Yinhe 2.0mm red<br>Yinhe 2.0mm black',
                strategy: 'All-Round',
                plys: '5',
                handle: 'Flare'
            }
            // ADD MORE BAT SPECS HERE
        };

        // BLADE SPECS - Plys, Weight, Speed, Control
        const bladeSpecs = {
            'Tibhar Felix Lebrun Hyper Inner Carbon Table Tennis Blade': { 
                plys: '5+2', weight: '85g', speed: '93', control: '75' 
            },
            'Tibhar Rapid Carbon Light': { 
                plys: '5+2', weight: '75g', speed: '102', control: '66' 
            },
            'Tibhar Chila Offensive': { 
                plys: '5', weight: '75g', speed: '84', control: '75' 
            },
            'Impact Precise Light': { 
                plys: '5', weight: '75-80g', speed: '72', control: '82' 
            },
            'Impact Pure Allround': { 
                plys: '5', weight: '95g', speed: '60', control: '85' 
            }
            // ADD MORE BLADE SPECS HERE
        };

        // ACCESSORY SPECS - Type, Material, Size, etc.
        const accessorySpecs = {
            // ADD ACCESSORY SPECS HERE
            // 'Accessory Name': { type: 'Case', material: 'Nylon', size: 'Standard' }
        };

        // Select appropriate specs based on product type
        let specs;
        switch(this.productType) {
            case 'bat': specs = batSpecs; break;
            case 'blade': specs = bladeSpecs; break;
            case 'accessory': specs = accessorySpecs; break;
            default: specs = rubberSpecs; break;
        }
        
        // Return default specs if product not found
        const defaultSpecs = {
            rubber: { speed: 'N/A', spin: 'N/A', control: 'N/A', strategy: 'N/A', hardness: 'N/A' },
            bat: { rubbers: 'N/A', strategy: 'N/A', plys: 'N/A', handle: 'N/A' },
            blade: { plys: 'N/A', weight: 'N/A', speed: 'N/A', control: 'N/A' },
            accessory: { type: 'N/A', material: 'N/A', size: 'N/A' }
        };

        return specs[productName] || defaultSpecs[this.productType];
    }

    /**
     * ========================================
     * PRODUCT COLORS SECTION
     * ========================================
     * TO ADD NEW PRODUCTS: Add color options for each product
     */
    getProductColors(productName) {
        const colors = {
            // RUBBER COLORS
            'Tibhar K3 Pro': 'Red, Black',
            'Tibhar K3': 'Red, Black',
            'Tibhar MX-P': 'Red, Black',
            'Tibhar FX-P': 'Red, Black',
            'Joola Fire': 'Red, Black',
            'Joola Ice': 'Red, Black, Blue',
            'Joola Zack': 'Red, Black',
            'Friendship 729': 'Red, Black',
            
            // BAT COLORS (usually fixed)
            'Tibhar Carbon Attack': 'Red/Black rubbers',
            'Chila Spin Attack': 'Red/Black rubbers',
            
            // ADD MORE PRODUCT COLORS HERE
        };
        return colors[productName] || 'Red, Black'; // Default for most products
    }

    /**
     * ========================================
     * PRODUCT THICKNESS SECTION
     * ========================================
     * TO ADD NEW PRODUCTS: Add thickness options (mainly for rubbers)
     */
    getProductThickness(productName) {
        const thickness = {
            // RUBBER THICKNESS
            'Tibhar K3 Pro': '2.0mm and Max',
            'Tibhar K3': '2.0mm, Max',
            'Tibhar MX-P': '2.1mm',
            'Tibhar FX-P': '2.0mm',
            'Joola Fire': '2.0mm',
            'Joola Ice': '2.0mm',
            'Joola Zack': 'Max',
            'Friendship 729': '2.0mm',
            
            // BATS (usually N/A)
            'Tibhar Carbon Attack': 'N/A',
            'Chila Spin Attack': 'N/A',
            
            // ADD MORE PRODUCT THICKNESS HERE
        };
        return thickness[productName] || (this.productType === 'rubber' ? '2.0mm and Max' : 'N/A');
    }

    /**
     * ========================================
     * MODAL RENDERING SECTION
     * ========================================
     * Generates different modal layouts based on product type
     */
    getSpecFieldsHTML(specs) {
        let html = '';
        
        switch(this.productType) {
            case 'rubber':
                html = `
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">SPEED:</span>
                        <span class="modal-spec-value">${specs.speed}</span>
                    </div>
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">SPIN:</span>
                        <span class="modal-spec-value">${specs.spin}</span>
                    </div>
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">CONTROL:</span>
                        <span class="modal-spec-value">${specs.control}</span>
                    </div>
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">STRATEGY:</span>
                        <span class="modal-spec-value">${specs.strategy}</span>
                    </div>
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">HARDNESS:</span>
                        <span class="modal-spec-value">${specs.hardness}</span>
                    </div>
                `;
                break;
                
            case 'bat':
                html = `
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">RUBBERS:</span>
                        <span class="modal-spec-value">${specs.rubbers}</span>
                    </div>
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">STRATEGY:</span>
                        <span class="modal-spec-value">${specs.strategy}</span>
                    </div>
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">PLYS:</span>
                        <span class="modal-spec-value">${specs.plys}</span>
                    </div>
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">HANDLE:</span>
                        <span class="modal-spec-value">${specs.handle}</span>
                    </div>
                `;
                break;
                
            case 'blade':
                html = `
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">PLYS:</span>
                        <span class="modal-spec-value">${specs.plys}</span>
                    </div>
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">WEIGHT:</span>
                        <span class="modal-spec-value">${specs.weight}</span>
                    </div>
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">SPEED:</span>
                        <span class="modal-spec-value">${specs.speed}</span>
                    </div>
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">CONTROL:</span>
                        <span class="modal-spec-value">${specs.control}</span>
                    </div>
                `;
                break;
                
            case 'accessory':
                html = `
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">TYPE:</span>
                        <span class="modal-spec-value">${specs.type}</span>
                    </div>
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">MATERIAL:</span>
                        <span class="modal-spec-value">${specs.material}</span>
                    </div>
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">SIZE:</span>
                        <span class="modal-spec-value">${specs.size}</span>
                    </div>
                `;
                break;
        }
        
        return html;
    }

    // Touch and gesture handling
    handleTouchStart(e) {
        this.touchStartY = e.touches[0].clientY;
        this.touchStartX = e.touches[0].clientX;
        this.isDragging = false;
        this.isScrolling = false;
        this.scrollStartTime = Date.now();
        this.initialScrollTop = this.modalElement.scrollTop;
    }

    handleTouchMove(e) {
        if (!this.touchStartY || !this.touchStartX) return;
        
        const touchY = e.touches[0].clientY;
        const touchX = e.touches[0].clientX;
        const diffY = this.touchStartY - touchY;
        const diffX = this.touchStartX - touchX;
        const currentScrollTop = this.modalElement.scrollTop;
        
        // Check if user is actually scrolling the content
        if (Math.abs(currentScrollTop - this.initialScrollTop) > 5) {
            this.isScrolling = true;
        }
        
        // Only process gestures if not actively scrolling
        if (!this.isScrolling) {
            if (Math.abs(diffX) > Math.abs(diffY)) {
                // Horizontal swipe for navigation
                if (Math.abs(diffX) > 80) { // Increased threshold
                    this.isDragging = true;
                    if (diffX > 0) {
                        this.nextProduct();
                    } else {
                        this.previousProduct();
                    }
                    this.touchStartX = null;
                    this.touchStartY = null;
                }
            } else {
                // Vertical swipe to close - much stricter criteria
                const swipeTime = Date.now() - this.scrollStartTime;
                const isAtTop = this.modalElement.scrollTop <= 10;
                const isFastSwipe = swipeTime < 300;
                const isLongSwipe = diffY > 200; // Much higher threshold
                
                // Only close if: at top of modal, fast swipe, and long distance
                if (isAtTop && isFastSwipe && isLongSwipe) {
                    this.close();
                }
            }
        }
    }

    handleTouchEnd(e) {
        // Reset touch state after a delay to allow for scroll momentum
        setTimeout(() => {
            this.touchStartY = null;
            this.touchStartX = null;
            this.isDragging = false;
            this.isScrolling = false;
        }, 100);
    }

    handleKeydown(e) {
        if (!this.isOpen) return;
        
        switch(e.key) {
            case 'Escape':
                this.close();
                break;
            case 'ArrowLeft':
                this.previousProduct();
                break;
            case 'ArrowRight':
                this.nextProduct();
                break;
        }
    }

    // Modal control methods
    open(productIndex = 0) {
        this.currentProductIndex = productIndex;
        this.isOpen = true;
        this.renderProduct();
        this.overlayElement.classList.add('active');
        this.modalElement.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        this.modalElement.focus();
    }

    close() {
        this.isOpen = false;
        this.overlayElement.classList.remove('active');
        this.modalElement.classList.remove('active');
        document.body.style.overflow = '';
        
        // Return focus to the trigger button
        const triggerBtn = document.querySelectorAll('.read-more-btn')[this.currentProductIndex];
        if (triggerBtn) triggerBtn.focus();
    }

    nextProduct() {
        if (this.currentProductIndex < this.products.length - 1) {
            this.currentProductIndex++;
            this.renderProduct();
        }
    }

    previousProduct() {
        if (this.currentProductIndex > 0) {
            this.currentProductIndex--;
            this.renderProduct();
        }
    }

    renderProduct() {
        const product = this.products[this.currentProductIndex];
        if (!product) return;

        const content = this.overlayElement.querySelector('.modal-content');
        const fullDesc = product.fullDescription;
        const specsHTML = this.getSpecFieldsHTML(product.specs);
        
        // Show colors and thickness only for rubbers
        const colorsThicknessHTML = this.productType === 'rubber' ? `
            <div class="modal-product-colors">
                <span class="modal-colors-label">Colours: ${product.colors} | Thickness: ${product.thickness}</span>
            </div>
        ` : '';
        
        content.innerHTML = `
            <img src="${product.image}" alt="${product.imageAlt}" class="modal-product-image">
            
            <h2 id="modal-title" class="modal-product-title">${product.name}</h2>
            
            <div class="modal-product-specs">
                <div class="modal-specs-grid">
                    ${specsHTML}
                </div>
            </div>
            
            <div class="modal-product-price">
                ${product.oldPrice ? 
                    `<span class="modal-price-old">${product.oldPrice}</span> <span class="modal-price-current">${product.currentPrice}</span>` : 
                    product.price
                }
            </div>
            
            ${colorsThicknessHTML}
            
            <div class="modal-product-description">
                <h4>${fullDesc.title}</h4>
                ${fullDesc.content.split('\n\n').map(paragraph => 
                    paragraph.trim() ? `<p>${paragraph.trim()}</p>` : ''
                ).join('')}
            </div>
        `;
    }
}

/**
 * ========================================
 * INITIALIZATION FUNCTION
 * ========================================
 * Call this function from your HTML pages
 * 
 * USAGE EXAMPLES:
 * - Rubber page: initializeModal('rubber')
 * - Bat page: initializeModal('bat')  
 * - Blade page: initializeModal('blade')
 * - Accessory page: initializeModal('accessory')
 */
function initializeModal(productType = 'rubber') {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new UniversalProductModal(productType);
        });
    } else {
        new UniversalProductModal(productType);
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UniversalProductModal, initializeModal };
}
