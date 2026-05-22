/* ================================================================
   Night Portfolio — index.js
   ================================================================ */

/* ── Tab title ── */
const _docTitle = document.title;
window.addEventListener('blur',  () => { document.title = "I'm waiting for you 👀"; });
window.addEventListener('focus', () => { document.title = _docTitle; });


/* ── Hamburger / mobile drawer ── */
const hamburger = document.getElementById('hamburger');
const navDrawer  = document.getElementById('nav-drawer');
if (hamburger && navDrawer) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navDrawer.classList.toggle('open');
    });
    // Close on link click
    navDrawer.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navDrawer.classList.remove('open');
        });
    });
}


/* ── Apply float classes to skill icons ── */
document.querySelectorAll('.imag').forEach((el, i) => {
    el.classList.add(i % 2 === 0 ? 'float-odd' : 'float-even');
});


/* ── Typing effect in hero h4 ── */
const roles   = ['Frontend Developer', 'UI/UX Designer', 'React Developer', 'App Developer'];
const heroH4  = document.querySelector('.titles h4');
if (heroH4) {
    let ri = 0, ci = 0, deleting = false;
    const TYPE   = 75;
    const DELETE = 38;
    const PAUSE  = 1700;

    function type() {
        const word = 'I Am ' + roles[ri];
        if (!deleting) {
            heroH4.textContent = word.slice(0, ++ci);
            if (ci === word.length) { deleting = true; return setTimeout(type, PAUSE); }
        } else {
            heroH4.textContent = word.slice(0, --ci);
            if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
        }
        setTimeout(type, deleting ? DELETE : TYPE);
    }
    // Small delay so page loads first
    setTimeout(type, 800);
}


/* ── ScrollReveal ── */
const srScript = document.createElement('script');
srScript.src = 'scrollreveal.min.js';
srScript.onload = () => {
    const sr = ScrollReveal({
        origin: 'bottom', distance: '20px',
        duration: 650, delay: 100, reset: false,
        easing: 'cubic-bezier(0.4,0,0.2,1)',
    });
    sr.reveal('.text-part1',       { delay: 120, origin: 'left'   });
    sr.reveal('.paragraph',        { delay: 180 });
    sr.reveal('.buttons',          { delay: 240 });
    sr.reveal('.image',            { delay: 150, origin: 'right'  });
    sr.reveal('.about-image-wrap', { delay: 130, origin: 'left'   });
    sr.reveal('.text-about',       { delay: 180, origin: 'right'  });
    sr.reveal('.imag',             { delay: 50,  interval: 38     });
    sr.reveal('.cart',             { delay: 70,  interval: 55     });
    sr.reveal('.contact-section',  { delay: 130, origin: 'bottom' });
};
document.head.appendChild(srScript);


/* ── Intersection Observer: about-cards ── */
const cardObs = new IntersectionObserver(entries => {
    entries.forEach((e, idx) => {
        if (e.isIntersecting) {
            e.target.style.setProperty('--i', e.target.dataset.i || 0);
            e.target.classList.add('in-view');
            cardObs.unobserve(e.target);
        }
    });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal-card').forEach((el, i) => {
    el.dataset.i = i;
    cardObs.observe(el);
});


/* ── Intersection Observer: timeline ── */
const tlObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in-view');
            tlObs.unobserve(e.target);
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal-timeline').forEach(el => tlObs.observe(el));

// Draw timeline line
const timelineEl = document.querySelector('.timeline');
if (timelineEl) {
    new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            timelineEl.classList.add('line-drawn');
        }
    }, { threshold: 0.08 }).observe(timelineEl);
}


/* ── Count-up for stats ── */
function animateCount(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1300;
    const steps    = 60;
    const inc      = target / steps;
    let   val      = 0;
    const timer    = setInterval(() => {
        val += inc;
        if (val >= target) { val = target; clearInterval(timer); }
        el.textContent = Math.floor(val);
    }, duration / steps);
}

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            statsSection.querySelectorAll('.stat-number[data-target]').forEach(animateCount);
        }
    }, { threshold: 0.5 }).observe(statsSection);
}


/* ── Active nav on scroll ── */
const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
const sections = document.querySelectorAll('section[id]');

new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('nav-active'));
            const match = document.querySelector(`.navbar a[href="#${e.target.id}"]`);
            if (match) match.classList.add('nav-active');
        }
    });
}, { threshold: 0.4 }).observe && sections.forEach(s => {
    new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                navLinks.forEach(a => a.classList.remove('nav-active'));
                const match = document.querySelector(`.navbar a[href="#${e.target.id}"]`);
                if (match) match.classList.add('nav-active');
            }
        });
    }, { threshold: 0.4 }).observe(s);
});


/* ── Tab switcher ── */
const tabBtns   = document.querySelectorAll('.tab-btn');
const allPanels = document.querySelectorAll('.project, .project-2, .project-3');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active-tab'));
        btn.classList.add('active-tab');
        const target = btn.dataset.tab;
        allPanels.forEach(p => {
            p.style.display = p.classList.contains(target) ? 'flex' : 'none';
        });
    });
});

// Default: show first panel
allPanels.forEach((p, i) => { p.style.display = i === 0 ? 'flex' : 'none'; });
