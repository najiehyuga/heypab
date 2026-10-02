/**
 * HeyPab Streamer Hub - High-Energy Core Application
 * Engineered under antislop guidelines & DESIGN.md
 * Strictly zero em dashes in this codebase.
 */

(function () {
  'use strict';

  // Application State
  const state = {
    saweriaUrl: 'https://saweria.co/heypablo',
    isLive: true,
    theme: localStorage.getItem('heypab_theme') || 'dark',
    soundEnabled: localStorage.getItem('heypab_sound') !== 'false'
  };

  // Sound Synthesizer (Web Audio API)
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioClass();
    }
    return audioCtx;
  }

  function playUiSound(type) {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.06);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.setValueAtTime(1040, now + 0.08);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
      } else if (type === 'thwip') {
        // High-velocity Spider-Man web shoot sound
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'powerup') {
        // High-energy sci-fi chirp/power-up for logo avatar swap
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(340, now);
        osc.frequency.exponentialRampToValueAtTime(860, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.start(now);
        osc.stop(now + 0.14);
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Toast Notification System
  function showToast(message, type) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');

    toast.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    playUiSound(type === 'success' ? 'success' : 'click');

    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 150);
    }, 2600);
  }

  // Theme Toggle Management
  function applyTheme(themeName) {
    state.theme = themeName;
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('heypab_theme', themeName);

    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      const isDark = themeName === 'dark';
      themeBtn.setAttribute('aria-label', isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap');
      themeBtn.title = isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap';
      themeBtn.innerHTML = isDark
        ? `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    }
  }

  // Sound Management
  function applySoundState(enabled) {
    state.soundEnabled = enabled;
    localStorage.setItem('heypab_sound', enabled ? 'true' : 'false');

    const soundBtn = document.getElementById('soundToggleBtn');
    if (soundBtn) {
      soundBtn.setAttribute('aria-label', enabled ? 'Matikan efek audio' : 'Aktifkan efek audio');
      soundBtn.title = enabled ? 'Audio aktif (klik untuk senyap)' : 'Audio senyap (klik untuk aktifkan)';
      soundBtn.innerHTML = enabled
        ? `<svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`
        : `<svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
    }
  }

  // Live Status Simulation
  function applyLiveState(isLive) {
    state.isLive = isLive;
    const pill = document.getElementById('liveStatusBtn');
    const label = document.getElementById('liveStatusLabel');
    const dot = document.getElementById('avatarDot');

    if (isLive) {
      if (pill) pill.classList.remove('offline');
      if (label) label.textContent = 'LIVE SEKARANG';
      if (dot) dot.classList.remove('offline');
    } else {
      if (pill) pill.classList.add('offline');
      if (label) label.textContent = 'OFFLINE';
      if (dot) dot.classList.add('offline');
    }
  }

  // Copy URL with fallback
  function copyTextToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg, 'success');
      }).catch(() => {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      showToast(successMsg, 'success');
    } catch (e) {
      showToast('Gagal menyalin tautan.', 'click');
    }
    document.body.removeChild(input);
  }

  // Interactive Cyber Particle Canvas
  function initCyberCanvas() {
    const canvas = document.getElementById('cyberCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor((width * height) / 22000), 50);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? 'rgba(0, 242, 254,' : 'rgba(139, 92, 246,'
      });
    }

    const mouse = { x: -1000, y: -1000, radius: 130 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    // Ripple click shockwave effect
    const ripples = [];
    window.addEventListener('click', (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 70,
        opacity: 0.6
      });
    });

    function animate() {
      if (document.hidden) {
        requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Render ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 242, 254, ${rip.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        rip.radius += 2.5;
        rip.opacity -= 0.02;

        if (rip.opacity <= 0 || rip.radius >= rip.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '0.7)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 110) * 0.25;
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          const malpha = (1 - mdist / mouse.radius) * 0.45;
          ctx.strokeStyle = `rgba(0, 242, 254, ${malpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  // ==========================================================================
  // SPIDER-MAN INTERACTIVE OVERLAY CONTROLLER
  // ==========================================================================
  function initSpiderman() {
    const hanger = document.getElementById('spideyHanger');
    const bubble = document.getElementById('spideyBubble');
    const bubbleText = document.getElementById('spideyBubbleText');
    const rope = document.getElementById('webRope');
    if (!hanger || !bubble || !bubbleText || !rope) return;

    const spideyQuotes = [
      'THWIP! Gas ke Saweria HeyPab!',
      'Klik tombol di bawah bro, let\'s go!',
      'Saweria heypablo siap terima alert!',
      'Dengan kekuatan besar, datang saweria besar!',
      'Spidey approved! Yuk ramaikan live stream!'
    ];

    let bubbleTimer = null;
    function triggerSpideySpeech(customQuote) {
      if (bubbleTimer) clearTimeout(bubbleTimer);
      const quote = customQuote || spideyQuotes[Math.floor(Math.random() * spideyQuotes.length)];
      bubbleText.textContent = quote;
      bubble.classList.remove('hidden');

      bubbleTimer = setTimeout(() => {
        bubble.classList.add('hidden');
      }, 3400);
    }

    // Click on Spider-Man
    hanger.addEventListener('click', () => {
      playUiSound('thwip');
      triggerSpideySpeech();

      // Trigger acrobatic flip
      hanger.classList.remove('spidey-flip');
      void hanger.offsetWidth; // Force reflow
      hanger.classList.add('spidey-flip');

      setTimeout(() => {
        hanger.classList.remove('spidey-flip');
      }, 850);
    });

    // Hover effect
    hanger.addEventListener('mouseenter', () => {
      playUiSound('hover');
    });

    // Interactive Drag and Pull Web String
    let isDragging = false;
    let startY = 0;
    const baseRopeHeight = window.innerWidth <= 480 ? 40 : 60;
    let currentRopeHeight = baseRopeHeight;

    hanger.addEventListener('mousedown', (e) => {
      isDragging = true;
      startY = e.clientY;
      hanger.style.animationPlayState = 'paused';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaY = e.clientY - startY;
      if (deltaY > 0 && deltaY < 180) {
        currentRopeHeight = baseRopeHeight + deltaY;
        rope.style.height = `${currentRopeHeight}px`;
      }
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      hanger.style.animationPlayState = 'running';

      // Snap back with elastic bounce
      playUiSound('thwip');
      triggerSpideySpeech('THWIP! Mantul!');
      rope.style.transition = 'height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      rope.style.height = `${baseRopeHeight}px`;

      setTimeout(() => {
        rope.style.transition = 'height 0.1s ease-out';
      }, 400);
    });

    // Keyboard trigger (S)
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.key === 's' || e.key === 'S') {
        playUiSound('thwip');
        triggerSpideySpeech('THWIP! Spidey siap beraksi!');
        hanger.classList.add('spidey-flip');
        setTimeout(() => hanger.classList.remove('spidey-flip'), 850);
      }
    });
  }

  // ==========================================================================
  // INTERACTIVE TRANSPARENT LOGO CONTROLLER (Switch Image & Tactile Effects)
  // ==========================================================================
  function initInteractiveLogo() {
    const logoBtn = document.getElementById('profileLogoBtn');
    const profileImg = document.getElementById('profileImage');
    const auraBurst = document.getElementById('logoAuraBurst');
    const reactionBadge = document.getElementById('logoReactionBadge');
    const reactionText = document.getElementById('logoReactionText');
    if (!logoBtn || !profileImg) return;

    const variants = [
      {
        id: 'main',
        src: profileImg.getAttribute('data-main') || 'assets/profileku.png',
        alt: 'Logo Maskot HeyPab (Gaya Klasik)',
        reaction: 'HEYPAB!',
        toast: 'Gaya avatar diubah ke: HeyPab Klasik'
      },
      {
        id: 'alt',
        src: profileImg.getAttribute('data-alt') || 'assets/profile-alt.png',
        alt: 'Logo Maskot HeyPab (Spider-Gamer Mode)',
        reaction: 'SPIDEY GAMER!',
        toast: 'Gaya avatar diubah ke: Spider-Gamer Mode'
      }
    ];

    // Preload alternate image to guarantee instantaneous swap
    variants.forEach(v => {
      const preload = new Image();
      preload.src = v.src;
    });

    let currentIndex = 0;
    let badgeTimer = null;

    function triggerLogoReaction(text) {
      if (!reactionBadge || !reactionText) return;
      if (badgeTimer) clearTimeout(badgeTimer);

      reactionText.textContent = text;
      reactionBadge.classList.remove('hidden');

      badgeTimer = setTimeout(() => {
        reactionBadge.classList.add('hidden');
      }, 1400);
    }

    function switchLogo() {
      // 1. Tactile sound
      playUiSound('powerup');

      // 2. Interactive pop & tilt animation
      logoBtn.classList.remove('anim-pop');
      void logoBtn.offsetWidth; // Force CSS reflow
      logoBtn.classList.add('anim-pop');

      // 3. Shockwave aura burst
      if (auraBurst) {
        auraBurst.classList.remove('active');
        void auraBurst.offsetWidth;
        auraBurst.classList.add('active');
      }

      // 4. Smooth image swap
      currentIndex = (currentIndex + 1) % variants.length;
      const target = variants[currentIndex];

      profileImg.classList.add('is-swapping');
      setTimeout(() => {
        profileImg.src = target.src;
        profileImg.alt = target.alt;
        profileImg.classList.remove('is-swapping');
      }, 120);

      // 5. Comic reaction bubble
      triggerLogoReaction(target.reaction);

      // 6. User feedback toast
      showToast(target.toast, 'success');
    }

    // Click & hover events
    logoBtn.addEventListener('click', switchLogo);
    logoBtn.addEventListener('mouseenter', () => {
      playUiSound('hover');
    });

    // Global keyboard shortcut (L or V)
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.key === 'l' || e.key === 'L') {
        switchLogo();
      }
    });
  }

  // Initialize Event Listeners
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial State
    applyTheme(state.theme);
    applySoundState(state.soundEnabled);
    applyLiveState(state.isLive);
    initCyberCanvas();
    initSpiderman();
    initInteractiveLogo();

    // 2. Direct Saweria Action Button
    const btnSaweriaMain = document.getElementById('btnSaweriaMain');
    if (btnSaweriaMain) {
      btnSaweriaMain.href = state.saweriaUrl;
      btnSaweriaMain.addEventListener('click', () => {
        playUiSound('success');
      });
      btnSaweriaMain.addEventListener('mouseenter', () => {
        playUiSound('hover');
      });
    }

    // 3. Copy Link Action Button
    const btnCopyLink = document.getElementById('btnCopyLink');
    if (btnCopyLink) {
      btnCopyLink.addEventListener('click', () => {
        copyTextToClipboard(state.saweriaUrl, 'Tautan Saweria (heypablo) berhasil disalin ke clipboard.');
      });
    }

    // 4. Live Status Toggle Button
    const liveStatusBtn = document.getElementById('liveStatusBtn');
    if (liveStatusBtn) {
      liveStatusBtn.addEventListener('click', () => {
        applyLiveState(!state.isLive);
        playUiSound('click');
        showToast(state.isLive ? 'Status siaran diubah ke: LIVE' : 'Status siaran diubah ke: OFFLINE');
      });
    }

    // 5. Sound Toggle Button
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        applySoundState(!state.soundEnabled);
        showToast(state.soundEnabled ? 'Efek audio diaktifkan.' : 'Efek audio dimatikan.');
      });
    }

    // 6. Theme Toggle Button
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        playUiSound('click');
        showToast(`Beralih ke mode ${nextTheme === 'dark' ? 'gelap' : 'terang'}.`);
      });
    }

    // 7. Upcoming Channels (Informative action, zero dead links)
    const channelCards = document.querySelectorAll('.channel-action-card');
    channelCards.forEach(card => {
      card.addEventListener('click', function () {
        const channel = this.getAttribute('data-channel');
        const handle = this.getAttribute('data-handle');
        showToast(`Kanal ${channel} (${handle}) segera dibuka saat jadwal siaran.`);
        playUiSound('click');
      });
      card.addEventListener('mouseenter', () => {
        playUiSound('hover');
      });
    });

    // 8. Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if (e.key === 't' || e.key === 'T') {
        const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        showToast(`Mode tema diubah ke ${nextTheme === 'dark' ? 'Gelap' : 'Terang'}.`);
      } else if (e.key === 'm' || e.key === 'M') {
        applySoundState(!state.soundEnabled);
        showToast(state.soundEnabled ? 'Efek audio aktif.' : 'Efek audio dinonaktifkan.');
      }
    });
  });
})();
