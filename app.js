document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".navigation__link");
  const contents = document.querySelectorAll(".tab-content");
  const navItems = document.querySelectorAll("#nav-list li");

  // Восстановление активной ссылки из localStorage
  const activeHash = localStorage.getItem("activeHash");
  if (activeHash) {
    activateSectionByHash(activeHash);
  } else {
    // Активируем первую по умолчанию
    if (links.length > 0) {
      const defaultHash = links[0].getAttribute("href");
      activateSectionByHash(defaultHash);
    }
  }

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const hash = link.getAttribute("href");

      // Обновляем активный класс для навигационных элементов
      navItems.forEach((item) => item.classList.remove("active"));
      const navItem = Array.from(navItems).find(
        (li) => li.querySelector("a").getAttribute("href") === hash
      );
      if (navItem) {
        navItem.classList.add("active");
      }

      // Сохраняем активный хэш
      localStorage.setItem("activeHash", hash);

      // Показываем нужный контент
      contents.forEach((content) => content.classList.remove("active"));
      const targetContent = document.querySelector(hash);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });

  // Функция для активации секции по хэшу
  function activateSectionByHash(hash) {
    // Удаляем активные классы
    navItems.forEach((item) => item.classList.remove("active"));
    contents.forEach((content) => content.classList.remove("active"));

    // Находим соответствующий элемент навигации и контент
    const navItem = Array.from(navItems).find(
      (li) => li.querySelector("a").getAttribute("href") === hash
    );
    const targetContent = document.querySelector(hash);

    if (navItem && targetContent) {
      navItem.classList.add("active");
      targetContent.classList.add("active");
    }
  }
});

// Получаем шаблон
const template = document.getElementById("product-card-template");

// Массив данных для карточек
const products = [
  {
    imageSrc: "./img/milk.png",
    title: "Молоко 3,2 %",
    subtitle: "от Вадима Рошки",
    price: "95 ₽",
    volume: "/ 0,93 л",
    rating: 5,
  },
  {
    imageSrc: "./img/bread.png",
    title: "Хлеб пшеничный",
    subtitle: "от Дарьи и Марии",
    price: "95 ₽",
    volume: "/ 930 г",
    rating: 5,
  },
  {
    imageSrc: "./img/eggs.png",
    title: "Яйца куриные",
    subtitle: "от Евгения Рошаль",
    price: "120 ₽",
    volume: "/ 10 шт",
    rating: 5,
  },
  {
    imageSrc: "./img/oil.png",
    title: "Масло сливочное 82 %",
    subtitle: "от Вадима Рошки",
    price: "290 ₽",
    volume: "/ 250 г",
    rating: 5,
  },
  // Можно добавлять больше объектов
];

// Получаем контейнер, куда будем вставлять карточки
const container = document.querySelector(".product__catalog");

// Создаем карточки
products.forEach((product) => {
  const clone = template.content.cloneNode(true);

  // Заполняем содержимое
  clone.querySelector(".product-image").src = product.imageSrc;
  clone.querySelector(".product-image").alt = product.title;
  clone.querySelector(".title").textContent = product.title;
  clone.querySelector(".subtitle").textContent = product.subtitle;
  clone.querySelector(".main-number").textContent = product.price;
  clone.querySelector(".fraction").textContent = product.volume;

  // Создаем звезды рейтинга
  const starsContainer = clone.querySelector(".stars");
  starsContainer.innerHTML = ""; // очищаем
  for (let i = 0; i < product.rating; i++) {
    starsContainer.innerHTML += '<div class="star">★</div>';
  }
  for (let i = product.rating; i < 5; i++) {
    starsContainer.innerHTML += '<div class="star" style="color:#ccc;">★</div>';
  }

  // Вставляем в контейнер
  container.appendChild(clone);
});
