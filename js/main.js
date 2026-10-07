/**
 * ==========================================================================
 * FAA — CREATIVE TECHNOLOGY COLLECTIVE
 * Core JavaScript Engine
 * Brand Identity: F (Felix) • A (Akshat) • A (Akzath)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. GLOBAL STATE & CONFIGURATION
  // --------------------------------------------------------------------------
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // --------------------------------------------------------------------------
  // 2. SMOOTH CURSOR GLOW FOLLOWER
  // --------------------------------------------------------------------------
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow && !isTouchDevice) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const updateCursor = () => {
      // Smooth lerp (linear interpolation)
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursorGlow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(updateCursor);
    };
    requestAnimationFrame(updateCursor);
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  // --------------------------------------------------------------------------
  // 3. BACKGROUND INTERACTIVE PARTICLE CANVAS
  // --------------------------------------------------------------------------
  const bgCanvas = document.getElementById('bg-canvas');
  if (bgCanvas) {
    const ctx = bgCanvas.getContext('2d');
    let width = (bgCanvas.width = window.innerWidth);
    let height = (bgCanvas.height = window.innerHeight);

    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('resize', () => {
      width = bgCanvas.width = window.innerWidth;
      height = bgCanvas.height = window.innerHeight;
      initParticles();
    });

    // Particle pool
    const particleCount = Math.min(Math.floor((width * height) / 16000), 85);
    let particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.6 + 0.8;
        this.baseAlpha = Math.random() * 0.4 + 0.2;
        this.color = Math.random() > 0.5 ? '#8b5cf6' : '#38bdf8';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Gentle mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 1.5;
            this.x -= (dx / dist) * force;
            this.y -= (dy / dist) * force;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.baseAlpha;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    initParticles();

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Connect particles with faint glowing lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineAlpha = (1 - dist / 130) * 0.18;
            ctx.strokeStyle = '#8b5cf6';
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Render individual particles
      for (let p of particles) {
        p.update();
        p.draw();
      }

      requestAnimationFrame(animateParticles);
    }
    requestAnimationFrame(animateParticles);
  }

  // --------------------------------------------------------------------------
  // 4. NAVBAR SCROLL EFFECT & MOBILE MENU
  // --------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links .nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile drawer toggle
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. SCROLLSPY (ACTIVE NAV HIGHLIGHT)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');

  const updateScrollSpy = () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateScrollSpy);

  // --------------------------------------------------------------------------
  // 6. SCROLL REVEAL OBSERVER (BUTTERY 60FPS)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --------------------------------------------------------------------------
  // 7. ANIMATE SKILLS PROFICIENCY BARS ON SCROLL
  // --------------------------------------------------------------------------
  const skillProgressFills = document.querySelectorAll('.skill-progress-fill');
  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const targetWidth = fill.getAttribute('data-level') || '85%';
          fill.style.width = targetWidth;
          observer.unobserve(fill);
        }
      });
    },
    { threshold: 0.25 }
  );

  skillProgressFills.forEach((fill) => skillObserver.observe(fill));

  // --------------------------------------------------------------------------
  // 8. 3D TILT EFFECT ON CARDS (HERO/TEAM/PROJECTS)
  // --------------------------------------------------------------------------
  if (!isTouchDevice) {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 9. PROJECT SHOWCASE FILTERING
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 10. SHOWCASE CREATIVE LAB TABS & EXPERIMENTS
  // --------------------------------------------------------------------------
  const showcaseTabs = document.querySelectorAll('.showcase-tab-btn');
  const showcasePanels = document.querySelectorAll('.showcase-panel');

  showcaseTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      showcaseTabs.forEach((t) => t.classList.remove('active'));
      showcasePanels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanelId = tab.getAttribute('data-target');
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // EXPERIMENT 1: Real-time Neural Synapse Canvas
  const neuralCanvas = document.getElementById('lab-neural-canvas');
  if (neuralCanvas) {
    const nCtx = neuralCanvas.getContext('2d');
    let nWidth = (neuralCanvas.width = neuralCanvas.offsetWidth);
    let nHeight = (neuralCanvas.height = neuralCanvas.offsetHeight);

    window.addEventListener('resize', () => {
      if (neuralCanvas.offsetWidth > 0) {
        nWidth = neuralCanvas.width = neuralCanvas.offsetWidth;
        nHeight = neuralCanvas.height = neuralCanvas.offsetHeight;
      }
    });

    let neuralNodes = [];
    const maxNodes = 36;

    for (let i = 0; i < maxNodes; i++) {
      neuralNodes.push({
        x: Math.random() * nWidth,
        y: Math.random() * nHeight,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        energy: Math.random() * 0.8 + 0.2,
        pulseSpeed: Math.random() * 0.05 + 0.02,
        pulseVal: Math.random() * Math.PI,
      });
    }

    // Add node on click
    neuralCanvas.addEventListener('click', (e) => {
      const rect = neuralCanvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      neuralNodes.push({
        x: clickX,
        y: clickY,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        energy: 1.0,
        pulseSpeed: 0.06,
        pulseVal: 0,
      });

      if (neuralNodes.length > 50) {
        neuralNodes.shift();
      }
    });

    function renderNeuralNetwork() {
      nCtx.fillStyle = '#080a11';
      nCtx.fillRect(0, 0, nWidth, nHeight);

      // Connect nodes
      for (let i = 0; i < neuralNodes.length; i++) {
        for (let j = i + 1; j < neuralNodes.length; j++) {
          const dx = neuralNodes[i].x - neuralNodes[j].x;
          const dy = neuralNodes[i].y - neuralNodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            nCtx.beginPath();
            nCtx.moveTo(neuralNodes[i].x, neuralNodes[i].y);
            nCtx.lineTo(neuralNodes[j].y, neuralNodes[j].y); // deliberate organic mesh
            const alpha = (1 - dist / 120) * 0.35;
            nCtx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            nCtx.lineWidth = 1;
            nCtx.stroke();
          }
        }
      }

      // Draw and update nodes
      for (let node of neuralNodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.pulseVal += node.pulseSpeed;

        if (node.x < 10 || node.x > nWidth - 10) node.vx *= -1;
        if (node.y < 10 || node.y > nHeight - 10) node.vy *= -1;

        const currentRadius = 3 + Math.sin(node.pulseVal) * 2;
        const currentAlpha = 0.5 + Math.sin(node.pulseVal) * 0.4;

        nCtx.beginPath();
        nCtx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        nCtx.fillStyle = `rgba(56, 189, 248, ${currentAlpha})`;
        nCtx.shadowColor = '#38bdf8';
        nCtx.shadowBlur = 10;
        nCtx.fill();
        nCtx.shadowBlur = 0;
      }

      requestAnimationFrame(renderNeuralNetwork);
    }
    requestAnimationFrame(renderNeuralNetwork);
  }

  // EXPERIMENT 2: Audio Frequency Waveform Canvas
  const audioCanvas = document.getElementById('lab-audio-canvas');
  if (audioCanvas) {
    const aCtx = audioCanvas.getContext('2d');
    let aWidth = (audioCanvas.width = audioCanvas.offsetWidth);
    let aHeight = (audioCanvas.height = audioCanvas.offsetHeight);

    window.addEventListener('resize', () => {
      if (audioCanvas.offsetWidth > 0) {
        aWidth = audioCanvas.width = audioCanvas.offsetWidth;
        aHeight = audioCanvas.height = audioCanvas.offsetHeight;
      }
    });

    let wavePhase = 0;
    let waveMultiplier = 1;

    audioCanvas.addEventListener('mousemove', (e) => {
      const rect = audioCanvas.getBoundingClientRect();
      const normY = (e.clientY - rect.top) / rect.height;
      waveMultiplier = 0.5 + normY * 1.5;
    });

    function renderAudioWaves() {
      aCtx.fillStyle = '#080a11';
      aCtx.fillRect(0, 0, aWidth, aHeight);

      const centerY = aHeight / 2;
      const bars = 64;
      const barWidth = aWidth / bars;

      for (let i = 0; i < bars; i++) {
        const x = i * barWidth;
        const angle = wavePhase + i * 0.18;
        const barHeight = Math.abs(Math.sin(angle) * Math.cos(angle * 0.6) * 110 * waveMultiplier) + 10;

        const gradient = aCtx.createLinearGradient(0, centerY - barHeight, 0, centerY + barHeight);
        gradient.addColorStop(0, '#38bdf8');
        gradient.addColorStop(0.5, '#8b5cf6');
        gradient.addColorStop(1, '#d946ef');

        aCtx.fillStyle = gradient;
        aCtx.fillRect(x + 2, centerY - barHeight / 2, barWidth - 4, barHeight);
      }

      wavePhase += 0.05;
      requestAnimationFrame(renderAudioWaves);
    }
    requestAnimationFrame(renderAudioWaves);
  }

  // EXPERIMENT 3: Live Telemetry Stream Console
  const telemetryConsole = document.querySelector('.telemetry-stream-console');
  if (telemetryConsole) {
    const nodes = ['NODE: F-01 (Felix)', 'NODE: A-02 (Akshat)', 'NODE: A-03 (Akzath)', 'CORE: FAA-NET'];
    const logs = [
      'Neural gradient backpropagation complete. Loss: 0.0142',
      'Async pipeline synchronized across cluster. Latency: 1.8ms',
      'Quantum spatial shaders compiled successfully (GLSL 4.6)',
      'Video rendering thread dispatched to GPU unit 0',
      'Data pipeline ingested 14,200 telemetry vectors',
      'Full-stack API gateway health checked: Status 200 OK',
      'Real-time WebSocket handshake authorized',
      'Triad sync protocol verified: Felix [OK] Akshat [OK] Akzath [OK]',
    ];

    setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
      const randomLog = logs[Math.floor(Math.random() * logs.length)];

      const packetEl = document.createElement('div');
      packetEl.className = 'stream-packet';
      packetEl.innerHTML = `
        <span class="packet-time">[${timeStr}]</span>
        <span class="packet-node">${randomNode}</span>
        <span class="packet-msg">${randomLog}</span>
      `;

      telemetryConsole.appendChild(packetEl);
      if (telemetryConsole.children.length > 35) {
        telemetryConsole.removeChild(telemetryConsole.children[0]);
      }
      telemetryConsole.scrollTop = telemetryConsole.scrollHeight;
    }, 1800);
  }

  // --------------------------------------------------------------------------
  // 11. CONTACT FORM HANDLER WITH FEEDBACK TOAST
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('faa-contact-form');
  const toastNotice = document.getElementById('toast-notice');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Temporary loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spinner-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
        </svg>
        <span>Transmitting Signal...</span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();

        // Show toast notification
        if (toastNotice) {
          toastNotice.classList.add('show');
          setTimeout(() => {
            toastNotice.classList.remove('show');
          }, 4500);
        }
      }, 1200);
    });
  }

  // --------------------------------------------------------------------------
  // 12. BACK TO TOP BUTTON
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
});

// Inline keyframe animation for spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);
