document.querySelectorAll('a[href]').forEach((link) => { link.addEventListener('click', (event) => { const target = link.getAttribute('href'); if (!target || target.startsWith('#') || link.target === '_blank') return; event.preventDefault(); document.body.classList.add('is-leaving'); window.setTimeout(() => { window.location.href = target; }, 280); }); });
const themeButton = document.querySelector('.theme-toggle');
document.body.classList.toggle('dark', localStorage.getItem('bean-theme') === 'dark');
themeButton.addEventListener('click', () => { const dark = document.body.classList.toggle('dark'); localStorage.setItem('bean-theme', dark ? 'dark' : 'light'); themeButton.textContent = dark ? '☀' : '☾'; });

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("focus", () => link.classList.add("active"));
});
