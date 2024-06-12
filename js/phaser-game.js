const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#f0f0f0',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);

let cards;
let firstCard;
let secondCard;
let canFlip = true;
let pairsLeft;
let points;
let miss;
let time;
let pointsText;

function preload() {
    this.load.image('background', '../resources/background.png');
    this.load.image('back', '../resources/back.png');
    this.load.image('cb', '../resources/cb.png');
    this.load.image('co', '../resources/co.png');
    this.load.image('sb', '../resources/sb.png');
    this.load.image('so', '../resources/so.png');
    this.load.image('tb', '../resources/tb.png');
    this.load.image('to', '../resources/to.png');
}

function create() {
    this.add.image('background').setDisplaySize(window.innerWidth, window.innerHeight);

    const resources = ['cb', 'co', 'sb', 'so', 'tb', 'to'];

    let options = JSON.parse(localStorage.getItem('options')) || { pairs: 2, difficulty: 'normal' };

    pairsLeft = options.pairs;
    points = 100;

    if (options.difficulty === 'easy') {
        miss = 10;
        time = 2000;
    } else if (options.difficulty === 'hard') {
        miss = 40;
        time = 500;
    } else {
        miss = 25;
        time = 1000;
    }

    // Seleccionar pares de cartas aleatoriamente y mezclar el array
    let items = Phaser.Utils.Array.Shuffle(resources.slice()).slice(0, pairsLeft);
    items = Phaser.Utils.Array.Shuffle(items.concat(items)); // Mezclar el array duplicado

    cards = this.add.group();

    const cardWidth = 96;
    const cardHeight = 128;
    const margin = 30;
    const cols = Math.min(Math.floor(window.innerWidth / (cardWidth + margin)), items.length);
    const rows = Math.ceil(items.length / cols);
    const startX = (window.innerWidth - (cols * (cardWidth + margin) - margin)) / 2;
    const startY = (window.innerHeight - (rows * (cardHeight + margin) - margin)) / 2.5;

    items.forEach((item, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = startX + col * (cardWidth + margin) + cardWidth / 2;
        const y = startY + row * (cardHeight + margin) + cardHeight / 2;
        const card = this.add.sprite(x, y, item).setInteractive();
        card.front = item;
        card.isFlipped = false;
        card.displayWidth = cardWidth;
        card.displayHeight = cardHeight;
        card.on('pointerdown', () => flipCard(this, card));
        cards.add(card);
    });

    this.time.delayedCall(time, () => {
        cards.children.iterate((card) => {
            card.setTexture('back');
            card.isFlipped = false;
            card.clickable = true;
        });
    });

        // Cambiar la fuente del texto de los puntos
    pointsText = this.add.text(16, 16, 'PUNTOS: 100', { 
        fontSize: '32px',
        fill: '#000', 
        fontFamily: "Kanit, sans-serif",
        align: 'center'
    }).setOrigin(0, 0); // Establecer origen al centro
}

function update() {
    // Lógica del bucle del juego, si es necesario
}

function flipCard(scene, card) {
    if (!canFlip || card === firstCard || !card.clickable) return;

    card.setTexture(card.front);
    card.isFlipped = true;

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        canFlip = false;

        scene.time.delayedCall(1000, () => {
            if (firstCard.front === secondCard.front) {
                firstCard.disableInteractive();
                secondCard.disableInteractive();
                pairsLeft--;

                if (pairsLeft === 0) {
                    alert("¡Has ganado con " + points + " puntos!");
                    window.location.replace("../");
                }
            } else {
                firstCard.setTexture('back');
                secondCard.setTexture('back');
                firstCard.isFlipped = false;
                secondCard.isFlipped = false;
                points -= miss;
                pointsText.setText('Puntos: ' + points);

                if (points <= 0) {
                    alert("Has perdido");
                    window.location.replace("../");
                }
            }

            firstCard = null;
            secondCard = null;
            canFlip = true;
        });
    }
}

window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
    pointsText.setPosition(window.innerWidth / 2, 16);
});
