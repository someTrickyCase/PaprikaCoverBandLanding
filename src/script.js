const navigation = document.querySelector(".header");

const sections = document.querySelectorAll(".section");
const heroSection = document.querySelector(".section--hero");
const featureSection = document.querySelector(".section--features");
const repertoirSection = document.querySelector(".section--repertoir");
const reviewsSection = document.querySelector(".section--reviews");

const contactsPopup = document.querySelector(".popup--contact-links");

const featuresContent = document.querySelectorAll(".feature-info");

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const dotsContainer = document.querySelector(".dots");

const ctaButtons = document.querySelectorAll(".cta");
const form = document.querySelector(".form-container");

const mobileMenuButton = document.querySelector(".button-mobile-menu");
const menuLinks = document.querySelector(".links");

const buttonDownloadRepertoir = document.querySelector(
  ".button--download-repertoir"
);

// navigation scroll
navigation.addEventListener("click", (event) => {
  event.preventDefault();
  if (!event.target.classList.contains("link")) return;
  const link = event.target;

  // scroll to feature Section
  if (link.classList.contains("link-to-features"))
    featureSection.scrollIntoView({
      behavior: "smooth",
    });

  // scroll to repertoir section
  if (link.classList.contains("link-to-repertoir"))
    repertoirSection.scrollIntoView({
      behavior: "smooth",
    });

  // scroll to reviews section
  if (link.classList.contains("link-to-reviews"))
    reviewsSection.scrollIntoView({
      behavior: "smooth",
    });

  // Scroll to hero section
  if (link.classList.contains("logo-image"))
    heroSection.scrollIntoView({
      behavior: "smooth",
    });
});

// button scrolling
heroSection.addEventListener("click", (event) => {
  event.preventDefault();
  if (!event.target.classList.contains("button")) return;
  featureSection.scrollIntoView({
    behavior: "smooth",
  });
});

// sticking navigation
const stikyngNavigation = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navigation.classList.add("sticky");
  else navigation.classList.remove("sticky");
};

const observer = new IntersectionObserver(stikyngNavigation, {
  root: null,
  treshold: 0,
  rootMargin: `-${Number.parseFloat(getComputedStyle(navigation).height)}px`,
});

observer.observe(heroSection);

// show contacts
navigation.addEventListener("mouseover", (event) => {
  event.preventDefault();
  if (!event.target.closest(".popup")) return;
  contactsPopup.classList.remove("hide");
});

contactsPopup.addEventListener("mouseout", () => {
  contactsPopup.classList.add("hide");
});

// sections floating into view
sections.forEach((section) => {
  section.classList.add("section--hidden");

  function sectionRollIn(entries, observer) {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setTimeout(section.classList.remove("section--hidden"), 300);
      observer.unobserve(entry.target);
    }
  }

  const sectionsObserver = new IntersectionObserver(sectionRollIn, {
    root: null,
    threshold: 0.1,
  });
  sectionsObserver.observe(section);
});

// Section Features

featureSection.addEventListener("click", (event) => {
  if (!event.target.closest(".feature-item")) return;
  const index = +event.target.closest(".feature-item").dataset.index;

  featuresContent.forEach((item) => {
    if (+item.dataset.index === index) item.classList.remove("hide");
    else item.classList.add("hide");
  });
});

// Section Review
let currentSlide = 1;
document.body.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "arrowright") {
    if (currentSlide !== 4) currentSlide++;
    else currentSlide = 1;
    changeSlide(currentSlide);
    changeDot(currentSlide);
  }
  if (event.key.toLowerCase() === "arrowleft") {
    if (currentSlide !== 1) currentSlide--;
    else currentSlide = 4;
    changeSlide(currentSlide);
    changeDot(currentSlide);
  }
});

reviewsSection.addEventListener("click", (event) => {
  if (!event.target.closest(".slider-button")) return;

  const button = event.target.closest(".slider-button");

  if (button.closest(".slider-button--right")) {
    if (currentSlide !== 4) currentSlide++;
    else currentSlide = 1;
    changeSlide(currentSlide);
    changeDot(currentSlide);
  }
  if (button.closest(".slider-button--left")) {
    if (currentSlide !== 1) currentSlide--;
    else currentSlide = 4;
    changeSlide(currentSlide);
    changeDot(currentSlide);
  }
});

function changeSlide(index) {
  slides.forEach((slide) => {
    if (+slide.dataset.index === index) slide.classList.remove("hide");
    else slide.classList.add("hide");
  });
}

function changeDot(index) {
  dots.forEach((dot) => {
    if (+dot.dataset.index === index) dot.classList.add("dot-active");
    else dot.classList.remove("dot-active");
  });
}

dotsContainer.addEventListener("click", (event) => {
  if (!event.target.closest(".dot")) return;
  const button = event.target.closest(".dot");
  currentSlide = +button.dataset.index;
  changeSlide(currentSlide);
  changeDot(currentSlide);
});

// Modal window
ctaButtons.forEach((button) =>
  button.addEventListener("click", () => {
    heroSection.scrollIntoView({
      behavior: "smooth",
    });
    form.classList.remove("hide");
    setTimeout(() => (document.body.style.position = "fixed"), 800);
  })
);

document.body.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "escape") {
    form.classList.add("hide");
    document.body.style.position = "absolute";
  }
});

form.addEventListener("click", (event) => {
  if (!event.target.classList.contains("form-container")) return;
  form.classList.add("hide");
  document.body.style.position = "absolute";
});

// MOBILE MENU
mobileMenuButton.addEventListener("click", (event) => {
  event.preventDefault();
  menuLinks.style.visibility = "visible";
  mobileMenuButton.classList.add("hide");
});

document.body.addEventListener("click", (event) => {
  if (
    !event.target.closest(".button-mobile-menu") &&
    menuLinks.style.visibility === "visible"
  ) {
    menuLinks.style.visibility = "hidden";
    mobileMenuButton.classList.remove("hide");
  }
});

// Download Repertoir
const repertoirText = `Песни 80-е

Браво - это за окном рассвет 
Машина Времени - Мой друг 
Антонов - Летящей походкой 
Браво - Любите девушки 
Браво - Я то что надо 
Браво - Вася 
Шатунов - Седая ночь 
Шатунов - Белые розы 
Песни 90-е

Reflex - танцы 
Руки вверх - 18 мне уже 
Звери - Районы-кварталы 
Леприконсы - Хали-Гали 
Серебро - Мама-Люба 
Zdob si zdub - Видели Ночь 
Чичерина - Ту-лу-ла 
Жуки - Танкист 
А-мега - Лететь 
Мумий тролль - Медведица 
Bon Jovi - It's my life 
Звери - Все что тебя касается 
Звери - Танцуй 
Ленинград - Мамба 
Ленинград - WWW 
Отпетые мошеники - Люби меня люби 
Кузьмин - Красотка (Rock n Roll Version) 
Леонид Агутин - Хоп-хей 
Братья гримм - Ресницы 
Король и шут - Лесник 
Звери - Просто такая сильная любовь 
Звери - Дожди пистолеты 
Сплин - Выхода нет 
Руки Вверх - Крошка Моя 
Сплин - Мое сердце 
Жуки - Батарейка 
Григорий Лепс - Я счастливый 
Григорий Лепс - Самый лучший день 
Звери - Брюнетки и блондинки 
Современные и 00-е песни

Лобода - Суперзвезда 
Градусы - Голая 
IOWA - Бьет бит 
Мот - День и ночь 
Jan Hallib - Если че я баха 
SEREBRO - Между нами любовь 
IOWA - Песня простая (Dance mix) 
Vanilla Sky - Звенит январская вьюга (Rock Mix) 
Градусы - Кто ты 
Лазарев - Это все она 
Артик и Асти - Никому не отдам 
Тима Белорусских - Незабудка 
Мумий Тролль - Невеста 
Макс Корж - Жить в кайф 
Иван Дорн - Ненавижу 
Ленинград - Вояж 
2 Маши - Босая 
Билан - Молния 
Zivert и Мот - Паруса 
LTB - Uno 
Пошлая Молли - Нон стоп 
Mary Gu - Косички 
Ваня Дмитриенко - Венера-Юпитер 
Баста - Медлячок 
Тима Беллоруских - Мокрые кроссы 
LTB - Faradenza 
Добро - Юность (Звук поставим на всю) 
Animalджаз - Три полоски 
Люся Чеботина - Солнце Монако 
Galibri & Mavik - Федерико Феллини 
Макс Корж - Небо поможет Вам 
CHEBANOV - Ночь (Cover Андрей Губин) 
Антон Токарев - Седьмой лепесток (Cover Hi-Fi) 
Максим - Знаешь ли ты 
Земфира - знак бесконечность 
DEAD BLONDE – Мальчик на девятке 
Зарубежные песни

Shaking Blue - Venus 
Alice Merton - No roots 
Roxete - Sleeping in my car 
Beach boys - California dreaming 
Limp Bizkit - Behind blue eyes (The Who cover) 
Måneskin - I Wanna Be Your Slave 
The Baseballs - Umbrella (rock n roll Version) 
Complicated - Avril Lavigne 
Alvaro solar - Sofia 
Cranbireins - Zombie 
Nickelback - How you remind me 
George Harrison - I Got My Mind Set On 
Chris Isaak - Wicked game 
RHCP - Californication 
Dua Lipa - Don't Start Now 
Bon Jovi - Its My Life 
Blur - Song 2 
Bonney M - Sunny 
Ed sheer an - Thinking loud 
Nirvana - Smells like teen spirit 
Queen - We will rock you 
Taylor Swift - I Knew You Were Trouble`;

function downloadAsFile(data) {
  let a = document.createElement("a");
  let file = new Blob([data], { type: "application/json" });
  a.href = URL.createObjectURL(file);
  a.download = "repertoir.txt";
  a.click();
}

buttonDownloadRepertoir.addEventListener("click", (event) => {
  const button = event.target.closest(".button--download-repertoir");
  if (!button) return;
  downloadAsFile(repertoirText);
});
