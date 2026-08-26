const themeButton = document.querySelector('.theme-toggle');
document.querySelectorAll('a[href]').forEach((link) => { link.addEventListener('click', (event) => { const target = link.getAttribute('href'); if (!target || target.startsWith('#') || link.target === '_blank') return; event.preventDefault(); document.body.classList.add('is-leaving'); window.setTimeout(() => { window.location.href = target; }, 280); }); });
document.body.classList.toggle('dark', localStorage.getItem('bean-theme') === 'dark');
themeButton.addEventListener('click', () => { const dark = document.body.classList.toggle('dark'); localStorage.setItem('bean-theme', dark ? 'dark' : 'light'); themeButton.textContent = dark ? '☀' : '☾'; });
const cart = JSON.parse(localStorage.getItem('bean-cart') || '[]');
document.querySelector('#cartCount').textContent = cart.reduce((total, item) => total + item.quantity, 0);
document.querySelector('#contactForm').addEventListener('submit', (event) => { event.preventDefault(); document.querySelector('#contactStatus').textContent = 'Thank you. We will get back to you soon.'; event.target.reset(); });