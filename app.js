/* ==========================================================================
   Stackly Gaming Portal - App Script (Multi-Page & Page-Safe)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
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
        const loadDuration = 3200; // 3.2 seconds
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
            chatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const msg = chatInput.value.trim();
                if (!msg) return;
                appendChatMessage({
                    sender: '[GUEST] AGENT_YOU',
                    msg: msg,
                    role: 'clan-mod'
                });
                chatInput.value = '';
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
            const type = document.getElementById('issue-type').value;
            const sectorVal = document.getElementById('issue-sector').value;
            const desc = document.getElementById('issue-desc').value;
            // Generate Random Ticket
            const randNum = Math.floor(10000 + Math.random() * 90000);
            const ticketId = `STK-${randNum}`;
            const now = new Date();
            const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
            const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            
            ticketDatabase[ticketId] = {
                type: type,
                sector: sectorVal,
                status: 'Assigned',
                workflow: [
                    { step: 'Service Request Created', time: `${formattedDate} - ${formattedTime}`, state: 'completed' },
                    { step: 'Department Routing', time: 'Assigned to Municipal Support', state: 'current' },
                    { step: 'Technician Dispatched', time: 'Pending Scheduling', state: 'pending' }
                ]
            };
            if (generatedTicketIdEl) generatedTicketIdEl.textContent = ticketId;
            issueForm.reset();
            issueForm.classList.add('hidden');
            if (successAlert) successAlert.classList.remove('hidden');
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
});