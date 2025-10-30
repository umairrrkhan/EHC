// Pizza Historical Figure - Professional JavaScript Architecture

// Application State Management
class PizzaAnalyzer {
    constructor() {
        this.currentPage = 'selection';
        this.selectedToppings = [];
        this.analysisResult = null;
        this.isAnalyzing = false;
        
        this.initializeEventListeners();
        this.initializeNavigation();
    }

    // Historical Personality Database
    personalityDatabase = {
        'pepperoni,cheese': {
            name: 'Julius Caesar',
            title: 'Roman Emperor & Military Strategist',
            explanation: 'Your preference for the classic combination that has dominated pizza culture reflects the mindset of a true leader. Like Caesar, you appreciate power, tradition, and the strategic placement of every element. You understand that greatness often comes from combining the bold with the familiar, creating an experience that commands respect and admiration.'
        },
        'pineapple': {
            name: 'Christopher Columbus',
            title: 'Navigator & Explorer of New Worlds',
            explanation: 'You are fundamentally drawn to the controversial and the revolutionary. Much like Columbus who ventured into uncharted waters despite widespread criticism, you are willing to explore combinations that divide opinions. Your willingness to challenge established norms demonstrates the same courageous spirit that discovered new continents.'
        },
        'pineapple,ham': {
            name: 'Marco Polo',
            title: 'Venetian Merchant & Explorer',
            explanation: 'You masterfully bridge different worlds, creating harmony between the tropical and the traditional. Like Polo bringing the mysteries of the East to Western consciousness, you introduce unexpected elements that ultimately enrich the established order. Your choices reflect an innate understanding of cultural synthesis.'
        },
        'veggie': {
            name: 'Mahatma Gandhi',
            title: 'Leader of Nonviolent Resistance',
            explanation: 'Your commitment to wholesome, natural choices reflects the philosophy of peaceful living and simplicity. Like Gandhi, you understand that true strength lies in restraint and wisdom rather than excess. Your selections demonstrate an appreciation for the fundamental goodness that nature provides.'
        },
        'anchovies': {
            name: 'Leif Erikson',
            title: 'Norse Explorer & Viking Warrior',
            explanation: 'Bold, fearless, and unquestionably intense - you embrace what others cannot handle. Like the Viking explorers who crossed treacherous oceans, you possess the courage to face challenging experiences that most would avoid. Your taste for the acquired and the powerful sets you apart from the timid.'
        },
        'supreme': {
            name: 'Leonardo da Vinci',
            title: 'Renaissance Master & Polymath',
            explanation: 'Why settle for one specialty when you can embrace all knowledge? Like da Vinci who mastered art, science, engineering, and philosophy simultaneously, you believe in experiencing everything life offers. Your inability to choose reveals a mind that refuses to be limited by conventional boundaries.'
        },
        'cheese': {
            name: 'Benjamin Franklin',
            title: 'Founding Father & Enlightenment Thinker',
            explanation: 'You understand that the foundation of greatness often lies in elegant simplicity. Like Franklin who discovered profound truths through straightforward experimentation, you recognize that adding the perfect layer creates something extraordinary. Your choice reflects the wisdom of focused enhancement.'
        },
        'pepperoni': {
            name: 'Alexander the Great',
            title: 'Macedonian Conqueror',
            explanation: 'Bold, spicy, and undeniably dominant - you make choices that cannot be ignored. Like Alexander who conquered the known world with unmatched ambition, your preference for the strong and decisive reflects a personality that refuses to be contained by moderation.'
        },
        '': {
            name: 'Socrates',
            title: 'Classical Greek Philosopher',
            explanation: 'Your absence of choice reveals the most profound philosophical position. Like Socrates who believed that wisdom begins with acknowledging ignorance, you demonstrate that sometimes the most revealing decision is not to decide at all. You question the fundamental assumptions that others accept without thought.'
        }
    };

    // Initialize Application
    initializeEventListeners() {
        const checkboxes = document.querySelectorAll('input[name="toppings"]');
        const analyzeBtn = document.getElementById('analyze-btn');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleToppingChange(e.target);
            });
        });

        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => {
                this.startAnalysis();
            });
        }

        // Card click functionality
        document.querySelectorAll('.topping-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.type !== 'checkbox') {
                    const checkbox = card.querySelector('input[type="checkbox"]');
                    checkbox.checked = !checkbox.checked;
                    this.handleToppingChange(checkbox);
                }
            });
        });
    }

    initializeNavigation() {
        // Page navigation will be handled by methods
        this.showPage('selection');
    }

    // Handle Topping Selection
    handleToppingChange(checkbox) {
        const topping = checkbox.value;
        const card = checkbox.closest('.topping-card');
        const analyzeBtn = document.getElementById('analyze-btn');

        if (checkbox.checked) {
            if (!this.selectedToppings.includes(topping)) {
                this.selectedToppings.push(topping);
            }
            card.classList.add('selected');
        } else {
            this.selectedToppings = this.selectedToppings.filter(t => t !== topping);
            card.classList.remove('selected');
        }

        // Update button state
        if (this.selectedToppings.length > 0) {
            analyzeBtn.classList.remove('disabled');
            analyzeBtn.disabled = false;
        } else {
            analyzeBtn.classList.add('disabled');
            analyzeBtn.disabled = true;
        }
    }

    // Page Navigation System
    showPage(pageName) {
        const pages = document.querySelectorAll('.page');
        
        pages.forEach(page => {
            page.classList.remove('active');
        });

        const targetPage = document.getElementById(`${pageName}-page`);
        if (targetPage) {
            setTimeout(() => {
                targetPage.classList.add('active');
            }, 100);
        }

        this.currentPage = pageName;
    }

    // Analysis Process
    startAnalysis() {
        if (this.isAnalyzing || this.selectedToppings.length === 0) return;

        this.isAnalyzing = true;
        this.showPage('loading');
        
        // Start loading animation
        this.animateAnalysis();
        
        // Perform analysis after animation
        setTimeout(() => {
            this.performAnalysis();
        }, 3500);
    }

    animateAnalysis() {
        const progressFill = document.getElementById('progress-fill');
        const progressPercentage = document.getElementById('progress-percentage');
        const steps = [
            document.getElementById('step1'),
            document.getElementById('step2'),
            document.getElementById('step3'),
            document.getElementById('step4')
        ];

        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 2;
            progressFill.style.width = `${progress}%`;
            progressPercentage.textContent = `${progress}%`;

            // Activate analysis steps
            if (progress >= 25 && steps[0]) steps[0].classList.add('active');
            if (progress >= 50 && steps[1]) steps[1].classList.add('active');
            if (progress >= 75 && steps[2]) steps[2].classList.add('active');
            if (progress >= 100 && steps[3]) steps[3].classList.add('active');

            if (progress >= 100) {
                clearInterval(progressInterval);
            }
        }, 70);
    }

    performAnalysis() {
        const sortedToppings = [...this.selectedToppings].sort();
        const toppingsKey = sortedToppings.join(',');
        
        // Find personality match
        let result = this.personalityDatabase[toppingsKey];
        
        if (!result) {
            // Check for partial matches
            for (const [key, personality] of Object.entries(this.personalityDatabase)) {
                if (key !== '') {
                    const keyToppings = key.split(',');
                    const hasMatch = keyToppings.some(topping => sortedToppings.includes(topping));
                    if (hasMatch) {
                        result = personality;
                        break;
                    }
                }
            }
        }
        
        // Fallback to default
        if (!result) {
            result = this.personalityDatabase[''];
        }

        this.analysisResult = {
            ...result,
            toppings: sortedToppings
        };

        this.showResults();
    }

    showResults() {
        this.showPage('result');
        
        // Update result page with data
        const resultName = document.getElementById('result-figure-name');
        const resultTitle = document.getElementById('result-figure-title');
        const resultExplanation = document.getElementById('result-explanation');
        const profileToppings = document.getElementById('profile-toppings');

        if (resultName) resultName.textContent = this.analysisResult.name;
        if (resultTitle) resultTitle.textContent = this.analysisResult.title;
        if (resultExplanation) resultExplanation.textContent = this.analysisResult.explanation;

        // Display selected toppings
        if (profileToppings) {
            if (this.analysisResult.toppings.length > 0) {
                const toppingNames = {
                    pepperoni: 'Pepperoni',
                    cheese: 'Extra Cheese',
                    pineapple: 'Pineapple',
                    veggie: 'Vegetable Medley',
                    anchovies: 'Anchovies',
                    supreme: 'The Supreme'
                };

                profileToppings.innerHTML = this.analysisResult.toppings
                    .map(topping => `<span class="topping-badge">${toppingNames[topping] || topping}</span>`)
                    .join('');
            } else {
                profileToppings.innerHTML = '<span class="topping-badge">No toppings selected</span>';
            }
        }

        this.isAnalyzing = false;
    }

    // Reset Application
    reset() {
        this.selectedToppings = [];
        this.analysisResult = null;
        this.isAnalyzing = false;

        // Reset all checkboxes
        document.querySelectorAll('input[name="toppings"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Remove selected classes from cards
        document.querySelectorAll('.topping-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Reset button state
        const analyzeBtn = document.getElementById('analyze-btn');
        if (analyzeBtn) {
            analyzeBtn.classList.add('disabled');
            analyzeBtn.disabled = true;
        }

        // Reset progress if needed
        const progressFill = document.getElementById('progress-fill');
        const progressPercentage = document.getElementById('progress-percentage');
        if (progressFill) progressFill.style.width = '0%';
        if (progressPercentage) progressPercentage.textContent = '0%';

        // Reset analysis steps
        document.querySelectorAll('.analysis-step').forEach(step => {
            step.classList.remove('active');
        });

        this.showPage('selection');
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    const app = new PizzaAnalyzer();
    
    // Make restart function globally available
    window.restartAnalysis = () => {
        app.reset();
    };
});

// Error handling and performance monitoring
window.addEventListener('error', (e) => {
    console.error('Application Error:', e.error);
});

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        console.log('Pizza Historical Figure application ready');
    });
}