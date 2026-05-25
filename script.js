/* ============================================
   JAHANVI STUDIO — JavaScript
   Scroll Animations, Typing Effect, 3D Tilt,
   Navbar, Counter, Form Handling
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  // ===== 2. HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ===== 3. TYPING ANIMATION =====
  const typingElement = document.getElementById('typingText');
  const phrases = [
    'Digitise Your Business,\nAmplify Your Presence.',
    'Premium Websites\nThat Convert.',
    'Your Vision,\nOur Expertise.'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function typeText() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      // Remove characters
      const text = currentPhrase.substring(0, charIndex - 1);
      typingElement.innerHTML = formatTypingText(text);
      charIndex--;
      typingSpeed = 35;
    } else {
      // Add characters
      const text = currentPhrase.substring(0, charIndex + 1);
      typingElement.innerHTML = formatTypingText(text);
      charIndex++;
      typingSpeed = 70;
    }

    // Phrase fully typed
    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2500; // Pause at end
      isDeleting = true;
    }
    // Phrase fully deleted
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before next phrase
    }

    setTimeout(typeText, typingSpeed);
  }

  function formatTypingText(text) {
    // Split by newline, wrap first line normally, second with highlight
    const lines = text.split('\n');
    if (lines.length === 1) {
      return lines[0];
    }
    return lines[0] + '<br><span class="highlight">' + lines[1] + '</span>';
  }

  // Start typing
  typeText();

  // ===== 4. SCROLL REVEAL ANIMATION =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger animation for grid children
        const parent = entry.target.parentElement;
        if (parent && (parent.classList.contains('services-grid') ||
            parent.classList.contains('projects-grid') ||
            parent.classList.contains('process-grid'))) {
          const siblings = Array.from(parent.children);
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.15}s`;
        }
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== 5. 3D TILT EFFECT ON SERVICE CARDS =====
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });

  // ===== 6. COUNTER ANIMATION =====
  const counters = document.querySelectorAll('[data-count]');
  let countersAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-count'));
          const suffix = counter.textContent.includes('+') ? '+' : '';
          let current = 0;
          const increment = target / 60;
          const duration = 2000;
          const stepTime = duration / 60;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.ceil(current) + '+';
              setTimeout(updateCounter, stepTime);
            } else {
              counter.textContent = target + '+';
            }
          };
          updateCounter();
        });
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ===== 7. SMOOTH SCROLL FOR NAV LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = target.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== 8. ACTIVE NAV LINK HIGHLIGHT =====
  const sections = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.querySelectorAll('a:not(.nav-cta)').forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + sectionId) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);

  // ===== 9. FORM HANDLING =====
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const userWhatsapp = document.getElementById('whatsapp').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Premium WhatsApp formatting
    const whatsappText = `Hello Jahanvi Studio,\n\nI would like to discuss a project. Here are my details:\n\n*Name:* ${name}\n*WhatsApp:* ${userWhatsapp}\n*Email:* ${email}\n*Message:* ${message}`;
    const encodedWhatsappText = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://wa.me/919145933905?text=${encodedWhatsappText}`;

    // Premium Email Mailto formatting
    const emailSubject = `Project Inquiry from ${name} (via Portfolio)`;
    const emailBody = `Hello Jahanvi Studio,\n\nI would like to discuss a project. Here are my details:\n\nName: ${name}\nWhatsApp: ${userWhatsapp}\nEmail: ${email}\nMessage:\n${message}`;
    const mailtoUrl = `mailto:jahanvikhatri311@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Animate button success & update status
    submitBtn.innerHTML = '✓ Opening WhatsApp & Email...';
    submitBtn.style.background = 'linear-gradient(135deg, var(--gold), var(--gold-dark))';

    // 1. Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    // 2. Redirect/trigger Mail client after a slight delay
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 800);

    setTimeout(() => {
      submitBtn.innerHTML = 'Send Message <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle;margin-left:8px"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
      submitBtn.style.background = '';
      form.reset();
    }, 4000);
  });

  // ===== 10. PARALLAX EFFECT ON HERO SHAPES =====
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const shapes = document.querySelectorAll('.hero-shape');
    shapes.forEach((shape, i) => {
      const speed = (i + 1) * 0.15;
      shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // ===== 11. IMAGE LOAD HANDLER =====
  const heroImg = document.getElementById('heroBanner');
  if (heroImg) {
    heroImg.addEventListener('error', () => {
      // Fallback gradient if image fails to load
      heroImg.parentElement.style.background = 'linear-gradient(135deg, #2A2A2A, #1A1A1A)';
      heroImg.parentElement.style.minHeight = '400px';
      heroImg.style.display = 'none';
    });
  }

});
