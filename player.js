// Класс игрока
class Player {
    constructor() {
        this.nickname = localStorage.getItem("playerNickname") || "Игрок";
        this.level = parseInt(localStorage.getItem("playerLevel")) || 1;
        this.power = parseInt(localStorage.getItem("playerPower")) || 0;
        this.experience = parseInt(localStorage.getItem("playerExperience")) || 0;
    }

    // Сохранение данных в localStorage
    save() {
        localStorage.setItem("playerLevel", this.level);
        localStorage.setItem("playerPower", this.power);
        localStorage.setItem("playerExperience", this.experience);
        this.updatePowerDisplay(); // Обновляем отображение БМ
    }

    // Повышение уровня
    levelUp() {
        this.level++;
        this.experience = 0; // Обнуляем опыт после повышения уровня
        this.save();
    }

    // Увеличение боевой мощи
    increasePower(amount) {
        this.power += amount;
        this.save();
    }

    // Уменьшение боевой мощи
    decreasePower(amount) {
        this.power -= amount;
        if (this.power < 0) this.power = 0;
        this.save();
    }

    // Добавление опыта и проверка на повышение уровня
    gainExperience(amount) {
        this.experience += amount;
        if (this.experience >= 100) {  // Если опыт достиг 100, повышаем уровень
            this.levelUp();
        }
        this.save();
    }

    // Обновление БМ в интерфейсе
    updatePowerDisplay() {
        const powerElement = document.getElementById("static-power");
        if (powerElement) {
            powerElement.textContent = `БМ: ${this.power}`;
        }
    }
}

// Создание игрока
const player = new Player();

// Обновление интерфейса при загрузке
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("static-nickname").textContent = player.nickname;
    document.getElementById("static-level").textContent = `Уровень: ${player.level}`;
    document.getElementById("static-power").textContent = `БМ: ${player.power}`;

    // Добавляем отображение опыта
    if (!document.getElementById("static-experience")) {
        const expElement = document.createElement("div");
        expElement.id = "static-experience";
        expElement.textContent = `Опыт: ${player.experience}/100`;
        document.getElementById("static-nickname-container").appendChild(expElement);
    } else {
        document.getElementById("static-experience").textContent = `Опыт: ${player.experience}/100`;
    }
});

// Функция для теста (например, можно вызывать по кнопке)
function addExp(amount) {
    player.gainExperience(amount);
    document.getElementById("static-level").textContent = `Уровень: ${player.level}`;
    document.getElementById("static-experience").textContent = `Опыт: ${player.experience}/100`;
}
