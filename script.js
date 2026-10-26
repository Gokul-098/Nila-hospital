/* Nila Child Care - shared header/footer, forms, gallery, animations */
const PHONE = '+919384341165', WA = 'https://wa.me/919384341165';
const WA_TEXT = encodeURIComponent('Hello Nila Child Care, I would like to book an appointment.');
const NAV = [['index.html','Home'],['about.html','About'],['services.html','Services'],['gallery.html','Gallery'],['faq.html','FAQ'],['contact.html','Contact']];
/* Add real photos here: {src:'assets/clinic.jpg', alt:'Describe the photo'} */
const GALLERY = [];

const page = location.pathname.split('/').pop() || 'index.html';
const header = document.getElementById('site-header');
if (header) header.innerHTML = `
<a class="skip" href="#main">Skip to content</a>
<nav class="navbar navbar-expand-lg navbar-dark site-nav sticky-top"><div class="container">
<a class="navbar-brand" href="index.html">Nila <span>Child Care</span></a>
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle menu"><span class="navbar-toggler-icon"></span></button>
<div class="collapse navbar-collapse" id="nav"><ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
${NAV.map(([h,t]) => `<li class="nav-item"><a class="nav-link ${h===page?'active" aria-current="page':''}" href="${h}">${t}</a></li>`).join('')}
<li class="nav-item ms-lg-2 mt-2 mt-lg-0"><a class="btn btn-moon" href="tel:${PHONE}">Call ${PHONE.replace('+91','+91 ')}</a></li></ul></div></div></nav>`;

const footer = document.getElementById('site-footer');
if (footer) footer.innerHTML = `
<footer><div class="container"><div class="row g-4">
<div class="col-md-5"><h2>Nila Child Care</h2><p>Children's hospital in Dharmapuri, Tamil Nadu.</p></div>
<div class="col-6 col-md-3"><h2>Pages</h2><ul class="list-unstyled">${NAV.map(([h,t])=>`<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>
<div class="col-6 col-md-4"><h2>Contact</h2><p class="mb-1"><a href="tel:${PHONE}">${PHONE}</a></p>
<p class="mb-1"><a href="${WA}?text=${WA_TEXT}" target="_blank" rel="noopener">WhatsApp us</a></p>
<p><a href="https://www.google.com/maps/search/?api=1&query=Nila+Child+Care+Dharmapuri" target="_blank" rel="noopener">View on Google Maps</a></p></div>
</div><hr><p class="small mb-0">For a medical emergency, call or go to your nearest emergency department immediately. This website does not give medical advice.</p>
<p class="small mt-2 mb-0">&copy; ${new Date().getFullYear()} Nila Child Care</p></div></footer>
<a class="wa" href="${WA}?text=${WA_TEXT}" target="_blank" rel="noopener" aria-label="Chat with Nila Child Care on WhatsApp">WhatsApp</a>`;

/* Forms: validated client-side, submitted to Netlify Forms. Success is shown only on a real OK response. */
document.querySelectorAll('form[data-enquiry]').forEach(form => {
  const status = form.querySelector('.form-status'), btn = form.querySelector('button[type=submit]');
  const phone = form.querySelector('[name=phone]'), date = form.querySelector('[name=date]');
  if (date) date.min = new Date().toISOString().split('T')[0];
  const checkPhone = () => phone.setCustomValidity(/^(\+91|91|0)?[6-9]\d{9}$/.test(phone.value.replace(/[\s-]/g,'')) ? '' : 'Enter a valid 10-digit mobile number.');
  phone.addEventListener('input', checkPhone);
  const show = (type, html) => { status.innerHTML = `<div class="alert alert-${type}" role="${type==='danger'?'alert':'status'}">${html}</div>`; };
  form.addEventListener('submit', async e => {
    e.preventDefault(); status.innerHTML = ''; checkPhone();
    form.classList.add('was-validated');
    if (!form.checkValidity()) { form.querySelector(':invalid').focus(); show('danger','Please correct the highlighted fields and try again.'); return; }
    if (form.querySelector('[name=bot-field]').value) return;
    const label = btn.innerHTML; btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Sending...';
    try {
      const res = await fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:new URLSearchParams(new FormData(form)).toString() });
      if (!res.ok) throw new Error(res.status);
      form.reset(); form.classList.remove('was-validated');
      show('success','<strong>Request sent.</strong> We will call you to confirm. For urgent needs, call ' + PHONE + '.');
    } catch {
      show('danger',`<strong>We could not send your request.</strong> Please call <a href="tel:${PHONE}">${PHONE}</a> or <a href="${WA}?text=${WA_TEXT}" target="_blank" rel="noopener">message us on WhatsApp</a>.`);
    } finally { btn.disabled = false; btn.innerHTML = label; }
  });
});

/* Gallery with empty state */
const gal = document.getElementById('gallery');
if (gal) gal.innerHTML = GALLERY.length
  ? `<div class="row g-3 gallery">${GALLERY.map(i=>`<div class="col-6 col-lg-4"><img src="${i.src}" alt="${i.alt}" loading="lazy" onerror="this.alt='Image could not be loaded'"></div>`).join('')}</div>`
  : `<div class="empty"><h2 class="h4">Photos will appear here</h2><p class="mb-3">Our photo gallery is being prepared. To see the hospital, visit us or ask us on WhatsApp.</p><a class="btn btn-teal" href="contact.html">Contact us</a></div>`;

/* One page-load reveal for the main sections */
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), {threshold:.1}) : null;
document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));
