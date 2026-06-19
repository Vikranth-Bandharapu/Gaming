/* ==========================================================================
   Stackly Gaming Portal - App Script (Multi-Page & Page-Safe)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS Scroll Animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out-cubic'
        });
    }

    // 2. Sticky Scrolled Navbar Transition
    const navbar = document.querySelector('.tactical-navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        }
    }

    // 3. Password Toggle Visibilities
    document.querySelectorAll('.password-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const input = btn.parentNode.querySelector('input');
            if (!input) return;
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            if (isPassword) {
                btn.innerHTML = `<svg class="eye-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
            } else {
                btn.innerHTML = `<svg class="eye-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
            }
        });
    });

    // 4. Inline Validation Form Helpers
    function showInlineError(inputEl, msg) {
        const parent = inputEl.closest('.form-group') || inputEl.parentNode;
        if (!parent) return;
        let err = parent.querySelector('.form-error-msg');
        if (!err) {
            err = document.createElement('span');
            err.className = 'form-error-msg';
            parent.appendChild(err);
        }
        err.textContent = msg;
        inputEl.style.borderColor = 'var(--accent-red)';
    }

    function clearInlineErrors(form) {
        form.querySelectorAll('.form-error-msg').forEach(el => el.remove());
        form.querySelectorAll('input, select, textarea').forEach(el => {
            el.style.borderColor = '';
        });
    }

    function setupAutoClear(inputEl) {
        if (!inputEl) return;
        if (!inputEl.dataset.hasErrorListener) {
            const clearError = () => {
                inputEl.style.borderColor = '';
                const parent = inputEl.closest('.form-group') || inputEl.parentNode;
                if (parent) {
                    const err = parent.querySelector('.form-error-msg');
                    if (err) err.remove();
                }
            };
            inputEl.addEventListener('input', clearError);
            inputEl.addEventListener('change', clearError);
            inputEl.dataset.hasErrorListener = 'true';
        }
    }

    // 5. Intercept Newsletter subscriptions
    document.querySelectorAll('.footer-sub-form').forEach(form => {
        form.removeAttribute('onsubmit'); // Remove standard onsubmit actions
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            clearInlineErrors(form);
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput) {
                setupAutoClear(emailInput);
                const emailValue = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailValue || !emailRegex.test(emailValue)) {
                    showInlineError(emailInput, 'Enter a valid email signature.');
                    return;
                }
            }
            window.location.href = '404.html';
        });
    });

    // 6. Global click redirection interceptor
    document.addEventListener('click', (e) => {
        const target = e.target.closest('a, button, input[type="submit"]');
        if (!target) return;

        // Exemptions check:
        // 1. Navbar links & Logo
        const isLogo = target.classList.contains('nav-logo') || target.closest('.nav-logo') || target.classList.contains('footer-logo') || target.closest('.footer-logo');
        const isNavbarLink = target.closest('#nav-menu') && target.tagName === 'A';

        // 2. Auth Page submits & links
        const isAuthSubmit = target.closest('#cyber-login-form') || target.closest('#cyber-signup-form');
        const isAuthToggle = target.closest('.login-footer') && target.tagName === 'A';
        const isSubscribeSubmit = target.closest('.footer-sub-form');

        // 3. Password Toggle Button
        const isPasswordBtn = target.classList.contains('password-toggle-btn') || target.closest('.password-toggle-btn');

        // 4. Accessibility HUD Buttons
        const isHudBtn = target.classList.contains('scale-btn') || target.classList.contains('contrast-btn') || target.closest('.scale-btn') || target.closest('.contrast-btn');

        // 5. Ticket Lookup inputs and buttons
        const isTrackerBtn = target.id === 'tracker-submit-btn' || target.id === 'tracker-input' || target.closest('#tracker-results');

        // 6. Chat form buttons/inputs
        const isChatBtn = target.closest('#chat-form') || target.id === 'chat-input' || target.classList.contains('btn-send-chat');

        // 7. Go to Home on 404
        const isGoHome = target.id === 'home-btn' || target.classList.contains('go-home-btn');

        // 8. Mobile hamburger toggle
        const isHamburger = target.classList.contains('mobile-nav-toggle') || target.closest('.mobile-nav-toggle') || target.classList.contains('hamburger') || target.closest('.hamburger');

        // 9. Category filter buttons
        const isFilterBtn = target.classList.contains('filter-btn') || target.closest('.filter-btn');

        // 10. Dashboard specific exemptions
        const isDashTab = target.classList.contains('side-tab') || target.closest('.side-tab');
        const isLogoutBtn = target.id === 'logout-btn' || target.classList.contains('btn-logout');
        const isDashHamburger = target.classList.contains('dash-hamburger') || target.closest('.dash-hamburger');
        const isColorBtn = target.classList.contains('color-btn') || target.closest('.color-btn');
        const isCalibratorCell = target.classList.contains('calibrator-cell') || target.closest('.calibrator-cell');
        const isDashChatSubmit = target.closest('#dash-chat-form') || target.id === 'dash-chat-input';
        const isDashFormSubmit = target.closest('#edit-profile-form') || target.closest('#bracket-register-form') || target.closest('#gear-config-form');

        if (
            isLogo ||
            isNavbarLink ||
            isAuthSubmit ||
            isAuthToggle ||
            isSubscribeSubmit ||
            isPasswordBtn ||
            isHudBtn ||
            isTrackerBtn ||
            isChatBtn ||
            isGoHome ||
            isHamburger ||
            isFilterBtn ||
            isDashTab ||
            isLogoutBtn ||
            isDashHamburger ||
            isColorBtn ||
            isCalibratorCell ||
            isDashChatSubmit ||
            isDashFormSubmit
        ) {
            return; // Allow native action
        }

        // Redirect all other clicks to 404
        e.preventDefault();
        window.location.href = '404.html';
    });

    // 7. Re-export validation functions for other handlers
    window.showInlineError = showInlineError;
    window.clearInlineErrors = clearInlineErrors;
    window.setupAutoClear = setupAutoClear;
    /* ==========================================================================
       1. Preloader Screen & Entrance Transition
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const loaderBar = document.getElementById('loader-bar');
    const loaderPct = document.getElementById('loader-pct');
    const loaderConsole = document.getElementById('loader-console');
    if (preloader) {
        // Preloader Console Message Feed
        const consoleMessages = [
            "> ACCESSING SECURE NEURAL LINK...",
            "> SYNCING OPERATIONAL HUD...",
            "> DECRYPTING GRID PROTOCOLS...",
            "> CONNECTING SECURE GATEWAY...",
            "> STACKLY NEURAL SYSTEM ALIGNED."
        ];
        let pct = 0;
        const loadDuration = 2400; // Runs for 2.4s + 0.6s exit transition = exactly 3 seconds total
        const tickInterval = 30; // Milliseconds per progress update
        const totalTicks = loadDuration / tickInterval;
        const pctStep = 100 / totalTicks;
        const loaderInterval = setInterval(() => {
            pct += pctStep;
            if (pct >= 100) {
                pct = 100;
                clearInterval(loaderInterval);
                
                // Initiate camera zoom exit scale transition
                setTimeout(() => {
                    preloader.style.display = 'none';
                    if (mainContent) {
                        mainContent.classList.remove('hidden');
                        // Force a small reflow, then apply revealed class for fade transition
                        void mainContent.offsetWidth;
                        mainContent.classList.add('revealed');
                    }
                }, 600); // Wait for zoom-out keyframe to execute
            }
            
            const roundedPct = Math.floor(pct);
            if (loaderBar) loaderBar.style.width = `${roundedPct}%`;
            if (loaderPct) loaderPct.textContent = `${roundedPct.toString().padStart(2, '0')}%`;
            // Update console lines based on load status
            if (loaderConsole) {
                if (roundedPct < 25) {
                    loaderConsole.textContent = consoleMessages[0];
                } else if (roundedPct < 50) {
                    loaderConsole.textContent = consoleMessages[1];
                } else if (roundedPct < 75) {
                    loaderConsole.textContent = consoleMessages[2];
                } else if (roundedPct < 90) {
                    loaderConsole.textContent = consoleMessages[3];
                } else {
                    loaderConsole.textContent = consoleMessages[4];
                }
            }
        }, tickInterval);
    } else {
        // If no preloader (subpages), immediately reveal main content
        if (mainContent) {
            mainContent.classList.remove('hidden');
            mainContent.classList.add('revealed');
        }
    }
    /* ==========================================================================
       2. Accessibility HUD Scaling & Theme Controls (Footer)
       ========================================================================== */
    const body = document.body;
    const hudContrastToggle = document.getElementById('hud-contrast-toggle');
    const hudScaleDown = document.getElementById('hud-scale-down');
    const hudScaleReset = document.getElementById('hud-scale-reset');
    const hudScaleUp = document.getElementById('hud-scale-up');
    const htmlEl = document.documentElement;
    let fontSizePct = 100;
    // Contrast Toggle
    if (hudContrastToggle) {
        hudContrastToggle.addEventListener('click', () => {
            if (body.classList.contains('cyber-contrast-theme')) {
                body.classList.remove('cyber-contrast-theme');
                body.classList.add('cyber-dark-theme');
            } else {
                body.classList.remove('cyber-dark-theme');
                body.classList.remove('cyber-light-theme');
                body.classList.add('cyber-contrast-theme');
            }
        });
    }
    // Font Sizing
    if (hudScaleDown) {
        hudScaleDown.addEventListener('click', () => {
            if (fontSizePct > 80) {
                fontSizePct -= 10;
                htmlEl.style.fontSize = `${fontSizePct}%`;
            }
        });
    }
    if (hudScaleReset) {
        hudScaleReset.addEventListener('click', () => {
            fontSizePct = 100;
            htmlEl.style.fontSize = '100%';
        });
    }
    if (hudScaleUp) {
        hudScaleUp.addEventListener('click', () => {
            if (fontSizePct < 130) {
                fontSizePct += 10;
                htmlEl.style.fontSize = `${fontSizePct}%`;
            }
        });
    }
    /* ==========================================================================
       3. Mobile Navigation Menu Toggle
       ========================================================================== */
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
        // Close menu on nav-link clicks
        navMenu.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            });
        });
    }
    /* ==========================================================================
       4. Esports Leaderboard Generation & Filtering
       ========================================================================== */
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const playerSearchInput = document.getElementById('player-search');
    const leaderboardData = [
        { rank: 1, codename: 'SHADOW_REAPER', rating: '2,940 LP', isLive: true, avatar: '🔴' },
        { rank: 2, codename: 'CYBER_PAWN', rating: '2,812 LP', isLive: false, avatar: '🔵' },
        { rank: 3, codename: 'ALPHA_PILOT', rating: '2,740 LP', isLive: false, avatar: '🟢' },
        { rank: 4, codename: 'VECTOR_X', rating: '2,655 LP', isLive: true, avatar: '🟡' },
        { rank: 5, codename: 'PHOENIX_GRID', rating: '2,590 LP', isLive: false, avatar: '🟣' }
    ];
    function renderLeaderboard(data) {
        if (!leaderboardContainer) return;
        leaderboardContainer.innerHTML = '';
        if (data.length === 0) {
            leaderboardContainer.innerHTML = '<div class="leader-item" style="color:var(--text-muted)">No tactical agents matching signature.</div>';
            return;
        }
        data.forEach(player => {
            const div = document.createElement('div');
            div.className = 'leader-item';
            
            const liveBadge = player.isLive ? '<span class="leader-badge-live">LIVE</span>' : '';
            const topRankClass = player.rank === 1 ? 'top-rank' : '';
            div.innerHTML = `
                <div class="leader-meta">
                    <span class="leader-rank ${topRankClass}">${player.rank.toString().padStart(2, '0')}</span>
                    <span class="leader-avatar">${player.avatar}</span>
                    <span class="leader-codename">${player.codename}</span>
                    ${liveBadge}
                </div>
                <span class="leader-rating">${player.rating}</span>
            `;
            leaderboardContainer.appendChild(div);
        });
    }
    if (leaderboardContainer) {
        renderLeaderboard(leaderboardData);
    }
    if (playerSearchInput) {
        playerSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toUpperCase().trim();
            const filtered = leaderboardData.filter(player => 
                player.codename.includes(query)
            );
            renderLeaderboard(filtered);
        });
    }
    /* ==========================================================================
       5. Esport Tournament Championship Countdown Timer
       ========================================================================== */
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    if (daysEl && hoursEl && minutesEl && secondsEl) {
        // End target: 2 Days 14 Hours 45 Minutes 18 Seconds from current local time
        let totalSeconds = (2 * 24 * 3600) + (14 * 3600) + (45 * 60) + 18;
        const timerInterval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }
            totalSeconds--;
            const d = Math.floor(totalSeconds / (3600 * 24));
            const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = totalSeconds % 60;
            daysEl.textContent = d.toString().padStart(2, '0');
            hoursEl.textContent = h.toString().padStart(2, '0');
            minutesEl.textContent = m.toString().padStart(2, '0');
            secondsEl.textContent = s.toString().padStart(2, '0');
        }, 1000);
    }
    /* ==========================================================================
       6. Interactive 3D Card Tilt Coordinate Calculation
       ========================================================================== */
    const cards = document.querySelectorAll('.game-card, .team-card');
    if (cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                
                // Calculate cursor relative coordinates
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                // Normalize coordinates between -1 and 1
                const normalizedX = (x / rect.width) * 2 - 1;
                const normalizedY = (y / rect.height) * 2 - 1;
                // Maximum rotation angle in degrees
                const maxRotation = 8;
                const rotateX = (-normalizedY * maxRotation).toFixed(2);
                const rotateY = (normalizedX * maxRotation).toFixed(2);
                // Apply rotation transform matrix
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                // Reset transforms smoothly
                card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }
    /* ==========================================================================
       7. Games & Blog Catalog Category Filters
       ========================================================================== */
    const gamesFilterBtn = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card, .news-card');
    if (gamesFilterBtn.length > 0 && gameCards.length > 0) {
        gamesFilterBtn.forEach(button => {
            button.addEventListener('click', () => {
                // Swap active button state
                gamesFilterBtn.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const selectedZone = button.getAttribute('data-filter');
                gameCards.forEach(card => {
                    const cardZone = card.getAttribute('data-category');
                    
                    if (selectedZone === 'all' || cardZone === selectedZone) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    /* ==========================================================================
       8. Simulated Live Telemetry Diagnostics (IoT Dashboard)
       ========================================================================== */
    const telemetryCountdownEl = document.getElementById('telemetry-countdown');
    const tPing = document.getElementById('tel-ping');
    const tPingBar = document.getElementById('tel-ping-bar');
    const tTicks = document.getElementById('tel-ticks');
    const tTicksBar = document.getElementById('tel-ticks-bar');
    const tCpu = document.getElementById('tel-cpu');
    const tCpuBar = document.getElementById('tel-cpu-bar');
    const tPlayers = document.getElementById('tel-players');
    const tPlayersBar = document.getElementById('tel-players-bar');
    const tFps = document.getElementById('tel-fps');
    const tFpsBar = document.getElementById('tel-fps-bar');
    const tTemp = document.getElementById('tel-temp');
    const tTempBar = document.getElementById('tel-temp-bar');
    if (telemetryCountdownEl) {
        let cycleTime = 2;
        let telData = {
            ping: 12,
            ticks: 128.0,
            cpu: 42.5,
            players: 14832,
            fps: 144.2,
            temp: 62.8
        };
        function cycleTelemetryUI() {
            // Fluctuate Ping
            telData.ping += Math.floor(Math.random() * 3) - 1;
            telData.ping = Math.max(9, Math.min(22, telData.ping));
            if (tPing) tPing.textContent = telData.ping;
            if (tPingBar) tPingBar.style.width = `${telData.ping * 4}%`;
            // Fluctuate CPU
            telData.cpu += (Math.random() * 4 - 2);
            telData.cpu = Math.max(30.0, Math.min(75.0, telData.cpu));
            if (tCpu) tCpu.textContent = telData.cpu.toFixed(1);
            if (tCpuBar) tCpuBar.style.width = `${telData.cpu}%`;
            // Fluctuate Temp
            telData.temp += (Math.random() * 1.5 - 0.75);
            telData.temp = Math.max(58.0, Math.min(78.0, telData.temp));
            if (tTemp) tTemp.textContent = telData.temp.toFixed(1);
            if (tTempBar) tTempBar.style.width = `${(telData.temp / 90) * 100}%`;
            // Fluctuate FPS
            telData.fps += (Math.random() * 2 - 1);
            telData.fps = Math.max(138.0, Math.min(148.0, telData.fps));
            if (tFps) tFps.textContent = telData.fps.toFixed(1);
            if (tFpsBar) tFpsBar.style.width = `${(telData.fps / 150) * 100}%`;
            // Fluctuate Players
            telData.players += Math.floor(Math.random() * 21) - 10;
            telData.players = Math.max(14500, Math.min(15500, telData.players));
            if (tPlayers) tPlayers.textContent = telData.players.toLocaleString();
            if (tPlayersBar) tPlayersBar.style.width = `${(telData.players / 20000) * 100}%`;
            // Occasionally drop tickrate
            if (tTicks && tTicksBar) {
                if (Math.random() > 0.85) {
                    tTicks.textContent = '127.9';
                    tTicksBar.style.width = '99%';
                } else {
                    tTicks.textContent = '128.0';
                    tTicksBar.style.width = '100%';
                }
            }
        }
        setInterval(() => {
            cycleTime--;
            if (cycleTime < 0) {
                cycleTelemetryUI();
                cycleTime = 2;
            }
            telemetryCountdownEl.textContent = cycleTime;
        }, 1000);
    }
    /* ==========================================================================
       9. Store Peripherals Cart Queues
       ========================================================================== */
    const storeAddBtns = document.querySelectorAll('.btn-add-cart');
    const cartCountBadge = document.getElementById('cart-count');
    let cartTotalItems = 0;
    if (storeAddBtns.length > 0) {
       storeAddBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.href = '404.html';
    });
});
    }
    /* ==========================================================================
       10. Clan Communications Scroller & Chat Transmission
       ========================================================================== */
    const chatScroller = document.getElementById('chat-scroller');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    if (chatScroller) {
        const mockClanMessages = [
            { sender: 'SHADOW_REAPER', msg: 'Apex team is securing Sector 4 nodes right now!', role: 'clan-mod' },
            { sender: 'CYBER_PAWN', msg: 'That EMP blast on the shield generators was perfect.', role: 'clan-member' },
            { sender: 'ALPHA_PILOT', msg: 'Gear store drop codes are about to reset, check HUD.', role: 'clan-member' },
            { sender: 'VECTOR_X', msg: 'Are we hosting the Void Runner custom server tonight?', role: 'clan-member' },
            { sender: 'PHOENIX_GRID', msg: 'My Reflex mouse is calibrated to 32K DPI, input lag is non-existent.', role: 'clan-member' },
            { sender: 'Void_Surfer', msg: 'Chrono team has a massive advantage at the sector gate.', role: 'clan-guest' },
            { sender: 'Echo_Squad', msg: 'Incoming tournament queue is loaded. 2 minutes to lock.', role: 'clan-guest' },
            { sender: 'Neon_Rider', msg: 'Need one more pilot for the space strategy coordinate grid.', role: 'clan-member' }
        ];
        function appendChatMessage(data) {
            const div = document.createElement('div');
            div.className = 'chat-msg';
            div.innerHTML = `
                <span class="chat-sender ${data.role}">${data.sender}:</span>
                <span class="chat-text">${data.msg}</span>
            `;
            chatScroller.appendChild(div);
            chatScroller.scrollTop = chatScroller.scrollHeight;
        }
        // Populates initial mock comments
        for (let i = 0; i < 4; i++) {
            appendChatMessage(mockClanMessages[i]);
        }
        // Push new simulated messages over time
        let chatIndex = 4;
        setInterval(() => {
            if (chatIndex < mockClanMessages.length) {
                appendChatMessage(mockClanMessages[chatIndex]);
                chatIndex++;
            } else {
                chatIndex = 0;
            }
        }, 2800);
        if (chatForm && chatInput) {
            chatForm.removeAttribute('onsubmit');
            chatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (typeof window.clearInlineErrors === 'function') {
                    window.clearInlineErrors(chatForm);
                }
                if (typeof window.setupAutoClear === 'function') {
                    window.setupAutoClear(chatInput);
                }
                const msg = chatInput.value.trim();
                if (!msg) {
                    if (typeof window.showInlineError === 'function') {
                        window.showInlineError(chatInput, 'Message signature required.');
                    }
                    return;
                }
                window.location.href = '404.html';
            });
        }
    }
    /* ==========================================================================
       11. Contact Form Ticket Generation & Lookup
       ========================================================================== */
    const issueForm = document.getElementById('issue-report-form');
    const successAlert = document.getElementById('report-success');
    const generatedTicketIdEl = document.getElementById('generated-ticket-id');
    const copyTicketBtn = document.getElementById('copy-ticket-btn');
    const trackerInput = document.getElementById('tracker-input');
    const trackerSubmitBtn = document.getElementById('tracker-submit-btn');
    const trackerResults = document.getElementById('tracker-results');
    let ticketDatabase = {
        'STK-99812': {
            type: 'Server Latency Spike',
            sector: 'STK-NODE-02 (EU Central)',
            status: 'Resolved',
            workflow: [
                { step: 'Service Request Created', time: 'June 09, 2026 - 10:14 AM', state: 'completed' },
                { step: 'Technician Assigned', time: 'June 10, 2026 - 02:40 PM', state: 'completed' },
                { step: 'Maintenance Completed', time: 'June 11, 2026 - 11:30 AM', state: 'current' }
            ]
        },
        'STK-44512': {
            type: 'Account Recovery',
            sector: 'STK-NODE-03 (Asia Array)',
            status: 'In Progress',
            workflow: [
                { step: 'Service Request Created', time: 'June 12, 2026 - 08:05 AM', state: 'completed' },
                { step: 'Crew Dispatched to Location', time: 'June 13, 2026 - 09:15 AM', state: 'current' },
                { step: 'Resolution Pending', time: 'Estimated: 6 hours', state: 'pending' }
            ]
        }
    };
    if (issueForm) {
        issueForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Clear existing errors
            if (typeof window.clearInlineErrors === 'function') {
                window.clearInlineErrors(issueForm);
            }
            
            const typeSelect = document.getElementById('issue-type');
            const sectorSelect = document.getElementById('issue-sector');
            const descArea = document.getElementById('issue-desc');
            const emailInput = document.getElementById('reporter-email');

            let hasError = false;

            if (typeSelect) {
                if (typeof window.setupAutoClear === 'function') window.setupAutoClear(typeSelect);
                if (!typeSelect.value) {
                    if (typeof window.showInlineError === 'function') window.showInlineError(typeSelect, 'Select a query category.');
                    hasError = true;
                }
            }
            if (sectorSelect) {
                if (typeof window.setupAutoClear === 'function') window.setupAutoClear(sectorSelect);
                if (!sectorSelect.value) {
                    if (typeof window.showInlineError === 'function') window.showInlineError(sectorSelect, 'Select node sector.');
                    hasError = true;
                }
            }
            if (descArea) {
                if (typeof window.setupAutoClear === 'function') window.setupAutoClear(descArea);
                if (!descArea.value.trim()) {
                    if (typeof window.showInlineError === 'function') window.showInlineError(descArea, 'Description cannot be empty.');
                    hasError = true;
                }
            }
            if (emailInput) {
                if (typeof window.setupAutoClear === 'function') window.setupAutoClear(emailInput);
                const emailValue = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailValue || !emailRegex.test(emailValue)) {
                    if (typeof window.showInlineError === 'function') window.showInlineError(emailInput, 'Enter a valid neural email.');
                    hasError = true;
                }
            }

            if (hasError) return;

            // Success redirect to 404
            window.location.href = '404.html';
        });
    }
    if (copyTicketBtn && generatedTicketIdEl) {
        copyTicketBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = generatedTicketIdEl.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                copyTicketBtn.textContent = 'COPIED!';
                setTimeout(() => {
                    copyTicketBtn.textContent = 'COPY';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }
    function executeTrackerLookup() {
        if (!trackerInput || !trackerResults) return;
        const lookupId = trackerInput.value.toUpperCase().trim();
        trackerResults.innerHTML = '';
        if (!lookupId) {
            trackerResults.innerHTML = `<div class="tracker-placeholder-msg" style="color:var(--accent-red)">Please enter a ticket key.</div>`;
            return;
        }
        const ticket = ticketDatabase[lookupId];
        if (ticket) {
            let workflowHTML = '';
            ticket.workflow.forEach(step => {
                let stepClass = 'workflow-step';
                if (step.state === 'completed') stepClass += ' completed';
                if (step.state === 'current') stepClass += ' current';
                workflowHTML += `
                    <div class="${stepClass}">
                        <span>${step.step}</span>
                        <span class="workflow-time">${step.time}</span>
                    </div>
                `;
            });
            trackerResults.innerHTML = `
                <div class="active-ticket-info">
                    <h4 style="font-size:0.95rem; margin-bottom:1rem;">KEY: <code>${lookupId}</code> <span style="color:var(--accent-cyan)">[${ticket.status}]</span></h4>
                    <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:1rem; line-height:1.4;">
                        <strong>Type:</strong> ${ticket.type} <br>
                        <strong>Node:</strong> ${ticket.sector}
                    </p>
                    <div class="ticket-workflow">
                        ${workflowHTML}
                    </div>
                </div>
            `;
        } else {
            trackerResults.innerHTML = `
                <div class="tracker-placeholder-msg" style="color:var(--accent-red)">
                    ⚠️ Ticket key <strong>"${lookupId}"</strong> not found. <br>
                    Try searching: <code>STK-99812</code> or <code>STK-44512</code>.
                </div>
            `;
        }
    }
    if (trackerSubmitBtn) {
        trackerSubmitBtn.addEventListener('click', executeTrackerLookup);
    }
    if (trackerInput) {
        trackerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                executeTrackerLookup();
            }
        });
    }
    // 12. Dashboard Common Controllers (Shifting Tabs, Sidebars, Logout)
    const tabs = document.querySelectorAll('.side-tab[data-target]');
    const panels = document.querySelectorAll('.dash-panel');
    if (tabs.length > 0 && panels.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const targetPanel = document.getElementById(tab.dataset.target);
                if (targetPanel) {
                    panels.forEach(p => p.classList.remove('active'));
                    targetPanel.classList.add('active');
                }
                // Auto collapse sidebar drawer on mobile after clicking tabs
                const dashSidebar = document.getElementById('dash-sidebar');
                const sidebarOverlay = document.getElementById('sidebar-overlay');
                const dashHamburger = document.getElementById('dash-hamburger');
                if (dashSidebar && dashSidebar.classList.contains('active')) {
                    dashSidebar.classList.remove('active');
                    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
                    if (dashHamburger) dashHamburger.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    const dashHamburger = document.getElementById('dash-hamburger');
    const dashSidebar = document.getElementById('dash-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    if (dashHamburger && dashSidebar && sidebarOverlay) {
        dashHamburger.addEventListener('click', () => {
            const isExpanded = dashHamburger.getAttribute('aria-expanded') === 'true';
            dashHamburger.setAttribute('aria-expanded', !isExpanded);
            dashSidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
        });
        sidebarOverlay.addEventListener('click', () => {
            dashHamburger.setAttribute('aria-expanded', 'false');
            dashSidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentAgentEmail');
            window.location.href = 'index.html';
        });
    }

    const userDisplayNameEl = document.getElementById('user-display-name');
    const userDisplayEmailEl = document.getElementById('user-display-email');
    const savedEmail = localStorage.getItem('currentAgentEmail');
    if (savedEmail) {
        if (userDisplayNameEl) {
            const parts = savedEmail.split('@');
            userDisplayNameEl.textContent = parts[0].toUpperCase();
        }
        if (userDisplayEmailEl) {
            userDisplayEmailEl.textContent = savedEmail;
        }
    }

    // 13. Interactive User Calibrator Coordinates Grid
    const matrix = document.getElementById('latency-matrix');
    if (matrix) {
        matrix.innerHTML = '';
        for (let i = 1; i <= 64; i++) {
            const cell = document.createElement('div');
            cell.className = 'calibrator-cell';
            cell.dataset.sector = `SEC-${i.toString().padStart(2, '0')}`;
            cell.addEventListener('click', (e) => {
                e.stopPropagation();
                cell.classList.remove('pulse');
                void cell.offsetWidth;
                cell.classList.add('pulse');

                const sectorLbl = document.getElementById('calibrator-sector-lbl');
                const statusLbl = document.getElementById('calibrator-status-lbl');
                const pingVal = document.getElementById('calibration-ping-val');
                const calibratorTerminal = document.getElementById('calibrator-terminal');

                if (sectorLbl) sectorLbl.textContent = cell.dataset.sector;

                const randomPing = Math.floor(Math.random() * 15) + 5;
                if (pingVal) pingVal.textContent = `${randomPing} ms`;

                if (statusLbl) {
                    if (randomPing > 15) {
                        statusLbl.textContent = 'LAG DETECTED';
                        statusLbl.style.color = 'var(--accent-red)';
                    } else {
                        statusLbl.textContent = 'STABLE';
                        statusLbl.style.color = 'var(--accent-emerald)';
                    }
                }

                if (calibratorTerminal) {
                    const line = document.createElement('div');
                    line.className = 'console-line';
                    line.textContent = `> Diagnostic query on ${cell.dataset.sector} completed in ${randomPing}ms [Status: ${randomPing > 15 ? 'DEVIATED' : 'SYNCED'}]`;
                    calibratorTerminal.appendChild(line);
                    calibratorTerminal.scrollTop = calibratorTerminal.scrollHeight;
                }
            });
            matrix.appendChild(cell);
        }
    }

    // 14. DPI & Polling Rate Sliders (User)
    const dpiSlider = document.getElementById('dpi-slider');
    const pollingSlider = document.getElementById('polling-slider');
    const crosshairSlider = document.getElementById('crosshair-slider');

    if (dpiSlider) {
        dpiSlider.addEventListener('input', () => {
            const dpiVal = document.getElementById('dpi-value');
            if (dpiVal) dpiVal.textContent = `${Number(dpiSlider.value).toLocaleString()} DPI`;
        });
    }
    if (pollingSlider) {
        pollingSlider.addEventListener('input', () => {
            const pollingVal = document.getElementById('polling-value');
            if (pollingVal) pollingVal.textContent = `${pollingSlider.value} Hz`;
        });
    }
    if (crosshairSlider) {
        crosshairSlider.addEventListener('input', () => {
            const crosshairVal = document.getElementById('crosshair-value');
            const dot = document.getElementById('crosshair-preview-dot');
            if (crosshairVal) crosshairVal.textContent = `${crosshairSlider.value} px`;
            if (dot) {
                const val = parseFloat(crosshairSlider.value) * 2;
                dot.style.width = `${val}px`;
                dot.style.height = `${val}px`;
            }
        });
    }

    const colorBtns = document.querySelectorAll('.color-btn');
    if (colorBtns.length > 0) {
        colorBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                colorBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const color = btn.dataset.color;
                const dot = document.getElementById('crosshair-preview-dot');
                if (dot) {
                    dot.style.backgroundColor = `var(--accent-${color})`;
                    dot.style.boxShadow = `0 0 8px var(--accent-${color})`;
                }
            });
        });
    }

    // 15. User Dashboard Clan Chat Scroller
    const dashChatScroller = document.getElementById('dash-chat-scroller');
    const dashChatForm = document.getElementById('dash-chat-form');
    const dashChatInput = document.getElementById('dash-chat-input');
    if (dashChatScroller) {
        const mockClanMessages = [
            { sender: 'SHADOW_REAPER', msg: 'Apex team is securing Sector 4 nodes right now!', role: 'clan-mod' },
            { sender: 'CYBER_PAWN', msg: 'That EMP blast on the shield generators was perfect.', role: 'clan-member' },
            { sender: 'ALPHA_PILOT', msg: 'Gear store drop codes are about to reset, check HUD.', role: 'clan-member' },
            { sender: 'VECTOR_X', msg: 'Are we hosting the Void Runner custom server tonight?', role: 'clan-member' }
        ];
        function appendDashChatMessage(data) {
            const div = document.createElement('div');
            div.className = 'chat-msg';
            div.innerHTML = `
                <span class="chat-sender ${data.role}">${data.sender}:</span>
                <span class="chat-text">${data.msg}</span>
            `;
            dashChatScroller.appendChild(div);
            dashChatScroller.scrollTop = dashChatScroller.scrollHeight;
        }
        mockClanMessages.forEach(appendDashChatMessage);

        if (dashChatForm && dashChatInput) {
            dashChatForm.removeAttribute('onsubmit');
            dashChatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (typeof window.clearInlineErrors === 'function') {
                    window.clearInlineErrors(dashChatForm);
                }
                if (typeof window.setupAutoClear === 'function') {
                    window.setupAutoClear(dashChatInput);
                }
                const msg = dashChatInput.value.trim();
                if (!msg) {
                    if (typeof window.showInlineError === 'function') {
                        window.showInlineError(dashChatInput, 'Message signature required.');
                    }
                    return;
                }
                window.location.href = '404.html';
            });
        }
    }

    // 16. Admin Overclock Controls Console Output
    const adminConsole = document.getElementById('admin-console');
    const ddosToggle = document.getElementById('ddos-toggle');
    const tickrateToggle = document.getElementById('tickrate-toggle');
    const latencyToggle = document.getElementById('latency-toggle');

    function appendAdminLog(text) {
        if (adminConsole) {
            const line = document.createElement('div');
            line.className = 'console-line';
            const time = new Date().toLocaleTimeString();
            line.textContent = `[${time}] > ${text}`;
            adminConsole.appendChild(line);
            adminConsole.scrollTop = adminConsole.scrollHeight;
        }
    }
    if (ddosToggle) {
        ddosToggle.addEventListener('change', () => {
            appendAdminLog(`DDoS Mitigation Shield: ${ddosToggle.checked ? 'ENABLED' : 'DISABLED'}`);
        });
    }
    if (tickrateToggle) {
        tickrateToggle.addEventListener('change', () => {
            appendAdminLog(`Neural Tickrate Overclock: ${tickrateToggle.checked ? 'ACTIVE (256Hz)' : 'INACTIVE (128Hz)'}`);
        });
    }
    if (latencyToggle) {
        latencyToggle.addEventListener('change', () => {
            appendAdminLog(`Low-Latency Edge Sync Routing: ${latencyToggle.checked ? 'ACTIVE' : 'BYPASS'}`);
        });
    }

    /* ==========================================================================
       12. Additional Authentication Validations & Theme Toggle
       ========================================================================== */
    // Admin dashboard theme toggle
    const themeToggleBtn = document.getElementById('hud-theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const body = document.body;
            if (body.classList.contains('cyber-light-theme')) {
                body.classList.remove('cyber-light-theme');
                body.classList.add('cyber-dark-theme');
            } else {
                body.classList.remove('cyber-dark-theme');
                body.classList.add('cyber-light-theme');
            }
        });
    }

    // Login Form Validation and Auto Routing
    const loginForm = document.getElementById('cyber-login-form');
    if (loginForm) {
        loginForm.removeAttribute('onsubmit');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearInlineErrors(loginForm);
            
            const emailInput = document.getElementById('agent-id');
            const roleSelect = document.getElementById('agent-role');
            const passwordInput = document.getElementById('agent-key');
            let hasError = false;
            
            if (!emailInput) return;
            setupAutoClear(emailInput);
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailValue) {
                showInlineError(emailInput, 'Agent email is required.');
                hasError = true;
            } else if (!emailRegex.test(emailValue)) {
                showInlineError(emailInput, 'Invalid email address.');
                hasError = true;
            }
            
            let roleValue = '';
            if (roleSelect) {
                setupAutoClear(roleSelect);
                roleValue = roleSelect.value;
                if (!roleValue) {
                    showInlineError(roleSelect, 'Clearance level selection is required.');
                    hasError = true;
                }
            }
            
            if (passwordInput) {
                setupAutoClear(passwordInput);
                if (!passwordInput.value) {
                    showInlineError(passwordInput, 'Decryption key is required.');
                    hasError = true;
                }
            }
            
            if (hasError) return;
            
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'DECRYPTING KEY...';
                submitBtn.style.color = 'var(--accent-gold)';
            }
            
            localStorage.setItem('currentAgentEmail', emailValue);
            if (roleValue) {
                localStorage.setItem('currentAgentRole', roleValue);
            }
            
            setTimeout(() => {
                if (roleValue === 'Admin') {
                    window.location.href = 'dashboard-admin.html';
                } else if (roleValue === 'Gamer') {
                    window.location.href = 'dashboard-user.html';
                } else {
                    window.location.href = '404.html';
                }
            }, 1500);
        });
    }

    // Signup Form Validation
    const signupForm = document.getElementById('cyber-signup-form');
    if (signupForm) {
        signupForm.removeAttribute('onsubmit');
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearInlineErrors(signupForm);
            
            const fullNameInput = document.getElementById('cadet-fullname');
            const usernameInput = document.getElementById('cadet-username');
            const emailInput = document.getElementById('cadet-email');
            const phoneInput = document.getElementById('cadet-phone');
            const passwordInput = document.getElementById('cadet-key');
            const confirmPasswordInput = document.getElementById('cadet-key-confirm');
            
            let hasError = false;
            
            if (fullNameInput) {
                setupAutoClear(fullNameInput);
                if (!fullNameInput.value.trim()) {
                    showInlineError(fullNameInput, 'Full Name is required.');
                    hasError = true;
                }
            }
            if (usernameInput) {
                setupAutoClear(usernameInput);
                if (!usernameInput.value.trim()) {
                    showInlineError(usernameInput, 'Username is required.');
                    hasError = true;
                }
            }
            if (emailInput) {
                setupAutoClear(emailInput);
                const emailValue = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailValue) {
                    showInlineError(emailInput, 'Email address is required.');
                    hasError = true;
                } else if (!emailRegex.test(emailValue)) {
                    showInlineError(emailInput, 'Invalid email address.');
                    hasError = true;
                }
            }
            if (phoneInput) {
                setupAutoClear(phoneInput);
                const phoneValue = phoneInput.value.trim();
                const phoneRegex = /^\+?[0-9\s\-()]{7,18}$/;
                if (!phoneValue) {
                    showInlineError(phoneInput, 'Phone number is required.');
                    hasError = true;
                } else if (!phoneRegex.test(phoneValue)) {
                    showInlineError(phoneInput, 'Phone number is invalid.');
                    hasError = true;
                }
            }
            if (passwordInput) {
                setupAutoClear(passwordInput);
                if (!passwordInput.value) {
                    showInlineError(passwordInput, 'Password is required.');
                    hasError = true;
                } else if (passwordInput.value.length < 8) {
                    showInlineError(passwordInput, 'Password must contain at least 8 characters.');
                    hasError = true;
                }
            }
            if (confirmPasswordInput) {
                setupAutoClear(confirmPasswordInput);
                if (!confirmPasswordInput.value) {
                    showInlineError(confirmPasswordInput, 'Confirm password is required.');
                    hasError = true;
                } else if (passwordInput && passwordInput.value !== confirmPasswordInput.value) {
                    showInlineError(confirmPasswordInput, 'Passwords do not match.');
                    hasError = true;
                }
            }
            
            if (hasError) return;
            
            const submitBtn = signupForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'TRANSMITTING PROFILE...';
                submitBtn.style.color = 'var(--accent-gold)';
            }
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    // 17. User Dashboard Edit Profile Form Validation
    const editProfileForm = document.getElementById('edit-profile-form');
    if (editProfileForm) {
        editProfileForm.removeAttribute('onsubmit');
        editProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (typeof window.clearInlineErrors === 'function') {
                window.clearInlineErrors(editProfileForm);
            }

            const fullNameInput = document.getElementById('prof-fullname');
            const usernameInput = document.getElementById('prof-codename');
            const emailInput = document.getElementById('prof-email');
            const phoneInput = document.getElementById('prof-phone');

            let hasError = false;

            if (fullNameInput) {
                if (typeof window.setupAutoClear === 'function') window.setupAutoClear(fullNameInput);
                if (!fullNameInput.value.trim()) {
                    if (typeof window.showInlineError === 'function') window.showInlineError(fullNameInput, 'Full Name is required.');
                    hasError = true;
                }
            }
            if (usernameInput) {
                if (typeof window.setupAutoClear === 'function') window.setupAutoClear(usernameInput);
                if (!usernameInput.value.trim()) {
                    if (typeof window.showInlineError === 'function') window.showInlineError(usernameInput, 'Username is required.');
                    hasError = true;
                }
            }
            if (emailInput) {
                if (typeof window.setupAutoClear === 'function') window.setupAutoClear(emailInput);
                const emailValue = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailValue) {
                    if (typeof window.showInlineError === 'function') window.showInlineError(emailInput, 'Email address is required.');
                    hasError = true;
                } else if (!emailRegex.test(emailValue)) {
                    if (typeof window.showInlineError === 'function') window.showInlineError(emailInput, 'Invalid email address.');
                    hasError = true;
                }
            }
            if (phoneInput) {
                if (typeof window.setupAutoClear === 'function') window.setupAutoClear(phoneInput);
                const phoneValue = phoneInput.value.trim();
                const phoneRegex = /^\+?[0-9\s\-()]{7,18}$/;
                if (!phoneValue) {
                    if (typeof window.showInlineError === 'function') window.showInlineError(phoneInput, 'Phone number is required.');
                    hasError = true;
                } else if (!phoneRegex.test(phoneValue)) {
                    if (typeof window.showInlineError === 'function') window.showInlineError(phoneInput, 'Phone number is invalid.');
                    hasError = true;
                }
            }

            if (hasError) return;

            const submitBtn = editProfileForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'SAVING PROTOCOLS...';
                submitBtn.style.color = 'var(--accent-gold)';
            }

            if (emailInput) {
                localStorage.setItem('currentAgentEmail', emailInput.value.trim());
            }

            setTimeout(() => {
                window.location.href = '404.html';
            }, 1000);
        });
    }

    // 18. Admin Dashboard Bracket Register Form Validation
    const bracketRegisterForm = document.getElementById('bracket-register-form');
    if (bracketRegisterForm) {
        bracketRegisterForm.removeAttribute('onsubmit');
        bracketRegisterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (typeof window.clearInlineErrors === 'function') {
                window.clearInlineErrors(bracketRegisterForm);
            }

            const squadNameInput = document.getElementById('squad-name');
            const leaderInput = document.getElementById('squad-division');
            const tierSelect = document.getElementById('squad-tier');

            let hasError = false;

            if (squadNameInput) {
                if (typeof window.setupAutoClear === 'function') window.setupAutoClear(squadNameInput);
                if (!squadNameInput.value.trim()) {
                    if (typeof window.showInlineError === 'function') window.showInlineError(squadNameInput, 'Squad Name Signature is required.');
                    hasError = true;
                }
            }
            if (leaderInput) {
                if (typeof window.setupAutoClear === 'function') window.setupAutoClear(leaderInput);
                if (!leaderInput.value.trim()) {
                    if (typeof window.showInlineError === 'function') window.showInlineError(leaderInput, 'Squad Leader Agent ID is required.');
                    hasError = true;
                }
            }
            if (tierSelect) {
                if (typeof window.setupAutoClear === 'function') window.setupAutoClear(tierSelect);
                if (!tierSelect.value) {
                    if (typeof window.showInlineError === 'function') window.showInlineError(tierSelect, 'Select bracket level.');
                    hasError = true;
                }
            }

            if (hasError) return;

            const submitBtn = bracketRegisterForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'PROPOSING BRACKET SLATE...';
                submitBtn.style.color = 'var(--accent-gold)';
            }

            setTimeout(() => {
                window.location.href = '404.html';
            }, 1000);
        });
    }

    // 19. User Dashboard Gear Config Form Validation
    const gearConfigForm = document.getElementById('gear-config-form');
    if (gearConfigForm) {
        gearConfigForm.removeAttribute('onsubmit');
        gearConfigForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = '404.html';
        });
    }
});