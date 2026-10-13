// ── Typewriter ──
var rolesIT = ['Cloud & DevOps Engineer','Infrastructure Specialist','Automation Engineer','CI/CD Builder'];
var rolesEN = ['Cloud & DevOps Engineer','Infrastructure Specialist','Automation Engineer','CI/CD Builder'];
var roleIndex = 0, charIndex = 0, deleting = false;
var twEl = document.getElementById('typewriter');
function type() {
  var roles = currentLang === 'it' ? rolesIT : rolesEN;
  var cur = roles[roleIndex % roles.length];
  twEl.textContent = deleting ? cur.substring(0, charIndex--) : cur.substring(0, charIndex++);
  if (!deleting && charIndex > cur.length) { deleting = true; setTimeout(type, 1800); return; }
  if (deleting && charIndex < 0) { deleting = false; roleIndex++; }
  setTimeout(type, deleting ? 50 : 90);
}
setTimeout(type, 600);

// ── Scroll up ──
var su = document.getElementById('scrollup');
window.addEventListener('scroll', function() {
  su.classList.toggle('show', window.scrollY > 400);
  document.querySelectorAll('section[id]').forEach(function(sec) {
    var a = document.querySelector('.nav-links a[href="#' + sec.id + '"]');
    if (!a) return;
    var top = sec.offsetTop - 80;
    if (window.scrollY >= top && window.scrollY < top + sec.offsetHeight) a.classList.add('active');
    else a.classList.remove('active');
  });
});

// ── Mobile menu ──
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(function(a) {
  a.addEventListener('click', function() {
    document.getElementById('nav-links').classList.remove('open');
  });
});

// ── Intersection Observer fade-up ──
var obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(function(el) { obs.observe(el); });

// ── Form validation & submit ──
var contactForm = document.getElementById('contactForm');
var submitBtn = document.getElementById('submit-btn');
var submitText = document.getElementById('submit-text');

function validateField(inputId, errId, fgId, test) {
  var val = document.getElementById(inputId).value.trim();
  var valid = test(val);
  document.getElementById(fgId).classList.toggle('has-error', !valid);
  document.getElementById(fgId).classList.toggle('has-success', valid);
  return valid;
}

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var v1 = validateField('inp-name', 'err-name', 'fg-name', function(v) { return v.length > 0; });
  var v2 = validateField('inp-email', 'err-email', 'fg-email', function(v) { return emailRe.test(v); });
  var v3 = validateField('inp-message', 'err-message', 'fg-message', function(v) { return v.length > 0; });
  if (!v1 || !v2 || !v3) return;
  submitBtn.disabled = true;
  submitText.textContent = currentLang === 'it' ? 'Invio in corso...' : 'Sending...';
  var fd = new FormData(contactForm);
  fetch('https://formspree.io/f/mwlvrnja', {
    method: 'POST',
    body: fd,
    headers: { 'Accept': 'application/json' }
  })
    .then(function(res) {
      if (!res.ok) throw new Error('Invio fallito: ' + res.status);
      return res.json();
    })
    .then(function(data) {
      submitText.textContent = currentLang === 'it' ? '\u2713 Inviato!' : '\u2713 Sent!';
      submitBtn.style.background = '#22c55e';
      contactForm.reset();
      ['fg-name','fg-email','fg-message'].forEach(function(id) { document.getElementById(id).classList.remove('has-success'); });
      setTimeout(function() {
        submitBtn.disabled = false;
        submitText.textContent = currentLang === 'it' ? 'Invia Messaggio' : 'Send Message';
        submitBtn.style.background = '';
      }, 4000);
    })
    .catch(function(err) {
      submitText.textContent = currentLang === 'it' ? 'Errore, riprova' : 'Error, retry';
      submitBtn.style.background = '#ef4444';
      setTimeout(function() {
        submitBtn.disabled = false;
        submitText.textContent = currentLang === 'it' ? 'Invia Messaggio' : 'Send Message';
        submitBtn.style.background = '';
      }, 3000);
    });
});

// ── i18n ──
var currentLang = 'it';
var i18n = {
  it: {
    'nav-about': 'About', 'nav-skills': 'Skills', 'nav-qual': 'Qualifiche', 'nav-cert': 'Certificazioni', 'nav-contact': 'Contatti',
    'hero-desc': 'Progetto e gestisco infrastrutture cloud scalabili, pipeline CI/CD e sistemi automatizzati. Laureato in Ingegneria Informatica, certificato AWS e Oracle Cloud.',
    'cta-contact': '\u2709 Contattami', 'cta-cv': '\u2b07 Scarica CV', 'about-cv-btn': '\u2b07 Scarica CV',
    'about-p1': '<strong>Cloud &amp; DevOps Engineer</strong> laureato in Ingegneria Informatica all\'Universit\u00e0 di Catania, con certificazioni AWS Certified Cloud Practitioner e Oracle OCI. Mi occupo della progettazione e gestione di infrastrutture cloud, on-premise e ibride, con focus su deployment, integrazione e rilascio continuo di applicativi.',
    'about-p2': 'La mia competenza spazia dall\'orchestrazione di architetture a microservizi basate su container, alla gestione middleware, fino allo sviluppo di soluzioni di IT Automation e Infrastructure as Code per ottimizzare processi e ridurre il debito operativo.',
    'about-p3': 'Unisco un background solido nello sviluppo software e nell\'analisi dei dati a un approccio metodologico orientato al problem-solving. Sono curioso, proattivo e appassionato di innovazione tecnologica continua.',
    'skills-sub': 'Tecnologie e strumenti con cui lavoro quotidianamente su infrastrutture cloud enterprise.',
    'qual-title': 'Qualifiche', 'qual-sub': 'Il mio percorso formativo e professionale.',
    'col-edu': 'Formazione', 'col-work': 'Lavoro',
    'edu-aws': 'Academy di 12 settimane in partnership con AWS Re/Start. Compute, Storage, Networking, Databases, Security, Serverless, Containers, Linux, Python.',
    'edu-degree-title': 'Laurea in Ingegneria Informatica',
    'edu-degree-desc': 'Tesi: <em>Big Data e machine learning in ambito calcistico: gli Expected Goals (xG)</em>',
    'edu-diploma-title': 'Diploma Perito Informatico &amp; Telecomunicazioni',
    'work1-date': 'Mag 2024 \u2013 presente', 'work2-date': 'Ott 2022 \u2013 Mar 2023',
    'work2-title': 'Sistemista Informatico (Internship)',
    'work2-desc': 'Progettazione e configurazione di sistemi di rete in qualit\u00e0 di System Engineer.',
    'cert-title': 'Certificazioni', 'cert-sub': 'Certificazioni cloud e corsi professionali conseguiti.',
    'contact-title-h': 'Contattami',
    'contact-sub': 'Sono disponibile per opportunit\u00e0 lavorative, collaborazioni tecniche o semplicemente per una chiacchierata.',
    'contact-heading': 'Parliamo!',
    'contact-desc': 'Che si tratti di un progetto cloud, una pipeline CI/CD o una nuova sfida DevOps, sono sempre aperto a nuove conversazioni.',
    'lbl-name': 'NOME', 'lbl-email': 'EMAIL', 'lbl-message': 'MESSAGGIO', 'submit-text': 'Invia Messaggio',
    'err-name': 'Inserisci il tuo nome', 'err-email': 'Inserisci un\'email valida', 'err-message': 'Inserisci un messaggio'
  },
  en: {
    'nav-about': 'About', 'nav-skills': 'Skills', 'nav-qual': 'Qualifications', 'nav-cert': 'Certifications', 'nav-contact': 'Contact',
    'hero-desc': 'Computer Engineering graduate, AWS and Oracle Cloud certified. I focus on automation and application releases in cloud/hybrid environments. I design and manage scalable cloud infrastructures, CI/CD pipelines and automated systems.',
    'cta-contact': '\u2709 Contact me', 'cta-cv': '\u2b07 Download CV', 'about-cv-btn': '\u2b07 Download CV',
    'about-p1': '<strong>Cloud &amp; DevOps Engineer</strong> with a Computer Engineering degree from the University of Catania, AWS Certified Cloud Practitioner and Oracle OCI certified. I design and manage cloud, on-premises and hybrid infrastructures, focusing on deployment, integration and continuous delivery.',
    'about-p2': 'My expertise spans container-based microservices orchestration, middleware management, and the development of IT Automation and Infrastructure as Code solutions to optimize processes and reduce operational debt.',
    'about-p3': 'I combine a solid background in software development and data analysis with a methodical, problem-solving mindset. Curious, proactive, and passionate about continuous tech innovation.',
    'skills-sub': 'Technologies and tools I work with daily on enterprise cloud infrastructures.',
    'qual-title': 'Qualifications', 'qual-sub': 'My academic and professional journey.',
    'col-edu': 'Education', 'col-work': 'Work',
    'edu-aws': '12-week Academy in partnership with AWS Re/Start. Compute, Storage, Networking, Databases, Security, Serverless, Containers, Linux, Python.',
    'edu-degree-title': 'BSc Computer Engineering',
    'edu-degree-desc': 'Thesis: <em>Big Data and machine learning in football: Expected Goals (xG)</em>',
    'edu-diploma-title': 'Diploma in Computer Science &amp; Telecommunications',
    'work1-date': 'May 2024 \u2013 present', 'work2-date': 'Oct 2022 \u2013 Mar 2023',
    'work2-title': 'IT System Engineer (Internship)',
    'work2-desc': 'Design and configuration of network systems as System Engineer.',
    'cert-title': 'Certifications', 'cert-sub': 'Cloud certifications and professional courses achieved.',
    'contact-title-h': 'Contact me',
    'contact-sub': 'Available for job opportunities, technical collaborations or just a conversation.',
    'contact-heading': 'Let\'s talk!',
    'contact-desc': 'Whether it\'s a cloud project, a CI/CD pipeline or a new DevOps challenge, I\'m always open to new conversations.',
    'lbl-name': 'NAME', 'lbl-email': 'EMAIL', 'lbl-message': 'MESSAGE', 'submit-text': 'Send Message',
    'err-name': 'Please enter your name', 'err-email': 'Please enter a valid email', 'err-message': 'Please enter a message'
  }
};

function toggleLang() {
  currentLang = currentLang === 'it' ? 'en' : 'it';
  document.getElementById('langBtn').textContent = currentLang === 'it' ? 'EN' : 'IT';
  document.documentElement.lang = currentLang;
  var t = i18n[currentLang];
  Object.entries(t).forEach(function(entry) {
    var el = document.getElementById(entry[0]);
    if (el) el.innerHTML = entry[1];
  });
  document.querySelectorAll('[data-it]').forEach(function(el) {
    el.textContent = el.dataset[currentLang] || el.dataset.it;
  });
  // navbar links
  var navLabels = currentLang === 'en'
    ? { 'nav-about':'About','nav-skills':'Skills','nav-qual':'Qualifications','nav-cert':'Certifications','nav-contact':'Contact' }
    : { 'nav-about':'About','nav-skills':'Skills','nav-qual':'Qualifiche','nav-cert':'Certificazioni','nav-contact':'Contatti' };
  Object.entries(navLabels).forEach(function(entry) {
    var el = document.getElementById(entry[0]);
    if (el) el.textContent = entry[1];
  });
  document.getElementById('inp-name').placeholder = currentLang === 'it' ? 'Il tuo nome' : 'Your name';
  document.getElementById('inp-email').placeholder = currentLang === 'it' ? 'tua@email.com' : 'your@email.com';
  document.getElementById('inp-message').placeholder = currentLang === 'it' ? 'Scrivi qui il tuo messaggio...' : 'Write your message here...';
}
