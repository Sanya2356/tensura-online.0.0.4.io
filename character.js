// character.js

const characters = {
    Rimuru: {
        name: "Римуру",
        level: 1,
        experience: 0,
        experienceMax: 100,
        role: "AOE Атака",
        stats: {
            attack: 50,
            speed: 40,
            defense: 30,
            health: 200,
            critChance: 0,       // Шанс крита %
            critDamage: 0,       // Крит урон %
            blockChance: 0,      // Шанс блока %
            antiCritChance: 0,   // Шанс антикрита %
            penetrationChance: 0, // Шанс пробоя %
            coverChance: 0       // Шанс покрова %
        },
        images: {
            avatars: [
                "img/characters/rimuru/avatar1.png",
                "img/characters/rimuru/avatar2.png",
                "img/characters/rimuru/avatar3.png",
                "img/characters/rimuru/avatar4.png"
            ],
            models: [
                "img/characters/rimuru/model1.png",
                "img/characters/rimuru/model2.png",
                "img/characters/rimuru/model3.png",
                "img/characters/rimuru/model4.png",
                "img/characters/rimuru/model1.2.png",
                "img/characters/rimuru/model2.2.png",
                "img/characters/rimuru/model3.2.png",
                "img/characters/rimuru/model4.2.png"
            ],
            cards: [
                "img/characters/rimuru/card1.jpg",
                "img/characters/rimuru/card2.jpg",
                "img/characters/rimuru/card3.jpg",
                "img/characters/rimuru/card4.jpg"
            ]
        }
    }
};

// Функция для получения данных о персонаже
function getCharacter(name) {
    return characters[name] || null;
}

// Функция для расчета боевой мощи персонажа
function calculateBattlePower(stats) {
    return Math.floor(
        (stats.attack * 2) +
        (stats.speed * 1.5) +
        (stats.defense * 2) +
        (stats.health * 0.5) +
        (stats.critChance * 3) +
        (stats.critDamage * 2) +
        (stats.blockChance * 2) +
        (stats.antiCritChance * 2) +
        (stats.penetrationChance * 3) +
        (stats.coverChance * 1.5)
    );
}

// Добавляем расчет боевой мощи для всех персонажей
Object.keys(characters).forEach(charName => {
    characters[charName].battlePower = calculateBattlePower(characters[charName].stats);
});
