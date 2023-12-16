/* ==== TOGGLE MENU ==== */
/* ===== NAVMENU ===== */
const navMenu = document.querySelector(".nav_menu");
/* ===== TOGGLE BUTTON ===== */
const toggleBtn = document.querySelector(".nav_menu_btn");

/* ===== EVENTLISTENER ON TOGGLE BUTTON ===== */
toggleBtn.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});
/* ==== TOGGLE ACCORDION (FAQ) ==== */
const faqs = document.querySelectorAll(".faq");

/* ==== EVENT-LISTENER ON ACCORDION (FAQ) ==== */
faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});
/* Анимации*/

//плавная загрузка меню
gsap.from(".logo, .nav_menu_btn, .nav_menu_list_item, .contact_btn", {
  opacity: 0,
  duration: 1.5,
  delay: 1,
  y: -10,
});
// плавная загрузка фона
gsap.from(".hero_img", {
  opacity: 0,
  duration: 1.5,
  delay: 1,
});

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav_menu_list_item a ");

function linkAct() {
  navMenu.classList.remove("show");
}
navLink.forEach((n) => {
  n.addEventListener("click", linkAct);
});

/*===== SCROLL REVEAL ANIMATION =====*/
const scrollAnimation = ScrollReveal({
  origin: "top",
  distance: "10px",
  duration: 1500,
  delay: 100,
});
scrollAnimation.reveal(".logotype", {
  delay: 100,
});
/* === HERO === */
scrollAnimation.reveal(".hero__headline", {delay: 50});
scrollAnimation.reveal(".hero__subtitle", { delay: 200 });
scrollAnimation.reveal(".get_started_btn", { delay: 350 });
scrollAnimation.reveal(".stats", { interval: 400 });

/* появление спонсоров*/
scrollAnimation.reveal(".featured p", { delay: 300 });
scrollAnimation.reveal(".featured_list_item", { interval: 400 });

/* появление карточек с недвижимостью*/
scrollAnimation.reveal(".section_name", { delay: 400 });
scrollAnimation.reveal(".section_title", { delay: 600 });
scrollAnimation.reveal(".features_card", { interval: 700 });

/* появление постов блога */
scrollAnimation.reveal(".grid", { delay: 600 });
scrollAnimation.reveal(".blog_card", { interval: 1200 });

/* появление отзывов */
scrollAnimation.reveal(".testimonial_item", { interval: 700 });

/* появление блока Присоединиться*/
scrollAnimation.reveal(".get_started_content h2", {
  delay: 900,
});
scrollAnimation.reveal(".get_started_content p", {
  delay: 1000,
});
/* появление меню Footer */
scrollAnimation.reveal(".footer_brand", {
  delay: 800,
});
scrollAnimation.reveal(".footer_menu", {
  delay: 900,
});
/* появление Footer */
scrollAnimation.reveal("footer", {
  delay: 500,
});


/* появление Задание 1 */
scrollAnimation.reveal(".task_1", {
  delay: 500,
});

