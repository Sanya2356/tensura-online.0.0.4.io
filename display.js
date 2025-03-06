document.addEventListener("DOMContentLoaded", () => {
    const heroesButton = document.querySelector(".menu-button:nth-child(2)"); // Кнопка "Герои"
    const menuButtons = document.querySelectorAll(".menu-button"); // Все кнопки нижнего меню
    const hero = document.createElement("div"); // Создаем контейнер героя
    hero.classList.add("hero");
    hero.style.display = "none"; // Изначально скрываем

    document.body.appendChild(hero); // Добавляем в DOM

    // Создаём контейнер для сетки карточек
    const heroContainer = document.createElement("div");
    heroContainer.classList.add("hero-container");
    hero.appendChild(heroContainer);

    // Массив персонажей (заглушка, можешь заменить на реальные данные)
    const characters = [
        getCharacter("Rimuru"),
        getCharacter("Shuna"),
        getCharacter("Benimaru"),
        getCharacter("Milim")
    ].filter(character => character !== null); // Убираем null значения

    characters.forEach(character => {
        const heroCell = document.createElement("div"); // Ячейка героя
        heroCell.classList.add("hero-cell");

        // Изображение карточки персонажа
        const cardImage = document.createElement("img");
        cardImage.src = character.images.cards[0]; // Загружаем card1.jpg
        cardImage.alt = character.name;
        cardImage.classList.add("hero-card");

        // Имя персонажа
        const nameTag = document.createElement("p");
        nameTag.textContent = character.name;
        nameTag.classList.add("hero-name");

        // Боевая мощь
        const battlePowerTag = document.createElement("p");
        battlePowerTag.textContent = `БM: ${character.battlePower}`;
        battlePowerTag.classList.add("hero-battle-power");

        // Добавляем элементы в ячейку героя
        heroCell.appendChild(cardImage);
        heroCell.appendChild(nameTag);
        heroCell.appendChild(battlePowerTag);

        heroContainer.appendChild(heroCell); // Добавляем карточку в контейнер
    });

    // Обработчик клика по кнопке "Герои"
    heroesButton.addEventListener("click", () => {
        hero.style.display = hero.style.display === "none" ? "flex" : "none";
    });

    // Закрытие меню при нажатии на любую кнопку нижнего меню (кроме "Герои")
    menuButtons.forEach(button => {
        if (button !== heroesButton) { // Исключаем кнопку "Герои"
            button.addEventListener("click", () => {
                hero.style.display = "none";
            });
        }
    });
});
