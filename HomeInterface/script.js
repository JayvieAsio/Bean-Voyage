const themeButton = document.querySelector('.theme-toggle');
const heroArt = document.querySelector('.hero-art');
const sliderDots = document.querySelector('.slider-dots');
const sliderImages = [
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=80'
];
let currentSlide = 0;
if (heroArt && sliderDots) {
  sliderImages.forEach((image, index) => {
    const dot = document.createElement('button');
    dot.className = `slider-dot${index === 0 ? ' active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show coffee image ${index + 1}`);
    dot.addEventListener('click', () => showSlide(index));
    sliderDots.appendChild(dot);
  });
  const showSlide = (index) => {
    currentSlide = (index + sliderImages.length) % sliderImages.length;
    heroArt.style.backgroundImage = `url("${sliderImages[currentSlide]}")`;
    sliderDots.querySelectorAll('.slider-dot').forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === currentSlide));
  };
  document.querySelector('.slider-button--prev').addEventListener('click', () => showSlide(currentSlide - 1));
  document.querySelector('.slider-button--next').addEventListener('click', () => showSlide(currentSlide + 1));
  window.setInterval(() => showSlide(currentSlide + 1), 6000);
}
document.querySelectorAll('a[href]').forEach((link) => { link.addEventListener('click', (event) => { const target = link.getAttribute('href'); if (!target || target.startsWith('#') || link.target === '_blank') return; event.preventDefault(); document.body.classList.add('is-leaving'); window.setTimeout(() => { window.location.href = target; }, 280); }); });
document.body.classList.toggle('dark', localStorage.getItem('bean-theme') === 'dark');
themeButton.addEventListener('click', () => { const dark = document.body.classList.toggle('dark'); localStorage.setItem('bean-theme', dark ? 'dark' : 'light'); themeButton.textContent = dark ? '☀' : '☾'; });

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem('bean-cart') || '[]');
    const existing = cart.find((item) => item.name === button.dataset.product);
    if (existing) existing.quantity += 1;
    else cart.push({ name: button.dataset.product, price: Number(button.dataset.price), quantity: 1, size: 'Regular', sugar: 'Normal', milk: 'Whole milk' });
    localStorage.setItem('bean-cart', JSON.stringify(cart));
    document.querySelector("#cartStatus").innerHTML = `${button.dataset.product} added. <a href="../Order/index.html">Customize your order →</a>`;
    document.querySelector('#cartCount').textContent = cart.reduce((total, item) => total + item.quantity, 0);
  });
});
document.querySelector('#cartCount').textContent = JSON.parse(localStorage.getItem('bean-cart') || '[]').reduce((total, item) => total + item.quantity, 0);
