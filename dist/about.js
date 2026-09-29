/* ===================================================
   POWAI / ABOUT — INTERACTIVE MOTION & TELEMETRY
   Cinematic System Animation & Step Transitions
   =================================================== */

function init() {
  initSystemConnectivityMotion();
  initMethodTimeline();
  initSystemMapInteraction();
  initSmoothScroll();
}

/* 01 / System Connectivity Motion (Section 01) */
function initSystemConnectivityMotion() {
  const stage = document.getElementById('system-motion-stage');
  const replayBtn = document.getElementById('replay-system-btn');
  const stateText = document.getElementById('system-state-text');

  if (!stage) return;

  let isActivating = false;

  function activateSystem() {
    if (isActivating) return;
    isActivating = true;

    // Reset state
    stage.classList.remove('stage-active');
    if (stateText) stateText.textContent = 'CONNECTING SIGNALS...';

    // Sequence activation
    setTimeout(() => {
      stage.classList.add('stage-active');
      if (stateText) stateText.textContent = 'CONNECTED GROWTH SYSTEM';
      isActivating = false;
    }, 280);
  }

  // Trigger on scroll via IntersectionObserver
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activateSystem();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    observer.observe(stage);
  } else {
    activateSystem();
  }

  // Manual replay button
  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      activateSystem();
    });
  }
}

/* 02 / Method Timeline Interaction (Section 02) */
function initMethodTimeline() {
  const steps = document.querySelectorAll('.timeline-step');
  const runner = document.getElementById('timeline-runner');
  const track = document.querySelector('.method-timeline-container');

  if (!steps.length) return;

  function setActiveStep(index) {
    steps.forEach((step, i) => {
      if (i === index) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    if (runner && track && window.innerWidth > 1100) {
      const stepWidth = 100 / steps.length;
      const offsetPercent = index * stepWidth + (stepWidth / 2) - 3;
      runner.style.transform = `translateX(${index * 160}%)`;
    }
  }

  steps.forEach((step, index) => {
    step.addEventListener('mouseenter', () => setActiveStep(index));
    step.addEventListener('click', () => setActiveStep(index));
  });
}

/* 03 / System Map Interaction (Section 03) */
function initSystemMapInteraction() {
  const modules = document.querySelectorAll('.capability-module');
  const hub = document.querySelector('.system-map-hub');

  if (!modules.length || !hub) return;

  modules.forEach(mod => {
    mod.addEventListener('mouseenter', () => {
      hub.classList.add('hub-focused');
    });
    mod.addEventListener('mouseleave', () => {
      hub.classList.remove('hub-focused');
    });
  });
}

/* 04 / Smooth Anchor Jump Handling */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          if (history.pushState) {
            history.pushState(null, '', targetId);
          }
        }
      }
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
