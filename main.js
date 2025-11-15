
document.addEventListener("DOMContentLoaded", () => {
  // Load products from JSON file
  fetch("products.json")
    .then(res => res.json())
    .then(renderProducts)
    .catch(err => console.error("خطا در لود محصولات:", err));

  // GSAP hero animation
  if (window.gsap) {
    gsap.from(".hero-title", { y: 30, opacity: 0, duration: 0.7 });
    gsap.from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.6, delay: 0.2 });
    gsap.from(".hero-cta", { y: 20, opacity: 0, duration: 0.6, delay: 0.35 });
    gsap.from(".hero-card", { y: 40, opacity: 0, duration: 0.8, delay: 0.25 });
  }

  // Scroll reveal sections
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && window.gsap) {
        gsap.from(entry.target, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out"
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach((section) => observer.observe(section));

  // Fake promo countdown (static demo values)
  document.getElementById("days").textContent  = "۰۵";
  document.getElementById("hours").textContent = "۱۲";
  document.getElementById("mins").textContent  = "۳۴";
});

function renderProducts(list) {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = list.map((p) => {
    const badgeClass =
      p.badge === "پرفروش"
        ? 'product-badge" style="background:rgba(59,130,246,0.1);color:#2563eb;'
        : p.badge === "تخفیف‌دار"
        ? 'product-badge" style="background:rgba(234,179,8,0.1);color:#ca8a04;'
        : p.badge === "زمستانی"
        ? 'product-badge" style="background:rgba(59,130,246,0.1);color:#2563eb;'
        : p.badge === "ست خانواده"
        ? 'product-badge" style="background:rgba(168,85,247,0.12);color:#7c3aed;'
        : "product-badge";

    return `
      <article class="product-card">
        <div class="${badgeClass}">${p.badge}</div>
        <div class="product-img">
          <img src="${p.image}" alt="${p.name}">
        </div>
        <div class="product-info">
          <div class="product-title">${p.name}</div>
          <p>${p.description}</p>
          <div class="product-meta">
            <div class="product-price">${p.price}</div>
            <div class="product-size">سایز: ${p.size}</div>
          </div>
          <button class="product-add" onclick="fakeAddToCart('${p.name}')">
            افزودن به سبد 🛒
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function fakeAddToCart(name) {
  alert("«" + name + "» به سبد خرید آزمایشی اضافه شد. برای سبد واقعی باید بک‌اند وصل کنی ❤️");
}
