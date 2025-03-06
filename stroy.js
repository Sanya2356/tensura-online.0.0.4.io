document.addEventListener("DOMContentLoaded", () => {
    const stroyButton = document.querySelector(".menu-button:first-child"); // Кнопка "Строй"
    const menuButtons = document.querySelectorAll(".menu-button"); // Все кнопки нижнего меню
    const stroyMenu = document.createElement("div"); // Контейнер меню
    stroyMenu.classList.add("stroy-menu");
    stroyMenu.style.display = "none"; // Скрываем изначально
    document.body.appendChild(stroyMenu);

    // Получаем данные о персонаже Rimuru
    const rimuru = getCharacter("Rimuru");
    if (!rimuru) return; // Если персонаж не найден, выходим

    // Левая часть - кнопка с avatar1.png, именем и БМ
    const leftPanel = document.createElement("div");
    leftPanel.classList.add("stroy-left");

    const avatarButton = document.createElement("img");
    avatarButton.src = rimuru.images.avatars[0]; // Загружаем avatar1.png
    avatarButton.classList.add("avatar-button");

    const nameTag = document.createElement("p");
    nameTag.textContent = rimuru.name;
    nameTag.classList.add("stroy-name");

    const battlePowerTag = document.createElement("p");
    battlePowerTag.textContent = `БМ: ${rimuru.battlePower}`;
    battlePowerTag.classList.add("stroy-battle-power");

    leftPanel.appendChild(avatarButton);
    leftPanel.appendChild(nameTag);
    leftPanel.appendChild(battlePowerTag);

    // Правая часть - 9 круглых ячеек
    const rightPanel = document.createElement("div");
    rightPanel.classList.add("stroy-right");

    const slots = [];
    for (let i = 0; i < 9; i++) {
        const slot = document.createElement("div");
        slot.classList.add("stroy-slot");
        rightPanel.appendChild(slot);
        slots.push(slot);
    }

    // Добавляем обе части в меню
    stroyMenu.appendChild(leftPanel);
    stroyMenu.appendChild(rightPanel);

    let isAvatarSelected = false;

    // Клик на avatar1.png
    avatarButton.addEventListener("click", () => {
        isAvatarSelected = !isAvatarSelected;
        avatarButton.style.boxShadow = isAvatarSelected ? "0 0 10px red" : "none";
    });

    // Функция сохранения состояния ячеек и БМ
    function saveSlots() {
        const slotData = slots.map(slot => (slot.children.length > 0 ? rimuru.images.models[4] : null));
        localStorage.setItem("stroySlots", JSON.stringify(slotData));

        // Сохраняем корректное значение БМ
        localStorage.setItem("playerPower", player.power);
    }

    // Функция загрузки состояния ячеек
    function loadSlots() {
        const slotData = JSON.parse(localStorage.getItem("stroySlots")) || [];
        const savedPower = parseInt(localStorage.getItem("playerPower")) || 0;

        // Устанавливаем БМ из сохраненного значения, а не увеличиваем его
        player.power = savedPower;

        slots.forEach((slot, index) => {
            if (slotData[index]) {
                const unit = document.createElement("img");
                unit.src = slotData[index];
                unit.classList.add("stroy-unit");
                slot.appendChild(unit);
            }
        });

        updatePower();
    }

    // Клик на ячейку
    slots.forEach((slot, index) => {
        slot.addEventListener("click", () => {
            if (slot.children.length === 0 && isAvatarSelected) {
                const unit = document.createElement("img");
                unit.src = rimuru.images.models[4]; // model1.2.png
                unit.classList.add("stroy-unit");
                slot.appendChild(unit);

                avatarButton.style.boxShadow = "0 0 10px green"; // Зеленый контур
                player.increasePower(rimuru.battlePower); // Увеличиваем БМ через player.js
            } else if (slot.children.length > 0) {
                slot.innerHTML = ""; // Удаляем изображение
                if (!document.querySelector(".stroy-right img")) {
                    avatarButton.style.boxShadow = "none"; // Убираем контур
                }
                player.decreasePower(rimuru.battlePower); // Уменьшаем БМ через player.js
            }
            saveSlots(); // Сохраняем состояние
            updatePower();
        });
    });

    // Функция обновления БМ
    function updatePower() {
        document.getElementById("static-power").textContent = `БМ: ${player.power}`;
        player.save(); // Сохраняем изменения в localStorage
    }

    // Обработчик кнопки "Строй"
    stroyButton.addEventListener("click", () => {
        stroyMenu.style.display = stroyMenu.style.display === "none" ? "flex" : "none";
    });

    // Закрытие меню "Строй" при нажатии на любую другую кнопку нижнего меню
    menuButtons.forEach(button => {
        if (button !== stroyButton) { // Исключаем кнопку "Строй"
            button.addEventListener("click", () => {
                stroyMenu.style.display = "none";
            });
        }
    });

    // Загружаем сохраненное состояние ячеек и БМ при загрузке страницы
    loadSlots();
});
